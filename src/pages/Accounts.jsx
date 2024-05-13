import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/auth.context";
import { getAccounts, getBanks } from "../API/account.api";
import { Link } from "react-router-dom";
import { v4 as uuidv4 } from 'uuid';


function Accounts() {
    const { user, isLoading, setIsLoading, banks } = useContext(AuthContext);
    // { console.log(banks); }
    return (
        <div className=" h-screen flex items-start justify-center">
            <h1 className="text-5xl m-10">Accounts</h1>
            <div className="flex flex-col items-center justify-center0">
                {/* {banks && banks.map(bank => {
                    <table>
                        <thead className="text-lg  bg-black bg-opacity-20">
                            <tr>
                                <th className="px-10">Bank</th>
                                <th className="px-10">Account</th>
                                <th className="px-10">Balance</th>
                            </tr>
                        </thead>
                        <tbody className="text-xl text-center">
                            {bank.accounts && bank.accounts.map(acc => {
                                return (
                                    <tr key={uuidv4()} className="text-lg border-b">
                                        <td className="px-10 py-4 text-center">
                                            {bank.institution_name}
                                        </td>
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
                    </table>;
                })
                } */}
                <Link to={'/accounts'} className="mt-6 opacity-50">See all accounts</Link>
            </div>
        </div>
    );
}

export default Accounts;
