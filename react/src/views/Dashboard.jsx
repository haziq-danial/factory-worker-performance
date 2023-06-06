import {
    Button,
    Card,
    CardBody,
    CardHeader, Grid, GridItem,
    Heading,
    Menu, MenuButton, MenuItem, MenuList,
    Table,
    TableContainer,
    Tbody,
    Td,
    Th,
    Thead,
    Tr
} from "@chakra-ui/react";
import {ChevronDownIcon} from "@chakra-ui/icons";

import Chart from 'chart.js/auto';
import {CategoryScale} from "chart.js";
import {useState} from "react";
import {Data} from "../utils/data.js";
import LineChart from "../components/LineChart.jsx";

Chart.register(CategoryScale)

export default function Dashboard() {
    const [chartData] = useState({
        labels: Data.map((data) => data.year),
        datasets: [
            {
                label: "Users Gained ",
                data: Data.map((data) => data.userGain),
                borderColor: "rgb(75, 192, 192)",
                borderWidth: 2,
                tension: 0.1
            }
        ]
    })

    const [chartOption] = useState({
        plugins: {
            title: {
                display: true
            },
            legend: {
                display: false
            }
        }
    })

    return (
        <>
            <Grid
                h={'200px'}
                templateRows={'1fr'}
                templateColumns={'repeat(3, 1fr)'}
                gap={4}
            >
                <GridItem colSpan={1}>
                    <Card>
                        <CardHeader>
                            <Heading size={'md'}>Average Dexterity</Heading>
                        </CardHeader>
                        <CardBody>
                            <LineChart chartData={chartData} chartOption={chartOption}/>
                        </CardBody>
                    </Card>
                </GridItem>
                <GridItem colSpan={1}>
                    <Card>
                        <CardHeader>
                            <Heading size={'md'}>Average Health</Heading>
                        </CardHeader>
                        <CardBody>
                            <LineChart chartData={chartData} chartOption={chartOption}/>
                        </CardBody>
                    </Card>
                </GridItem>
                <GridItem colSpan={1}>
                    <Card>
                        <CardHeader>
                            <Heading size={'md'}>Average Strength</Heading>
                        </CardHeader>
                        <CardBody>
                            <LineChart chartData={chartData} chartOption={chartOption}/>
                        </CardBody>
                    </Card>
                </GridItem>
                <GridItem colSpan={3}>
                    <Card>
                        <CardHeader>
                            <Heading size={'md'}>Employee List</Heading>
                        </CardHeader>
                        <CardBody>
                            <TableContainer>
                                <Table size={'md'} variant={'simple'}>
                                    <Thead>
                                        <Tr>
                                            <Th>#</Th>
                                            <Th>Employee ID</Th>
                                            <Th>Name</Th>
                                            <Th>Age</Th>
                                            <Th>Sex</Th>
                                            <Th textAlign={'center'}>Action</Th>
                                        </Tr>
                                    </Thead>
                                    <Tbody>
                                        <Tr>
                                            <Td>1</Td>
                                            <Td>001</Td>
                                            <Td>employee name 1</Td>
                                            <Td>23</Td>
                                            <Td>female</Td>
                                            <Td textAlign={'center'}>
                                                <Menu>
                                                    <MenuButton colorScheme={'blue'} as={Button} rightIcon={<ChevronDownIcon />}>
                                                        Actions
                                                    </MenuButton>
                                                    <MenuList>
                                                        <MenuItem>Menu 1</MenuItem>
                                                        <MenuItem>Menu 2</MenuItem>
                                                    </MenuList>
                                                </Menu>
                                            </Td>
                                        </Tr>
                                    </Tbody>
                                </Table>
                            </TableContainer>
                        </CardBody>
                    </Card>
                </GridItem>
            </Grid>




        </>
    )
}
