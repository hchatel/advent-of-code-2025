export const readFile = (): string => {
  const inputFilename = Deno.args.some((arg) => ["-t", "--test"].includes(arg))
    ? "inputTest.txt"
    : "input.txt";

  return Deno.readTextFileSync(`${import.meta.dirname}/${inputFilename}`);
};
