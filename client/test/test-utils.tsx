// @ts-nocheck
import { Router } from "react-router-dom";
import { render } from "@testing-library/react";
import { createMemoryHistory } from "history";

export function renderComponent(Component: any, props: Record<string, any> = {}) {
  const history = createMemoryHistory();
  history.replace("/1");

  return render(
    <Router history={history}>
      <Component {...props} />
    </Router>,
  );
}

export * from "@testing-library/react";
import userEventImport from "@testing-library/user-event";
export const userEvent = userEventImport;
