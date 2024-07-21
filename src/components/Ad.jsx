import { useContext } from "react";
import { Link, useOutlet } from "react-router-dom";
import GradientBackground from "./GradientBackground";
import SectionLeft from "./SectionLeft";
import SectionRight from "./SectionRight";
import Section from "./Section";
import Articles from "./Articles";
import { FilterContext } from "@/context/filter.context";


function Ad() {
    const { isMobile } = useContext(FilterContext);


    return (
        <div className="overflow-hidden flex justify-center">
            <div className="w-full flex flex-col items-center justify-center">
                <div className='h-screen overflow-hidden place-self-center bg-no-repeat flex items-center'>
                    <GradientBackground />
                    <div className='text-white h-screen w-screen flex flex-col items-center justify-center z-50 mt-14'>
                        <h1 className='font-bold p-4 text-6xl text-center w-[90%] md:w-1/2'>Spending tracker for all your bank accounts</h1>
                        <h3 className='text-center py-4 mt-10 w-[90%] md:w-3/4'>Get control over your finances, get control over your life! Your path to become financially responsible.</h3>
                        <Link to={'/signup'}
                            className=" px-4 py-2 mt-6 rounded-md text-2xl border border-zinc-400 bg-slate-900 bg-opacity-70 hover:bg-blue-800 shadow-md">
                            Start now
                        </Link>
                    </div>
                </div>
                <div className='w-full min-h-3screen grid grid-cols-1 bg-black bg-opacity-40 md:bg-transparent md:bg-opacity-0'>
                    <SectionLeft>
                        <div className="h-full w-full flex justify-center">
                            <div className="min-h-screen md:h-screen mt-12 md:mt-0 py-6 md:py-0 md:px-10 w-[90%] flex flex-col md:flex-row items-center justify-between 
                            gap-4 md:gap-0 bg-white dark:bg-[#001152] md:bg-transparent dark:md:bg-transparent rounded-xl">
                                <div className="flex flex-col w-[90%] md:w-[75%]">
                                    <h2 className="font-bold pb-4">Add your bank accounts</h2>
                                    <h3>
                                        Connect your bank accounts to review their balances alongside other insights to
                                        retain great knowledge about the state of your financial situation.
                                    </h3>
                                </div>
                                <img src="/public/assets/AddAcounts.png" alt=""
                                    className="w-auto h-[30rem] md:w-[20%] md:h-auto mt-4 md:mt-0 rounded-3xl border-4 border-black"
                                />
                            </div>
                        </div>
                    </SectionLeft>
                    <div className="h-full w-full flex justify-center bg-transparent md:bg-[#0521905e]">
                        <SectionRight>
                            <div className="h-full w-full flex justify-center">
                                <div className="min-h-screen md:h-screen mt-12 md:mt-0 py-6 md:py-0 md:px-10 w-[90%] flex flex-col md:flex-row items-center justify-between 
                            gap-4 md:gap-0 bg-white dark:bg-[#001152] md:bg-transparent dark:md:bg-transparent rounded-xl">
                                    {!isMobile && <img src="../../public/assets/transactions.png" alt="transactions"
                                        className="w-auto h-[30rem] md:w-[20%] md:h-auto mt-4 md:mt-0 rounded-3xl border-4 border-black"
                                    />}
                                    <div className="flex flex-col w-[90%] md:w-[75%]">
                                        <h2 className="font-bold pb-4">Transactions</h2>
                                        <h3>
                                            Review transactions in great details for a specific bank or all your accounts filtering for desired
                                            month or period. For more details about transactions, use a desktop device or simply export transactions
                                            as a pdf.
                                        </h3>
                                    </div>
                                    {isMobile && <img src="/public/assets/transactions.png" alt="transactions"
                                        className="w-auto h-[30rem]  md:w-[20%] md:h-auto mt-4 md:mt-0 rounded-3xl border-4 border-black"
                                    />}
                                </div>
                            </div>
                        </SectionRight>
                    </div>
                    <SectionLeft>
                        <div className="h-full w-full flex justify-center">
                            <div className="min-h-screen md:h-screen my-12 md:my-0 py-6 md:py-0 md:px-10 w-[90%] flex flex-col md:flex-row items-center justify-between 
                            gap-4 md:gap-0 bg-white dark:bg-[#001152] md:bg-transparent dark:md:bg-transparent rounded-xl">
                                <div className="flex flex-col w-[90%] md:w-[75%]">
                                    <h2 className="font-bold pb-4">Analytics</h2>
                                    <h3>
                                        Keep up with your spending habits by analyzing them divided into categories, channels for a certain
                                        month or time period. Analyze it for each of bank accounts individually or collectively to identify
                                        improvement areas.
                                    </h3>
                                </div>
                                <img src="/public/assets/analytics.png" alt=""
                                    className="w-auto h-[30rem] md:w-[20%] md:h-auto mt-4 md:mt-0 rounded-3xl border-4 border-black"
                                />
                            </div>
                        </div>
                    </SectionLeft>
                </div>
                <div className="w-full min-h-home-screen bg-black bg-opacity-40 md:bg-[#0521905e] md:bg-opacity-0 flex justify-center items-center">
                    <div className="w-full md:w-11/12 min-h-home-screen flex items-center">
                        <Section>
                            <Articles />
                        </Section>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Ad;
