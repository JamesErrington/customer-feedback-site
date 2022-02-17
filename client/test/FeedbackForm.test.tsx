// @ts-nocheck
import { FeedbackForm } from "../src/components/FeedbackForm";
import { renderComponent, userEvent } from "./test-utils";
import * as form from "../src/state/form";

it("disables the submit button nothing is entered", () => {
  const { container } = renderComponent(FeedbackForm);

  expect(container.querySelector("#form-name-input").value).toBe("");
  expect(container.querySelector("#form-email-input").value).toBe("");
  expect(container.querySelector("#submit-button").classList).toContain("disabled");
});

it("allows any text as a valid name", () => {
  const { container } = renderComponent(FeedbackForm);

  const input = container.querySelector("#form-name-input");
  const wrapper = input.parentElement.parentElement;
  expect(input.value).toBe("");
  expect(wrapper.classList).toContain("error");

  userEvent.type(input, "Test");

  expect(input.value).toBe("Test");
  expect(wrapper.classList).not.toContain("error");
});

it("validates the email address", () => {
  const { container } = renderComponent(FeedbackForm);

  const input = container.querySelector("#form-email-input");
  const wrapper = input.parentElement.parentElement;
  expect(input.value).toBe("");
  expect(wrapper.classList).toContain("error");

  userEvent.type(input, "john.doe@test");

  expect(input.value).toBe("john.doe@test");
  expect(wrapper.classList).toContain("error");

  userEvent.clear(input);
  userEvent.type(input, "john.doe@test.com");

  expect(input.value).toBe("john.doe@test.com");
  expect(wrapper.classList).not.toContain("error");
});

it("submits the form when the form is valid and button is pressed", () => {
  const mock = jest.spyOn(form, "submitForm").mockImplementation(() => null);
  const { container } = renderComponent(FeedbackForm);

  const nameInput = container.querySelector("#form-name-input");
  userEvent.type(nameInput, "Test");
  const emailInput = container.querySelector("#form-email-input");
  userEvent.type(emailInput, "john.doe@test.com");

  const button = container.querySelector("#submit-button");
  userEvent.click(button);

  expect(mock).toBeCalledWith("1");
  mock.mockRestore();
});
