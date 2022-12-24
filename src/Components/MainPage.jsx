import Stocks from "./Stocks"
// import Search from "./Search";
import * as finnhub from 'finnhub'
import { useEffect, useState } from 'react';


function MainPage({ showHeader, setShowHeader, showMainPage, setShowMainPage}) {

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

    const inputTop = "25%"
    const inputInitialTop = "50%"


    const [selectedCompany, setSelectedCompany] = useState("AAPL")
    const [live, setLive] = useState({})


    const inputOnKeyUp = (event) => {
        if (event.key === 'Enter') {
            if (showHeader == false && showMainPage == false) {
                setShowHeader(true)
                setShowMainPage(true)
            }
        }
    }


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
        // finhub api connection
        const api_key_finnhub = finnhub.ApiClient.instance.authentications['api_key'];
        api_key_finnhub.apiKey = "cdukjcaad3ib3oqti880cdukjcaad3ib3oqti88g"
        const finnhubClient = new finnhub.DefaultApi()

        // fetching live data for 10 stocks from finnhub
        selectedCompanies.forEach(({stockSymbol})=>{
            finnhubClient.quote(stockSymbol, (error, data, response) => {
                if(error) return console.log(error)
                setLive(p=>({...p, [stockSymbol]: {
                    c: data.c,
                    d: data.d
                }}))
            })
        })

        // fire intro functions
        helloOff()
        getDataOn()
        getDataOff()
        justEnterOn()
        justEnterOff()
        searchOn()
        andOn()
        andOff()

    }, [])


    return (
        <div className="MainPage flex justify-between items-start h-full px-8 py-4">
            <h2 className='hello'>hello</h2>
            <h2 className='get-data get-data-off'>get data on stocks easily</h2>
            <h2 className='just-enter'>just enter stock symbol in the search</h2>
            <h2 className='and'>and that is it</h2>
            <div 
                className='search flex flex-col items-center justify-center w-2/12 border-2 border-red-500' 
                style={{top: showMainPage   
                    ? inputTop
                    : inputInitialTop
                }}>
                <h3>Just enter stock symbol</h3>
                <input 
                    onKeyUp={inputOnKeyUp}
                    type="text" 
                    placeholder="Search"
                    className="mx-auto"
                />
            </div>

            {showMainPage
            ? <div className="flex justify-between items-end w-full h-full">
                <div className="stocks-wrapper w-3/12 h-full border-2 border-black px-4 py-4">
                    <Stocks 
                        live={live}
                        selectedCompanies={selectedCompanies}
                        selectedCompany={selectedCompany}
                        setSelectedCompany={setSelectedCompany}
                    />
                </div>
                <div className="stock-data w-4/12 h-[50%] border-2 border-black px-4 py-4">
                    stock data
                </div>
                <div className="news w-3/12 h-full border-2 border-black px-4 py-4">
                    stock news
                </div>
            </div>
            : null}
        </div>
    )
}

export default MainPage



{/*
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