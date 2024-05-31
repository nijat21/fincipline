import { useState, useContext, useEffect } from 'react';
import { BarChart, Bar, Rectangle, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Label } from 'recharts';
import { FilterContext } from '@/context/filter.context';

// Input data format => {
//     month: 'Jan',
//     travel: 2390,
//     shopping: 3800,
//     other: 2500,
// }


function BarChartAnalytics({ formatDate }) {
    const { selectedMonth, rangeSelected, allTransactions, startDate, endDate, analyticsInput
        ,

    } = useContext(FilterContext);
    const [finalData, setFinalData] = useState(null);


    useEffect(() => {

    }, []);


    return (
        <div className='w-full h-full mx-1 bg-black bg-opacity-30 rounded-lg'>
            <ResponsiveContainer width="100%" height="100%">
                {finalData && finalData.length > 0 &&
                    <BarChart
                        width={500}
                        height={300}
                        data={finalData}
                        margin={{
                            top: 5,
                            right: 40,
                            left: 0,
                            bottom: 25,
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month">
                            <Label position={'insideBottom'} dy={17}>Spending Categories</Label>
                        </XAxis>
                        <YAxis />
                        <Tooltip content={CustomTooltip} cursor={{ fill: '#1a294f' }} />
                        <Legend verticalAlign='top' />
                        <Bar dataKey="in_store" fill="#82c" />
                        <Bar dataKey="online" fill="#8884d8" />
                        <Bar dataKey="other" fill="#82ca9d" />
                    </BarChart>
                }
            </ResponsiveContainer>
        </div>
    );
}

// Custom ToolTip
const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
        return (
            <div className='p-4 bg-slate-900 flex flex-col gap-4 rounded-md'>
                <p className='text-medium text-slate-300 text-lg'>{label}</p>

                {payload[0].value &&
                    <p className='text-sm text-indigo-400'>
                        Online:
                        <span className='ml-2'>${payload[0].value}</span>
                    </p>}
                {payload[1].value &&
                    <p className='text-sm text-green-300'>
                        In store:
                        <span className='ml-2'>${payload[1].value}</span>
                    </p>}
            </div>
        );
    }
};

export default BarChartAnalytics;
