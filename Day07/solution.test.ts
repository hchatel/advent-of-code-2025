import { assertEquals } from "jsr:@std/assert";
import { problem1 } from "./solution.ts";

Deno.test("Dummy test", async () => {
  const solution = await problem1();
  assertEquals(solution, 0);
});
