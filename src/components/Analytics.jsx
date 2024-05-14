import { useContext, useEffect, useState } from 'react';
import { FilterContext } from '@/context/filter.context';
import { BarChart, Bar, ResponsiveContainer, XAxis, Legend, LabelList } from 'recharts';
import { Link } from 'react-router-dom';

function Analytics({ currBank }) {
    const { transactionsLTD } = useContext(FilterContext);
    const [data, setData] = useState([]);

    const formGroupData = (transactionsLTD) => {

        // Data piece for online payments per category
        const online = transactionsLTD.filter(tran => tran.payment_channel === 'online');
        const onlineData = online.map(tran => ({
            'category': tran.category[0],
            'online': tran.amount,
            'in_store': '',
            'other': ''
        }));
        console.log('Online payments', online);

        // Data piece for in-store payments per category
        const instore = transactionsLTD.filter(tran => tran.payment_channel === 'in store');
        const instoreData = instore.map(tran => ({
            'category': tran.category[0],
            'online': '',
            'in_store': tran.amount,
            'other': ''
        }));
        console.log('Instore payments', instore);

        // Data piece for other payments per category
        const other = transactionsLTD.filter(tran => tran.payment_channel === 'other');
        const otherData = other.map(tran => ({
            'category': tran.category[0],
            'online': '',
            'in_store': '',
            'other': tran.amount
        }));
        // console.log('Other payments', other);

        // Concatenate all the data pieces
        const newData = [...onlineData, ...instoreData, ...otherData];
        console.log(newData);

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

        // Convert object of objects into an array of objects
        const object = Object.values(categoriesGrouped).map(item => ({
            ...item,
            online: Math.round(item.online),
            in_store: Math.round(item.in_store),
            other: Math.round(item.other),
            total: Math.round(item.online + item.in_store + item.other)
        }));

        console.log(object);
        setData(object);
    };

    useEffect(() => {
        if (transactionsLTD && transactionsLTD.length > 0) {
            formGroupData(transactionsLTD);
        }
    }, [transactionsLTD]);


    return (
        <div className='h-screen w-full flex flex-col justify-center items-center'>
            <div className='w-3/5 h-1/2 flex flex-col justify-center'>
                <h2 className="text-3xl py-10 text-center">{`${currBank ? currBank.institution_name : ''} Spending Analytics`}</h2>
                <p className='w-full text-center pt-2 opacity-50'>Last 30 days</p>
                {data && data.length > 0 &&
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={data}>
                            <XAxis dataKey="category" stroke='#cbd5e1' />
                            {/* <LabelList dataKey="total" position="top" />  */}
                            <Bar dataKey="online" stackId="a" fill="#1d60d8" label={{ position: 'center', fill: '#cbd5e1' }}>
                            </Bar>
                            <Bar dataKey="in_store" stackId="a" fill="#3b94f6" label={{ position: 'center', fill: '#cbd5e1' }}>
                            </Bar>
                            <Bar dataKey="other" stackId="a" fill="#93cffd" label={{ position: 'center', fill: '#cbd5e1' }}>
                            </Bar>
                            <Legend />
                        </BarChart>
                    </ResponsiveContainer>
                }
            </div>

            <Link to={'/'}
                className="p-2 py-[10px] my-4 mx-2 px-4 text-lg border rounded-md border-black dark:border-slate-300 hover:bg-neutral-700 hover:text-white
                            dark:hover:bg-white dark:hover:text-black  hover:border-transparent cursor-pointer">
                See More
            </Link>
        </div>
    );
}

export default Analytics;




