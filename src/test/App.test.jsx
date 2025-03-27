// src/tests/App.test.jsx
import { render, screen } from "@testing-library/react";
import App from "../App.jsx";
import "@testing-library/jest-dom";
import { test, expect } from "vitest";

test("renders the main heading", () => {
  render(<App />);
  const heading = screen.getByText("Welcome to Vite React Starter!");
  expect(heading).toBeInTheDocument();
});
