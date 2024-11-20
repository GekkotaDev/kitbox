import "@testing-library/jest-dom/vitest";

import * as matchers from "@testing-library/jest-dom/matchers";
import { expect } from "vitest";
import { populateGlobal } from "vitest/environments";

expect.extend(matchers);

populateGlobal(globalThis, {
  /**
   *
   * @param {TemplateStringsArray} html HTML template
   * @returns {string} String
   */
  html: (html) => html.at(0) ?? "",
});
