import { useRef, useEffect } from 'react';
import getSymbolFromCurrency from 'currency-symbol-map';
import { X } from 'lucide-react';
import { motion as m, AnimatePresence } from 'framer-motion';


function SingleTransaction({ onClose, transaction }) {
    const modalRef = useRef();

    useEffect(() => {
        // Add the no-scroll class to body when the modal is opened
        document.body.classList.add('no-scroll');

        // Remove the no-scroll class from body when the modal is closed
        return () => {
            document.body.classList.remove('no-scroll');
        };
    }, []);

    // If user clicks somewhere other than the Modal, close it
    const closeModal = (e) => {
        if (modalRef.current === e.target) {
            onClose();
        }
    };

    // Capitalize the first letter of the channels
    const capitalize = (str) => str[0].toUpperCase() + str.slice(1);

    return (
        <AnimatePresence>
            <m.div ref={modalRef} onClick={closeModal} className="fixed inset-0  bg-black bg-opacity-50 backdrop-blur-sm flex justify-center items-center z-40"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3, ease: "easeOut" }} exit={{ opacity: 0 }}>
                {transaction &&
                    <div className="bg-white dark:bg-blue-800 rounded-xl w-5/6 h-3/4 flex flex-col items-center  gap-4">
                        <button onClick={onClose} className="place-self-end hover:cursor-pointer p-4"><X size={30} /></button>
                        <div className="flex flex-col items-center h-64 w-full">
                            <div className="flex items-center justify-center h-48 mx-4">
                                <div className="flex flex-col items-center justify-center text-center">
                                    <h3 className="py-4">{`${transaction.amount > 0 ? '-' : '+'}${Math.abs(transaction.amount)}${getSymbolFromCurrency(transaction.iso_currency_code)}`}</h3>
                                    <p>{transaction.name}</p>
                                </div>
                                <img src={transaction.logo_url && transaction.logo_url} alt="" className="rounded-xl max-h-20 m-4" />
                            </div>
                            <p className="text-lg opacity-80">{transaction.authorized_date}</p>
                        </div>
                        <div className='flex flex-col items-start gap-2 mx-6'>
                            <p>Account: {transaction.account_details.account_name}</p>
                            <p>Category: {transaction.category.join(', ')}</p>
                            <p>Merchant: {transaction.merchant_name}</p>
                            {transaction.location.length > 0 &&
                                <p>{transaction.location.city}, {transaction.location.country}</p>
                            }
                            <p>Method: {capitalize(transaction.payment_channel)}</p>
                            <p>Status: {transaction.pending ? "Pending" : "Complete"}</p>
                        </div>
                    </div>
                }
            </m.div>
        </AnimatePresence>
    );
}

export default SingleTransaction;
