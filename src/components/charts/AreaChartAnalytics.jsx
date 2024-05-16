import React, { PureComponent } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';


const data = [
    {
        name: 'Month A',
        uv: 4000,
        pv: 2400,
    },
    {
        name: 'Month B',
        uv: 3000,
        pv: 1398,
    },
    {
        name: 'Month C',
        uv: 2000,
        pv: 9800,
    },
    {
        name: 'Month D',
        uv: 2780,
        pv: 3908,
    },
    {
        name: 'Month E',
        uv: 1890,
        pv: 4800,
    },
    {
        name: 'Month F',
        uv: 2390,
        pv: 3800,
    }
];



function AreaChartAnalytics() {
    return (
        <div className='h-full w-full'>
            <ResponsiveContainer width="100%" height="100%" >
                <AreaChart
                    width={500}
                    height={400}
                    data={data}
                    margin={{
                        top: 10,
                        right: 30,
                        left: 0,
                        bottom: 0,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Area type="monotone" dataKey="uv" stroke="#8884d8" fill="#8884d8" />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    );
}


export default AreaChartAnalytics;
