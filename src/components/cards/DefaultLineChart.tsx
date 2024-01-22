import React from "react";
import {Line} from 'react-chartjs-2';
import { Pie } from 'react-chartjs-2';
import { defaults } from "chart.js/auto";

defaults.responsive = true;
defaults.plugins.title.display = true;
defaults.plugins.title.align = "start";
defaults.plugins.title.color = "black";

interface ChartProps {
    shares: number,
    comDeposits: number,
    specDeposits: number,
    penDeposits: number
}

const DefaultLineChart = (props:ChartProps) => {

    const data = {
        labels: ["Shares", "Compulsory Deposits", "Special Deposits", "Pension Deposits"],
        datasets: [{
            label: 'data',
            data: [props.shares, props.comDeposits, props.specDeposits, props.penDeposits],
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
                <Line
                    options={options}
                    data={data}
                />
            </div>
        </>
    )
}

export default DefaultLineChart;