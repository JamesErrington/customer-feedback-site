import type { FunctionComponent } from "react";
import { Comment, Icon } from "semantic-ui-react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

interface FeedbackItemProps {
  id: number;
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
          <div>{formatTimestamp(timestamp)}</div>
          <div>
            <Icon name="star" />
            {rating} stars
          </div>
          <div>
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

function formatTimestamp(timestamp: string) {
  return dayjs(timestamp).fromNow();
}
