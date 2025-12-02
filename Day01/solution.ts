import { solveWithLogs } from "../utils/logs.ts";
import { Solver } from "../utils/types.ts";

// --------------
// Problem Inputs
// --------------

type InputLine = string;

// Switch inputs here manually or using --test option in cmd line
const USE_TEST_INPUT =
  false || Deno.args.some((arg) => ["-t", "--test"].includes(arg));

// Read file
const inputFilename = USE_TEST_INPUT ? "inputTest.txt" : "input.txt";
const inputLines: InputLine[] = Deno.readTextFileSync(
  `${import.meta.dirname}/${inputFilename}`
).split("\n");

// -------------------
// Your functions here
// -------------------

// -------------
// Solve problem
// -------------

const problem1: Solver = () => {
  let count = 0;
  let dial = 50;

  for (const input of inputLines) {
    const direction = input[0];
    const steps = Number(input.substring(1));

    dial = (100 + dial + steps * (direction === "L" ? -1 : 1)) % 100;
    if (dial === 0) count++;
  }

  return count;
};

const problem2: Solver = () => {
  let count = 0;
  let dial = 50;

  for (const input of inputLines) {
    const direction = input[0];
    const steps = Number(input.substring(1));

    for (let s = 0; s < steps; s++) {
      dial = (100 + dial + (direction === "L" ? -1 : 1)) % 100;
      if (dial === 0) count++;
    }
  }

  return count;
};

// ---------------
// Display answers
// ---------------

solveWithLogs(problem1, 1);
// Tries:
// 1076 => Yeah !

solveWithLogs(problem2, 2);
// Tries:
// 6340 => Too low :(
// 6379 => Yeah (removed `if (dial === 0 && s !== 0) count++;` by `if (dial === 0) count++;`, no reason to remove first displacement)
