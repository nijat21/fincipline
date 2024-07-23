import { useEffect, useState, useContext, useRef } from "react";
import { FilterContext } from "../context/filter.context";
import { AuthContext } from "../context/auth.context";
import { v4 as uuidv4 } from 'uuid';
import getSymbolFromCurrency from 'currency-symbol-map';
import { format } from 'date-fns';
import { useNavigate } from "react-router-dom";
import Filters from "@/components/Filters";
import SingleTransaction from "@/components/SingleTransaction";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow, } from '@/components/ui/table';
import { motion as m, AnimatePresence } from 'framer-motion';


function TransactionsPage() {
    const { selectedMonth, selectedBank, rangeSubmitClear, setDateRangeMenu, setBankMenu,
        allTransactions, data, selectedTransaction, setSelectedTransaction, isMobile
        ,
        handleOutsideClick, handleExport, handlePrint, retrieveTransactions, filter } = useContext(FilterContext);
    const filterRef = useRef();
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);
    const { user } = useContext(AuthContext);


    // Once user is available, load all transactions
    useEffect(() => {
        retrieveTransactions(user._id);
        console.log('Retrieve in transactionDetails');
    }, []);

    // If bank or month selected, filter the transactions
    // Filter is called 4 times, maybe optimize
    useEffect(() => {
        filter(data);
        // console.log('Filter data run');
    }, [selectedBank, selectedMonth, rangeSubmitClear]);


    // Redirect to SingleTransaction with props
    const handleRowClick = (input) => {
        setShowModal(true);
        setSelectedTransaction(input);
        setDateRangeMenu(false);
        setBankMenu(false);
    };


    return (
        <AnimatePresence>
            <m.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }}
                className="h-screen w-screen flex flex-col justify-start items-center box-border pb-10"
                ref={filterRef} onClick={(e) => handleOutsideClick(e, filterRef)}>
                <h3 className="pt-10 pb-4 text-center">{`Transactions`}</h3>

                <Filters />

                <div className="overflow-y-auto h-half-screen w-[90%] md:w-[70%] rounded-md scrollbar-thumb-rounded-full scrollbar scrollbar-thumb-[#b9b9b9] dark:scrollbar-thumb-blue-900 ">
                    <Table className="box-border">
                        <TableHeader className="text-lg top-0 z-10 sticky bg-[#b9b9b9] dark:bg-blue-900 shadow-lg">
                            <TableRow>
                                <TableHead className="px-10">Transaction</TableHead>
                                <TableHead className="px-10">Date</TableHead>
                                {!isMobile && <TableHead className="px-10">Category</TableHead>}
                                {!isMobile && <TableHead className="px-10">Amount</TableHead>}
                            </TableRow>
                        </TableHeader>
                        <TableBody className="text-xl text-center">
                            {allTransactions && allTransactions.length > 0 && allTransactions.map(tran => {
                                return (
                                    <TableRow key={uuidv4()} onClick={() => handleRowClick(tran)}
                                        className="text-lg border-b dark:hover:bg-blue-800 hover:bg-neutral-300 cursor-pointer">
                                        <TableCell className="text-center flex items-center">
                                            <div className="h-10 my-1">
                                                {tran.logo_url && <img src={tran.logo_url} className="h-10 mr-2 rounded-xl" />}
                                            </div>
                                            {tran.name}
                                        </TableCell>
                                        {!isMobile && <TableCell>{format(new Date(tran.authorized_date), "MMM dd, yyyy")}</TableCell>}
                                        {!isMobile && <TableCell>{tran.category[0]}</TableCell>}
                                        <TableCell>{`${tran.amount > 0 ? '-' : '+'}${Math.abs(tran.amount.toFixed(1))}${getSymbolFromCurrency(tran.iso_currency_code)}`}</TableCell>
                                    </TableRow>);
                            })
                            }
                        </TableBody>
                    </Table>
                </div>
                {/* SingleTransaction Modal */}
                {showModal &&
                    <SingleTransaction onClose={() => setShowModal(false)} transaction={selectedTransaction} />
                }
                <div className="flex justify-end">
                    <button onClick={() => navigate(-1)}
                        className="py-[3px] px-2 my-10 mx-1 border rounded-md border-black dark:border-slate-300 hover:bg-neutral-700 hover:text-white
                        dark:hover:bg-white dark:hover:text-black  hover:border-transparent cursor-pointer">
                        Back
                    </button>
                    {/* Print and Export */}
                    <button onClick={handlePrint}
                        className="py-[3px] px-2 my-10 mx-1 border rounded-md border-black dark:border-slate-300 hover:bg-neutral-700 hover:text-white
                        dark:hover:bg-white dark:hover:text-black  hover:border-transparent cursor-pointer">
                        <i className="fa-solid fa-print mr-1"></i>
                        Print
                        {/* Add a "Print" popup when hovered over */}
                    </button>
                    <button onClick={handleExport}
                        className="py-[3px] px-2 my-10 mx-1 border rounded-md border-black dark:border-slate-300 hover:bg-neutral-700 hover:text-white
                        dark:hover:bg-white dark:hover:text-black  hover:border-transparent cursor-pointer">
                        <i className="fa-solid fa-download mr-1"></i>
                        Export
                        {/* Add a "Export" popup when hovered over */}
                    </button>

                </div>
            </m.div>
        </AnimatePresence>
    );
}


export default TransactionsPage;
