import { useContext, useEffect, useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import { getTransactions } from "../API/plaid.api";
import { Link } from "react-router-dom";
import { format } from 'date-fns';
import getSymbolFromCurrency from 'currency-symbol-map';

function Transactions({ currBank }) {
    // console.log(currBank);
    const [addedTransactions, setAddedTransactions] = useState([]);
    const [recentTransactions, setRecentTransactions] = useState([]);


    // Retrieve transactions
    const retrieveTransactions = async (currBank) => {
        if (currBank) {
            try {
                const params = { user_id: currBank.user_id, bank_id: currBank._id };
                const transactions = await getTransactions(params);
                setAddedTransactions(transactions.data.added_transactions);
                setRecentTransactions(transactions.data.added_transactions.slice(0, 5));
            } catch (error) {
                console.log('Error retrieving transactions', error);
            }
        }
    };

    // When bank is selected, retrieve transactions
    useEffect(() => {
        retrieveTransactions(currBank);
    }, [currBank]);


    return (
        <div>
            <h2 className="text-3xl py-10 text-center">{`Recent Transactions`}</h2>

            <table className="box-border">
                <thead className="text-lg h-10 bg-black bg-opacity-20">
                    <tr>
                        <th className="px-10">Name</th>
                        <th className="px-10">Date</th>
                        <th className="px-10">Category</th>
                        <th className="px-10">Amount</th>
                    </tr>
                </thead>
                <tbody className="text-xl text-center">
                    {recentTransactions && recentTransactions.map(tran => {
                        return (
                            <tr key={uuidv4()} className="text-lg border-b min-h-">
                                <td className="px-10 py-2 text-center flex items-center">
                                    {tran.logo_url && <img src={tran.logo_url} className="h-10 mr-6 my-2" />}
                                    {tran.name}
                                </td>
                                <td>{format(new Date(tran.date), "MMM dd, yyyy")}</td>
                                <td>{tran.category[0]}</td>
                                <td>{`${tran.amount}${getSymbolFromCurrency(tran.iso_currency_code)}`}</td>
                            </tr>);
                    })}
                </tbody>
            </table>
        </div>
    );
}

export default Transactions;