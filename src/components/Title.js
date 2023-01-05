import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

export const Title = ({ children }) => <div>
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
