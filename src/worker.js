const MODEL = "@cf/qwen/qwen3-30b-a3b-fp8";

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname !== "/api/tutor") {
      return new Response("Not Found", { status: 404 });
    }

    if (request.method !== "POST") {
      return new Response("Method Not Allowed", { status: 405 });
    }

    try {
      const MAX_BODY_BYTES = 8192;

      if (Number(request.headers.get("content-length")) > MAX_BODY_BYTES) {
        return Response.json(
          { error: "Request too large." },
          { status: 413 }
        );
      }

      const raw = await request.text();

      if (new TextEncoder().encode(raw).byteLength > MAX_BODY_BYTES) {
        return Response.json(
          { error: "Request too large." },
          { status: 413 }
        );
      }

      const body = JSON.parse(raw);
      const explanation = body?.explanation;

      if (typeof explanation !== "string" ||
          !explanation.trim() ||
          explanation.length > 4000) {
        return Response.json(
          { error: "Invalid explanation." },
          { status: 400 }
        );
      }

      const visitor = request.headers.get("CF-Connecting-IP");

      if (!visitor) {
        return Response.json(
          { error: "Visitor identification unavailable." },
          { status: 503 }
        );
      }

      const { success } = await env.TUTOR_LIMITER.limit({
        key: visitor
      });

      if (!success) {
        return Response.json(
          { error: "Tutor request limit reached. Please try again shortly." },
          {
            status: 429,
            headers: { "Retry-After": "60" }
          }
        );
      }

      const result = await env.AI.run(MODEL, {
        messages: [
          {
            role: "system",
            content:
              "You are Singularity Tutor, a patient DSA instructor. " +
              "Teach from first principles. Ask useful questions. " +
              "Answer in 2-4 short sentences using plain text, without Markdown. " +
              "Never execute learner code."
          },
          {
            role: "user",
            content: explanation
          }
        ],
        max_tokens: 1024
      });

      const content = result?.choices?.[0]?.message?.content;
      const reply = typeof content === "string"
        ? content
        : typeof result?.response === "string"
          ? result.response
          : "";

      if (!reply.trim()) {
        return Response.json(
          { error: "AI model returned no text." },
          { status: 502 }
        );
      }

      return Response.json({ reply });
    } catch (error) {
      console.error("Tutor request failed:", error);
      return Response.json(
        { error: "Tutor temporarily unavailable." },
        { status: 500 }
      );
    }
  }
};
