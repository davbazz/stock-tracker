import Diagram from "./Diagram"
// import Fall from "./Fall"
// import Rise from "./Rise"
import Stocks from "./Stocks"
import * as finnhub from 'finnhub'
import { useEffect, useState } from 'react';


function MainPage() {

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
    const [live, setLive] = useState({})
    const [candles, setCandles] = useState({})
    const [numberOfDaysToFetch, setNumberOfDaysToFetch] = useState(100)
    // const [rawData, setRawData] = useState()
    // const [diagramData, setDiagramData] = useState()



    // useEffect(() => {
    //     console.log(rawData)
    //     setDiagramData(() => ([ 
    //         {symbol: rawData["Meta Data"]["2. Symbol"]},
    //         {dates: Object.keys(rawData['Time Series (Daily)'])},
    //         {prices: Object.values(rawData['Time Series (Daily)'][0])}
    //     ]))
    //         // .then(console.log(diagramData))
    // }, [rawData])

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


        //
    
        // selectedCompanies.forEach(({stockSymbol}) => {
        //     finnhubClient.stockCandles(stockSymbol, "D", parseInt((Date.now() - 1000*60*60*24*numberOfDaysToFetch)/1000), parseInt(Date.now() / 1000), (error, data, response) => {
        //         if(error) return console.error(error)
        //         if(data.s === "ok") {
        //             setCandles(p=>({...p, [stockSymbol]: {c: data.c}}))
        //         }
        //     }); 
        // })

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
    }, [])

    // console.log(rawData)
    
    
    // useEffect(()=> {
    //     console.log(888,candles[selectedCompany])
    //     // console.log("candles data updated: ", candles)
    // }, [candles])

    // 1) fix stock component to read new data "live" data format ( object full of objects )
    return (
        <div className="MainPage flex justify-between items-start h-[85vh] px-8 py-4">
            <div className="w-3/12 h-full border-2 border-black px-4 py-4">
            {/*<p>{JSON.stringify(rawData[0])}</p> */}
                <Stocks 
                    live={live}
                    selectedCompanies={selectedCompanies}
                    selectedCompany={selectedCompany}
                    setSelectedCompany={setSelectedCompany}
                />
            </div>
            {/*<div className="flex justify-between items-start flex-col w-8/12 h-full border-2 border-black gap-4 px-4 py-4">
                <Diagram 
                    // data={candles[selectedCompany]}
                    // data={data}
                    selectedCompany={selectedCompany}

                />
                <div className="flex justify-between items-start gap-4 w-full h-2/5">
                    {<Rise />
                    <Fall />
                </div>
            </div>*/}
        </div>
    )
}

export default MainPage