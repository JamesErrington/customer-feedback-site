// @ts-nocheck
import { FeedbackFeed } from "../src/components/FeedbackFeed";
import { renderComponent } from "./test-utils";
import * as root from "../src/state/root";

it("should handle when there are no comments", () => {
  root.rootState.comments = [];
  const { container } = renderComponent(FeedbackFeed);

  expect(container.querySelectorAll(".comments > .comment").length).toBe(0);
});

it("should render a list of the comments", () => {
  root.rootState.comments = [
    { id: 0, product_id: 0, timestamp: "", name: "John Doe", rating: 1, comment: "Test", helpful: 1 },
    { id: 1, product_id: 0, timestamp: "", name: "Jane Doe", rating: 2, comment: "Test 2", helpful: 3 },
  ];
  const { container } = renderComponent(FeedbackFeed);

  expect(container.querySelectorAll(".comments > .comment").length).toBe(2);
});
