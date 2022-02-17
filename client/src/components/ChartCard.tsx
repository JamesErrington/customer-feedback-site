import { Suspense, useRef, useEffect } from "react";
import type { FunctionComponent } from "react";
import { Card, Loader } from "semantic-ui-react";

import { ErrorBoundary } from "./ErrorBoundary";
import { useRootState } from "../state/root";
import { drawChart } from "../utils";

export const ChartCard: FunctionComponent = () => {
  return (
    <Card className="chart-card">
      <ErrorBoundary label="Error loading chart">
        <Suspense fallback={<Fallback />}>
          <ChartComponent />
        </Suspense>
      </ErrorBoundary>
    </Card>
  );
};

const ChartComponent: FunctionComponent = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const chartRef = useRef<any>(undefined);
  const { snapshot } = useRootState();

  useEffect(() => {
    chartRef.current = drawChart(canvasRef.current, snapshot?.chart);
  }, [snapshot?.chart]);

  return (
    <div className="chart-container">
      <canvas width={600} height={300} ref={canvasRef}></canvas>
    </div>
  );
};

const Fallback: FunctionComponent = () => {
  return (
    <Loader active={true} indeterminate={true}>
      Loading Chart...
    </Loader>
  );
};
