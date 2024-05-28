import { useState, useContext, useEffect } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { FilterContext } from '@/context/filter.context';


// Notes:
// 1. Numbers should be reflected as negative
// 2. Reverse the order
// 3. Currency sign
// 4. Maybe add a year to month format "Mar, 24"


function AreaChartAnalytics() {
    const { selectedMonth, rangeSelected, allTransactions, startDate, endDate } = useContext(FilterContext);
    const [data, setData] = useState([]);
    const [monthsList, setMonthsList] = useState(null);


    // Loop to generate 6 months of formatted dates
    const listLastSixMonths = (monthSelectedInFilter) => {
        const formattedDates = [];
        // If range isn't selected, show last six month either from today or from selected month
        if (!startDate && !endDate) {
            const end = monthSelectedInFilter ? new Date(monthSelectedInFilter) : new Date();
            for (let i = 5; i >= 0; i--) {
                // Calculate the month and year for the current iteration
                const month = end.getMonth() - i;
                const year = end.getFullYear();
                const date = new Date(year, month + 1, 0);

                // Format the date to "Mar'24" format
                const formattedDate = date.toLocaleDateString('en-US', {
                    month: 'short',
                    year: '2-digit',
                });
                const monthAmount = { month: formattedDate, amount: '' };
                formattedDates.push(monthAmount);
            }
        } else {
            // If there's range selected, only show those months in the range
            const start = new Date(startDate);
            const end = new Date(endDate);

            // Iterate from startDate to endDate by month
            for (let date = start; date <= end; date.setMonth(date.getMonth() + 1)) {
                const formattedDate = date.toLocaleDateString('en-US', {
                    month: 'short',
                    year: '2-digit',
                });
                const monthAmount = { month: formattedDate, amount: '' };
                formattedDates.push(monthAmount);
            }
        }
        setMonthsList(JSON.parse(JSON.stringify(formattedDates)));
        return formattedDates;
    };


    // Filter input data for the last 6 months from today or selected endDate
    // Only if the range is not selected
    const filterLastSixMonth = (input, endDate) => {
        const end = endDate ? new Date(endDate) : new Date();
        const sixMonthAgo = new Date(end.getFullYear(), end.getMonth() - 5, 1).toISOString().split('T')[0];
        const tranLSM = input.filter(tran => tran.authorized_date >= sixMonthAgo && tran.authorized_date <= end && tran.amount > 0);
        return tranLSM;
    };

    // Sort by ascending order
    const sortAscending = (input) => {
        const compareTxnsByDateAscending = (a, b) => (a.date > b.date) - (a.date < b.date);
        const sortedInput = input.sort(compareTxnsByDateAscending);
        return sortedInput;
    };

    // Format date
    const formatDate = ((input) => input.toLocaleDateString('en-US', { month: 'short', year: "2-digit" }));

    // Group spending by month
    const groupByMonth = (newData) => {
        if (newData && newData.length > 0 && newData.month) {
            const dataTemp = [];
            let temp = { month: '', amount: 0 };
            let month = newData[0].month;
            let agg = 0;

            for (let i = 0; i < newData.length; i++) {
                if (month === newData[i].month) {
                    agg += newData[i].amount || 0;
                    temp.month = newData[i].month;
                    temp.amount = agg;
                } else {
                    // console.log('Temp', temp);
                    dataTemp.push(JSON.parse(JSON.stringify(temp)));
                    month = newData[i].month;
                    agg = 0;
                    agg = newData[i].amount || 0;
                    temp.month = month;
                    temp.amount = agg;
                }
            }
            dataTemp.push(JSON.parse(JSON.stringify(temp)));
            console.log('Data Temp', dataTemp);
            return dataTemp;
        }
    };

    // Sort, shape and save data
    const sortShapeSave = (input) => {
        // Sort by ascending order
        const sortedTransactionsLSM = sortAscending(input);
        // Convert data to {month: '', amount: 0} format
        const newData = sortedTransactionsLSM.map(tran => {
            // Format date to be in "Mar" form
            const tranDate = new Date(tran.authorized_date);
            const formattedDate = formatDate(tranDate);
            return { month: formattedDate, amount: tran.amount };
        });
        // console.log("New Data", newData);

        // Group spending by month
        const dataTemp = groupByMonth(newData);
        // localStorage.setItem('areaChartData', JSON.stringify(dataTemp));
        // const areaChartData = localStorage.getItem('areaChartData');
        // setData(JSON.parse(areaChartData));
        setData(JSON.parse(JSON.stringify(dataTemp)));
    };

    // Convert the AllTransactions into something usable in Area Chart
    const formData = () => {
        if (allTransactions && allTransactions.length > 0) {
            if (!rangeSelected) {
                // If no period is selected, show last 6 months
                // Filter allTransactions last 6 months
                const transactionsLastSixMonths = filterLastSixMonth(allTransactions);
                sortShapeSave(transactionsLastSixMonths);
            } else {
                // If there's a selected period, show data during that period
                sortShapeSave(allTransactions);
            }
        }
    };

    // 
    useEffect(() => {
        // console.log(allTransactions); //Checking if bank changes are reflected in input data
        // formData();
        const formattedDates = listLastSixMonths();
        console.log(formattedDates);
    }, [allTransactions]);


    return (
        <div className='h-full w-full mx-1 px-1 pt-4 bg-black bg-opacity-15 rounded-lg'>
            {data && data.length > 0 &&
                <ResponsiveContainer width="100%" height="100%" >
                    <AreaChart
                        width={500}
                        height={400}
                        data={data}
                        margin={{
                            top: 10,
                            right: 40,
                            left: 4,
                            bottom: 0,
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />
                        <Area type="monotone" dataKey="amount" stroke="#8884d8" fill="#8884d8" />
                    </AreaChart>
                </ResponsiveContainer>
            }
        </div>
    );
}


export default AreaChartAnalytics;
