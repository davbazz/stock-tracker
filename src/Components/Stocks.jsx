import { useState } from "react"

function Stocks({ liveApple, liveTesla, liveNike, liveMicrosoft, liveMeta, liveDisney, liveAmazon, liveNvidia, liveStarbucks, liveNetflix } ) {

    const oftenStocks = [
        { name: 'Apple', shortname: 'AAPL', price: liveApple },
        { name: 'Tesla', shortname: 'TSLA', price: liveTesla },
        { name: 'Nike', shortname: 'NKE', price: liveNike },
        { name: 'Microsoft', shortname: 'MSFT', price: liveMicrosoft },
        { name: 'Meta', shortname: 'META', price: liveMeta },
        { name: 'Disney', shortname: 'DIS', price: liveDisney },
        { name: 'Amazon', shortname: 'AMZN', price: liveAmazon },
        { name: 'Nvidia', shortname: 'NVDA', price: liveNvidia },
        { name: 'Starbucks', shortname: 'SBUX', price: liveStarbucks },
        { name: 'Netflix', shortname: 'NFLX', price: liveNetflix }
    ]

    return (
        <div className="Stocks">
            <h3 className="text-xl text-center">Often looking for</h3>
            <div className="flex justify-between items-center flex-col">
            {oftenStocks.map(stock => (
                <div className="flex justify-between items-center w-full">
                    <div className="flex flex-col w-4/12">
                        <span>{stock.shortname}</span>
                        <span>{stock.name}</span>
                    </div>
                    <div className="w-4/12 text-center">chart</div>
                    <div className="flex flex-col w-4/12 text-right">
                        <span>{stock.price}</span>
                        <span>daily change</span>
                    </div>
                </div>
            ))}
            </div>
            
            {/*<div className="list flex justify-between items-center">
                <div className="name flex flex-col">
                    <span>short name</span>
                    <span>full name</span>
                </div>
                <div>chart</div>
                <div>price</div>
            </div>*/}
        </div>
    )
}

export default Stocks