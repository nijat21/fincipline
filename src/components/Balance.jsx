import { useContext, useEffect, useState } from "react";
import { getBalance } from "../API/plaid.api";
import { Link } from "react-router-dom";
import { v4 as uuidv4 } from 'uuid';
import getSymbolFromCurrency from 'currency-symbol-map';
import Loader from './Loader';
import { Trash2 } from 'lucide-react';
import { deleteAccount } from "@/API/account.api";
import { toast } from 'sonner';
import { AuthContext } from "@/context/auth.context";
import { FilterContext } from "@/context/filter.context";
import PlaidLink from "@/pages/PlaidLink";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";


function Balance({ currBank, setCurrBank }) {
    const [accounts, setAccounts] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const { banks } = useContext(AuthContext);
    const { setSelectedBank } = useContext(FilterContext);


    // Handle bank select
    const handleSelect = (value) => {
        // Find the selected bank object based on the value
        const selectedBank = banks.find(bank => bank.institution_name === value);
        if (selectedBank) {
            localStorage.setItem('currBank', JSON.stringify(selectedBank));
            setCurrBank(selectedBank);
            setSelectedBank(selectedBank);
            // console.log(selectedBank);
        }
    };

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

    // When bank selected, retrieve and assign current bank
    useEffect(() => {
        setAccounts([]);
        getAccounts(currBank);
    }, [currBank]);


    // Deleting the bank connection 
    const handleDeleteBank = async () => {
        if (currBank) {
            try {
                const messageResponse = await deleteAccount({ bank_id: currBank._id });
                toast.success(messageResponse.data.message);
                setAccounts([]);
                setCurrBank(null);
            } catch (error) {
                console.log('Error deleting the bank account', error);
            }
        } else {
            console.log('No bank selected!');
        }
    };


    return (
        <>
            <div className='flex flex-col justify-start'>
                <h1 className='text-center'>{currBank ? currBank.institution_name : 'Accounts'}</h1>
            </div>
            {isLoading ?
                <Loader />
                :
                <div className='min-h-3/5 text-xl flex items-center justify-center mb-[-50px]'>
                    <div className="flex flex-col items-center justify-center my-20">
                        {currBank ?
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
                                <button className="mt-6 opacity-50 hover:opacity-100 flex text-lg" onClick={handleDeleteBank}>
                                    <Trash2 className="pr-1" />
                                    Delete connection
                                </button>
                            </>
                            :
                            <div>
                                {banks && banks.length > 0 ? 'No Bank Selected' : 'No Bank Registered'}
                            </div>
                        }
                    </div>
                </div>
            }

            {/* Bank selection drop-down */}
            {banks && banks.length > 0 &&
                <div className='w-[188px] flex justify-center py-2'>
                    <Select onValueChange={(value) => handleSelect(value)}
                        className="text-lg">
                        <SelectTrigger>
                            <SelectValue placeholder={currBank ?
                                currBank.institution_name
                                :
                                <>
                                    Select your bank
                                </>
                            } />
                        </SelectTrigger>
                        <SelectContent>
                            {banks.length > 0 && banks.map(bank => {
                                return (
                                    <SelectItem key={uuidv4()} value={bank.institution_name}>
                                        {bank.institution_name}
                                    </SelectItem>
                                );
                            })}

                        </SelectContent>
                    </Select>
                </div>
            }
            {/* Adding new bank account */}
            <PlaidLink />
        </>
    );
}


export default Balance;
