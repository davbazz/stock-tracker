import Diagram from "./Diagram"
import Fall from "./Fall"
import Rise from "./Rise"
import Stocks from "./Stocks"
import * as finnhub from 'finnhub'
import { useEffect, useState } from 'react';



function MainPage() {
    const [liveApple, setLiveApple] = useState(0)
    const [liveTesla, setLiveTesla] = useState(0)
    const [liveNike, setLiveNike] = useState(0)
    const [liveMicrosoft, setLiveMicrosoft] = useState(0)
    const [liveMeta, setLiveMeta] = useState(0)
    const [liveDisney, setLiveDisney] = useState(0)
    const [liveAmazon, setLiveAmazon] = useState(0)
    const [liveNvidia, setLiveNvidia] = useState(0)
    const [liveStarbucks, setLiveStarbucks] = useState(0)
    const [liveNetflix, setLiveNetflix] = useState(0)


    const [appleCandles24, setAppleCandles24] = useState([]);
    const [high, setHigh] = useState(0);
    const [low, setLow] = useState(0);
  
    useEffect(() => {
        const api_key = finnhub.ApiClient.instance.authentications['api_key'];
        api_key.apiKey = "cdukjcaad3ib3oqti880cdukjcaad3ib3oqti88g"
        const finnhubClient = new finnhub.DefaultApi()

        finnhubClient.quote("AAPL", (error, data, response) => setLiveApple(data.c))
        finnhubClient.quote("TSLA", (error, data, response) => setLiveTesla(data.c))
        finnhubClient.quote("NKE", (error, data, response) => setLiveNike(data.c))
        finnhubClient.quote("MSFT", (error, data, response) => setLiveMicrosoft(data.c))
        finnhubClient.quote("META", (error, data, response) => setLiveMeta(data.c))
        finnhubClient.quote("DIS", (error, data, response) => setLiveDisney(data.c))
        finnhubClient.quote("AMZN", (error, data, response) => setLiveAmazon(data.c))
        finnhubClient.quote("NVDA", (error, data, response) => setLiveNvidia(data.c))
        finnhubClient.quote("SBUX", (error, data, response) => setLiveStarbucks(data.c))
        finnhubClient.quote("NFLX", (error, data, response) => setLiveNetflix(data.c))


    
    //   setTimeout(()=>{
    //     finnhubClient.quote("AAPL", (error, data, response) => {
    //       if(error) return console.error(error) 
    //       console.log(data, response)
    //       setAppleStock(data)
    //     });
    //   },5000)
  
      // get news for apple between two time periods
      // finnhubClient.companyNews("AAPL", "2022-01-01", "2022-11-10", (error, data, response) => {
      //   if(error) return console.error(error)
      //   console.log(data, response)
      // });
  
      //initial price data for last 24 hours
    //   finnhubClient.stockCandles("AAPL", "1", parseInt((Date.now() - 1000*60*60*24)/1000), parseInt(Date.now() / 1000), (error, data, response) => {
    //     if(error) return console.error(error)
    //     console.log(data, response)
    //     if(data.s === "ok") setAppleCandles24(data.c)
    //   });

    //   // continue to get apple price every 1 minute
    //   setInterval(()=>{
    //     finnhubClient.stockCandles("AAPL", "1", parseInt(Date.now()/1000)-60, parseInt(Date.now() / 1000), (error, data, response) => {
    //       if(error) return console.error(error.message)
    //       console.log(data, response)
    //       if(data.s === "ok") setAppleCandles24(prev => [...prev, data.c[0]])
    //     });
    //   }, 1000*60*1)
    }, [])
  
    // useEffect(()=> {
    //   console.log("apple update", appleCandles24)
    //   if(appleCandles24.length > 0) {
    //     setHigh(Math.max(...appleCandles24))
    //     setLow(Math.min(...appleCandles24))
    //   }
    // }, [appleCandles24])


    return (
        <div className="MainPage flex justify-between items-start h-[85vh] px-8 py-4">
            <div className="w-3/12 h-full border-2 border-black px-4 py-4">
                <Stocks 
                    liveApple={liveApple}
                    liveTesla={liveTesla}
                    liveNike={liveNike}
                    liveMicrosoft={liveMicrosoft}
                    liveMeta={liveMeta}
                    liveDisney={liveDisney}
                    liveAmazon={liveAmazon}
                    liveNvidia={liveNvidia}
                    liveStarbucks={liveStarbucks}
                    liveNetflix={liveNetflix}
                />
            </div>
            <div className="flex justify-between items-start flex-col w-8/12 h-full border-2 border-black gap-4 px-4 py-4">
                <Diagram />
                <div className="flex justify-between items-start gap-4 w-full h-2/5">
                    <Rise />
                    <Fall />
                </div>
            </div>
        </div>
    )
}

export default MainPage