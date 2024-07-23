import { useState, useContext, useEffect } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Label, LabelList } from 'recharts';
import { v4 as uuidv4 } from 'uuid';
import { ThemeContext } from '@/context/theme.context';
import { AuthContext } from '@/context/auth.context';
import { FilterContext } from '@/context/filter.context';


// Notes:
// 1. Numbers should be reflected as negative
// 2. Reverse the order
// 3. Currency sign
// 4. Maybe add a year to month format "Mar, 24"


function HomeAreaChart({ isMobile }) {
    const { banks } = useContext(AuthContext);
    const { theme } = useContext(ThemeContext);
    const { tranCurrMonth } = useContext(FilterContext);
    const [finalData, setFinalData] = useState(null);


    // Loop to generate days of this month
    // { date: formattedDate, Amount: 0 }
    const thisMonth = () => {
        const dt = [];
        const today = new Date();
        const currentYear = today.getFullYear();
        const currentMonth = today.getMonth();
        // Total number of days in the current month
        const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
        // Create an array of { date: formattedDate, Amount: 0 } objects for each day of month
        for (let i = 1; i <= daysInMonth; i++) {
            dt.push({ date: i, Amount: 0 });
        }
        // console.log("Days in month", dt);
        return dt;
    };

    // Add data for the list of dates to be presented
    const addData = () => {
        let datesList = thisMonth();
        {
            tranCurrMonth && tranCurrMonth.length > 0 &&
                tranCurrMonth.forEach(tran => {
                    const tranDate = new Date(tran.authorized_date);
                    datesList.forEach(object => {
                        if (tranDate.getDate() === object.date && tran.amount > 0) {
                            object.Amount += Math.round(tran.amount);
                        }
                    });
                });
        }
        return datesList;
    };

    // Aggregate the Amount
    const aggregateAmount = (dt) => {
        const today = new Date();
        const day = today.getDate();
        let aggregate = 0;
        if (dt && dt.length > 0) {
            for (let i = 0; i < dt.length; i++) {
                if (i < day) {
                    aggregate += dt[i].Amount;
                    dt[i].Amount = aggregate;
                } else if (i === day) {
                    aggregate += dt[i].Amount;
                    dt[i].Amount = aggregate;
                } else {
                    dt[i].Amount = null;
                }
            }
            return dt;
        } else {
            console.log('Input is invalid');
        }
    };


    // Run every time filter updated or reloaded
    useEffect(() => {
        // console.log("Input data in HomeAreaChart", tranCurrMonth);
        if (tranCurrMonth && tranCurrMonth.length > 0) {
            const formedData = addData();
            const result = aggregateAmount(formedData);
            // console.log("Result", result);
            setFinalData(result);
            // console.log('FinalData in HomeAreaChart', result);
        }
    }, [tranCurrMonth]);




    return (
        <div className="h-48 w-[90%] md:w-3/5 md:h-4/6 rounded-xl shadow-lg md:shadow-none md:rounded-none bg-white dark:bg-[#001152] 
        flex items-center justify-center md:bg-transparent dark:md:bg-transparent">
            <div className='h-full w-full px-6 py-4 md:pt-6 md:pb-4 md:grid md:rid-cols-1 rounded-xl
                box-border md:bg-black md:bg-opacity-20 dark:md:bg-black dark:md:bg-opacity-20'>
                {
                    isMobile ?
                        <p className='w-full py-1 text-center'>Spent this month</p>
                        :
                        <h3 className="text-center py-1">Spent This Month</h3>
                }
                {finalData && finalData.length > 0 ?
                    <ResponsiveContainer width="100%" height="100%" >
                        <AreaChart
                            data={finalData}
                            margin={{ top: 20, bottom: 25 }}
                        >
                            {/* <CartesianGrid strokeDasharray="10 10" /> */}
                            <XAxis dataKey="date" stroke={theme === 'dark' ? '#cbd5e1' : 'black'} >
                                {!isMobile && <Label position={'insideBottom'} dy={20} fill={theme === 'dark' ? '#cbd5e1' : 'black'}>Total Spending</Label>}
                            </XAxis>
                            {/* <YAxis /> */}
                            <Tooltip content={CustomTooltip} />
                            <Area type="monotone" dataKey="Amount" stroke="#8884d8" fill="#8884d8" strokeWidth={2}>
                                <LabelList
                                    dataKey="Amount"
                                    position="top"
                                    content={({ x, y, value, index }) => {
                                        const today = new Date().getDate();
                                        if (index + 1 === today) {
                                            return (
                                                <text x={x} y={y - 10} fill={theme === 'dark' ? '#cbd5e1' : 'black'} textAnchor="middle">
                                                    {Number(value)}$
                                                </text>
                                            );
                                        }
                                        return null;
                                    }}
                                />
                            </Area>
                        </AreaChart>
                    </ResponsiveContainer>
                    :
                    <div className="flex justify-center items-center">
                        <p className="">{banks && banks.length > 0 ? 'No Bank Selected' : 'No Bank Registered'}</p>
                    </div>
                }
            </div>
        </div>
    );
}


// Custom ToolTip
const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
        // Get the current month name
        const today = new Date();
        const monthName = today.toLocaleDateString('en-US', { month: 'short' });

        return (
            <div className='p-4 bg-slate-900 flex flex-col gap-4 rounded-md'>
                <p className='text-[#cbd5e1]'>{`${label} ${monthName}`}</p>
                {/* {console.log("Payload", payload)} */}
                {payload.map(p => {
                    if (p.value > 0) {
                        return (
                            <p key={uuidv4()} style={{ 'color': `${p.fill}` }}>
                                {p.dataKey}:
                                <span className='ml-2'>{Number(p.value)}$</span>
                            </p>
                        );
                    }
                })}
            </div>
        );
    }
};


export default HomeAreaChart;
