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
)
  .split("\n")
  .filter((l) => !!l);

// -------------------
// Your functions here
// -------------------

const getJoltage = (line: string, length = 2): number => {
  const bank = line.split("").map((v) => +v);
  const maxFuses = bank.slice(bank.length - length) as number[];

  for (let fuse of bank.slice(0, -length).reverse()) {
    let tmp: number;
    let index = 0;
    while (fuse >= maxFuses[index]) {
      tmp = maxFuses[index];
      maxFuses[index] = fuse;
      fuse = tmp;
      index++;
    }
  }

  return +maxFuses.join("");
};

const getJoltage2 = (line: string): number => {
  const bank = line.split("").map((v) => +v);
  const max = Math.max(...bank.slice(0, -1));
  const maxIndex = bank.findIndex((v) => v === max);
  const secondMax = Math.max(...bank.slice(maxIndex + 1));

  return 10 * max + secondMax;
};

// -------------
// Solve problem
// -------------

const problem1: Solver = () =>
  inputLines.reduce((acc, line) => acc + getJoltage2(line), 0);

const problem2: Solver = () =>
  inputLines.reduce((acc, line) => acc + getJoltage(line, 12), 0);

// ---------------
// Display answers
// ---------------

solveWithLogs(problem1, 1);
// Tries:
// - 17578 => Too low. Try new algorithm getJoltage2
// - 17613 => Yeah !

solveWithLogs(problem2, 2);
// Tries:
// - 175304218462560 => Yeah !
