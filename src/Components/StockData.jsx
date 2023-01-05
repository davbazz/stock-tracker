import { useState, useEffect } from 'react';
import axios from 'axios';

function StockData({ selectedCompany, liveSelectedCompany }) {
    const [rawAxiosData, setRawAxiosData] = useState({})
    const [priceMonthAgo, setPriceMonthAgo] = useState(0)
    const [priceThreeMonthAgo, setPriceThreeMonthAgo] = useState(0)
    const [priceSixMonthAgo, setPriceSixMonthAgo] = useState(0)
    const [priceYearAgo, setPriceYearAgo] = useState(0)

    const apiKey = 'HGJWFG4N8A066ICD';

    const getAxiosData = () => {
        axios.get(`https://www.alphavantage.co/query?function=TIME_SERIES_MONTHLY_ADJUSTED&symbol=${selectedCompany}&apikey=${apiKey}`)
        .then(response => {
            console.log(response)
            setRawAxiosData(() => 
                Object.entries(response.data["Monthly Adjusted Time Series"])
                    .slice(0,13)
                    .map(month => month[1]['4. close'])
            )
        })
        .catch(error => {
           console.log(error)
        });
    }

    const calculatePrice = (oldPrice) => {
        const currentPrice = Object.values(liveSelectedCompany)[0]["c"] 
        const differenceInPriceInNumber = currentPrice - oldPrice
        const onePersentOfOldPrice = oldPrice / 100
        const differenceInPriceInPersentage = differenceInPriceInNumber / onePersentOfOldPrice
        return `${parseFloat(differenceInPriceInPersentage).toFixed(2)}`
    }

    const getRightColor = (number) => {
        if (number > 0) {
            return "#319b6a"
        }
        if (number < 0) {
            return "#dc3545"
        }
        if (number = 0) {
            return "#889096"
        }
    }

    useEffect(() => {
        getAxiosData()
    }, [])

    useEffect(() => {
        getAxiosData()
    }, [selectedCompany])

    useEffect(() => {
        setPriceMonthAgo(() => calculatePrice(rawAxiosData[1]))
        setPriceThreeMonthAgo(() => calculatePrice(rawAxiosData[3]))
        setPriceSixMonthAgo(() => calculatePrice(rawAxiosData[6]))
        setPriceYearAgo(() => calculatePrice(rawAxiosData[12]))
    }, [getAxiosData])


    const showdata = () => {console.log(priceYearAgo)}

    return(
        <div onClick={showdata} className="stock-data sm:w-4/12 w-full h-[65%] sm:mt-40% mt-[35%] xl:px-4 md:px-2 lg:py-4 py-2 rounded-[2rem] shadow-md shadow-[#ede9fe] bg-lightPurple border-[1px] border-darkPurple item-end">
            <h3 className="block text-center lg:text-2xl md:text-xl sm:text-lg text-xl lg:leading-[3rem] md:leading-[2.5rem] sm:leading-[2rem] text-darkPurple font-semibold">{selectedCompany}</h3>
            <div className="relative lg:h-[calc(100%-3rem)] md:h-[calc(100%-2.5rem)] sm:h-[calc(100%-2rem)]">
            {liveSelectedCompany
            ? Object.entries(liveSelectedCompany).map((stockKey) => {
                return (
                    <div className="stock-data-wrapper h-full cursor-default">
                        <ul className="stock-data-left h-full xl:px-4 px-2">
                            <li className="flex justify-between items-center h-[20%]">
                                <div className="lg:text-lg md:text-base sm:text-sm text-base uppercase font-medium border-b-[2px] border-b-[#f97316]">Current Price:</div>
                                <div className="flex flex-col items-center">
                                    <div className="lg:text-lg md:text-base sm:text-sm ">
                                        {`${parseFloat(stockKey[1].c).toFixed(2)}`} $
                                    </div>
                                    <div className="lg:text-lg md:text-base sm:text-sm "
                                        style={{color: getRightColor(stockKey[1].dp)}}>
                                        {`${parseFloat(stockKey[1].dp).toFixed(2)} %`}
                                    </div>
                                </div>
                            </li>
                            <li className="h-[10%]">
                                <div className="flex justify-between items-end py-1 hover:border-b-[1px] hover:border-b-lightGrey">
                                    <div className="xl:text-lg lg:text-base md:text-sm sm:text-[12px]">Open Price:</div>
                                    <div className="xl:text-lg lg:text-base md:text-sm sm:text-[12px] " >{`${parseFloat(stockKey[1].o).toFixed(2)}`} $</div>
                                </div>
                            </li>
                            <li className="h-[10%]">
                                <div className="flex justify-between items-end py-1 hover:border-b-[1px] hover:border-b-lightGrey">
                                    <div className="xl:text-lg lg:text-base md:text-sm sm:text-[12px]">Close Price:</div>
                                    <div className="xl:text-lg lg:text-base md:text-sm sm:text-[12px]" >{`${parseFloat(stockKey[1].c).toFixed(2)}`} $</div>
                                </div>
                            </li>
                            <li className="h-[10%]">
                                <div className="flex justify-between items-end py-1 hover:border-b-[1px] hover:border-b-lightGrey">
                                    <div className="xl:text-lg lg:text-base md:text-sm sm:text-[12px]">Daily High:</div>
                                    <div className="xl:text-lg lg:text-base md:text-sm tsm:ext-[12px]" >{`${parseFloat(stockKey[1].h).toFixed(2)}`} $</div>
                                </div>
                            </li>
                            <li className="h-[10%]">
                                <div className="flex justify-between items-end py-1 hover:border-b-[1px] hover:border-b-lightGrey">
                                    <div className="xl:text-lg lg:text-base md:text-sm sm:text-[12px]">Daily Low:</div>
                                    <div className="xl:text-lg lg:text-base md:text-sm sm:text-[12px]" >{`${parseFloat(stockKey[1].l).toFixed(2)}`} $</div>
                                </div>
                            </li>
                            <li className="h-[10%]">
                                <div className="flex justify-between items-end py-1 hover:border-b-[1px] hover:border-b-lightGrey">
                                    <div className="xl:text-lg lg:text-base md:text-sm sm:text-[12px]">Last Month:</div>
                                    <div className="xl:text-lg lg:text-base md:text-sm sm:text-[12px]" 
                                        style={{color: getRightColor(priceMonthAgo)}}>
                                        {priceMonthAgo} %
                                    </div>
                                </div>
                            </li>
                            <li className="h-[10%]">
                                <div className="flex justify-between items-end py-1 hover:border-b-[1px] hover:border-b-lightGrey">
                                    <div className="xl:text-lg lg:text-base md:text-sm sm:text-[12px]">Last 3 Months:</div>
                                    <div className="xl:text-lg lg:text-base md:text-sm sm:text-[12px]" 
                                        style={{color: getRightColor(priceThreeMonthAgo)}}>
                                        {priceThreeMonthAgo} %
                                    </div>
                                </div>
                            </li>
                            <li className="h-[10%]">
                                <div className="flex justify-between items-end py-1 hover:border-b-[1px] hover:border-b-lightGrey">
                                    <div className="xl:text-lg lg:text-base md:text-sm sm:text-[12px]">Last 6 Months:</div>
                                    <div className="xl:text-lg lg:text-base md:text-sm sm:text-[12px]" 
                                        style={{color: getRightColor(priceSixMonthAgo)}}>
                                        {priceSixMonthAgo} %
                                    </div>
                                </div>
                            </li>
                            <li className="h-[10%]">
                                <div className="flex justify-between items-end pt-1 hover:border-b-[1px] hover:border-b-lightGrey">
                                    <div className="xl:text-lg lg:text-base md:text-sm sm:text-[12px]">Last 12 Months:</div>
                                    <div className="xl:text-lg lg:text-base md:text-sm sm:text-[12px]" 
                                        style={{color: getRightColor(priceYearAgo)}}>
                                        {priceYearAgo} %
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                )
            })
            : <div>A problem is occured...</div>
            }
            </div>
        </div>
    )
}

export default StockData