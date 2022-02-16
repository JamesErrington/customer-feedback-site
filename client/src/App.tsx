import { FunctionComponent, Suspense, useEffect } from "react";
import { useRouteMatch } from "react-router-dom";
import { Card } from "semantic-ui-react";

import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { ProductCard } from "./components/ProductCard";
import { FeedbackForm } from "./components/FeedbackForm";
import { ChartCard } from "./components/ChartCard";
import { FeedbackFeed } from "./components/FeedbackFeed";
import { useRootState } from "./state/root";

export const App: FunctionComponent = () => {
  const match = useRouteMatch<any>({ path: "/:id" });
  const { state } = useRootState();

  useEffect(() => {
    if (match?.params.id) {
      state.current.product = fetch(`api/product?id=${match.params.id}`).then(response => response.json()) as any;
      state.current.comments = fetch(`api/comments?id=${match.params.id}`).then(response => response.json()) as any;
      state.current.chart = fetch(`api/chart?id=${match.params.id}`).then(response => response.json()) as any;
    }
  }, [match?.params.id, state]);

  return (
    <div className="app">
      <div className="main">
        <Header />
        <main>
          <ProductCard />
          <div className="feedback-container">
            <Card.Group className="feedback-form-chart">
              <FeedbackForm />
              <ChartCard />
            </Card.Group>
            <Card.Group className="feedback-feed-container">
              <FeedbackFeed />
            </Card.Group>
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
};
