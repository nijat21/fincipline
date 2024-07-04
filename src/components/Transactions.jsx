import { useEffect, useState, useContext } from "react";
import { FilterContext } from "@/context/filter.context";
import { v4 as uuidv4 } from 'uuid';
import { getBankTransactions } from "../API/plaid.api";
import { format } from 'date-fns';
import getSymbolFromCurrency from 'currency-symbol-map';
import SingleTransaction from "./SingleTransaction";
import { Link } from "react-router-dom";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow, } from '@/components/ui/table';


function Transactions({ isMobile }) {
    const [recentTransactions, setRecentTransactions] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedTransaction, setSelectedTransaction] = useState(null);
    const { setTransactionsLTD, currBank } = useContext(FilterContext);

    // Get last 30 days
    const filterLTD = (input) => {
        const today = new Date();
        const thirtyDaysAgo = new Date(new Date().setDate(today.getDate() - 30)).toISOString().split('T')[0];
        const tranLTD = input.filter(tran => tran.authorized_date >= thirtyDaysAgo && tran.amount > 0);
        // console.log(tranLTD);
        setTransactionsLTD(tranLTD);
    };


    // Retrieve transactions
    const retrieveTransactions = async (currBank) => {
        if (currBank) {
            try {
                const params = { user_id: currBank.user_id, bank_id: currBank._id };
                const transactions = await getBankTransactions(params);
                console.log('Transactions', transactions.data.added_transactions);
                setRecentTransactions(transactions.data.added_transactions.slice(0, 5));
                filterLTD(transactions.data.added_transactions);
            } catch (error) {
                console.log('Error retrieving transactions', error);
            }
        }
    };

    // When bank is selected, retrieve transactions
    useEffect(() => {
        retrieveTransactions(currBank);
    }, [currBank]);

    // Redirect to SingleTransaction with props
    const handleRowClick = (input) => {
        setShowModal(true);
        setSelectedTransaction(input);
    };


    return (
        <div className="mx-4 px-6 border rounded-xl pb-4">
            {/* <h2 className="text-3xl py-10 text-center">{`Recent Transactions`}</h2> */}
            <div className="rounded-lg pt-4">
                {currBank &&
                    <Table className="box-border ">
                        <TableHeader className="text-lg h-10">
                            <TableRow>
                                <TableHead className="text-center">Transaction</TableHead>
                                {!isMobile && <TableHead className="text-center">Date</TableHead>}
                                <TableHead className="text-center">Amount</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody className="text-xl text-center">
                            {recentTransactions && recentTransactions.map(tran => {
                                return (
                                    <TableRow key={uuidv4()} onClick={() => handleRowClick(tran)}
                                        className="text-lg dark:hover:bg-blue-800 hover:bg-neutral-300 cursor-pointer">
                                        {/* <td>{tran.account_details.institution_name}</td> */}
                                        <TableCell className="text-center flex items-center">
                                            <div className="h-10 my-1">
                                                {tran.logo_url && <img src={tran.logo_url} className="h-10 mr-2 rounded-xl" />}
                                            </div>
                                            {tran.name}
                                        </TableCell>
                                        {!isMobile && <TableCell className='text-center'>{format(new Date(tran.date), "MMM dd, yyyy")}</TableCell>}
                                        <TableCell>{`${tran.amount}${getSymbolFromCurrency(tran.iso_currency_code)}`}</TableCell>
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                }
            </div>
            {/* SingleTransaction Modal */}
            {showModal &&
                <SingleTransaction onClose={() => setShowModal(false)} transaction={selectedTransaction} />
            }


            {!currBank && (
                <div className="flex justify-center">
                    <h1 className="text-xl pt-6">No bank selected.</h1>
                </div>
            )}

            <div className='flex justify-center items-center mt-2'>
                <Link to={'/transactions'}
                    className="p-2 text-lg border rounded-md border-black dark:border-slate-300 hover:bg-neutral-700 hover:text-white
                            dark:hover:bg-white dark:hover:text-black  hover:border-transparent cursor-pointer">
                    See More
                </Link>
            </div>
        </div>
    );
}

export default Transactions;
