import { useEffect, useState } from 'react';
import * as finnhub from 'finnhub'
import axios from 'axios';
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
    const [mobileDisplay, setMobileDisplay] = useState(false)

    // finhub api connection
    const api_key_finnhub = finnhub.ApiClient.instance.authentications['api_key'];
    api_key_finnhub.apiKey = "cdukjcaad3ib3oqti880cdukjcaad3ib3oqti88g"
    const finnhubClient = new finnhub.DefaultApi()

    const checkSymbol = () => {
        axios.get(`https://finnhub.io/api/v1/search?q=${inputText}&token=cdukjcaad3ib3oqti880cdukjcaad3ib3oqti88g`)
            .then(response => {
                try {
                    if (response.data.result[0].symbol != undefined && response.data.result[0].symbol === inputText) {
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
            })
    };

    // working example without axios
    // fetching test data
    // const checkSymbol = () => finnhubClient.symbolSearch(inputText, (error, data, response) => {
    //     try {
    //         if (data.result[0].symbol != undefined && data.result[0].symbol === inputText) {
    //             setSuccessfulSymbolCheck(true)
    //             setShowHeader(true)
    //             setShowMainPage(true)
    //             setShowFooter(true)
    //             setSelectedCompany(inputText)
    //         } else {
    //             setErrorMessage(`${inputText} is not defined`)
    //             setShowErrorMessage(true)
    //         }
    //     } catch (error) {
    //         setErrorMessage(`${inputText} is not defined`)
    //         setShowErrorMessage(true)
    //     }
    // });

    // working example with axios
    const getLiveDataForTenStocks = () => {
        try {
            selectedCompanies.forEach(({stockSymbol}) => {
                axios.get(`https://finnhub.io/api/v1/quote?symbol=${stockSymbol}&token=cdukjcaad3ib3oqti880cdukjcaad3ib3oqti88g`)
                .then(response => {
                    setLive(p=>({...p, [stockSymbol]: {
                        c: response.data.c,
                        dp: response.data.dp,
                        h: response.data.h,
                        l: response.data.l,
                        o: response.data.o,
                        pc: response.data.pc
                    }}))
                })
            })
        } catch(error) {
            console.log(error)
        }
    }

    // working example without axios
    // fetching live data for 10 stocks from finnhub
    // const getLiveDataForTenStocks = () => {
    //     try {
    //         selectedCompanies.forEach(({stockSymbol}) => {
    //             finnhubClient.quote(stockSymbol, (error, data, response) => {
    //                 setLive(p=>({...p, [stockSymbol]: {
    //                     c: data.c,
    //                     dp: data.dp,
    //                     h: data.h,
    //                     l: data.l,
    //                     o: data.o,
    //                     pc: data.pc
    //                 }}))
    //             })
    //         })
    //     } catch(error) {
    //         console.log(error)
    //     }
    // }

    // working example with axios
    const getLiveDataForSelectedCompany = () => {
        try {
            axios.get(`https://finnhub.io/api/v1/quote?symbol=${selectedCompany}&token=cdukjcaad3ib3oqti880cdukjcaad3ib3oqti88g`)
                .then(response => {
                    console.log(response.data)
                    setLiveSelectedCompany(() => ({[selectedCompany]: {
                        c: response.data.c,
                        dp: response.data.dp,
                        h: response.data.h,
                        l: response.data.l,
                        o: response.data.o,
                        pc: response.data.pc
                    }}))
                })
        } catch (error) {
            console.log(error)
        }
    }

    // working example without axios
    // const getLiveDataForSelectedCompany = () => {
    //     try {
    //         finnhubClient.quote(selectedCompany, (error, data, response) => {
    //             if(error) return console.log(error)
    //             setLiveSelectedCompany(() => ({[selectedCompany]: {
    //                 c: data.c,
    //                 dp: data.dp,
    //                 h: data.h,
    //                 l: data.l,
    //                 o: data.o,
    //                 pc: data.pc
    //             }}))
    //         })
    //     } catch (error) {
    //         console.log(error)
    //     }
    // }

    // working axios example
    const getNews = () => {
        try {
            axios.get(`https://finnhub.io/api/v1/company-news?symbol=${selectedCompany}&from=${monthBeforeDate}&to=${currentDate}&token=cdukjcaad3ib3oqti880cdukjcaad3ib3oqti88g`)
                .then(response => {
                    console.log(response.data)
                    setRawNews(response.data)
                })
        } catch (error) {
            console.log(error)
        }
    }

    
    // working example without axios
    // fetching news for selectedCompany from finnhub
    // const getNews = () => {
    //     try {
    //         finnhubClient.companyNews(selectedCompany, monthBeforeDate, currentDate, (error, data, response) => {
    //             setRawNews(data)
    //         })
    //     } catch (error) {
    //         console.log(error)
    //     }
    // }

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

    const checkOnWidth = () => {
        const size = window.innerWidth
        if (size < 640) {
            setMobileDisplay(true)
            // document.querySelector(".Stocks").classList.add('hide-when-mobile')
            // document.querySelector(".News").classList.add('hide-when-mobile')
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

        // check screen size
        checkOnWidth()
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
        checkOnWidth()
    }, [selectedCompany])

    const showdataw = () => {console.log(mobileDisplay)}

    return (
        <div className="MainPage sm:flex sm:justify-between sm:items-start w-full h-[85vh] xl:px-8 md:px-4 sm:px-3 px-8 xl:pb-4 md:pb-2">
            {intro 
            ? <div>
                <h2 className='hello xl:text-[2.5rem] lg:text-[2rem] md:text-[1.5rem] text-[1.3rem]'>Hello</h2>
                <h2 className='get-data text-center xl:text-[2.5rem] lg:text-[2rem] md:text-[1.5rem] text-[1.3rem]'>Get data on stocks easily</h2>
                <h2 className='just-enter text-center xl:text-[2.4rem] lg:text-[1.9rem] md:text-[1.4rem] text-[1.2rem]'>Just enter stock symbol in the search</h2>
                <h2 className='and xl:text-[2.5rem] lg:text-[2rem] md:text-[1.5rem] text-[1.3rem] lg:border-b-[4px] md:border-b-[3px] border-b-[2px] border-b-[#f97316]'>And click enter/return</h2>
            </div>
            : null}
            <div 
                className='search relative flex flex-col items-center justify-center xl:w-2/12 lg:w-[20%] md:w-[22%] sm:w-[30%] w-[50%] lg:h-[10%] h-[9%] rounded-[3rem]' 
                style={{top: showMainPage 
                    ? showErrorMessage 
                        ? mobileDisplay 
                            ? "18%"
                            : "20%"
                        : "12%" 
                    : "50%"
                }}>
                <input 
                    onClick={showdataw}
                    onChange={toCapitalLetters}
                    onKeyUp={inputOnKeyUp}
                    value={inputText}
                    type="text" 
                    placeholder="ENTER STOCK SYMBOL"
                    className="mx-auto 2xl:text-lg xl:text-[1rem] lg:text-[0.9rem] text-[0.8rem] focus:xl:text-2xl focus:lg:text-[1.35rem] focus:text-[1.15rem] rounded-[3rem] h-full w-full outline-none border-2 border-darkPurple focus:border-[#f97316] focus:placeholder:text-transparent"
                />
                {showErrorMessage 
                ?   <div 
                        className='md:w-[150%] sm:w-[110%] w-[130%] absolute bg-[#fee2e2] rounded-[1rem] px-3 py-2 border-2 border-[#f87171]'
                        style={{bottom: showMainPage 
                                ? mobileDisplay 
                                    ? "110%" 
                                    : "-100%"
                                : mobileDisplay 
                                    ? "200%" 
                                    : "-100%"
                            }}
                    >
                        <h4 className='text-center md:text-base text-sm text-[#ef4444]'>{errorMessage}</h4>
                    </div>
                :   null}
            </div>

            {showMainPage
            ? <div className="sm:flex sm:justify-between sm:items-end w-full h-full">
                <Stocks 
                    live={live}
                    selectedCompanies={selectedCompanies}
                    selectedCompany={selectedCompany}
                    setSelectedCompany={setSelectedCompany}
                    mobileDisplay={mobileDisplay}
                />
                <StockData 
                    selectedCompany={selectedCompany}
                    liveSelectedCompany={liveSelectedCompany}
                />
                <News 
                    filteredNews={filteredNews} 
                    mobileDisplay={mobileDisplay}
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