function Stocks({ selectedCompany, setSelectedCompany, selectedCompanies, live }) {
    return (
        <div className="stocks-wrapper w-3/12 h-full border-2 border-black px-4 py-4">
            <h3 className="text-xl text-center">Often looking for</h3>
            <div className="flex justify-between items-center flex-col">

            {Object.keys(live).map(stockKey => {
                const stock = live[stockKey]
                const company = selectedCompanies.find(c => c.stockSymbol == stockKey)
                return (
                    <div className="flex justify-between items-center w-full"
                        style={{
                            background: selectedCompany === stockKey ? "lime": "white"
                        }}
                        onClick={()=> setSelectedCompany(stockKey)}
                    >
                        <div className="flex flex-col w-4/12">
                            <span>{company.stockSymbol}</span>
                            <span>{company.name}</span>
                        </div>
                        <div className="w-4/12 text-center">chart</div>
                        <div className="flex flex-col w-4/12 text-right">
                            <span>{parseFloat(stock.c).toFixed(2)}</span>
                            <span>{parseFloat(stock.dp).toFixed(2)}</span>
                        </div>
                    </div>)
                }
            )}
            </div>
        </div>
    )
}

export default Stocks