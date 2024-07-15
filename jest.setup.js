// Optional: Add any global setup code for your tests here
import "@testing-library/jest-dom";

// Example: Mocking window.fetch for API calls in tests
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({ message: "Mocked Response" }),
  })
);

jest.mock("next/font/google", () => ({
  Inter: () => ({
    className: "inter-font-class", // Return a dummy class name
  }),
}));
