import { useEffect, useState, useContext, useRef } from "react";
import { FilterContext } from "../context/filter.context";
import { AuthContext } from "../context/auth.context";
import { v4 as uuidv4 } from 'uuid';
import getSymbolFromCurrency from 'currency-symbol-map';
import { format } from 'date-fns';
import { useNavigate } from "react-router-dom";
import Filters from "./Filters";
import SingleTransaction from "./SingleTransaction";


function TransactionsDetails() {
    const { selectedMonth, selectedBank, rangeSubmitClear, setDateRangeMenu, setBankMenu,
        allTransactions, data, selectedTransaction, setSelectedTransaction
        ,
        // Functions
        handleOutsideClick, handleExport, handlePrint, retrieveTransactions, filter
    } = useContext(FilterContext);
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
        <div className="h-screen w-screen-screen w-screen flex flex-col justify-start items-center box-border pb-10"
            ref={filterRef} onClick={(e) => handleOutsideClick(e, filterRef)}>
            <h1 className="text-3xl pt-10 pb-4 text-center">{`Transactions`}</h1>

            <Filters />
            <div className="overflow-y-auto h-half-screen">
                <table className="box-border">
                    <thead className="text-lg h-10 bg-black bg-opacity-20">
                        <tr>
                            <th className="px-10">Transaction</th>
                            <th className="px-10">Date</th>
                            <th className="px-10">Category</th>
                            <th className="px-10">Amount</th>
                        </tr>
                    </thead>
                    <tbody className="text-xl text-center">
                        {allTransactions && allTransactions.length > 0 && allTransactions.map(tran => {
                            return (
                                <tr key={uuidv4()} onClick={() => handleRowClick(tran)}
                                    className="text-lg border-b dark:hover:bg-blue-800 hover:bg-opacity-15 hover:bg-black cursor-pointer">
                                    <td className="px-10 py-2 text-center flex items-center">
                                        <div className="h-10 my-1">
                                            {tran.logo_url && <img src={tran.logo_url} className="h-10 mr-6 rounded-xl" />}
                                        </div>
                                        {tran.name}
                                    </td>
                                    <td>{format(new Date(tran.authorized_date), "MMM dd, yyyy")}</td>
                                    <td>{tran.category[0]}</td>
                                    <td>{`${-tran.amount}${getSymbolFromCurrency(tran.iso_currency_code)}`}</td>
                                </tr>);
                        })
                        }
                    </tbody>
                </table>
                {/* SingleTransaction Modal */}
                {showModal &&
                    <SingleTransaction onClose={() => setShowModal(false)} transaction={selectedTransaction} />
                }
            </div>
            <div className="flex justify-end">
                <button onClick={() => navigate(-1)}
                    className="p-2 px-2 my-10 mx-1 border rounded-md border-black dark:border-slate-300 hover:bg-neutral-700 hover:text-white
                    dark:hover:bg-white dark:hover:text-black  hover:border-transparent cursor-pointer">
                    Back
                </button>
                {/* Print and Export */}
                <button onClick={handlePrint}
                    className="p-2 px-2 my-10 mx-1 border rounded-md border-black dark:border-slate-300 hover:bg-neutral-700 hover:text-white
                    dark:hover:bg-white dark:hover:text-black  hover:border-transparent cursor-pointer">
                    <i className="fa-solid fa-print mr-1"></i>
                    Print
                    {/* Add a "Print" popup when hovered over */}
                </button>
                <button onClick={handleExport}
                    className="p-2 px-2 my-10 mx-1 border rounded-md border-black dark:border-slate-300 hover:bg-neutral-700 hover:text-white
                    dark:hover:bg-white dark:hover:text-black  hover:border-transparent cursor-pointer">
                    <i className="fa-solid fa-download mr-1"></i>
                    Export
                    {/* Add a "Export" popup when hovered over */}
                </button>
            </div>
        </div>
    );
}

export default TransactionsDetails;
