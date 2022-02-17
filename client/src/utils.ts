import Chart from "chart.js/auto";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

export function formatTimestamp(timestamp: string) {
  return dayjs(timestamp).fromNow();
}

export function drawChart(canvas: HTMLCanvasElement | null, data: any) {
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
