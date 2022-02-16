import { Suspense } from "react";
import type { FunctionComponent } from "react";
import { Card, Item, Rating, Statistic, Placeholder } from "semantic-ui-react";

import { ErrorBoundary } from "./ErrorBoundary";

import { useRootState } from "../state/root";

export const ProductCard: FunctionComponent = () => {
  return (
    <Card className="product-item-card">
      <ErrorBoundary label="An error occurred">
        <Suspense fallback={<Fallback />}>
          <ProductCardContent />
        </Suspense>
      </ErrorBoundary>
    </Card>
  );
};

const ProductCardContent: FunctionComponent = () => {
  const { snapshot } = useRootState();

  return (
    <Item>
      <Item.Content>
        <Item.Header as="h3">{snapshot.product?.name}</Item.Header>
        <Item.Description>{snapshot.product?.description}</Item.Description>
        <Item.Extra>
          <Statistic size="mini">
            <Statistic.Value>{snapshot.product?.price}</Statistic.Value>
          </Statistic>
        </Item.Extra>
        <Rating maxRating={5} rating={snapshot.product?.rating} disabled={true} />
      </Item.Content>
    </Item>
  );
};

const Fallback: FunctionComponent = () => {
  return (
    <Placeholder>
      <Placeholder.Header>
        <Placeholder.Line />
      </Placeholder.Header>
      <Placeholder.Paragraph>
        <Placeholder.Line length="medium" />
        <Placeholder.Line length="medium" />
        <Placeholder.Line length="medium" />
      </Placeholder.Paragraph>
    </Placeholder>
  );
};
