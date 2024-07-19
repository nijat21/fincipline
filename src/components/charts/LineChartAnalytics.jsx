import { useEffect, useState, useContext } from 'react';
import { FilterContext } from '@/context/filter.context';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Label } from 'recharts';
import { v4 as uuidv4 } from 'uuid';
import { ThemeContext } from '@/context/theme.context';

const channels = [];
const baseColors = ['#82c', '#8884d8', '#82ca9d', '#ffc658', '#a4de6c', '#d0ed57', '#8dd1e1', '#ff8042', '#ffbb28', '#a5a5a5'];
const colors = { 'Online': baseColors[0], 'In store': baseColors[1], 'Other': baseColors[2] };

function LineChartAnalytics({ formatDate, parseMonthSelected }) {
    const { selectedMonth, allTransactions, startDate, endDate, analyticsInput, rangeSelected } = useContext(FilterContext);
    const [finalData, setFinalData] = useState(null);
    const { theme } = useContext(ThemeContext);

    // An array of previous 6 months since today
    const listLastSixMonths = () => {
        const formattedDates = [];
        // If range and month aren't selected, add prev six months from today
        if (!startDate && !endDate) {
            const end = selectedMonth ? parseMonthSelected(selectedMonth) : new Date();
            for (let i = 5; i >= 0; i--) {
                // Calculate the month and year for the current iteration
                const month = end.getMonth() - i;
                const year = end.getFullYear();
                const date = new Date(year, month + 1, 0);
                // Format the date to "Mar'24" format
                const formattedDate = formatDate(date);
                const object = { month: formattedDate, Online: 0, 'In store': 0, 'Other': 0 };
                formattedDates.push(object);
            }
        }
        // If range is selected, only show that range 
        else {
            // If there's range selected, only show those months in the range
            const start = new Date(startDate);
            const end = new Date(endDate);

            // Set the day to 1 to ignore the comparison on day basis
            start.setDate(1);
            end.setDate(1);

            // Iterate from startDate to endDate by month
            for (let date = start; date <= end; date.setMonth(date.getMonth() + 1)) {
                const formattedDate = formatDate(date);
                const object = { month: formattedDate, Online: 0, 'In store': 0, 'Other': 0 };
                formattedDates.push(object);
            }
        }
        return formattedDates;
    };

    // Function to assign colors to new channels
    const assignColors = (category) => {
        if (!colors[category]) {
            const nextColorIndex = Object.keys(colors).length % baseColors.length;
            colors[category] = baseColors[nextColorIndex];
        }
    };

    // Capitalize the first letter of the channels
    const capitalize = (str) => str[0].toUpperCase() + str.slice(1);

    // Added Data
    // {month: 'May 24', Online: 23.46, In store: 50, Other: 211.46}
    // Form the data
    const addData = () => {
        const datesList = listLastSixMonths();
        if (analyticsInput && allTransactions) {
            const rawTransactions = !rangeSelected ? JSON.parse(JSON.stringify(analyticsInput)) : JSON.parse(JSON.stringify(allTransactions));
            datesList.forEach(date => {
                rawTransactions.forEach(tran => {
                    const tranMonth = new Date(tran.authorized_date);
                    const formattedTranMonth = formatDate(tranMonth);
                    if (date.month === formattedTranMonth && tran.amount > 0) {
                        if (date[capitalize(tran.payment_channel)]) {
                            date[capitalize(tran.payment_channel)] += Math.round(tran.amount);
                        } else {
                            date[capitalize(tran.payment_channel)] = Math.round(tran.amount);
                            // If category is new, add to the channels array to refer to the bars
                            if (!channels.includes(capitalize(tran.payment_channel))) {
                                channels.push(capitalize(tran.payment_channel));
                                assignColors(capitalize(tran.payment_channel));
                            }
                        }
                    }
                });
            });
            // console.log('channels', channels);
            return datesList;
        }
        return datesList;
    };


    useEffect(() => {
        const addedData = addData();
        const timer = setTimeout(() => {
            setFinalData(addedData);
        }, 200);  // 0.2-second delay
        return () => clearTimeout(timer);
    }, [analyticsInput, allTransactions]);

    return (
        <div className='h-full w-full mx-0 md:mx-1 rounded-xl shadow-lg md:shadow-none md:border-none box-border
        bg-white dark:bg-[#001152] md:bg-black md:bg-opacity-20 dark:md:bg-black dark:md:bg-opacity-20 '>
            <ResponsiveContainer width="100%" height="100%">
                {finalData && finalData.length > 0 &&
                    <LineChart
                        width={500}
                        height={300}
                        data={finalData}
                        margin={{
                            top: 0,
                            right: 30,
                            left: 30,
                            bottom: 25,
                        }}
                    >
                        <CartesianGrid
                            strokeDasharray="3 3"
                            strokeOpacity={"30%"}
                            stroke={theme === 'dark' ? '#cbd5e1' : 'black'}
                            vertical={false}
                            horizontal={true}
                        />
                        <XAxis dataKey="month" stroke={theme === 'dark' ? '#cbd5e1' : 'black'}>
                            <Label position={'insideBottom'} dy={17} fill={theme === 'dark' ? '#cbd5e1' : 'black'}>Payment Channels</Label>
                        </XAxis>
                        <Tooltip content={CustomTooltip} cursor={{ fill: '#1a294f' }} />
                        <Legend verticalAlign='top' />
                        {channels.map(ch => {
                            return <Line type="monotone" key={ch} dataKey={ch} stroke={colors[ch]} />;
                        })}
                    </LineChart>
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
                <p className='text-[#cbd5e1]'>{label}</p>
                {payload.map(p => {
                    if (p.value > 0) {
                        return (
                            <p key={uuidv4()} style={{ 'color': `${p.stroke}` }}>
                                {p.dataKey}:
                                <span className='ml-2'>{p.value}$</span>
                            </p>
                        );
                    }
                })}
            </div>
        );
    }
};

export default LineChartAnalytics;
