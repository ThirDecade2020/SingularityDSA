"use strict";

const steps = [
  ["Requirements & Constraints", "Understand exactly what the program must accomplish. Identify the required input, output, and restrictions."],
  ["Data Structures & Algorithms", "Identify the information to store and the operations required. Choose the simplest correct approach."],
  ["Tests & Edge Cases", "Define the expected result before writing the implementation. Consider at least one variation."],
  ["Pseudocode", "Explain the solution in plain language before translating it into Python."],
  ["Implement Python Code", "Write the smallest correct program. Understand each statement rather than memorizing it."],
  ["Execute Tests", "Run your implementation and compare its output with the expected result."],
  ["Break & Debug", "Change one detail, observe what happens, and explain the result. Restore the correct solution afterward."],
  ["Time & Space Complexity", "Explain how execution time and memory requirements change as the problem grows."],
  ["Syntax Line by Line", "Explain every identifier, operator, expression, and statement in your solution."],
  ["Reinforce Through Repetition", "Reproduce the correct solution three times without copying it."]
];

const challenges = [
  {
    title: "Print a Value",
    description: "Display Hello using Python's print function.",
    starter: 'print("Hello")',
    expected: "Hello",
    concept: "Output",
    pseudocode: "Display the text Hello.",
    complexity: "O(1) time and O(1) auxiliary space for this fixed output."
  },
  {
    title: "Store an Integer",
    description: "Assign the integer 1 to a variable named number. This challenge checks stored state, not printed output.",
    starter: "number = 1",
    expected: "(no output)",
    concept: "Variables",
    pseudocode: "Create a variable named number and assign it the value 1.",
    complexity: "O(1) time and O(1) space."
  },
  {
    title: "Print a Variable",
    description: "Store 1 in number, then print its value.",
    starter: "number = 1\nprint(number)",
    expected: "1",
    concept: "State and output",
    pseudocode: "Store 1 in number. Display number.",
    complexity: "O(1) time and O(1) space."
  },
  {
    title: "Add Two Numbers",
    description: "Store 2 in a and 3 in b. Print their sum.",
    starter: "a = 2\nb = 3\nprint(a + b)",
    expected: "5",
    concept: "Arithmetic",
    pseudocode: "Store two integers. Add them. Display the sum.",
    complexity: "O(1) time and O(1) space."
  },
  {
    title: "Make a Decision",
    description: 'Store 5 in number. Print Greater when number is greater than 3.',
    starter: 'number = 5\nif number > 3:\n    print("Greater")',
    expected: "Greater",
    concept: "Conditionals",
    pseudocode: "Store 5. If it is greater than 3, display Greater.",
    complexity: "O(1) time and O(1) space."
  }
];

const $ = (id) => document.getElementById(id);
let currentChallenge = 0;
let currentStep = 0;
let remaining = 900;
let running = false;
let interval = null;
let deadline = 0;
const completed = new Set();
const drafts = challenges.map(c => c.starter);
const responses = challenges.map(() => Array(steps.length).fill(""));
const responseChecks = challenges.map(() => Array(steps.length).fill(false));

function saveResponse() {
  responses[currentChallenge][currentStep] = $("step-response").value;
}

function restoreResponse() {
  $("step-response").value = responses[currentChallenge][currentStep];
  $("response-feedback").textContent =
    responseChecks[currentChallenge][currentStep]
      ? "Explanation submitted. Technical correctness not yet assessed."
      : "Write your explanation before continuing.";
}

function renderChallenges() {
  $("challenge-list").replaceChildren();
  challenges.forEach((challenge, index) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = index === currentChallenge ? "active" : "";
    button.setAttribute("aria-current", index === currentChallenge ? "step" : "false");
    button.textContent = `${completed.has(index) ? "✓" : String(index + 1).padStart(2, "0")}  ${challenge.title}`;
    button.addEventListener("click", () => selectChallenge(index));
    $("challenge-list").append(button);
  });
}

function renderStep() {
  const challenge = challenges[currentChallenge];
  const [title, description] = steps[currentStep];
  const details = [
    `Goal: ${challenge.description}\nExpected result: ${challenge.expected}`,
    `Core concept: ${challenge.concept}\nUse only the operations necessary for this challenge.`,
    `Expected result: ${challenge.expected}\nTry a different value or expression and predict what should happen.`,
    challenge.pseudocode,
    "Write or modify the Python code in the editor. Explain what each line does.",
    "Select Run Code. Compare the feedback with the expected result.",
    "Introduce a small error or change. Run again, explain the feedback, then restore the solution.",
    challenge.complexity,
    `Explain the syntax of this example:\n${challenge.starter}`,
    "Close or clear your solution and reproduce it three times from memory. Run each attempt."
  ];
  $("step-counter").textContent = `${String(currentStep + 1).padStart(2, "0")} / 10`;
  $("step-status").textContent = `STEP ${String(currentStep + 1).padStart(2, "0")}`;
  $("step-title").textContent = title;
  $("step-content").textContent = `${description}\n\n${details[currentStep]}`;
  $("previous-step").disabled = currentStep === 0;
  $("next-step").disabled = currentStep === steps.length - 1;
  restoreResponse();
}

function selectChallenge(index) {
  saveResponse();
  drafts[currentChallenge] = $("code-editor").value;
  currentChallenge = index;
  currentStep = 0;
  $("challenge-title").textContent = challenges[index].title;
  $("challenge-description").textContent = challenges[index].description;
  $("code-editor").value = drafts[index];
  $("code-output").textContent = "Ready to begin.";
  resetTimer();
  renderChallenges();
  renderStep();
}

function updateTimer() {
  const minutes = Math.floor(remaining / 60);
  const seconds = remaining % 60;
  $("timer-display").textContent = `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
  $("timer-display").style.color = remaining <= 60 ? "#ff8e9a" : "";
}

function pauseTimer() {
  if (running) {
    remaining = Math.max(0, Math.ceil((deadline - Date.now()) / 1000));
  }
  running = false;
  clearInterval(interval);
  interval = null;
  updateTimer();
}

function resetTimer() {
  pauseTimer();
  remaining = 900;
  updateTimer();
}

function tick() {
  remaining = Math.max(0, Math.ceil((deadline - Date.now()) / 1000));
  updateTimer();
  if (remaining === 0) {
    pauseTimer();
    $("code-output").textContent = "Time expired. You can continue learning and running code.";
  }
}

function startTimer() {
  if (running || $("untimed-mode").checked || remaining === 0) return;
  running = true;
  deadline = Date.now() + remaining * 1000;
  interval = setInterval(tick, 250);
  tick();
}

/*
 * Restricted learning evaluator:
 * - Supports integer assignments, print(), addition, and one if comparison.
 * - Does not execute Python or JavaScript supplied by the learner.
 * - Does not claim to implement general Python semantics.
 */
function evaluate(source) {
  const lines = source.replace(/\r\n?/g, "\n").split("\n");
  const vars = Object.create(null);
  const output = [];
  let conditional = null;
  let statements = 0;

  function value(expression) {
    const expr = expression.trim();
    if (/^-?\d+$/.test(expr)) return Number(expr);
    if (/^[a-zA-Z_]\w*$/.test(expr) && Object.hasOwn(vars, expr)) return vars[expr];
    const sum = expr.match(/^([a-zA-Z_]\w*|-?\d+)\s*\+\s*([a-zA-Z_]\w*|-?\d+)$/);
    if (sum) {
      const a = value(sum[1]);
      const b = value(sum[2]);
      if (typeof a === "number" && typeof b === "number") return a + b;
    }
    const text = expr.match(/^(["'])([^"'\\]*)\1$/);
    if (text) return text[2];
    throw new Error(`Unsupported expression: ${expr.slice(0, 60)}`);
  }

  function execute(statement) {
    statements++;
    if (statements > 30) throw new Error("Limit: 30 statements.");
    const assignment = statement.match(/^([a-zA-Z_]\w*)\s*=\s*(.+)$/);
    if (assignment) {
      vars[assignment[1]] = value(assignment[2]);
      return;
    }
    const print = statement.match(/^print\((.*)\)$/);
    if (print) {
      output.push(String(value(print[1])));
      return;
    }
    throw new Error(`Unsupported statement: ${statement.slice(0, 60)}`);
  }

  if (source.length > 2000) throw new Error("Limit: 2,000 characters.");

  for (const raw of lines) {
    if (!raw.trim()) continue;
    const trimmed = raw.trim();

    if (conditional !== null) {
      if (/^[ \t]+/.test(raw)) {
        if (conditional) execute(trimmed);
        continue;
      }
      conditional = null;
    }

    if (/^[ \t]/.test(raw)) throw new Error("Unexpected indentation.");
    const condition = trimmed.match(/^if\s+([a-zA-Z_]\w*|-?\d+)\s*>\s*([a-zA-Z_]\w*|-?\d+):$/);
    if (condition) {
      conditional = value(condition[1]) > value(condition[2]);
      continue;
    }
    execute(trimmed);
  }

  return { output: output.join("\n"), vars };
}

function runCode() {
  const challenge = challenges[currentChallenge];
  const source = $("code-editor").value;
  drafts[currentChallenge] = source;

  try {
    const result = evaluate(source);
    const actual = result.output || "(no output)";
    const correct = currentChallenge === 1
      ? result.output === "" && result.vars.number === 1
      : actual === challenge.expected;

    if (correct) {
      completed.add(currentChallenge);
      pauseTimer();
    }

    $("code-output").textContent =
      `Output:\n${actual}\n\n${correct ? "✓ Challenge passed!" : `Not yet. Expected: ${challenge.expected}`}` +
      (currentChallenge === 1 ? `\nStored number: ${String(result.vars.number ?? "(undefined)")}` : "");
    renderChallenges();
  } catch (error) {
    $("code-output").textContent = `Learning evaluator: ${error.message}\n\nOnly the supported atomic Python subset is available in MVP 001.`;
  }
}

$("previous-step").addEventListener("click", () => {
  if (currentStep > 0) {
    saveResponse();
    currentStep--;
    renderStep();
  }
});
$("next-step").addEventListener("click", () => {
  if (currentStep < steps.length - 1) {
    saveResponse();
    currentStep++;
    renderStep();
  }
});
$("check-response").addEventListener("click", async () => {
  saveResponse();

  const explanation = $("step-response").value.trim();

  if (!explanation) {
    $("response-feedback").textContent =
      "Write your explanation or question before asking the AI Tutor.";
    return;
  }

  const tutorContext = {
    challenge: challenges[currentChallenge],
    step: steps[currentStep],
    explanation,
    code: $("code-editor").value
  };

  // AI integration will use this context through a secure backend.
  // Never place model API credentials in browser JavaScript.
  appendTutorMessage("user", explanation);
  $("response-feedback").textContent = "Contacting Singularity Tutor...";

  try {
    const response = await fetch("/api/tutor", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(tutorContext)
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "Tutor request failed.");
    }

    appendTutorMessage("assistant", data.reply);
    $("tutor-status").textContent = "CONNECTED";
    $("response-feedback").textContent = "Tutor response received.";
  } catch (error) {
    $("tutor-status").textContent = "NOT CONNECTED";
    $("response-feedback").textContent = error.message;
  }
});

$("show-hint").addEventListener("click", () => {
  const challenge = challenges[currentChallenge];
  const hints = [
    `Identify the required result: ${challenge.expected}. What constraints apply?`,
    `Consider the core concept: ${challenge.concept}.`,
    "Start with the simplest case, then consider what could change.",
    "Describe the operations in plain language, one at a time.",
    "Translate one pseudocode instruction into Python at a time.",
    "Compare the actual result with the expected result.",
    "Change one detail and predict what will happen.",
    "Count operations and stored values for this fixed-size problem.",
    "Explain what each identifier and operator means.",
    "Hide the reference code and rebuild it from memory."
  ];
  $("response-feedback").textContent =
    `Hint: ${hints[currentStep]}`;
});

$("run-code").addEventListener("click", runCode);
$("reset-code").addEventListener("click", () => {
  $("code-editor").value = challenges[currentChallenge].starter;
  drafts[currentChallenge] = $("code-editor").value;
  $("code-output").textContent = "Code restored to the example.";
});
$("timer-start").addEventListener("click", startTimer);
$("timer-pause").addEventListener("click", pauseTimer);
$("timer-reset").addEventListener("click", resetTimer);
$("untimed-mode").addEventListener("change", (event) => {
  if (event.target.checked) pauseTimer();
  $("timer-display").textContent = event.target.checked ? "UNTIMED" : "";
  if (!event.target.checked) updateTimer();
});
$("code-editor").addEventListener("keydown", (event) => {
  if (event.key !== "Tab") return;
  event.preventDefault();
  const editor = event.target;
  const start = editor.selectionStart;
  editor.setRangeText("    ", start, editor.selectionEnd, "end");
});


function appendTutorMessage(role, message) {
  const container = $("tutor-messages");
  const empty = container.querySelector(".tutor-empty");

  if (empty) empty.remove();

  const entry = document.createElement("p");
  entry.className = role === "user"
    ? "tutor-message tutor-user"
    : "tutor-message tutor-assistant";

  entry.textContent = message;
  container.appendChild(entry);
  container.scrollTop = container.scrollHeight;
}

selectChallenge(0);
