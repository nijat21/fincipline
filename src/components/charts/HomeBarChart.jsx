import { useContext, useEffect, useState } from 'react';
import { FilterContext } from '@/context/filter.context';
import { BarChart, Bar, ResponsiveContainer, XAxis, YAxis, Label, CartesianGrid, Legend, Tooltip, } from 'recharts';
import { Link } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { ThemeContext } from '@/context/theme.context';
import { AuthContext } from '@/context/auth.context';

const channels = [];
const baseColors = ['#82c', '#8884d8', '#82ca9d', '#ffc658', '#a4de6c', '#d0ed57', '#8dd1e1', '#ff8042', '#ffbb28', '#a5a5a5'];
const colors = { 'Online': baseColors[0], 'In store': baseColors[1], 'Other': baseColors[2] };

function HomeBarChart({ isMobile }) {
    const { transactionsLTD, currency } = useContext(FilterContext);
    const { theme } = useContext(ThemeContext);
    const [dataHBarChart, setDataHBarChart] = useState([]);
    const { banks } = useContext(AuthContext);


    // Capitalize the first letter of the channels
    const capitalize = (str) => str[0].toUpperCase() + str.slice(1);

    // Function to assign colors to new channels
    const assignColors = (category) => {
        if (!colors[category]) {
            const nextColorIndex = Object.keys(colors).length % baseColors.length;
            colors[category] = baseColors[nextColorIndex];
        }
    };

    // [{'category':'Something', ...}]
    // Looping and adding all the data shortly
    const formGroupData = (transactionsLTD) => {
        // console.log("Transactions", transactionsLTD);
        const dt = [];
        transactionsLTD.forEach(tran => {
            if (dt.length === 0) {
                const object = { 'category': tran.category[0], [capitalize(tran.payment_channel)]: Math.round(tran.amount) };
                dt.push(object);
                // If channel is new, add to the channels array to refer to the bars
                if (!channels.includes(capitalize(tran.payment_channel))) {
                    channels.push(capitalize(tran.payment_channel));
                    assignColors(capitalize(tran.payment_channel));
                }
            } else {
                let categoryExists = false;
                dt.forEach(obj => {
                    // Check if the category exists in array, then check if channel exists
                    if (obj.category === tran.category[0]) {
                        categoryExists = true;
                        if (!obj[capitalize(tran.payment_channel)]) {
                            obj[capitalize(tran.payment_channel)] = Math.round(tran.amount);
                            // If channel is new, add to the channels array to refer to the bars
                            if (!channels.includes(capitalize(tran.payment_channel))) {
                                channels.push(capitalize(tran.payment_channel));
                                assignColors(capitalize(tran.payment_channel));
                            }
                        } else {
                            // If channel also exists, add the amount, if not add channel and amount
                            obj[capitalize(tran.payment_channel)] += Math.round(tran.amount);
                        }
                    }
                });
                if (!categoryExists) {
                    const object = { 'category': tran.category[0], [capitalize(tran.payment_channel)]: Math.round(tran.amount) };
                    dt.push(object);
                    // If channel is new, add to the channels array to refer to the bars
                    if (!channels.includes(capitalize(tran.payment_channel))) {
                        channels.push(capitalize(tran.payment_channel));
                        assignColors(capitalize(tran.payment_channel));
                    }
                }
            }
        });
        // console.log("New data", dt);
        return dt;
    };



    // Run when transactionsLTD received or updated
    useEffect(() => {
        if (transactionsLTD && transactionsLTD.length > 0) {
            const response = formGroupData(transactionsLTD);
            setDataHBarChart(response);
        }
    }, [transactionsLTD]);


    return (
        <div className="h-[25rem] w-[90%] md:w-3/5 md:h-4/6 rounded-xl shadow-lg md:shadow-none md:rounded-none bg-white dark:bg-[#001152] 
        flex items-center justify-center md:bg-transparent dark:md:bg-transparent box-border">
            <div className='h-full w-full px-6 py-4 md:pt-6 md:pb-4 flex flex-col justify-between rounded-xl
                box-border md:bg-black md:bg-opacity-20 dark:md:bg-black dark:md:bg-opacity-20'>
                {!isMobile && <h3 className="py-1 text-center">Spending Analytics</h3>}
                {dataHBarChart && dataHBarChart.length > 0 && <p className='w-full py-1 text-center'>Last 30 days</p>}
                <div className='h-[80%] md:pt-2 md:h-[22rem] flex items-center justify-center'>
                    {dataHBarChart && dataHBarChart.length > 0 ?
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={dataHBarChart}>
                                <XAxis dataKey="category" stroke={theme === 'dark' ? '#cbd5e1' : 'black'}>
                                    {/* {!isMobile && <Label value="Spending categories" position="insideBottom" offset={0} dy={15} />} */}
                                </XAxis>
                                {/* <YAxis stroke='#cbd5e1' /> */}
                                {/* <CartesianGrid strokeDasharray='3 3' /> */}
                                <Legend verticalAlign='top' />
                                {/* Fill -the color of the highlight of the bar area */}
                                <Tooltip content={CustomTooltip} currency={currency} cursor={{ fill: '#1a294f' }} />
                                {channels.map(ch => {
                                    return <Bar type="monotone" key={uuidv4()} dataKey={ch} stackId={'a'} fill={colors[ch]} />;
                                })}
                            </BarChart>
                        </ResponsiveContainer>
                        :
                        <div className="flex justify-center items-center">
                            <p className="py-6">{banks && banks.length > 0 ? 'No Bank Selected' : 'No Bank Registered'}</p>
                        </div>
                    }
                </div>
                <div className='flex justify-center items-center m-0 md:my-4'>
                    <Link to={'/analytics'}
                        className="py-[3px] px-4 text-lg border rounded-md border-black dark:border-slate-300 hover:bg-neutral-700 hover:text-white
                            dark:hover:bg-white dark:hover:text-black  hover:border-transparent cursor-pointer">
                        See More
                    </Link>
                </div>
            </div>
        </div>
    );
}

// Custom ToolTip
const CustomTooltip = ({ active, payload, label, currency }) => {
    if (active && payload && payload.length) {
        return (
            <div className='p-4 bg-slate-900 flex flex-col gap-4 rounded-md'>
                <p className='text-medium text-slate-300 text-lg'>{label}</p>
                {payload.map(p => {
                    if (p.value > 0) {
                        return (
                            <p key={uuidv4()} style={{ 'color': `${p.fill}` }}>
                                {p.dataKey}:
                                <span className='ml-2'>{p.value} {currency}</span>
                            </p>
                        );
                    }
                })}
            </div>
        );
    }
};


export default HomeBarChart;




