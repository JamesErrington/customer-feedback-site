import type { FunctionComponent } from "react";
import { Comment, Icon } from "semantic-ui-react";

import { formatTimestamp } from "../utils";

interface FeedbackItemProps {
  name: string;
  timestamp: string;
  rating: number;
  comment: string;
  helpful: number;
}

export const FeedbackItem: FunctionComponent<FeedbackItemProps> = ({ name, timestamp, rating, helpful, comment }) => {
  return (
    <Comment>
      <Comment.Avatar src="/static/blank.png" />
      <Comment.Content>
        <Comment.Author as="span">{name}</Comment.Author>
        <Comment.Metadata>
          <div id="comment-time">{formatTimestamp(timestamp)}</div>
          <div id="comment-star-rating">
            <Icon name="star" />
            {rating} stars
          </div>
          <div id="comment-helpful-count">
            <Icon name="thumbs up" />
            {helpful} found this helpful
          </div>
        </Comment.Metadata>
        <Comment.Text>{comment}</Comment.Text>
        <Comment.Actions>
          <Comment.Action onClick={() => console.log("Clicked")}>Helpful?</Comment.Action>
        </Comment.Actions>
      </Comment.Content>
    </Comment>
  );
};
