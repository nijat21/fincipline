import { useContext, useEffect, useState } from 'react';
import { FilterContext } from '@/context/filter.context';
import {
    BarChart, Bar, ResponsiveContainer, XAxis, YAxis, Label, CartesianGrid, Legend, Tooltip,

} from 'recharts';
import { Link } from 'react-router-dom';



function HomeBarChart({ currBank }) {
    const { transactionsLTD } = useContext(FilterContext);
    const [data, setData] = useState([]);

    const formGroupData = (transactionsLTD) => {
        // Looping and adding all the data shortly
        const newData = transactionsLTD.map(tran => ({
            'category': tran.category[0],
            [tran.payment_channel === 'in store' ? 'in_store' : tran.payment_channel]: tran.amount
        }));
        console.log("New data", newData);

        // Group categories
        const categoriesGrouped = newData.reduce((acc, { category, online, in_store, other }) => {
            if (!acc[category]) {
                acc[category] = { category, online: 0, in_store: 0, other: 0 };
            }
            acc[category].online += online;
            acc[category].in_store += in_store;
            acc[category].other += other;
            return acc;
        }, {});
        console.log("Grouped", categoriesGrouped);

        // Convert object of objects into an array of objects
        const object = Object.values(categoriesGrouped).map(item => ({
            ...item,
            online: Math.round(item.online) || '',
            in_store: Math.round(item.in_store) || '',
            other: Math.round(item.other) || '',
            total: Math.round((item.online || '') + (item.in_store || '') + (item.other || ''))
        }));

        console.log(object);
        setData(object);
    };

    // Run when transactionsLTD received or updated
    useEffect(() => {
        if (transactionsLTD && transactionsLTD.length > 0) {
            formGroupData(transactionsLTD);
        }
    }, [transactionsLTD]);


    // Match bar dataKeys with more representable forms
    const legendItems = [
        { value: 'online', name: 'Online' },
        { value: 'in_store', name: 'In store' },
        { value: 'other', name: 'Other' },
    ];


    return (
        <div className='h-screen w-full flex flex-col justify-center items-center'>
            <div className='grid grid-cols-1 w-2/4 h-1/2 '>
                <h2 className="text-3xl py-10 text-center">{`${currBank ? currBank.institution_name : ''} Spending Analytics`}</h2>
                <p className='w-full text-center py-2 opacity-50'>Last 30 days</p>
                {/* <GridItem> */}
                {data && data.length > 0 &&
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={data} margin={{ right: 30, bottom: 20 }}>
                            <XAxis dataKey="category" stroke='#cbd5e1'>
                                <Label value="Spending categories" position="insideBottom" offset={0} dy={15} />
                            </XAxis>
                            <YAxis stroke='#cbd5e1' />
                            <CartesianGrid strokeDasharray='3 3' />
                            <Legend
                                align='right'
                                verticalAlign="top"
                                formatter={(value) => {
                                    const { name } = legendItems.find(item => item.value === value);
                                    return <span>{name}</span>;
                                }}
                            />
                            {/* Fill -the color of the highlight of the bar area */}
                            <Tooltip content={<CustomTooltip />} cursor={{ fill: '#1a294f' }} />

                            <Bar dataKey="online" stackId="a" type='monotone' fill="#8b5cf6" label={{ position: 'inside', fill: '#cbd5e1' }} />
                            <Bar dataKey="in_store" stackId="a" type='monotone' fill="#1d60d8" label={{ position: 'inside', fill: '#cbd5e1' }} />
                            <Bar dataKey="other" stackId="a" type='monotone' fill="#3b94f6" label={{ position: 'inside', fill: '#cbd5e1' }} />
                        </BarChart>
                    </ResponsiveContainer>
                }
                {/* </GridItem> */}
            </div>

            <Link to={'/analytics'}
                className="p-2 py-[10px] my-10 mx-2 px-4 text-lg border rounded-md border-black dark:border-slate-300 hover:bg-neutral-700 hover:text-white
                            dark:hover:bg-white dark:hover:text-black  hover:border-transparent cursor-pointer">
                See More
            </Link>
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
                    <p className='text-sm text-blue-700'>
                        In store:
                        <span className='ml-2'>${payload[1].value}</span>
                    </p>}
                {payload[2].value &&
                    <p className='text-sm text-blue-500'>
                        Other:
                        <span className='ml-2'>${payload[2].value}</span>
                    </p>}
            </div>
        );
    }
};

export default HomeBarChart;




