import { useCallback } from "react";
import type { FunctionComponent } from "react";
import { useRouteMatch } from "react-router-dom";
import { Card, Form, Rating, Header } from "semantic-ui-react";

import { useFormState, validateFormState, submitForm, FORM_STATUS } from "../state/form";

export const FeedbackForm: FunctionComponent = () => {
  const { snapshot, state } = useFormState();
  const { isNameValid, isEmailValid, isFormValid } = validateFormState(state);
  const match = useRouteMatch<any>({ path: "/:id" });

  const submit = useCallback(() => {
    if (match?.params.id) {
      submitForm(match.params.id);
    }
  }, [match?.params.id]);

  return (
    <Card className="feedback-form-card">
      <Form loading={snapshot.status === FORM_STATUS.SUBMITTING} error={snapshot.status === FORM_STATUS.ERROR}>
        <Header as="h3" className="form-header">
          Leave a review
        </Header>
        <Form.Input
          label="Name"
          type="text"
          placeholder="Name"
          id="form-name-input"
          className="form-input"
          value={snapshot.name}
          error={!isNameValid}
          onChange={event => (state.name = event.target.value)}
        />
        <Form.Input
          label="Email"
          type="email"
          placeholder="Email"
          id="form-email-input"
          className="form-input"
          value={snapshot.email}
          error={!isEmailValid}
          onChange={event => (state.email = event.target.value)}
        />
        <Form.Field id="form-rating-input" className="form-input">
          <label>Rating</label>
          <Rating
            icon="star"
            maxRating={5}
            rating={snapshot.rating}
            onRate={(_, { rating }) => (state.rating = Number(rating))}
          />
        </Form.Field>
        <Form.TextArea
          label="Comments"
          placeholder="Comments"
          id="form-comment-input"
          className="form-input"
          value={snapshot.comment}
          onChange={event => (state.comment = event.target.value)}
        />
        <Form.Button primary={true} disabled={!isFormValid} className="form-submit" onClick={submit}>
          Submit
        </Form.Button>
      </Form>
    </Card>
  );
};
