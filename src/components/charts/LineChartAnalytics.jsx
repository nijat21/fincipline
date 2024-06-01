import React, { PureComponent } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Label } from 'recharts';

const data = [
    {
        month: 'Page A',
        online: 4000,
        in_store: 2400,
        other: 2400,
    },
    {
        month: 'Page B',
        online: 3000,
        in_store: 1398,
        other: 2210,
    },
    {
        month: 'Page C',
        online: 2000,
        in_store: 9800,
        other: 2290,
    },
    {
        month: 'Page D',
        online: 2780,
        in_store: 3908,
        other: 2000,
    },
    {
        month: 'Page E',
        online: 1890,
        in_store: 4800,
        other: 2181,
    },
    {
        month: 'Page F',
        online: 2390,
        in_store: 3800,
        other: 2500,
    }
];

function LineChartAnalytics() {
    return (
        <div className='h-full w-full mx-1 bg-black bg-opacity-30 rounded-lg'>
            <ResponsiveContainer width="100%" height="100%">
                <LineChart
                    width={500}
                    height={300}
                    data={data}
                    margin={{
                        top: 5,
                        right: 40,
                        left: 0,
                        bottom: 25,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month">
                        <Label position={'insideBottom'} dy={17}>Payment Channels</Label>
                    </XAxis>
                    <YAxis />
                    <Tooltip />
                    <Legend verticalAlign='top' />
                    <Line type="monotone" dataKey="online" stroke="#8884d8" activeDot={{ r: 8 }} />
                    <Line type="monotone" dataKey="in_store" stroke="#82ca9d" />
                    <Line type="monotone" dataKey="other" stroke="#82c" />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
}

export default LineChartAnalytics;
