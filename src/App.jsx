import Header from './Components/Header'
import MainPage from './Components/MainPage'
import Footer from './Components/Footer'
import * as finnhub from 'finnhub'
import { useEffect, useState } from 'react';
import { VictoryChart, VictoryTheme, VictoryLine, VictoryArea, VictoryAxis } from 'victory';

function App() {
  const [appleCandles24, setAppleCandles24] = useState([]);
  const [high, setHigh] = useState(0);
  const [low, setLow] = useState(0);


  useEffect(()=> {
    const api_key = finnhub.ApiClient.instance.authentications['api_key'];
    api_key.apiKey = "cdukjcaad3ib3oqti880cdukjcaad3ib3oqti88g" // Replace this
    const finnhubClient = new finnhub.DefaultApi()
  
    // setTimeout(()=>{
    //   finnhubClient.quote("AAPL", (error, data, response) => {
    //     if(error) return console.error(error) 
    //     console.log(data, response)
    //     setAppleStock(data)
    //   });
    // },5000)

    // get news for apple between two time periods
    // finnhubClient.companyNews("AAPL", "2022-01-01", "2022-11-10", (error, data, response) => {
    //   if(error) return console.error(error)
    //   console.log(data, response)
    // });

    // initial price data for last 24 hours
    finnhubClient.stockCandles("AAPL", "1", parseInt((Date.now() - 1000*60*60*24)/1000), parseInt(Date.now()/1000), (error, data, response) => {
      if(error) return console.error(error)
      console.log(data, response)
      if(data.s === "ok") setAppleCandles24(data.c)
    });
    // continue to get apple price every 1 minute
    setInterval(()=>{
      finnhubClient.stockCandles("AAPL", "1", parseInt(Date.now()/1000)-60, parseInt(Date.now()/1000), (error, data, response) => {
        if(error) return console.error(error)
        console.log(data, response)
        if(data.s === "ok") setAppleCandles24(prev => [...prev, data.c[0]])
      });
    }, 1000*60*1)
  }, [])

  useEffect(()=> {
    console.log("apple update", appleCandles24)
    if(appleCandles24.length > 0) {
      setHigh(Math.max(...appleCandles24))
      setLow(Math.min(...appleCandles24))
    }
  }, [appleCandles24])

  return (
    <div className="App relative">
      {/* victory component for apple stock */}
       
       <VictoryChart
          theme={VictoryTheme.material}
          domain={{ y: [low, high] }}
        >
          <VictoryArea data={
            appleCandles24.map((candle, index) => {
              return {x: index, y: candle}
            })
          }/>
          <VictoryAxis/>
      </VictoryChart>

      <Header />
      <MainPage />
      <Footer />
    </div>
  )
}

export default App
