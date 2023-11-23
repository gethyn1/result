import { describe, test, expect } from "vitest";
import {
  Result,
  isError,
  isOk,
  ok,
  error,
  unwrapError,
  unwrapValue,
} from "../src/result";

describe("Result", () => {
  describe("isError", () => {
    test("returns true for Result with error property set", () => {
      const errorResult: Result<string, string> = {
        ok: null,
        error: "An error",
      };

      expect(isError(errorResult)).toBe(true);
    });

    test("returns false for Result with ok property set", () => {
      const okResult: Result<string, string> = {
        ok: "Not an error",
        error: null,
      };

      expect(isError(okResult)).toBe(false);
    });
  });

  describe("isOk", () => {
    test("returns true for Result with ok property set", () => {
      const okResult: Result<string, string> = {
        ok: "This is OK",
        error: null,
      };

      expect(isOk(okResult)).toBe(true);
    });

    test("returns false for Result with error property set", () => {
      const errorResult: Result<string, string> = {
        ok: null,
        error: "Not OK",
      };

      expect(isOk(errorResult)).toBe(false);
    });
  });

  describe("error", () => {
    test("creates a Result with error property set", () => {
      const result: Result<string, string> = error("An error");
      expect(result).toStrictEqual({
        ok: null,
        error: "An error",
      });
    });
  });

  describe("ok", () => {
    test("creates a Result with ok property set", () => {
      const result: Result<string, string> = ok("This is OK");
      expect(result).toStrictEqual({
        ok: "This is OK",
        error: null,
      });
    });
  });

  describe("unwrapError", () => {
    test("returns the error value", () => {
      const result: Result<string, string> = {
        ok: null,
        error: "An error",
      };

      expect(unwrapError(result)).toBe("An error");
    });
  });

  describe("unwrapValue", () => {
    test("returns the error value", () => {
      const result: Result<string, string> = {
        ok: "This is OK",
        error: null,
      };

      expect(unwrapValue(result)).toBe("This is OK");
    });
  });
});
