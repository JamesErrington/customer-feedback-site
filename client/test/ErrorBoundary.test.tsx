// @ts-nocheck
import { render } from "@testing-library/react";

import { ErrorBoundary } from "../src/components/ErrorBoundary";

beforeAll(() => {
  console.error = jest.fn();
});

const ChildComponent = () => <div>Hello World</div>;

it("should render the children when there is no error", () => {
  const { container } = render(
    <ErrorBoundary label="Error">
      <ChildComponent />
    </ErrorBoundary>,
  );

  expect(container.textContent).toBe("Hello World");
});

const ErrorComponent = () => {
  throw new Error();
};

it("should render the error component when there is an error", () => {
  const { container } = render(
    <ErrorBoundary label="Error">
      <ErrorComponent />
    </ErrorBoundary>,
  );

  expect(container.querySelector(".header").textContent).toBe("Error");
});
