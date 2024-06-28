import { useContext, useRef } from 'react';
import getSymbolFromCurrency from 'currency-symbol-map';
import { X } from 'lucide-react';
import { FilterContext } from '@/context/filter.context';


function SingleTransaction({ onClose, transaction }) {
    const modalRef = useRef();


    // If user clicks somewhere other than the Modal, close it
    const closeModal = (e) => {
        if (modalRef.current === e.target) {
            onClose();
        }
    };

    return (
        <div ref={modalRef} onClick={closeModal} className="fixed inset-0 mt-[68px] bg-black bg-opacity-50 backdrop-blur-sm flex justify-center items-center">
            {transaction &&
                <div className="bg-white dark:bg-blue-800 rounded-xl w-3/4 h-3/4 flex flex-col items-center gap-4">
                    <button onClick={onClose} className="place-self-end hover:cursor-pointer p-4"><X size={30} /></button>
                    <div className="flex flex-col items-center h-64 w-full ">
                        <div className="flex items-center justify-center h-48">
                            <div className="m-10 flex flex-col items-center">
                                <h1 className="p-4 text-3xl">{`${-transaction.amount}${getSymbolFromCurrency(transaction.iso_currency_code)}`}</h1>
                                <h1 className="text-xl">{transaction.name}</h1>
                            </div>
                            <img src={transaction.logo_url && transaction.logo_url} alt="" className="rounded-xl" />
                        </div>
                        <p className=" font-bold opacity-80">{transaction.authorized_date}</p>
                    </div>
                    <p className="">Account: {transaction.account_details.account_name}</p>
                    <p className="">Category: {transaction.category.join(', ')}</p>
                    <p className="">Merchant: {transaction.merchant_name}</p>
                    {transaction.location.length > 0 &&
                        <p>{transaction.location.city}, {transaction.location.country}</p>
                    }
                    <p className="">Channel: {transaction.payment_channel}</p>
                    <p className="">Status: {transaction.pending ? "Pending" : "Complete"}</p>
                </div>
            }
        </div>
    );
}

export default SingleTransaction;
