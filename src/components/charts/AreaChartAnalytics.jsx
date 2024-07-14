import { useState, useContext, useEffect } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Label } from 'recharts';
import { FilterContext } from '@/context/filter.context';
import { v4 as uuidv4 } from 'uuid';


// Notes:
// 1. Numbers should be reflected as negative
// 2. Reverse the order
// 3. Currency sign
// 4. Maybe add a year to month format "Mar, 24"


function AreaChartAnalytics({ formatDate, parseMonthSelected }) {
    const { selectedMonth, selectedBank, rangeSelected, allTransactions, startDate, endDate, analyticsInput
        ,
    } = useContext(FilterContext);
    const [finalData, setFinalData] = useState(null);


    // Loop to generate 6 months of formatted dates
    const listLastSixMonths = () => {
        const formattedDates = [];
        // If range isn't selected, show last six month either from today or from selected month
        if (!startDate && !endDate) {
            const end = selectedMonth ? parseMonthSelected(selectedMonth) : new Date();
            for (let i = 5; i >= 0; i--) {
                // Calculate the month and year for the current iteration
                const month = end.getMonth() - i;
                const year = end.getFullYear();
                const date = new Date(year, month + 1, 0);
                // Format the date to "Mar'24" format
                const formattedDate = formatDate(date);
                const monthAmount = { month: formattedDate, Amount: 0 };
                formattedDates.push(monthAmount);
            }
        } else {
            // If there's range selected, only show those months in the range
            const start = new Date(startDate);
            const end = new Date(endDate);

            // Iterate from startDate to endDate by month
            for (let date = start; date <= end; date.setMonth(date.getMonth() + 1)) {
                const formattedDate = formatDate(date);
                const monthAmount = { month: formattedDate, Amount: 0 };
                formattedDates.push(monthAmount);
            }
        }
        return formattedDates;
    };

    // Add data for the list of dates to be presented
    const addData = () => {
        let datesList = listLastSixMonths();
        if (analyticsInput) {
            // If range is selected, use allTransactions, if not, use the copy of data
            // The reason is allTransactions are modified by the filter selection
            // In date range, it's fine but if Month selected, allTransactions include only that month
            const rawTransactions = !rangeSelected ? JSON.parse(JSON.stringify(analyticsInput)) : JSON.parse(JSON.stringify(allTransactions));
            // console.log('Dates list', datesList);
            {
                rawTransactions && rawTransactions.length > 0 &&
                    rawTransactions.forEach(tran => {
                        const tranMonth = new Date(tran.authorized_date);
                        const formattedTranMonth = formatDate(tranMonth);
                        datesList.forEach(object => {
                            if (formattedTranMonth === object.month && tran.amount > 0) {
                                object.Amount += Math.round(tran.amount);
                            }
                        });
                    });
            }
            return datesList;
        }
        return datesList;
    };


    // Run every time filter updated or reloaded
    useEffect(() => {
        const formedData = addData();
        setFinalData(formedData);
    }, [allTransactions, analyticsInput]);


    return (
        <div className='h-full w-full mx-1 px-1 pt-4 bg-black bg-opacity-15 rounded-lg'>
            {finalData && finalData.length > 0 &&
                <ResponsiveContainer width="100%" height="100%" >
                    <AreaChart
                        width={500}
                        height={400}
                        data={finalData}
                        margin={{
                            top: 10,
                            right: 40,
                            left: 4,
                            bottom: 25,
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month">
                            <Label position={'insideBottom'} dy={17}>Total Spending</Label>
                        </XAxis>
                        <YAxis />
                        <Tooltip content={CustomTooltip} />
                        <Area type="monotone" dataKey="Amount" stroke="#8884d8" fill="#8884d8" />
                    </AreaChart>
                </ResponsiveContainer>
            }
        </div>
    );
}


// Custom ToolTip
const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
        return (
            <div className='p-4 bg-slate-900 flex flex-col gap-4 rounded-md'>
                <p className=''>{label}</p>
                {/* {console.log("Payload", payload)} */}
                {payload.map(p => {
                    if (p.value > 0) {
                        return (
                            <p key={uuidv4()} style={{ 'color': `${p.fill}` }}>
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


export default AreaChartAnalytics;
