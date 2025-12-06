import { solveWithLogs } from "../utils/logs.ts";
import { readInput } from "../utils/readInput.ts";
import { Solver } from "../utils/types.ts";

// --------------
// Problem Inputs
// --------------

type InputLine = string;

// Read file
const inputLines: InputLine[][] = readInput(import.meta.dirname)
  .split("\n")
  .filter((l) => l !== "")
  .map((l) => l.split(/ +/).filter((l) => l !== ""));
const inputLines2: InputLine[][] = readInput(import.meta.dirname)
  .split("\n")
  .filter((l) => l !== "")
  .map((l) => l.split(""));

// -------------------
// Your functions here
// -------------------

// -------------
// Solve problem
// -------------

const problem1: Solver = () => {
  const results = inputLines.at(0)!.map(Number);
  const operators = inputLines.at(-1)!;

  for (let i = 1; i < inputLines.length - 1; i++) {
    for (let j = 0; j < results.length; j++) {
      results[j] =
        operators[j] === "+"
          ? results[j] + +inputLines[i][j]
          : results[j] * +inputLines[i][j];
    }
  }

  return results?.reduce((acc, v) => acc + v, 0);
};

const problem2: Solver = () => {
  let total = 0;

  // Read right-to-left
  let numbers: number[] = [];
  for (let j = inputLines2[0].length - 1; j >= 0; j--) {
    let input = "";
    for (let i = 0; i < inputLines2.length - 1; i++) {
      input += inputLines2[i][j];
    }
    const op = inputLines2.at(-1)![j];
    numbers.push(Number(input));

    if (op !== " ") {
      total += numbers.reduce(
        (acc, num) => (op === "+" ? acc + num : acc * num),
        op === "+" ? 0 : 1
      );
      // Reset and jump to next calculus
      numbers = [];
      j--;
    }
  }

  return total;
};

// ---------------
// Display answers
// ---------------

solveWithLogs(problem1, 1);
// Tries:
// - 5524274308182 => Yeah!

solveWithLogs(problem2, 2);
// Tries:
// - 8843673199391 => Yeah!
