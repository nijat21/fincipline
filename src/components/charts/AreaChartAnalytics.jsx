import { useState, useContext, useEffect } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { FilterContext } from '@/context/filter.context';


// Notes:
// 1. Numbers should be reflected as negative
// 2. Reverse the order
// 3. Currency sign
// 4. Maybe add a year to month format "Mar, 24"


function AreaChartAnalytics() {
    const { selectedMonth, rangeSelected, allTransactions } = useContext(FilterContext);
    const [data, setData] = useState([]);

    // Group spending by month
    const groupByMonth = (newData) => {
        const dataTemp = [];
        let temp = { month: '', amount: 0 };
        let month = newData[0].month;
        let agg = 0;

        for (let i = 0; i < newData.length; i++) {
            if (month === newData[i].month) {
                agg += newData[i].amount;
                temp.month = newData[i].month;
                temp.amount = agg;
            } else {
                // console.log('Temp', temp);
                dataTemp.push(JSON.parse(JSON.stringify(temp)));
                month = newData[i].month;
                agg = 0;
                agg = newData[i].amount;
                temp.month = month;
                temp.amount = agg;
            }
        }
        dataTemp.push(JSON.parse(JSON.stringify(temp)));
        console.log('Data Temp', dataTemp);
        return dataTemp;
    };

    // Filter last 6 months
    const filterLastSixMonth = (input) => {
        const today = new Date();
        const sixMonthAgo = new Date(today.getFullYear(), today.getMonth() - 5, 1).toISOString().split('T')[0];
        const tranLSM = input.filter(tran => tran.authorized_date >= sixMonthAgo && tran.amount > 0);
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
            if (!selectedMonth || !rangeSelected) {
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
        formData();
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
