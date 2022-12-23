function Stocks({ selectedCompany, setSelectedCompany, selectedCompanies, live }) {
    // "live" looks like this 
    // {
    //     APPL: {
    //         c: 2,
    //         d: 2
    //     },
    //     AMZN: {
    //         c: 2,
    //         d: 2
    //     },
    // }
    return (
        <div className="Stocks">
            <h3 className="text-xl text-center">Often looking for</h3>
            <div className="flex justify-between items-center flex-col">

            {Object.keys(live).map(stockKey => {
                const stock = live[stockKey]
                const company = selectedCompanies.find(c => c.stockSymbol == stockKey)
                // console.log({stockKey, stock, company})
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
                            <span>{stock.c}</span>
                            <span>{stock.d}</span>
                        </div>
                    </div>)
                }
            )}
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