import { useState, useEffect } from "react";
import { VictoryChart, VictoryLine, VictoryAxis } from 'victory';

function Diagram({ selectedCompany }) {

    const [rawData, setRawData] = useState()
    const [diagramData, setDiagramData] = useState()

    const API_KEY = 'HGJWFG4N8A066ICD'
    let API_Call = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=${selectedCompany}&outputsize=compact&apikey=${API_KEY}`

    // alpfa vantage api connection & set received data
    const getData = () => { 
        fetch(API_Call)
            .then(response => {
                if (!response.ok) {
                    Logging.error(`Did not get an ok. got: ${response.statusText}`)
                }
                return response.json()
            })
            .then(data => setDiagramData(Object.entries(data["Time Series (Daily)"]).map(entry => ({x: entry[0], y: entry[1]["4. close"]}))))

            // .then(data => console.log(Object.entries(data["Time Series (Daily)"]).map(entry => ({x: entry[0], y: entry[1]["1. open"]}))))
            .catch((error) => {
                Logging.error(`Error getting ad data: ${error.message}`);
            })
        }

    useEffect(() => {
        getData()
    }, [])

    const showdata = () => {console.log(diagramData)}

    return (
        <div 
            className="Diagram w-full h-3/5 border-2 border-black">
            <h3 
            onClick={showdata}
            className="text-xl text-center">Diagram</h3>

            {/*trying victory charts*/}
            <VictoryChart>
                <VictoryAxis
                    tickValues={[10, 20, 30, 40]}
                    tickFormat={["Quarter 1", "Quarter 2", "Quarter 3", "Quarter 4"]}
                />
                <VictoryAxis
                    dependentAxis
                    tickFormat={(x) => (`${x}$`)}
                />
                <VictoryLine
                    style={{
                        data: { stroke: "#c43a31" },
                        parent: { border: "1px solid #ccc"}
                    }}
                    data={diagramData}
                    x="x"
                    y="y"
                    // data={diagramData.map((arr, nth) => arr.filter((e, i) => i % nth === nth - 10))}
                    // x={diagramData}

                />
                </VictoryChart>
        </div>
    )
}

export default Diagram


{/*
<VictoryChart>
                <VictoryAxis 
                    tickValues={data.c.map((day,i) => i+1 )}
                    // tickFormat={["Quarter 1", "Quarter 2", "Quarter 3", "Quarter 4"]}
                    tickFormat={data.c.map((day,i) => {
                        const dataReversed = [...data.c].reverse()
                        // walking backwards, based on currentMonth, and daysInEachMonth
                        // find the range point of i in relation to daysInEachMonth
                        return 
                    } )}
                />
                <VictoryAxis
                    dependentAxis
                    tickFormat={(x) => (x)}
                />
                <VictoryLine
                    data={data.c.map((v,i) => ({day:i, closePrice: v}))}
                    x="day"
                    y="closePrice"  
                />
            </VictoryChart>



                // if(data === undefined) return "loading.."
    // console.log("YYY", data)
    // TO DO: check if it contains dates for each candle
    // TO DO: if not, check the documentation if you can get candle timeseries with timestamps
    // TO DO: otherwise walk backwards through

    // const showdata = () => console.log()
*/}