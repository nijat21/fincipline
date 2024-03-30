import GradientBackground from "./GradientBackground";
import { Link } from "react-router-dom";


function Ad() {
    return (
        <div className="overflow-hidden bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
            <div className='h-screen overflow-hidden place-self-center bg-no-repeat grayscale-50 flex items-center'>
                <GradientBackground />
                <div className='text-white h-screen w-screen flex flex-col items-center justify-center z-50'>
                    <h1 className='text-6xl font-bold p-4'>Fincipline</h1>
                    <p className='text-3xl py-4'>Your path to become financially responsible.</p>
                </div>
            </div>
            <div className="h-half-screen w-screen flex flex-col justify-center items-center box-border shadow-sm border-neutral-900 dark:border-slate-300">
                <h2 className="text-4xl mb-10 p-2 border-b">Why is it important?</h2>

                <div className="grid grid-cols-3 h-auto gap-10 my-10">
                    <div className=" py-10 px-6 max-w-80 flex flex-col items-center justify-center rounded-lg bg-slate-300 dark:bg-blue-900">
                        <h4 className="text-2xl h-10 font-semibold box-border flex items-center text-center">Personal Finance</h4>
                        <p className="text-xl py-4 h-40  text-center flex items-center">Personal finance is a term that covers managing your money as well as saving and investing...</p>
                        <Link className="text-xl font-semibold" target="_blank"
                            to={'https://www.investopedia.com/terms/p/personalfinance.asp'}>
                            Read</Link>
                    </div>
                    <div className=" py-10 px-6 max-w-80 min-h-80 flex flex-col items-center justify-center bg-slate-300 dark:bg-blue-900 rounded-lg">
                        <h4 className="text-2xl h-10 font-semibold box-border flex items-center text-center">Top 10 Financial Mistakes</h4>
                        <p className="text-xl py-4 h-40  text-center flex items-center">Small, regular expenses accumulate, impacting financial stability, especially during hardships...</p>
                        <Link className="text-xl font-semibold" target="_blank"
                            to={'https://www.investopedia.com/personal-finance/most-common-financial-mistakes/'}>
                            Read</Link>
                    </div>
                    <div className=" py-10 px-6 max-w-80 min-h-80 flex flex-col items-center justify-center bg-slate-300 dark:bg-blue-900 rounded-lg">
                        <h4 className="text-2xl h-10 font-semibold box-border flex items-center text-center">Financial Discipline</h4>
                        <p className="text-xl py-4 h-40 text-center flex items-center">Financial discipline is a consistent practice of spending, saving, and investing wisely...</p>
                        <Link className="text-xl font-semibold" target="_blank"
                            to={'https://www.wallstreetmojo.com/financial-discipline/'}>
                            Read</Link>
                    </div>

                </div>
            </div>
            <div className='h-screen flex items-center justify-center box-border bg-black bg-opacity-5'>
                <h1 className='text-5xl'>Features/Services</h1>
            </div>
        </div>
    );
}

export default Ad;
