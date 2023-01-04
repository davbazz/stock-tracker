import { useEffect, useState } from 'react';
import * as finnhub from 'finnhub'
import Stocks from "./Stocks"
import News from "./News";
import StockData from './StockData';


function MainPage({ showHeader, setShowHeader, showMainPage, setShowMainPage, setShowFooter}) {

    const [selectedCompanies, setSelectedCompanies] = useState([
        { name: 'Apple Inc', stockSymbol: 'AAPL' },
        { name: 'Tesla', stockSymbol: 'TSLA' },
        { name: 'Nike', stockSymbol: 'NKE' },
        { name: 'Microsoft', stockSymbol: 'MSFT' },
        { name: 'Meta', stockSymbol: 'META' },
        { name: 'Disney', stockSymbol: 'DIS' },
        { name: 'Amazon', stockSymbol: 'AMZN' },
        { name: 'Nvidia', stockSymbol: 'NVDA' },
        { name: 'Google', stockSymbol: 'GOOG' },
        { name: 'Netflix', stockSymbol: 'NFLX' }
    ])
    const [selectedCompany, setSelectedCompany] = useState("AAPL")
    const [liveSelectedCompany, setLiveSelectedCompany] = useState({})
    const [live, setLive] = useState({})
    const [rawNews, setRawNews] = useState([])
    const [filteredNews, setFilteredNews] = useState([])
    const [successfulSymbolCheck, setSuccessfulSymbolCheck] = useState(false)
    const [inputText, setInputText] = useState()
    const [showErrorMessage, setShowErrorMessage] = useState(false)
    const [errorMessage, setErrorMessage] = useState()
    const [currentDate, setCurrentDate] = useState("2022-12-20")
    const [monthBeforeDate, setMonthBeforeDate] = useState("2022-11-20")
    const [intro, setIntro] = useState(true)

    // finhub api connection
    const api_key_finnhub = finnhub.ApiClient.instance.authentications['api_key'];
    api_key_finnhub.apiKey = "cdukjcaad3ib3oqti880cdukjcaad3ib3oqti88g"
    const finnhubClient = new finnhub.DefaultApi()

    // fetching test data
    const checkSymbol = () => finnhubClient.symbolSearch(inputText, (error, data, response) => {
        try {
            if (data.result[0].symbol != undefined && data.result[0].symbol === inputText) {
                setSuccessfulSymbolCheck(true)
                setShowHeader(true)
                setShowMainPage(true)
                setShowFooter(true)
                setSelectedCompany(inputText)
            } else {
                setErrorMessage(`${inputText} is not defined`)
                setShowErrorMessage(true)
            }
        } catch (error) {
            setErrorMessage(`${inputText} is not defined`)
            setShowErrorMessage(true)
        }
    });

    // fetching live data for 10 stocks from finnhub
    const getLiveDataForTenStocks = () => {
        try {
            selectedCompanies.forEach(({stockSymbol}) => {
                finnhubClient.quote(stockSymbol, (error, data, response) => {
                    setLive(p=>({...p, [stockSymbol]: {
                        c: data.c,
                        dp: data.dp,
                        h: data.h,
                        l: data.l,
                        o: data.o,
                        pc: data.pc
                    }}))
                })
            })
        } catch(error) {
            console.log(error)
        }
    }

    const getLiveDataForSelectedCompany = () => {
        try {
            finnhubClient.quote(selectedCompany, (error, data, response) => {
                if(error) return console.log(error)
                setLiveSelectedCompany(() => ({[selectedCompany]: {
                    c: data.c,
                    dp: data.dp,
                    h: data.h,
                    l: data.l,
                    o: data.o,
                    pc: data.pc
                }}))
            })
        } catch (error) {
            console.log(error)
        }
    }
    
    // fetching news for selectedCompany from finnhub
    const getNews = () => {
        try {
            finnhubClient.companyNews(selectedCompany, monthBeforeDate, currentDate, (error, data, response) => {
                setRawNews(data)
            })
        } catch (error) {
            console.log(error)
        }
    }

    const toCapitalLetters = (event) => {
        const result = event.target.value.toUpperCase();
        setInputText(result);
    }

    const errorShortMessage = (event) => {
        if (event.key === 'Enter' && event.target.value.length < 1) {
            setErrorMessage(`Please enter stock symbol`)
            setShowErrorMessage(true)
        }
    }

    // show mainPage after intro
    const inputOnKeyUp = (event) => {
        errorShortMessage(event)
        if (event.key === 'Enter' && event.target.value.length >= 1) {
            if (showErrorMessage == true) {
                setShowErrorMessage(false)
                setErrorMessage(null)
            }
            checkSymbol()
            setInputText("")
        }
    }

    // intro functions
    const helloOff = () => setTimeout(() => {
        document.querySelector(".hello").classList.add('hello-off')
    }, 1500)
    
    const getDataOn = () => setTimeout(() => {
        document.querySelector(".get-data").classList.add('get-data-on')
    }, 2000)
    
    const getDataOff = () => setTimeout(() => {
        document.querySelector(".get-data").classList.remove('get-data-on')
    }, 3500)
    
    const justEnterOn = () => setTimeout(() => {
        document.querySelector(".just-enter").classList.add('just-enter-on')
    }, 4000)
    
    const justEnterOff = () => setTimeout(() => {
        document.querySelector(".just-enter").classList.remove('just-enter-on')
    }, 5500)
    
    const andOn = () => setTimeout(() => {
        document.querySelector(".and").classList.add('and-on')
    }, 6000)
    
    const andOff = () => setTimeout(() => {
        document.querySelector(".and").classList.remove('and-on')
    }, 7500)
    
    // normal delay is 7600
    const searchOn = () => setTimeout(() => {
        document.querySelector(".search").classList.add('search-on')
        document.querySelector(".search").classList.add('bounce-animation')
    }, 7600)

    const removeIntro = () => {
        setTimeout(() => {setIntro(false)}, 7700)
    }

    const getDate = () => {
        const date = new Date()
        let day = date.getDate()
        let month = date.getMonth()
        let year = date.getFullYear()
        if (month < 11 && day < 10) {
            if (month == 0) {
                setCurrentDate(`${year}-0${month+1}-0${day}`)
                setMonthBeforeDate(`${year-1}-${month+12}-0${day}`)   
                return
            }
            if (month == 10){
                setCurrentDate(`${year}-${month+1}-0${day}`)
                setMonthBeforeDate(`${year}-0${month}-0${day}`)   
                return
            } 
            if (month > 0 && month < 10) {
                setCurrentDate(`${year}-0${month+1}-0${day}`)
                setMonthBeforeDate(`${year}-0${month}-0${day}`)   
                return
            }
        }
        if (day < 10) {
            if (month == 0) {
                setCurrentDate(`${year}-${month+1}-0${day}`)
                setMonthBeforeDate(`${year-1}-${month+12}-0${day}`) 
                return  
            } else {
                setCurrentDate(`${year}-${month+1}-0${day}`)
                setMonthBeforeDate(`${year}-${month}-0${day}`)   
                return
            }
        }
        if (month < 11) {
            if (month == 0) {
                setCurrentDate(`${year}-0${month+1}-${day}`)
                setMonthBeforeDate(`${year-1}-${month+12}-${day}`)  
                return 
            } 
            if (month == 10){
                setCurrentDate(`${year}-${month+1}-${day}`)
                setMonthBeforeDate(`${year}-0${month}-${day}`)  
                return 
            } 
            if (month > 0 && month < 10) {
                setCurrentDate(`${year}-0${month+1}-${day}`)
                setMonthBeforeDate(`${year-1}-0${month}-${day}`)
                return  
            }
        }
    }

    
    useEffect(() => {
        // fire intro functions
        helloOff()
        getDataOn()
        getDataOff()
        justEnterOn()
        justEnterOff()
        searchOn()
        andOn()
        andOff()
        removeIntro()

        // get live data + get news data + date
        setCurrentDate()
        getLiveDataForTenStocks()
        getLiveDataForSelectedCompany()
        getDate()
    }, [])

    useEffect(() => {
        getNews()
    }, [currentDate, monthBeforeDate])

    useEffect(() => {
        setFilteredNews(rawNews.filter(item => item.image.length > 3))
    }, [rawNews])

    useEffect(() => {
        getNews()
        getLiveDataForSelectedCompany()
        setErrorMessage(null)
        setShowErrorMessage(false)
    }, [selectedCompany])

    return (
        <div className="MainPage flex justify-between items-start w-full h-[85vh] xl:px-8 md:px-4 sm:px-2 xl:pb-4 md:pb-2">
            {intro 
            ? <div>
                <h2 className='hello xl:text-[2.5rem] lg:text-[2rem] md:text-[1.5rem]'>Hello</h2>
                <h2 className='get-data xl:text-[2.5rem] lg:text-[2rem] md:text-[1.5rem]'>Get data on stocks easily</h2>
                <h2 className='just-enter xl:text-[2.4rem] lg:text-[1.9rem] md:text-[1.4rem]'>Just enter stock symbol in the search</h2>
                <h2 className='and xl:text-[2.5rem] lg:text-[2rem] md:text-[1.5rem] border-b-[4px] border-b-[#f97316]'>And click enter/return</h2>
            </div>
            : null}
            <div 
                className='search relative flex flex-col items-center justify-center xl:w-2/12 lg:w-[20%] md:w-[22%] lg:h-[10%] md:h-[9%] rounded-[3rem]' 
                style={{top: showMainPage 
                    ? showErrorMessage 
                        ? "18%"
                        : "22%" 
                    : "50%"
                }}>
                <input 
                    onChange={toCapitalLetters}
                    onKeyUp={inputOnKeyUp}
                    value={inputText}
                    type="text" 
                    placeholder="ENTER STOCK SYMBOL"
                    className="mx-auto 2xl:text-lg xl:text-[1rem] lg:text-[0.9rem] md:text-[0.8rem] focus:xl:text-2xl focus:lg:text-[1.35rem] focus:md:text-[1.15rem] rounded-[3rem] h-full w-full outline-none border-2 border-darkPurple focus:border-[#f97316] focus:placeholder:text-transparent"
                />
                {showErrorMessage 
                ?   <div 
                        className='w-[150%] absolute bg-[#fee2e2] rounded-[1rem] px-3 py-2 border-2 border-[#f87171]'
                        style={{bottom: showMainPage ? "-100%" : "-100%"}}
                    >
                        <h4 className='text-center text-[#ef4444]'>{errorMessage}</h4>
                    </div>
                :   null}
            </div>

            {showMainPage
            ? <div className="flex justify-between items-end w-full h-full">
                <Stocks 
                    live={live}
                    selectedCompanies={selectedCompanies}
                    selectedCompany={selectedCompany}
                    setSelectedCompany={setSelectedCompany}
                />
                <StockData 
                    selectedCompany={selectedCompany}
                    liveSelectedCompany={liveSelectedCompany}
                />
                <News 
                    filteredNews={filteredNews}
                />
            </div>
            : null}
        </div>
    )
}

export default MainPage




{/*


        // const date = new Date()
    // const currentDate = JSON.stringify(`${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()-1}`)


    // setInterval(() => {
    //     selectedCompanies.forEach(({stockSymbol}) => {
    //         finnhubClient.stockCandles(stockSymbol, "W", parseInt(Date.now()/1000)-60, parseInt(Date.now() / 1000), (error, data, response) => {
    //             if(error) return console.error(error)
    //             console.log(data, response)
    //             if(data.s === "ok")  setCandles(p=>({...p, [stockSymbol]: [...p[stockSymbol], data.c]})) 
    //         });
    //     });
    // }, 1000*60*1)

  
      // get news for apple between two time periods
      // finnhubClient.companyNews("AAPL", "2022-01-01", "2022-11-10", (error, data, response) => {
      //   if(error) return console.error(error)
      //   console.log(data, response)
      // });
*/}