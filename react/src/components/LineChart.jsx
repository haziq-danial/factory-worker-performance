import {Line} from 'react-chartjs-2'

// eslint-disable-next-line react/prop-types
export default function LineChart({ chartData, chartOption }) {

    return (
        <div className="chart-container">
            <Line
                data={chartData}
                options={chartOption}
            />
        </div>
    )
}
