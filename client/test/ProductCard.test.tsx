// @ts-nocheck
import { ProductCard } from "../src/components/ProductCard";
import { renderComponent } from "./test-utils";
import * as root from "../src/state/root";

it("should render a correctly formatted product", () => {
  root.rootState.product = { id: 0, name: "Test", description: "A Test Product", price: "$10", rating: 5 };
  const { container } = renderComponent(ProductCard);

  expect(container.querySelector(".header").textContent).toBe("Test");
  expect(container.querySelector(".description").textContent).toBe("A Test Product");
  expect(container.querySelector(".extra").textContent).toBe("$10");
  expect(container.querySelector(".rating").classList).toContain("disabled");
  expect(container.querySelectorAll(".rating > i").length).toBe(5);
});
