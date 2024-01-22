import React from "react";
import { Pie } from 'react-chartjs-2';
import { defaults } from "chart.js/auto";

defaults.responsive = true;
defaults.plugins.title.display = true;
defaults.plugins.title.align = "start";
defaults.plugins.title.color = "black";

interface ChartProps {
    withdraw: number,
    deposit: number,
}

const DefaultLineChart = (props:ChartProps) => {

    const data = {
        labels: ["Withdraw Amount", "Deposits Amount"],
        datasets: [{
            label: 'data',
            data: [props.withdraw, props.deposit],
            fill: false
        }]
    }

    const options = {
        scales:{
            y:{
                beginAtZero:true
            }
        }
    }

    return (
        <>
            <div>
                <Pie
                    options={options}
                    data={data}
                />
            </div>
        </>
    )
}

export default DefaultLineChart;