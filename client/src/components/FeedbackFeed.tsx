import { Suspense } from "react";
import type { FunctionComponent } from "react";
import { Card, Comment, Header, Placeholder } from "semantic-ui-react";

import { FeedbackItem } from "./FeedbackItem";
import { ErrorBoundary } from "./ErrorBoundary";
import { useRootState } from "../state/root";

export const FeedbackFeed: FunctionComponent = () => {
  return (
    <Card className="feedback-feed-card">
      <Header as="h3">Other Comments</Header>
      <ErrorBoundary label="Failed to load comments">
        <Suspense fallback={<Fallback />}>
          <FeedbackItems />
        </Suspense>
      </ErrorBoundary>
    </Card>
  );
};

const FeedbackItems: FunctionComponent = () => {
  const { snapshot } = useRootState();

  return (
    <Comment.Group>
      {snapshot.comments?.map(item => (
        <FeedbackItem key={item.id} {...item} />
      ))}
    </Comment.Group>
  );
};

const PlaceholderComment: FunctionComponent = () => {
  return (
    <Placeholder>
      <Placeholder.Header image>
        <Placeholder.Line />
        <Placeholder.Line />
      </Placeholder.Header>
      <Placeholder.Paragraph>
        <Placeholder.Line length="medium" />
        <Placeholder.Line length="short" />
      </Placeholder.Paragraph>
    </Placeholder>
  );
};

const Fallback: FunctionComponent = () => {
  return (
    <div>
      <PlaceholderComment />
      <PlaceholderComment />
      <PlaceholderComment />
    </div>
  );
};
