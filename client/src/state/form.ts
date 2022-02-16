import { proxy, useSnapshot } from "valtio";

import { rootState } from "./root";

export enum FORM_STATUS {
  ERROR = "ERROR",
  SUBMITTING = "SUBMITTING",
  NORMAL = "NORMAL",
}

interface FormState {
  name: string;
  email: string;
  rating: number;
  comment: string;
  status: FORM_STATUS;
}

const initialFormState: FormState = {
  name: "",
  email: "",
  rating: 1,
  comment: "",
  status: FORM_STATUS.NORMAL,
};

const formState = proxy(initialFormState);

export function useFormState() {
  return {
    snapshot: useSnapshot(formState),
    state: formState,
  };
}

const EMAIL_REGEX = /^\S+@\S+\.\S+$/;
export function validateFormState(state: FormState) {
  const isNameValid = state.name.length > 0;
  const isEmailValid = EMAIL_REGEX.test(state.email);
  const isRatingValid = state.rating !== 0;
  const isFormValid = isNameValid && isEmailValid && isRatingValid;

  return { isNameValid, isEmailValid, isRatingValid, isFormValid };
}

export async function submitForm(id: number) {
  formState.status = FORM_STATUS.SUBMITTING;

  const { status, ...body } = formState;
  try {
    const response = await fetch("api/comment", {
      method: "POST",
      body: JSON.stringify({ ...body, id }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      const data = await response.json();
      rootState.comments = data;
      resetForm();
    } else {
      throw new Error(response.statusText);
    }
  } catch (ex) {
    console.error(ex);
    formState.status = FORM_STATUS.ERROR;
  }
}

function resetForm() {
  formState.name = "";
  formState.email = "";
  formState.rating = 0;
  formState.comment = "";
  formState.status = FORM_STATUS.NORMAL;
}
