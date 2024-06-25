import GradientBackground from "./GradientBackground";
import { Link } from "react-router-dom";


function Ad() {
    return (
        <div className="overflow-hidden">
            <div className='h-screen overflow-hidden place-self-center bg-no-repeat flex items-center'>
                <GradientBackground />
                <div className='text-white h-screen w-screen flex flex-col items-center justify-center z-50'>
                    <h1 className='text-6xl font-bold p-4'>Fincipline</h1>
                    <h3 className='text-center py-4'>Your path to become financially responsible.</h3>
                </div>
            </div>
            <div className="md:h-half-screen w-screen flex flex-col justify-center items-center box-border pb-16">
                <h2 className="mb-10 py-2 my-10 border-b dark:border-slate-300 border-black">Why is it important?</h2>

                <div className="grid sm:grid-cols-1 md:grid-cols-3 h-auto gap-10 pb-2">
                    <div className=" py-10 px-6 max-w-80 flex flex-col items-center justify-center rounded-lg
                    bg-gradient-to-r from-slate-400 to-slate-200
                    dark:from-blue-900 dark:to-blue-500">
                        <h4 className="h-10 font-semibold box-border flex items-center text-center">Personal Finance</h4>
                        <p className="py-4 h-40  text-center flex items-center">Personal finance is a term that covers managing your money as well as saving and investing...</p>
                        <Link className="text-xl font-semibold" target="_blank"
                            to={'https://www.investopedia.com/terms/p/personalfinance.asp'}>
                            Read</Link>
                    </div>
                    <div className=" py-10 px-6 max-w-80 min-h-80 flex flex-col items-center justify-center rounded-lg
                    bg-gradient-to-r from-slate-400 to-slate-200
                    dark:from-blue-900 dark:to-blue-500">
                        <h4 className="h-10 font-semibold box-border flex items-center text-center">Top 10 Financial Mistakes</h4>
                        <p className="py-4 h-40  text-center flex items-center">Small, regular expenses accumulate, impacting financial stability, especially during hardships...</p>
                        <Link className="text-xl font-semibold" target="_blank"
                            to={'https://www.investopedia.com/personal-finance/most-common-financial-mistakes/'}>
                            Read</Link>
                    </div>
                    <div className=" py-10 px-6 max-w-80 min-h-80 flex flex-col items-center justify-center rounded-lg
                    bg-gradient-to-r from-slate-400 to-slate-200
                    dark:from-blue-900 dark:to-blue-500">
                        <h4 className="h-10 font-semibold box-border flex items-center text-center">Financial Discipline</h4>
                        <p className="py-4 h-40 text-center flex items-center">Financial discipline is a consistent practice of spending, saving, and investing wisely...</p>
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
