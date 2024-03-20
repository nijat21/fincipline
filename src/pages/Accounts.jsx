import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/auth.context";
import { getAccounts, getBanks } from "../API/account.api";
import { Link } from "react-router-dom";
import { v4 as uuidv4 } from 'uuid';

function Accounts() {
    const { user, isLoading, setIsLoading, banks } = useContext(AuthContext);
    { console.log(banks); }
    return (
        <div className=" h-screen flex items-start justify-center mt-20">
            <table className="table-auto">
                <thead>
                    <tr className="bg-slate-800">
                        <th className="p-2">Bank name</th>
                        <th className="p-2">Mask</th>
                        <th className="p-2">Type</th>
                        <th className="p-2">Subtype</th>
                        <th className="p-2">Balance</th>
                    </tr>
                </thead>
                <tbody>
                    {banks && banks.map(bank => {
                        return (
                            <tr key={uuidv4()}>
                                <td className="px-10 py-4 text-center">
                                    <Link>{bank.institution_name}</Link>
                                </td>
                                <td className="p-2">
                                    {
                                        bank.accounts.map(bankAcc => {
                                            return (
                                                <div key={uuidv4()}>
                                                    <Link>{bankAcc.account_mask}</Link>
                                                </div>
                                            );
                                        })
                                    }
                                </td>
                                <td className="p-2">
                                    {
                                        bank.accounts.map(bankAcc => {
                                            return (
                                                <div key={uuidv4()}>
                                                    <Link>{bankAcc.acc_type}</Link>
                                                </div>
                                            );
                                        })
                                    }
                                </td>
                                <td className="p-2">
                                    {
                                        bank.accounts.map(bankAcc => {
                                            return (
                                                <div key={uuidv4()}>
                                                    <Link>{bankAcc.acc_subtype}</Link>
                                                </div>
                                            );
                                        })
                                    }
                                </td>

                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}

export default Accounts;
