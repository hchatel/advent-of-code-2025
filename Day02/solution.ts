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
).split(",");

// -------------------
// Your functions here
// -------------------

// -------------
// Solve problem
// -------------

const problem1: Solver = () => {
  let count = 0;
  for (const code of inputLines) {
    const [start, stop] = code.split("-").map((s) => +s);
    for (let i = start; i <= stop; i++) {
      const numStr = String(i);
      const a = numStr.substring(0, numStr.length / 2);
      const b = numStr.substring(numStr.length / 2);
      if (a === b) count += i;
    }
  }

  return count;
};

const problem2: Solver = () => {
  let invalids = new Set<number>();
  for (const code of inputLines) {
    const [start, stop] = code.split("-").map((s) => +s);
    for (let i = start; i <= stop; i++) {
      const numStr = String(i);
      for (let w = 1; w <= numStr.length / 2; w++) {
        const invalid = numStr.substring(0, w).repeat(numStr.length / w);

        if (numStr === invalid) {
          invalids.add(i);
        }
      }
    }
  }

  return [...invalids].reduce<number>((acc, n) => acc + n, 0);
};

// ---------------
// Display answers
// ---------------

solveWithLogs(problem1, 1);
// Tries:
// - 31210613313 => Yeah !

solveWithLogs(problem2, 2);
// Tries:
// - 23057661805 => Too low..
// => Silly mistake, replaced `invalids.add(start);` by `invalids.add(i);`
// - 41823587546 => Yeah !
