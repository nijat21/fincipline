import { useEffect, useState, useContext } from "react";
import { FilterContext } from "../context/filter.context";
import { AuthContext } from "../context/auth.context";
import { v4 as uuidv4 } from 'uuid';
import getSymbolFromCurrency from 'currency-symbol-map';
import { format } from 'date-fns';
import { getBanks } from "../API/account.api";
import { getAllTransactions } from "../API/plaid.api";
import { useNavigate } from "react-router-dom";
import Filters from "./Filters";

function TransactionsDetails() {
    const { user, currBank } = useContext(AuthContext);
    const { currMonth, setCurrMonth, selectedBank, setSelectedMonth } = useContext(FilterContext);
    const [allTransactions, setAllTransactions] = useState(null);
    const navigate = useNavigate();

    const [banksTransactions, setBanksTransactions] = useState([]);


    // Retrieve all transactions
    const retrieveTransactions = async (id) => {
        if (!id) {
            console.log('User ID is not present');
        }
        try {
            const params = { user_id: id };
            const transactions = await getAllTransactions(params);

            // If there's a bank selected, filter the array to show only that bank's transactions
            // institution_id
            if (selectedBank) {
                const bankTran = transactions.data.sorted_transactions.filter(tran => {
                    return tran.account_details.institution_id === selectedBank.institution_id;
                });
                setAllTransactions(bankTran);
            } else {
                setAllTransactions(transactions.data.sorted_transactions);
            }
        } catch (error) {
            console.log('Error retrieving transactions', error);
        }
    };

    // Sort transactions by bank


    // Sort all transactions by month
    // const sortTransactions = () => {

    // };

    // Once user is available, load all transactions
    useEffect(() => {
        retrieveTransactions(user._id);
    }, [user, selectedBank]);



    return (
        <div className="h-screen w-screen-screen w-screen flex flex-col justify-start items-center box-border pb-10">
            <h2 className="text-3xl pt-10 pb-4 text-center">{`Recent Transactions`}</h2>

            <Filters />
            <div className="overflow-y-auto h-half-screen">
                <table className="box-border">
                    <thead className="text-lg h-10 bg-black bg-opacity-20">
                        <tr>
                            <th className="px-10">Bank</th>
                            <th className="px-10">Transaction</th>
                            <th className="px-10">Date</th>
                            <th className="px-10">Category</th>
                            <th className="px-10">Amount</th>
                        </tr>
                    </thead>
                    <tbody className="text-xl text-center">
                        {allTransactions && allTransactions.length > 0 && allTransactions.map(tran => {
                            return (
                                <tr key={uuidv4()} className="text-lg border-b min-h-">
                                    <td>{tran.account_details.institution_name}</td>
                                    <td className="px-10 py-2 text-center flex items-center">
                                        <div className="h-10 my-1">
                                            {tran.logo_url && <img src={tran.logo_url} className="h-10 mr-6" />}
                                        </div>
                                        {tran.name}
                                    </td>
                                    <td>{format(new Date(tran.date), "MMM dd, yyyy")}</td>
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
