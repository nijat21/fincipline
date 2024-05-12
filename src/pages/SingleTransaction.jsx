import { useLocation } from "react-router-dom";
import getSymbolFromCurrency from 'currency-symbol-map';

function SingleTransaction() {
    // Retrieve the transaction passed by state in Navigate
    const location = useLocation();
    const transaction = location.state.transaction;

    return (
        <div className="h-screen w-full flex justify-center">
            {transaction &&
                <div className="w-full flex flex-col items-center">
                    <div className="flex flex-col items-center h-64 w-full bg-black bg-opacity-20 dark:bg-blue-800 dark:bg-opacity-40">
                        <div className="flex items-center justify-center h-48">
                            <div className="m-10 flex flex-col items-center">
                                <h1 className="p-4 text-3xl">{`${-transaction.amount}${getSymbolFromCurrency(transaction.iso_currency_code)}`}</h1>
                                <h1 className="text-xl">{transaction.name}</h1>
                            </div>
                            <img src={transaction.logo_url && transaction.logo_url} alt="" className="rounded-full" />
                        </div>
                        <p className=" font-bold opacity-80">{transaction.authorized_date}</p>
                    </div>
                    <p className="p-2">Account: {transaction.account_details.account_name}</p>
                    <p className="p-2">Category: {transaction.category.join(', ')}</p>
                    <p className="p-2">Merchant: {transaction.merchant_name}</p>
                    {transaction.location.length > 0 &&
                        <p>{transaction.location.city}, {transaction.location.country}</p>
                    }
                    <p className="p-2">Channel: {transaction.payment_channel}</p>
                    <p className="p-2">Status: {transaction.pending ? "Pending" : "Complete"}</p>
                </div>
            }
        </div >
    );
}

export default SingleTransaction;
