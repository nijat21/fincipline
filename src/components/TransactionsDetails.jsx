import { useEffect, useState, useContext } from "react";
import { FilterContext } from "../context/filter.context";
import { AuthContext } from "../context/auth.context";
import { v4 as uuidv4 } from 'uuid';
import getSymbolFromCurrency from 'currency-symbol-map';
import { format } from 'date-fns';
import { getBanks } from "../API/account.api";
import { getTransactions } from "../API/plaid.api";
import { useNavigate } from "react-router-dom";
import Filters from "./Filters";

function TransactionsDetails() {
    const { user, banks } = useContext(AuthContext);
    const { currMonth, setCurrMonth, selectedBank, setSelectedMonth } = useContext(FilterContext);
    const navigate = useNavigate();
    const [banksTransactions, setBanksTransactions] = useState([]);
    const [theBank, setTheBank] = useState(null);

    // Create a map to keep track of banks already added to banksTransactions
    const addedBanksMap = new Map(banksTransactions.map(bank => [bank._id, bank]));

    // Retrieve transactions
    const retrieveTransactions = async () => {
        if (banks.length > 0) {
            // console.log(banks);
            for (const bank of banks) {
                if (!addedBanksMap.has(bank._id)) {
                    try {
                        const params = { user_id: bank.user_id, bank_id: bank._id };
                        const transactions = await getTransactions(params);
                        const addedTransactions = transactions.data.added_transactions;
                        const newBank = {
                            ...bank,
                            added_transactions: addedTransactions
                        };
                        addBankTransactions(newBank);
                    } catch (error) {
                        console.log('Error retrieving transactions', error);
                    }
                }
            }
        }
    };

    // Adding bank with transactions into banksTransactions array
    const addBankTransactions = newBank => {
        setBanksTransactions(prevBanks => [...prevBanks, newBank]);
    };


    useEffect(() => {
        retrieveTransactions();
        // console.log(banksTransactions);
    }, [banks]);


    // Filter by bank
    useEffect(() => {
        if (selectedBank && banksTransactions.length > 0) {
            const bankFound = banksTransactions.find(bank => bank.institution_id === selectedBank.institution_id);
            setTheBank(bankFound);
        } else {
            setTheBank(null);
        }
    }, [selectedBank, banksTransactions]);


    // Set the default to last month
    useEffect(() => {
        const date = new Date();

        // Format the date to "Mar'24" format
        const formattedDate = date.toLocaleDateString('en-US', {
            month: 'short',
            year: '2-digit',
        });
        setSelectedMonth(formattedDate);
    }, []);


    // Filter by custom range



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
                        {theBank ?
                            (

                                theBank.added_transactions.length > 0 && theBank.added_transactions.map(tran => {
                                    return (
                                        <tr key={uuidv4()} className="text-lg border-b min-h-">
                                            <td>{theBank.institution_name}</td>
                                            <td className="px-10 py-2 text-center flex items-center">
                                                {tran.logo_url && <img src={tran.logo_url} className="h-10 mr-6 my-2" />}
                                                {tran.name}
                                            </td>
                                            <td>{format(new Date(tran.date), "MMM dd, yyyy")}</td>
                                            <td>{tran.category[0]}</td>
                                            <td>{`${tran.amount}${getSymbolFromCurrency(tran.iso_currency_code)}`}</td>
                                        </tr>);
                                })
                            )
                            :
                            (
                                banksTransactions.length > 0 && banksTransactions.map(Bank => {
                                    return (
                                        Bank.added_transactions.length > 0 && Bank.added_transactions.map(tran => {
                                            return (
                                                <tr key={uuidv4()} className="text-lg border-b min-h-">
                                                    <td>{Bank.institution_name}</td>
                                                    <td className="px-10 py-2 text-center flex items-center">
                                                        {tran.logo_url && <img src={tran.logo_url} className="h-10 mr-6 my-2" />}
                                                        {tran.name}
                                                    </td>
                                                    <td>{format(new Date(tran.date), "MMM dd, yyyy")}</td>
                                                    <td>{tran.category[0]}</td>
                                                    <td>{`${tran.amount}${getSymbolFromCurrency(tran.iso_currency_code)}`}</td>
                                                </tr>);
                                        })
                                    );
                                })
                            )
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
