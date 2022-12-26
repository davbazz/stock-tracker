import { useEffect, useState } from 'react';
import * as finnhub from 'finnhub'
import Stocks from "./Stocks"
import News from "./News";
import StockData from './StockData';


function MainPage({ showHeader, setShowHeader, showMainPage, setShowMainPage, setShowFooter}) {

    const [selectedCompanies, setSelectedCompanies] = useState([
        { name: 'Apple', stockSymbol: 'AAPL' },
        { name: 'Tesla', stockSymbol: 'TSLA' },
        { name: 'Nike', stockSymbol: 'NKE' },
        { name: 'Microsoft', stockSymbol: 'MSFT' },
        { name: 'Meta', stockSymbol: 'META' },
        { name: 'Disney', stockSymbol: 'DIS' },
        { name: 'Amazon', stockSymbol: 'AMZN' },
        { name: 'Nvidia', stockSymbol: 'NVDA' },
        { name: 'Starbucks', stockSymbol: 'SBUX' },
        { name: 'Netflix', stockSymbol: 'NFLX' }
    ])
    const [selectedCompany, setSelectedCompany] = useState("AAPL")
    const [liveSelectedCompany, setLiveSelectedCompany] = useState({})
    const [live, setLive] = useState({})
    const [rawNews, setRawNews] = useState([])
    const [filteredNews, setFilteredNews] = useState([])
    const [successfulSymbolCheck, setSuccessfulSymbolCheck] = useState(false)
    const [inputText, setInputText] = useState()
    const [testDataResult, setTestDataResult] = useState()
    const [showErrorMessage, setShowErrorMessage] = useState(false)
    const [errorMessage, setErrorMessage] = useState()

    // const reverseDate = JSON.stringify(`${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()-1}`)

    // finhub api connection
    const api_key_finnhub = finnhub.ApiClient.instance.authentications['api_key'];
    api_key_finnhub.apiKey = "cdukjcaad3ib3oqti880cdukjcaad3ib3oqti88g"
    const finnhubClient = new finnhub.DefaultApi()

    // fetching test data
    const checkSymbol = () => finnhubClient.symbolSearch(inputText, (error, data, response) => {
        console.log(data)
        try {
            if (data.result[0].symbol != undefined && data.result[0].symbol === inputText) {
                setSuccessfulSymbolCheck(true)
                setShowHeader(true)
                setShowMainPage(true)
                setShowFooter(true)
                setSelectedCompany(inputText)
            } else {
                setErrorMessage(`Stock symbol is not defined`)
                setShowErrorMessage(true)
            }
        } catch (error) {
            setErrorMessage(`Stock symbol is not defined`)
            setShowErrorMessage(true)
        }
    });

    
    // fetching live data for 10 stocks from finnhub
    const getLiveDataForTenStocks = () => {
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
    })}

    const getLiveDataForSelectedCompany = () => {
        finnhubClient.quote(selectedCompany, (error, data, response) => {
            if(error) return console.log(error)
            setLiveSelectedCompany(item => ({[selectedCompany]: {
                c: data.c,
                dp: data.dp,
                h: data.h,
                l: data.l,
                o: data.o,
                pc: data.pc
            }}))
        })
    }
    
    // fetching news for selectedCompany from finnhub
    const getNews = () => finnhubClient.companyNews(selectedCompany, "2022-12-23", "2022-12-23", (error, data, response) => {
        setRawNews(data)
    })

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
            console.log(event.target.value)
            if (showErrorMessage == true) {
                setShowErrorMessage(false)
                setErrorMessage(null)
            }
            checkSymbol()
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
    
    const searchOn = () => setTimeout(() => {
        document.querySelector(".search").classList.add('search-on')
        document.querySelector(".search").classList.add('bounce-animation')
    }, 7600)

    
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

        // get live data + get news data
        getLiveDataForTenStocks()
        getLiveDataForSelectedCompany()
        getNews()

    }, [])

    useEffect(() => {
        setFilteredNews(rawNews.filter(item => item.image.length > 3))
    }, [rawNews])

    useEffect(() => {
        getNews()
        getLiveDataForSelectedCompany()
    }, [selectedCompany])

    const showdata = (event) => {console.log(liveSelectedCompany)}

    return (
        <div className="MainPage flex justify-between items-start h-[85vh] px-8 py-4">
            <h2 className='hello'>Hello</h2>
            <h2 className='get-data get-data-off'>Get data on stocks easily</h2>
            <h2 className='just-enter'>Just enter stock symbol in the search</h2>
            <h2 className='and'>And that is it</h2>
            <div 
                onClick={showdata}
                className='search flex flex-col items-center justify-center w-2/12 border-2 border-red-500' 
                style={{top: showMainPage   
                    ? "25%"
                    : "50%"
                }}>
                <h3>Enter stock symbol</h3>
                <input 
                    onChange={toCapitalLetters}
                    onKeyUp={inputOnKeyUp}
                    value={inputText}
                    type="text" 
                    placeholder="Search"
                    className="mx-auto"
                />
                {showErrorMessage 
                ?   <div className='w-full bg-slate-50'>
                        <h4>{errorMessage}</h4>
                        <p>Your</p>
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