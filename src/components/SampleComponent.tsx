import React from "react";
import { ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

import ChartJs from "chart.js/auto";

ChartJs.register(ArcElement, Tooltip, Legend);

export interface SampleComponentProps {
    children: React.ReactNode
}

export const SampleComponent: React.FC<SampleComponentProps> = ({ children }) => <div>
    <h1>{children}</h1>
    <Doughnut data={{
        datasets: [
            {
                data: [1, 2, 6, 4],
                borderColor: "#ffff00",
                backgroundColor: "#ff0000"
            }
        ]
    }}></Doughnut>
</div>
