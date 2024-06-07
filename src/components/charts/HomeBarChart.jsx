import { useContext, useEffect, useState } from 'react';
import { FilterContext } from '@/context/filter.context';
import {
    BarChart, Bar, ResponsiveContainer, XAxis, YAxis, Label, CartesianGrid, Legend, Tooltip,

} from 'recharts';
import { Link } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';


const channels = [];
const baseColors = ['#82c', '#8884d8', '#82ca9d', '#ffc658', '#a4de6c', '#d0ed57', '#8dd1e1', '#ff8042', '#ffbb28', '#a5a5a5'];
const colors = { 'Online': baseColors[0], 'In store': baseColors[1], 'Other': baseColors[2] };


function HomeBarChart({ currBank }) {
    const { transactionsLTD } = useContext(FilterContext);
    const [data, setData] = useState([]);

    // Capitalize the first letter of the channels
    const capitalize = (str) => str[0].toUpperCase() + str.slice(1);

    const formGroupData = (transactionsLTD) => {
        const dt = [];
        // Looping and adding all the data shortly
        const newData = transactionsLTD.map(tran => {

            const object = { 'category': tran.category[0], [capitalize(tran.payment_channel)]: tran.amount };
            // Check if the category exists in array, then check if channel exists
            // If channel also exists, add the amount, if not add channel and amount
            // If category doesn't exist, add category and relative channels

        });
    };
    console.log("New data", newData);

    // console.log(object);
    // setData(object);
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

                {/* {payload[0].value &&
                    <p className='text-sm text-indigo-400'>
                        Online:
                        <span className='ml-2'>${payload[0].value}</span>
                    </p>}
                {payload[1].value &&
                    <p className='text-sm text-blue-700'>
                        In store:
                        <span className='ml-2'>${payload[1].value}</span>
                    </p>} */}
                {/* {payload[2].value &&
                    <p className='text-sm text-blue-500'>
                        Other:
                        <span className='ml-2'>${payload[2].value}</span>
                    </p>} */}
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


export default HomeBarChart;




