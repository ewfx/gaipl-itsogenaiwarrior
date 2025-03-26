import React from 'react';
import { Stack, Typography, MenuItem, Box } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import DashboardCard from '../../../components/shared/DashboardCard';
import Chart from 'react-apexcharts';


const SalesOverview = () => {

    // select
    const [month, setMonth] = React.useState('1');

    const handleChange = (event) => {
        setMonth(event.target.value);
    };

    // chart color
    const theme = useTheme();
    const primary = theme.palette.primary.main;
    const secondary = theme.palette.secondary.main;
    const error = theme.palette.error.main;
    const warning = theme.palette.warning.main;
    // chart
    const optionscolumnchart = {
        chart: {
            type: 'bar',
            fontFamily: "'Plus Jakarta Sans', sans-serif;",
            foreColor: '#adb0bb',
            toolbar: {
                show: true,
            },
            height: 370,
        },
        colors: [error, warning, primary, secondary],
        plotOptions: {
            bar: {
                horizontal: false,
                columnWidth: "42%",
                borderRadius: 6,
            },
        },

        stroke: {
            show: true,
            width: 5,
            lineCap: "butt",
            colors: ["transparent"],
        },
        dataLabels: {
            enabled: false,
        },
        legend: {
            show: false,
        },
        grid: {
            borderColor: 'rgba(0,0,0,0.1)',
            strokeDashArray: 3,
            xaxis: {
                lines: {
                    show: false,
                },
            },
        },

        xaxis: {
            categories: ["Jan",
                "Feb",
                "Mar",
                "Apr",
                "May",
                "Jun",
                "July",
                "Aug",
                "Sept",
                "Oct",
                "Nov",
                "Dec",],
            axisBorder: {
                show: false,
            },
        },
        tooltip: {
            theme: theme.palette.mode === 'dark' ? 'dark' : 'light',
            fillSeriesColor: false,
        },
    };
    const seriescolumnchart = [
        {
            name: "Critical",
            data: [160, 170, 145, 180, 155, 165, 150, 185, 190, 175, 185, 160], // Monthly data for 12 months
        },
        {
            name: "High",
            data: [130, 120, 125, 110, 115, 105, 135, 140, 150, 145, 135, 125], // Monthly data for 12 months
        },
        {
            name: "Medium",
            data: [90, 85, 100, 95, 90, 80, 75, 70, 85, 95, 110, 105], // Monthly data for 12 months
        },
        {
            name: "Low",
            data: [60, 50, 55, 65, 58, 62, 67, 70, 59, 63, 55, 60], // Monthly data for 12 months
        },
    ]; 

    return (

        <DashboardCard title="Incidents Overview" action={
            <Stack direction="row" spacing={2} alignItems="center">
                <Stack direction="row" alignItems="center" spacing={1}>
                    <Box
                        sx={{
                            backgroundColor: "error.main",
                            borderRadius: "50%",
                            height: 8,
                            width: 8,
                        }}
                    />
                    <Typography variant="subtitle2" sx={{ color: "error.main" }}>
                        Critical
                    </Typography>
                </Stack>

                <Stack direction="row" alignItems="center" spacing={1}>
                    <Box
                        sx={{
                            backgroundColor: "warning.main",
                            borderRadius: "50%",
                            height: 8,
                            width: 8,
                        }}
                    />
                    <Typography variant="subtitle2" sx={{ color: "warning.main" }}>
                        High
                    </Typography>
                </Stack>

                <Stack direction="row" alignItems="center" spacing={1}>
                    <Box
                        sx={{
                            backgroundColor: "primary.main",
                            borderRadius: "50%",
                            height: 8,
                            width: 8,
                        }}
                    />
                    <Typography variant="subtitle2" sx={{ color: "primary.main" }}>
                        medium
                    </Typography>
                </Stack>

                <Stack direction="row" alignItems="center" spacing={1}>
                    <Box
                        sx={{
                            backgroundColor: "secondary.main",
                            borderRadius: "50%",
                            height: 8,
                            width: 8,
                        }}
                    />
                    <Typography variant="subtitle2" sx={{ color: "secondary.main" }}>
                        Low
                    </Typography>
                </Stack>
            </Stack>
        }>
            <Box className='rounded-bars'>
                <Chart
                    options={optionscolumnchart}
                    series={seriescolumnchart}
                    type="bar"
                    height="370px"
                />
            </Box>
        </DashboardCard>
    );
};

export default SalesOverview;
