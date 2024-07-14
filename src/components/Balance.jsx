import { useContext, useEffect, useState } from "react";
import { getBalance } from "../API/plaid.api";
import { v4 as uuidv4 } from 'uuid';
import getSymbolFromCurrency from 'currency-symbol-map';
import Loader from './Loader';
import { Trash2 } from 'lucide-react';
import { deleteAccount } from "@/API/account.api";
import { toast } from 'sonner';
import { AuthContext } from "@/context/auth.context";
import { FilterContext } from "@/context/filter.context";
import PlaidLink from "@/pages/PlaidLink";
import { Select, SelectContent, SelectItem, SelectLabel, SelectTrigger, SelectValue, SelectGroup } from "@/components/ui/select";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow, } from '@/components/ui/table';

function Balance() {
    const [accounts, setAccounts] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const { banks, renderBanks } = useContext(AuthContext);
    const { setSelectedBank, currBank, setCurrBank } = useContext(FilterContext);


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
                localStorage.removeItem('currBank');
                await renderBanks();
            } catch (error) {
                console.log('Error deleting the bank account', error);
            }
        } else {
            console.log('No bank selected!');
        }
    };


    return (
        <div className="h-96 md:h-home-screen flex flex-col items-center justify-center w-full py-10 mb-2 md:shadow-none">
            <div className='flex flex-col justify-start'>
                <h1 className='text-center text-3xl md:text-5xl'>{currBank ? currBank.institution_name : 'Accounts'}</h1>
            </div>
            {isLoading ?
                <Loader />
                :
                <div className='min-h-3/5 text-xl flex items-center justify-center mb-[-50px] relative'>
                    <div className="flex flex-col items-center justify-center my-4 pb-4 pt-2">
                        {banks && banks.length && currBank ?
                            <>
                                <Table>
                                    <TableHeader className="text-lg">
                                        <TableRow>
                                            <TableHead className='text-center'>Account</TableHead>
                                            <TableHead className='text-center'>Balance</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody className="text-xl">
                                        {accounts && accounts.map(acc => {
                                            return (
                                                <TableRow key={uuidv4()} className="text-xl text-center">
                                                    <TableCell>
                                                        {acc.name}
                                                    </TableCell>

                                                    <TableCell className="text-center">
                                                        {`${acc.balances.available} ${getSymbolFromCurrency(acc.balances.iso_currency_code)}`}
                                                    </TableCell>
                                                </TableRow>
                                            );
                                        })}
                                    </TableBody>
                                </Table>
                                <button className="my-4 opacity-50 hover:opacity-100 flex text-lg" onClick={handleDeleteBank}>
                                    <Trash2 className="pr-1" />
                                    Delete connection
                                </button>
                            </>
                            :
                            <div className="relative py-10">
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
                        <SelectTrigger className="text-lg text-center border-black dark:border-slate-300 hover:bg-neutral-700 hover:text-white
                        dark:hover:bg-white dark:hover:text-black hover:border-transparent cursor-pointer flex justify-center">
                            <SelectValue placeholder={currBank ?
                                currBank.institution_name
                                :
                                <>
                                    Select your bank
                                </>
                            } />
                        </SelectTrigger>
                        <SelectContent className="bg-neutral-300 dark:bg-white"
                            ref={(ref) => {
                                if (!ref) return;
                                ref.ontouchstart = (e) => e.preventDefault();
                            }}
                        >
                            <SelectGroup>
                                {banks.length > 0 && banks.map(bank => {
                                    return (
                                        <SelectItem className="text-md dark:text-slate-300 cursor-pointer block"
                                            key={uuidv4()}
                                            value={bank.institution_name}
                                        >
                                            {bank.institution_name}
                                        </SelectItem>
                                    );
                                })}

                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>
            }
            {/* Adding new bank account */}
            <div className="">
                <PlaidLink />
            </div>
        </div>
    );
}


export default Balance;
