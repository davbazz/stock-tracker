import { useEffect, useState } from 'react'
import Header from './Components/Header'
import MainPage from './Components/MainPage'
import Footer from './Components/Footer'

function App() {
  const [showHeader, setShowHeader] = useState(false)
  const [showMainPage, setShowMainPage] = useState(false)
  const [showFooter, setShowFooter] = useState(false)

  return (
    <div className="App relative h-screen w-full bg-[#f1f3f5]">
      <Header 
        showHeader={showHeader}
      />
      <MainPage 
        showHeader={showHeader}
        setShowHeader={setShowHeader}
        setShowMainPage={setShowMainPage}
        showMainPage={showMainPage}
        setShowFooter={setShowFooter}
      />
      <Footer 
        showFooter={showFooter}
      />
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
