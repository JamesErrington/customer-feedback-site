// @ts-nocheck
import MockDate from "mockdate";

import { FeedbackItem } from "../src/components/FeedbackItem";
import { renderComponent } from "./test-utils";

beforeAll(() => {
  MockDate.set("2022-01-01");
});

afterAll(() => {
  MockDate.reset();
});

it("should render a correctly formatted comment", () => {
  const { container } = renderComponent(FeedbackItem, {
    name: "John Doe",
    timestamp: "2022-01-01",
    rating: 5,
    helpful: 2,
    comment: "Hello World",
  });

  expect(container.querySelector(".author").textContent).toBe("John Doe");
  expect(container.querySelector("#comment-time").textContent).toBe("a few seconds ago");
  expect(container.querySelector("#comment-star-rating").textContent).toBe("5 stars");
  expect(container.querySelector("#comment-helpful-count").textContent).toBe("2 found this helpful");
  expect(container.querySelector(".text").textContent).toBe("Hello World");
});
