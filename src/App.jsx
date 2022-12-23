import { useEffect } from 'react'
import Intro from './Components/Intro'
import Header from './Components/Header'
import MainPage from './Components/MainPage'
import Footer from './Components/Footer'

function App() {
  // const [appleCandles24, setAppleCandles24] = useState([]);
  // const [high, setHigh] = useState(0);
  // const [low, setLow] = useState(0);


  // useEffect(()=> {
  //   const api_key = finnhub.ApiClient.instance.authentications['api_key'];
  //   api_key.apiKey = "cdukjcaad3ib3oqti880cdukjcaad3ib3oqti88g"
  //   const finnhubClient = new finnhub.DefaultApi()
  
  //   // setTimeout(()=>{
  //   //   finnhubClient.quote("AAPL", (error, data, response) => {
  //   //     if(error) return console.error(error) 
  //   //     console.log(data, response)
  //   //     setAppleStock(data)
  //   //   });
  //   // },5000)

  //   // get news for apple between two time periods
  //   // finnhubClient.companyNews("AAPL", "2022-01-01", "2022-11-10", (error, data, response) => {
  //   //   if(error) return console.error(error)
  //   //   console.log(data, response)
  //   // });

  //   // initial price data for last 24 hours
  //   finnhubClient.stockCandles("AAPL", "1", parseInt((Date.now() - 1000*60*60*24)/1000), parseInt(Date.now() / 1000), (error, data, response) => {
  //     if(error) return console.error(error)
  //     console.log(data, response)
  //     if(data.s === "ok") setAppleCandles24(data.c)
  //   });
  //   // continue to get apple price every 1 minute
  //   setInterval(()=>{
  //     finnhubClient.stockCandles("AAPL", "1", parseInt(Date.now()/1000)-60, parseInt(Date.now() / 1000), (error, data, response) => {
  //       if(error) return console.error(error)
  //       console.log(data, response)
  //       if(data.s === "ok") setAppleCandles24(prev => [...prev, data.c[0]])
  //     });
  //   }, 1000*60*1)
  // }, [])

  // useEffect(()=> {
  //   console.log("apple update", appleCandles24)
  //   if(appleCandles24.length > 0) {
  //     setHigh(Math.max(...appleCandles24))
  //     setLow(Math.min(...appleCandles24))
  //   }
  // }, [appleCandles24])

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
    <div className="App relative h-screen">
      <h2 className='hello'>hello</h2>
      <h2 className='get-data get-data-off'>get data on stocks easily</h2>
      <h2 className='just-enter'>just enter stock symbol in the search</h2>
      <h2 className='and'>and that is it</h2>
      <div className='search'>
          <h3>enter here</h3>
          <input type='text' placeholder='Search'/>
      </div>
      <Header />
      <MainPage />
      <Footer />
    </div>
  )
}

export default App

































// import Header from './Components/Header'
// import MainPage from './Components/MainPage'
// import Footer from './Components/Footer'
// import * as finnhub from 'finnhub'
// import { useEffect } from 'react';

// function App() {



//   useEffect(() => {
//     const api_key = finnhub.ApiClient.instance.authentications['api_key'];
//     api_key.apiKey = "cdukjcaad3ib3oqti880cdukjcaad3ib3oqti88g" // Replace this
//     const finnhubClient = new finnhub.DefaultApi()

//     finnhubClient.quote("AAPL", (error, data, response) => {
//       if(error) return console.error(error) 
//       console.log(data, response)
//     });
//   }, [])

//   return (
//     <div className="App relative">
//       <Header />
//       <MainPage />
//       <Footer />
//     </div>
//   )
// }

// export default App
