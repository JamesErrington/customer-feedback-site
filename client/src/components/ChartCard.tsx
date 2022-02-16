import { Suspense, useRef, useEffect } from "react";
import type { FunctionComponent } from "react";
import { Card, Dimmer, Loader } from "semantic-ui-react";
import Chart from "chart.js/auto";

import { ErrorBoundary } from "./ErrorBoundary";
import { useRootState } from "../state/root";

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
  const chartRef = useRef<Chart<any, any, any> | undefined>(undefined);
  const { snapshot } = useRootState();

  useEffect(() => {
    console.log("Chart Effect");
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

function drawChart(canvas: HTMLCanvasElement | null, data: any) {
  if (!canvas || !data) {
    return;
  }

  const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
  return new Chart(ctx, {
    type: "line",
    data: {
      labels: data.labels,
      datasets: [
        {
          data: data.data,
          label: "Average Review Score",
          borderColor: "#3e95cd",
          fill: false,
        },
      ],
    },
    options: {
      maintainAspectRatio: false,
      layout: {
        padding: {
          left: 5,
          right: 10,
        },
      },
    },
  });
}
