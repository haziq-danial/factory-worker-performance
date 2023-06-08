import { Box, Button, Card, CardBody, CardHeader, Flex, Grid, GridItem, Heading, Input, Menu, MenuButton, MenuItem, MenuList, Spacer, Table, TableContainer, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";
import { AddIcon, ChevronDownIcon } from "@chakra-ui/icons";
import Chart from 'chart.js/auto';
import { CategoryScale } from "chart.js";
import { useRef, useState, useEffect } from "react";
import Papa from 'papaparse'

Chart.register(CategoryScale)

export default function Dashboard() {
    const fileInputRef = useRef(null)
    const [averages, setAverages] = useState({});
    const [csvData, setCsvData] = useState([]);
    const [error, setError] = useState(null);
    const [chartDexterity, setChartDexterity] = useState(null);
    const [chartHealth, setChartHealth] = useState(null);
    const [chartStrength, setChartStrength] = useState(null);

    useEffect(() => {
        if (averages && Object.keys(averages).length > 0) {
            createDexterityChart();
            createHealthChart();
            createStrengthChart();
        }
    }, [averages]);

    const handleFileUpload = (event) => {
        const file = event.target.files[0];

        Papa.parse(file, {
            header: true,
            dynamicTyping: true,
            complete: (results) => {
                setCsvData(results.data);
                calculateAverages(results.data);
            },
            error: (error) => {
                setError(error);
            }
        });
    };

    const handleButtonClick = () => {
        fileInputRef.current.click();
    };

    const calculateAverages = (data) => {
        const subDexteritySum = data.reduce((sum, row) => {
            const value = parseFloat(row.sub_dexterity_h);
            return isNaN(value) ? sum : sum + value;
        }, 0);

        const subHealthSum = data.reduce((sum, row) => {
            const value = parseFloat(row.sub_health_h);
            return isNaN(value) ? sum : sum + value;
        }, 0);

        const subStrengthSum = data.reduce((sum, row) => {
            const value = parseFloat(row.sub_strength_h);
            return isNaN(value) ? sum : sum + value;
        }, 0);

        const subDexterityAverage = subDexteritySum / data.length || 0;
        const subHealthAverage = subHealthSum / data.length || 0;
        const subStrengthAverage = subStrengthSum / data.length || 0;

        setAverages({
            subDexterity: subDexterityAverage,
            subHealth: subHealthAverage,
            subStrength: subStrengthAverage
        });
    };

    const createDexterityChart = () => {
        const ctxDexterity = document.getElementById('chartDexterity');
        if (ctxDexterity) {
            if (chartDexterity) {
                chartDexterity.destroy();
            }
            setChartDexterity(
                new Chart(ctxDexterity, {
                    type: 'bar',
                    data: {
                        labels: ["Averages"],
                        datasets: [
                            {
                                label: "Average Dexterity",
                                data: [averages.subDexterity || 0],
                                borderColor: "rgb(75, 192, 192)",
                                borderWidth: 2,
                                tension: 0.1
                            }
                        ]
                    },
                    options: {
                        responsive: true,
                        scales: {
                            y: {
                                beginAtZero: true
                            }
                        }
                    }
                })
            );
        }
    };

    const createHealthChart = () => {
        const ctxHealth = document.getElementById('chartHealth');
        if (ctxHealth) {
            if (chartHealth) {
                chartHealth.destroy();
            }
            setChartHealth(
                new Chart(ctxHealth, {
                    type: 'bar',
                    data: {
                        labels: ["Averages"],
                        datasets: [
                            {
                                label: "Average Health",
                                data: [averages.subHealth || 0],
                                borderColor: "rgb(75, 192, 192)",
                                borderWidth: 2,
                                tension: 0.1
                            }
                        ]
                    },
                    options: {
                        responsive: true,
                        scales: {
                            y: {
                                beginAtZero: true
                            }
                        }
                    }
                })
            );
        }
    };

    const createStrengthChart = () => {
        const ctxStrength = document.getElementById('chartStrength');
        if (ctxStrength) {
            if (chartStrength) {
                chartStrength.destroy();
            }
            setChartStrength(
                new Chart(ctxStrength, {
                    type: 'bar',
                    data: {
                        labels: ["Averages"],
                        datasets: [
                            {
                                label: "Average Strength",
                                data: [averages.subStrength || 0],
                                borderColor: "rgb(75, 192, 192)",
                                borderWidth: 2,
                                tension: 0.1
                            }
                        ]
                    },
                    options: {
                        responsive: true,
                        scales: {
                            y: {
                                beginAtZero: true
                            }
                        }
                    }
                })
            );
        }
    };

    return (
        <>
            <Flex w={'full'} pb={6} gap={2} minWidth={'max-content'} alignItems={'center'}>
                <Input type={'file'} onChange={handleFileUpload} ref={fileInputRef} hidden={true} />
                <Spacer />
                <Button type={'button'} onClick={handleButtonClick} colorScheme={'blue'} rightIcon={<AddIcon />}>Add File</Button>
            </Flex>
            <Grid h={'200px'} templateRows={'1fr'} templateColumns={'repeat(3, 1fr)'} gap={4}>
                <GridItem colSpan={1}>
                    <Card>
                        <CardHeader>
                            <Heading size={'md'}>Average Dexterity</Heading>
                        </CardHeader>
                        <CardBody>
                            <canvas id="chartDexterity" width="400" height="200" />
                        </CardBody>
                    </Card>
                </GridItem>
                <GridItem colSpan={1}>
                    <Card>
                        <CardHeader>
                            <Heading size={'md'}>Average Health</Heading>
                        </CardHeader>
                        <CardBody>
                            <canvas id="chartHealth" width="400" height="200" />
                        </CardBody>
                    </Card>
                </GridItem>
                <GridItem colSpan={1}>
                    <Card>
                        <CardHeader>
                            <Heading size={'md'}>Average Strength</Heading>
                        </CardHeader>
                        <CardBody>
                            <canvas id="chartStrength" width="400" height="200" />
                        </CardBody>
                    </Card>
                </GridItem>
                <GridItem colSpan={3} pb={'10vh'}>
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
                                        {csvData.slice(0, 10).map((row, index) => (
                                            <Tr key={index}>
                                                <Td>{index + 1}</Td>
                                                <Td>{row.sub_ID}</Td>
                                                <Td>{row.sub_fname}</Td>
                                                <Td>{row.sub_age}</Td>
                                                <Td>{row.sub_sex}</Td>
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
                                        ))}
                                    </Tbody>
                                </Table>
                            </TableContainer>
                        </CardBody>
                    </Card>
                </GridItem>
            </Grid>
        </>
    );
}
