import { useEffect, useState, useContext } from "react";
import { FilterContext } from "../context/filter.context";
import { AuthContext } from "../context/auth.context";
import { v4 as uuidv4 } from 'uuid';
import getSymbolFromCurrency from 'currency-symbol-map';
import { format } from 'date-fns';
import { useNavigate } from "react-router-dom";
import { jsPDF } from "jspdf";
import { getAllTransactions } from "../API/plaid.api";
import Filters from "./Filters";


function TransactionsDetails() {
    const { user } = useContext(AuthContext);
    const { selectedMonth, selectedBank, startDate, endDate, rangeSelected, rangeSubmitClear, Export, Print } = useContext(FilterContext);
    const [data, setData] = useState(null);
    const [allTransactions, setAllTransactions] = useState(null);
    const navigate = useNavigate();


    // Retrieve all transactions
    const retrieveTransactions = async (id) => {
        if (!id) {
            console.log('User ID is not present');
        }
        try {
            const params = { user_id: id };
            const transactions = await getAllTransactions(params);
            const result = transactions.data.sorted_transactions;
            setData(result);
            // If bank or month is selected
            if (selectedBank || selectedMonth || rangeSelected) {
                filter(result);
            } else {
                setAllTransactions(result);
            }
            console.log("retrieveTransaction ran"); // RetrieveTransactions runs more than once
        } catch (error) {
            console.log('Error retrieving transactions', error);
        }
    };

    // Once user is available, load all transactions
    useEffect(() => {
        retrieveTransactions(user._id);
    }, []);


    // Filter by bank
    const filterByBank = (input) => {
        // If Bank is selected
        if (selectedBank && input && input.length > 0) {
            const bankTran = input.filter(tran => {
                return tran.account_details.institution_id === selectedBank.institution_id;
            });
            return bankTran;
        }
    };

    // Filter by Month
    const filterByMonth = (input) => {
        // Mapping month format to numbers
        const monthMap = {
            Jan: 1, Feb: 2, Mar: 3, Apr: 4, May: 5, Jun: 6,
            Jul: 7, Aug: 8, Sep: 9, Oct: 10, Nov: 11, Dec: 12
        };

        // If month is selected 
        if (selectedMonth) {
            if (input && input.length > 0) {
                const month = selectedMonth.slice(0, 3);
                const year = selectedMonth.slice(4, 6);
                // console.log(monthMap[month], "Year", year);
                // console.log(input);

                const monthTran = input.filter(tran => {
                    const tranMonth = tran.authorized_date.slice(5, 7);
                    if (tranMonth < 10) tranMonth.slice(1,);
                    const tranYear = tran.authorized_date.slice(2, 4);
                    return tranMonth == monthMap[month] && tranYear === year;
                });

                // console.log(monthTran);
                return monthTran;
            }
        } else {
            return input;
        }
    };

    // Filter by range
    const filterByRange = (input) => {
        if (input && startDate && endDate) {
            const rangeFiltered = input.filter(tran => {
                // Convert transaction date string to Date objects
                const tranDate = new Date(tran.authorized_date);
                const startDateObj = new Date(startDate);
                const endDateObj = new Date(endDate);

                // Check if transaction date is within the date range
                return tranDate >= startDateObj && tranDate <= endDateObj;
            });
            return rangeFiltered;
        }
    };

    // Filter all
    const filter = (data) => {
        try {
            // Ignore running steps if there's no input for a certain step
            // Either month is selected or a custom range. They can't be selected together
            const rawData = JSON.parse(JSON.stringify(data));
            let filtered;

            if (selectedBank && selectedMonth && !rangeSelected) {
                filtered = filterByMonth(filterByBank(rawData));
            } else if (selectedBank && !selectedMonth && rangeSelected) {
                filtered = filterByRange(filterByBank(rawData));
            } else if (!selectedBank && !selectedMonth && rangeSelected) {
                filtered = filterByRange(rawData);
            } else if (!selectedBank && selectedMonth && !rangeSelected) {
                filtered = filterByMonth(rawData);
            } else if (selectedBank && !selectedMonth && !rangeSelected) {
                filtered = filterByBank(rawData);
            } else if (!selectedBank && !selectedMonth && !rangeSelected) {
                filtered = rawData;
            }
            setAllTransactions(filtered);
            console.log("Filter ran");
        } catch (error) {
            console.log("Error occured filtering the transactions", error);
            // setFilterComplete(false);
        }
    };


    // If bank or month selected, filter the transactions
    // Filter is called 4 times, maybe optimize
    useEffect(() => {
        filter(data);
    }, [selectedBank, selectedMonth, rangeSubmitClear]);


    // Export PDF
    const generatePDF = () => {
        const doc = new jsPDF();
        const tableRows = [];
        if (allTransactions && allTransactions.length > 0) {

            allTransactions.forEach((tran) => {
                const rowData = [
                    tran.name,
                    format(new Date(tran.authorized_date), "MMM dd, yyyy"),
                    tran.category[0],
                    `${tran.amount}${getSymbolFromCurrency(tran.iso_currency_code)}`,
                ];
                tableRows.push(rowData);
            });

            doc.autoTable({
                head: [["Transaction", "Date", "Category", "Amount"]],
                body: tableRows,
            });

            doc.save("transactions.pdf");
        }
    };

    useEffect(() => {
        generatePDF();
    }, [Export]);

    return (
        <div className="h-screen w-screen-screen w-screen flex flex-col justify-start items-center box-border pb-10">
            <h2 className="text-3xl pt-10 pb-4 text-center">{`Recent Transactions`}</h2>

            <Filters />
            <div className="overflow-y-auto h-half-screen">
                <table className="box-border">
                    <thead className="text-lg h-10 bg-black bg-opacity-20">
                        <tr>
                            {/* <th className="px-10">Bank</th> */}
                            <th className="px-10">Transaction</th>
                            <th className="px-10">Date</th>
                            <th className="px-10">Category</th>
                            <th className="px-10">Amount</th>
                        </tr>
                    </thead>
                    <tbody className="text-xl text-center">
                        {allTransactions && allTransactions.length > 0 && allTransactions.map(tran => {
                            return (
                                <tr key={uuidv4()} className="text-lg border-b dark:hover:bg-blue-800 hover:bg-opacity-15 hover:bg-black cursor-pointer">
                                    {/* <td>{tran.account_details.institution_name}</td> */}
                                    <td className="px-10 py-2 text-center flex items-center">
                                        <div className="h-10 my-1">
                                            {tran.logo_url && <img src={tran.logo_url} className="h-10 mr-6" />}
                                        </div>
                                        {tran.name}
                                    </td>
                                    <td>{format(new Date(tran.authorized_date), "MMM dd, yyyy")}</td>
                                    <td>{tran.category[0]}</td>
                                    <td>{`${tran.amount}${getSymbolFromCurrency(tran.iso_currency_code)}`}</td>
                                </tr>);
                        })
                        }
                    </tbody>
                </table>
            </div>
            <div className="flex justify-end">
                <button onClick={() => navigate(-1)}
                    className="p-2 px-4 m-10 border rounded-md border-black dark:border-slate-300 hover:bg-neutral-700 hover:text-white
                    dark:hover:bg-white dark:hover:text-black  hover:border-transparent cursor-pointer">
                    Back
                </button>
            </div>
        </div>
    );
}

export default TransactionsDetails;
