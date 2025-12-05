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
const [rangesBloc, ingredientsBloc]: InputLine[] = Deno.readTextFileSync(
  `${import.meta.dirname}/${inputFilename}`
).split("\n\n");
const ranges: number[][] = rangesBloc
  .split("\n")
  .map((range) => range.split("-").map((v) => +v));
const ingredients: number[] = ingredientsBloc
  .split("\n")
  .filter((l) => l !== "")
  .map((v) => +v);

// -------------------
// Your functions here
// -------------------

const countWithSet = () => {
  const idSet = new Set<number>();

  for (const [a, b] of ranges) {
    for (let i = a; i <= b; i++) {
      idSet.add(i);
    }
  }

  let count = 0;

  for (const ingredient of ingredients) {
    if (idSet.has(ingredient)) count++;
  }

  return count;
};
// Works with example, "Set maximum size exceeded" on input

const simpleCheck = () => {
  let count = 0;

  for (const ingredient of ingredients) {
    for (const [a, b] of ranges) {
      if (ingredient >= a && ingredient <= b) {
        count++;
        break;
      }
    }
  }

  return count;
};

const countFresh = () => {
  // Fuse ranges
  let rangeIndex = 0;
  while (rangeIndex < ranges.length - 1) {
    let fused = false;
    const range = ranges[rangeIndex];
    // For each range, check if any overlap
    for (let j = rangeIndex + 1; j < ranges.length; j++) {
      const r = ranges[j];
      if (r[1] >= range[0] && r[0] <= range[1]) {
        // Overlap, fuse r into range
        ranges[rangeIndex] = [
          Math.min(range[0], r[0]),
          Math.max(range[1], r[1]),
        ];
        // Remove fused range
        ranges.splice(j, 1);

        fused = true;
        break;
      }
    }
    if (!fused) {
      // No overlap, check next range
      rangeIndex++;
    }
  }

  // Count
  let count = 0;
  for (const [a, b] of ranges) {
    count += b - a + 1;
  }

  return count;
};

// -------------
// Solve problem
// -------------

const problem1: Solver = () => {
  return simpleCheck();
};

const problem2: Solver = () => {
  return countFresh();
};

// ---------------
// Display answers
// ---------------

// solveWithLogs(problem1, 1);
// Tries:
// - 720 => Yeah !

solveWithLogs(problem2, 2);
// Tries:
// - 357608232770687 => Yeah !
