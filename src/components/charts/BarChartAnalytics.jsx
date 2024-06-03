import { useState, useContext, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Label } from 'recharts';
import { FilterContext } from '@/context/filter.context';
import { v4 as uuidv4 } from 'uuid';


const categories = [];
const baseColors = ['#82c', '#8884d8', '#82ca9d', '#ffc658', '#a4de6c', '#d0ed57', '#8dd1e1', '#ff8042', '#ffbb28', '#a5a5a5'];
const colors = { 'Travel': baseColors[0], 'Payment': baseColors[1], 'Food and Drink': baseColors[2] };

// Notes: If no month or range selected, should display last 6 month (using analyticsInput)
// If month or range is selected, show that month or range (using allTransactions)
function BarChartAnalytics({ formatDate, parseMonthSelected }) {
    const { selectedMonth, allTransactions, startDate, endDate, analyticsInput } = useContext(FilterContext);
    const [finalData, setFinalData] = useState(null);

    // An array of previous 6 months since today
    const listLastSixMonths = () => {
        const formattedDates = [];
        // If range and month aren't selected, add prev six months from today
        if (!startDate && !endDate && !selectedMonth) {
            const end = new Date();
            for (let i = 5; i >= 0; i--) {
                // Calculate the month and year for the current iteration
                const month = end.getMonth() - i;
                const year = end.getFullYear();
                const date = new Date(year, month + 1, 0);
                // Format the date to "Mar'24" format
                const formattedDate = formatDate(date);
                const object = { month: formattedDate, 'Travel': 0, 'Payment': 0, 'Food and Drink': 0 };
                formattedDates.push(object);
            }
        }
        // If month is selected, only show that month 
        else if (!startDate && !endDate && selectedMonth) {
            const inputDate = parseMonthSelected(selectedMonth);
            // Format the date to "Mar'24" format
            const formattedDate = formatDate(inputDate);
            const object = { month: formattedDate, 'Travel': 0, 'Payment': 0, 'Food and Drink': 0 };
            formattedDates.push(object);
        }
        // If range is selected, only show that range 
        else {
            // If there's range selected, only show those months in the range
            const start = new Date(startDate);
            const end = new Date(endDate);

            // Iterate from startDate to endDate by month
            for (let date = start; date <= end; date.setMonth(date.getMonth() + 1)) {
                const formattedDate = formatDate(date);
                const object = { month: formattedDate, 'Travel': 0, 'Payment': 0, 'Food and Drink': 0 };
                formattedDates.push(object);
            }
        }
        return formattedDates;
    };

    // Function to assign colors to new categories
    const assignColors = (category) => {
        if (!colors[category]) {
            const nextColorIndex = Object.keys(colors).length % baseColors.length;
            colors[category] = baseColors[nextColorIndex];
        }
    };

    // Added Data
    // {month: 'May 24', Travel: 23.46, Payment: 50, Food and Drink: 211.46}
    // Form the data
    const addData = () => {
        const datesList = listLastSixMonths();
        if (analyticsInput) {
            datesList.forEach(date => {
                analyticsInput.forEach(tran => {
                    const tranMonth = new Date(tran.authorized_date);
                    const formattedTranMonth = formatDate(tranMonth);
                    if (date.month === formattedTranMonth && tran.amount > 0) {
                        if (date[tran.category[0]]) {
                            date[tran.category[0]] += Math.round(tran.amount);
                        } else {
                            date[tran.category[0]] = Math.round(tran.amount);
                            // If category is new, add to the categories array to refer to the bars
                            if (!categories.includes(tran.category[0])) {
                                categories.push(tran.category[0]);
                                assignColors(tran.category[0]);
                            }
                        }
                    }
                });
            });
            return datesList;
        }
        return datesList;
    };

    // Loading and updating data 
    useEffect(() => {
        const addedData = addData();
        // console.log('Input', addedData);
        setFinalData(addedData);
    }, [allTransactions]);


    return (
        <div className='w-full h-full mx-1 bg-black bg-opacity-15 rounded-lg'>
            <ResponsiveContainer width="100%" height="100%">
                {finalData && finalData.length > 0 &&
                    <BarChart
                        width={500}
                        height={300}
                        data={finalData}
                        margin={{
                            top: 10,
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
                        {/* Loop for each category and add a bar for each */}
                        {categories.map(cat => {
                            return <Bar type="monotone" key={uuidv4()} dataKey={cat} fill={colors[cat]} />;
                        })}
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
                <p className=''>{label}</p>
                {payload.map(p => {
                    if (p.value > 0) {
                        return (
                            <p key={uuidv4()} style={{ 'color': `${p.fill}` }}>
                                {p.dataKey}:
                                <span className='ml-2'>${p.value}</span>
                            </p>
                        );
                    }
                })}
            </div>
        );
    }
};


export default BarChartAnalytics;
