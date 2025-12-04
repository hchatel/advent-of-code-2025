import { solveWithLogs } from "../utils/logs.ts";
import { Solver } from "../utils/types.ts";

// --------------
// Problem Inputs
// --------------

type InputLine = string[];

// Switch inputs here manually or using --test option in cmd line
const USE_TEST_INPUT =
  false || Deno.args.some((arg) => ["-t", "--test"].includes(arg));

// Read file
const inputFilename = USE_TEST_INPUT ? "inputTest.txt" : "input.txt";
const inputLines: InputLine[] = Deno.readTextFileSync(
  `${import.meta.dirname}/${inputFilename}`
)
  .split("\n")
  .filter((l) => !!l)
  .map((l) => l.split(""));

// -------------------
// Your functions here
// -------------------

// -------------
// Solve problem
// -------------

const problem1: Solver = () => {
  let total = 0;

  for (let i = 0; i < inputLines.length; i++) {
    for (let j = 0; j < inputLines[0].length; j++) {
      if (inputLines[i][j] === "@") {
        let count = 0;
        for (let di = -1; di <= 1; di++) {
          for (let dj = -1; dj <= 1; dj++) {
            if (!(di === 0 && dj === 0)) {
              if (inputLines[i + di]?.[j + dj] === "@") count++;
            }
          }
        }
        if (count < 4) total++;
      }
    }
  }

  return total;
};

const problem2: Solver = () => {
  let removed = false;
  let total = 0;

  do {
    removed = false;
    for (let i = 0; i < inputLines.length; i++) {
      for (let j = 0; j < inputLines[0].length; j++) {
        if (inputLines[i][j] === "@") {
          let count = 0;
          for (let di = -1; di <= 1; di++) {
            for (let dj = -1; dj <= 1; dj++) {
              if (!(di === 0 && dj === 0)) {
                if (inputLines[i + di]?.[j + dj] === "@") count++;
              }
            }
          }
          if (count < 4) {
            inputLines[i][j] = ".";
            removed = true;
            total++;
          }
        }
      }
    }
  } while (removed);

  return total;
};

// ---------------
// Display answers
// ---------------

solveWithLogs(problem1, 1);
// Tries:
// - 1424 => Yeah !

solveWithLogs(problem2, 2);
// Tries:
// - 8727 => Yeah !
