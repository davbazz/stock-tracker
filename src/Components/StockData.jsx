function StockData({ selectedCompany, liveSelectedCompany }) {
    return(
        <div className="stock-data w-5/12 h-[60%] border-2 border-black px-4 py-4">
            <h3 className="text-center">{selectedCompany}</h3>
            <div className="h-[94%]">
            {Object.entries(liveSelectedCompany).map((stockKey) => {
                return (
                    <div className="stock-data-wrapper h-full">
                        <ul className="stock-data-left h-full">
                            <li className="flex justify-between items-center h-[20%]">
                                <div>Current Price:</div>
                                <div className="flex flex-col items-center">
                                    <span>{stockKey[1].c}</span>
                                    <span>{`${parseFloat(stockKey[1].dp).toFixed(2)}%`}</span>
                                </div>
                            </li>
                            <li className="flex justify-between h-[10%]">
                                <div>Open Price:</div>
                                <div>{stockKey[1].o}</div>
                            </li>
                            <li className="flex justify-between h-[10%]">
                                <div>Previous Close Price:</div>
                                <div>{stockKey[1].c}</div>
                            </li>
                            <li className="flex justify-between h-[10%]">
                                <div>High Price of the Day:</div>
                                <div>{stockKey[1].h}</div>
                            </li>
                            <li className="flex justify-between h-[10%]">
                                <div>Low Price of the Day:</div>
                                <div>{stockKey[1].l}</div>
                            </li>
                            <li className="flex justify-between h-[10%]">
                                <div>Last Month Grow:</div>
                                <div>?</div>
                            </li>
                            <li className="flex justify-between h-[10%]">
                                <div>Last 3 Months Grow:</div>
                                <div>?</div>
                            </li>
                            <li className="flex justify-between h-[10%]">
                                <div>Last 6 Months Grow:</div>
                                <div>?</div>
                            </li>
                            <li className="flex justify-between h-[10%]">
                                <div>Last Year Grow:</div>
                                <div>?</div>
                            </li>
                        </ul>
                    </div>
                )
            })}
            </div>
        </div>
    )
}

export default StockData