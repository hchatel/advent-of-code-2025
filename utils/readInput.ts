export const readInput = (path: string | undefined): string => {
  const inputFilename = Deno.args.some((arg) => ["-t", "--test"].includes(arg))
    ? "inputTest.txt"
    : "input.txt";

  return Deno.readTextFileSync(`${path}/${inputFilename}`);
};
