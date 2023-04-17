import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart, _adapters, registerables } from "chart.js/auto";
import { dateFnsAdapter } from "../patch-files/chart.js/chartjs-adapter-date-fns";
import zoomPlugin from "chartjs-plugin-zoom";

Chart.register(...registerables, zoomPlugin);
_adapters._date.override(dateFnsAdapter);

export interface SampleComponentProps {
  children: React.ReactNode;
}

export const SampleComponent: React.FC<SampleComponentProps> = ({
  children
}) => (
  <div>
    <h1>{children}</h1>
    <Doughnut
      options={{
        plugins: {
          legend: {
            position: "bottom" as const
          },
          title: {
            display: true,
            text: "Sample Chart"
          },
          zoom: {
            zoom: {
              wheel: {
                enabled: true
              },
              pinch: {
                enabled: true
              },
              mode: "xy"
            },
            pan: {
              enabled: true,
              mode: "xy"
            }
          }
        }
      }}
      data={{
        datasets: [
          {
            data: [1, 2, 6, 4],
            borderColor: "#ffff00",
            backgroundColor: "#ff0000"
          }
        ]
      }}
    ></Doughnut>
  </div>
);
