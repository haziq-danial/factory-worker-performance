import {Card, CardBody, CardHeader, Grid, GridItem, Heading} from "@chakra-ui/react";
import {CategoryScale} from "chart.js";
import Chart from "chart.js/auto";
import annotationPlugin from 'chartjs-plugin-annotation';
import {useState} from "react";
import {Data} from "../utils/data.js";
import LineChart from "../components/LineChart.jsx";
Chart.register(CategoryScale, annotationPlugin)

export default function Employee(){
    const [chartData,  setChartData] = useState({
        labels: Data.map((data) => data.year),
        datasets: [
            {
                label: "Users Gained ",
                data: Data.map((data) => data.userGain),
                borderColor: "rgb(75, 192, 192)",
                borderWidth: 2,
                tension: 0.1
            },
        ]
    })

    const [chartOption] = useState({
        plugins: {
            title: {
                display: true
            },
            legend: {
                display: false
            },
            annotation: {
                annotations:[
                        {
                            type: 'line',
                            yMin: 15000,
                            yMax: 15000,
                            borderColor: 'rgb(255, 99, 132)',
                            borderWidth: 2,
                        }
                    ]
            }
        }
    })

    return (
        <>
            <Grid
                templateRows={'repeat(3, 2fr)'}
                templateColumns={'repeat(2, 1fr)'}
                gap={4}
                pb={'10px'}
            >
                <GridItem rowSpan={3}>
                    <Card>
                        <CardHeader>
                            <Heading size={'md'}>Employee Details</Heading>
                        </CardHeader>
                        <CardBody>

                        </CardBody>
                    </Card>
                </GridItem>
                <GridItem rowSpan={1}>
                    <Card>
                        <CardHeader>
                            <Heading size={'md'}>Average Dexterity</Heading>
                        </CardHeader>
                        <CardBody>
                            <LineChart
                                chartData={chartData}
                                chartOption={chartOption}
                            />
                        </CardBody>
                    </Card>
                </GridItem>
                <GridItem rowSpan={1}>
                    <Card>
                        <CardHeader>
                            <Heading size={'md'}>Average Health</Heading>
                        </CardHeader>
                        <CardBody>
                            <LineChart
                                chartData={chartData}
                                chartOption={chartOption}
                            />
                        </CardBody>
                    </Card>
                </GridItem>
                <GridItem rowSpan={1}>
                    <Card>
                        <CardHeader>
                            <Heading size={'md'}>Average Strength</Heading>
                        </CardHeader>
                        <CardBody>
                            <LineChart
                                chartData={chartData}
                                chartOption={chartOption}
                            />
                        </CardBody>
                    </Card>
                </GridItem>
            </Grid>
        </>
    )
}
