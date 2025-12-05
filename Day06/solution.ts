import { solveWithLogs } from "../utils/logs.ts";
import { readFile } from "../utils/readFile.ts";
import { Solver } from "../utils/types.ts";

// --------------
// Problem Inputs
// --------------

type InputLine = string;

// Read file
const inputLines: InputLine[] = readFile().split("\n");

// -------------------
// Your functions here
// -------------------

// -------------
// Solve problem
// -------------

const problem1: Solver = () => {
  let result = 0;
  console.log("Input lines: ", inputLines);

  return result;
};

// const problem2: Solver = () => {
//   let result = 0;
//   console.log("Input lines: ", inputLines);

//   return result;
// };

// ---------------
// Display answers
// ---------------

solveWithLogs(problem1, 1);
// Tries:
// -

// solveWithLogs(problem2, 2);
// Tries:
// -
