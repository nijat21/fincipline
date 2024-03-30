import { useContext, useEffect, useState } from "react";
import { getBalance } from "../API/plaid.api";
import { Link } from "react-router-dom";
import { v4 as uuidv4 } from 'uuid';
import getSymbolFromCurrency from 'currency-symbol-map';
import Loader from './Loader';


function Balance({ currBank }) {
    const [accounts, setAccounts] = useState([]);
    const [isLoading, setIsLoading] = useState(false);


    // Get balance info for selected bank
    const getAccounts = async (currBank) => {
        if (currBank) {
            try {
                setIsLoading(true);
                const props = { user_id: currBank.user_id, bank_id: currBank._id };
                const accountResponse = await getBalance(props);
                setAccounts(accountResponse.data.accounts);
            } catch (error) {
                console.log('Error retrieving balance information', error);
            } finally {
                setIsLoading(false);
            }
        }
    };


    useEffect(() => {
        setAccounts([]);
        getAccounts(currBank);
    }, [currBank]);


    return (
        <>
            <div className='flex flex-col justify-start'>
                <h1 className='text-5xl text-center'>{currBank ? currBank.institution_name : 'Accounts'}</h1>
            </div>
            {isLoading ?
                <Loader />
                :
                <div className='min-h-3/5 text-xl flex items-center justify-center mb-[-50px]'>
                    <div className="flex flex-col items-center justify-center my-20">
                        {currBank &&
                            <>
                                <table>
                                    <thead className="text-lg h-10 bg-black bg-opacity-20">
                                        <tr>
                                            <th className="px-10">Account</th>
                                            <th className="px-10">Balance</th>
                                        </tr>
                                    </thead>
                                    <tbody className="text-xl text-center">
                                        {accounts && accounts.map(acc => {
                                            return (
                                                <tr key={uuidv4()} className="text-lg border-b">
                                                    <td className="px-10 py-4 text-center">
                                                        {acc.name}
                                                    </td>

                                                    <td>
                                                        {`${acc.balances.available} ${getSymbolFromCurrency(acc.balances.iso_currency_code)}`}
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                                <Link to={'/accounts'} className="mt-6 opacity-50">See all accounts</Link>
                            </>
                        }
                    </div>
                </div>
            }
        </>
    );
}


export default Balance;
