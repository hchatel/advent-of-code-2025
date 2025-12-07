import { solveWithLogs } from "../utils/logs.ts";
import { readInput } from "../utils/readInput.ts";
import { Solver } from "../utils/types.ts";

// --------------
// Problem Inputs
// --------------

type InputLine = string;

// Read file
const inputLines: InputLine[] = readInput(import.meta.dirname)
  .split("\n")
  .filter((l) => l !== "");

// -------------------
// Your functions here
// -------------------

// -------------
// Solve problem
// -------------

// pb1: use Set
const countSplits = () => {
  let splits = 0;
  const beams = new Set<number>();
  beams.add(inputLines[0].split("").findIndex((c) => c === "S"));

  for (let i = 1; i < inputLines.length; i++) {
    for (const [index, char] of inputLines[i].split("").entries()) {
      if (char === "^" && beams.has(index)) {
        splits++;
        beams.delete(index);
        beams.add(index - 1);
        beams.add(index + 1);
      }
    }
  }

  return splits;
};

// pb2: use map
const countSplitsAndPaths = () => {
  let splits = 0;
  let beams: Record<number, number> = {};
  beams[inputLines[0].split("").findIndex((c) => c === "S")] = 1;

  for (let i = 1; i < inputLines.length; i++) {
    const newBeams: Record<number, number> = { ...beams };
    for (const [index, char] of inputLines[i].split("").entries()) {
      if (char === "^" && beams[index]) {
        splits++;
        newBeams[index - 1] = (newBeams[index - 1] ?? 0) + beams[index];
        newBeams[index + 1] = (newBeams[index + 1] ?? 0) + beams[index];
        delete newBeams[index];
      }
    }
    beams = newBeams;
  }

  return {
    splits,
    paths: Object.values(beams).reduce((acc, v) => acc + v, 0),
  };
};

const problem1: Solver = () => countSplitsAndPaths().splits;

const problem2: Solver = () => countSplitsAndPaths().paths;

// ---------------
// Display answers
// ---------------

solveWithLogs(problem1, 1);
// Tries:
// - 1711 => Yeah !

solveWithLogs(problem2, 2);
// Tries:
// - 36706966158365 => Yeah !
