function Stocks({ selectedCompany, setSelectedCompany, selectedCompanies, live }) {

    const checkOnArrows = (number) => {
        if (number <= -6) {
            return (
                <div className="flex justify-center mx-auto">
                    <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        class="bi bi-arrow-down-right" 
                        viewBox="0 0 16 16"
                        className="w-4 h-4 fill-lightRed">
                        <path fill-rule="evenodd" d="M14 13.5a.5.5 0 0 1-.5.5h-6a.5.5 0 0 1 0-1h4.793L2.146 2.854a.5.5 0 1 1 .708-.708L13 12.293V7.5a.5.5 0 0 1 1 0v6z"/>
                    </svg>
                    <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        class="bi bi-arrow-down-right" 
                        viewBox="0 0 16 16"
                        className="w-4 h-4 fill-lightRed">
                        <path fill-rule="evenodd" d="M14 13.5a.5.5 0 0 1-.5.5h-6a.5.5 0 0 1 0-1h4.793L2.146 2.854a.5.5 0 1 1 .708-.708L13 12.293V7.5a.5.5 0 0 1 1 0v6z"/>
                    </svg>
                    <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        class="bi bi-arrow-down-right" 
                        viewBox="0 0 16 16"
                        className="w-4 h-4 fill-lightRed">
                        <path fill-rule="evenodd" d="M14 13.5a.5.5 0 0 1-.5.5h-6a.5.5 0 0 1 0-1h4.793L2.146 2.854a.5.5 0 1 1 .708-.708L13 12.293V7.5a.5.5 0 0 1 1 0v6z"/>
                    </svg>
                </div>
            )
        }
        if (number <= -3 && number > -6) {
            return (
                <div className="flex justify-center mx-auto">
                    <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        class="bi bi-arrow-down-right" 
                        viewBox="0 0 16 16"
                        className="w-4 h-4 fill-lightRed">
                        <path fill-rule="evenodd" d="M14 13.5a.5.5 0 0 1-.5.5h-6a.5.5 0 0 1 0-1h4.793L2.146 2.854a.5.5 0 1 1 .708-.708L13 12.293V7.5a.5.5 0 0 1 1 0v6z"/>
                    </svg>
                    <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        class="bi bi-arrow-down-right" 
                        viewBox="0 0 16 16"
                        className="w-4 h-4 fill-lightRed">
                        <path fill-rule="evenodd" d="M14 13.5a.5.5 0 0 1-.5.5h-6a.5.5 0 0 1 0-1h4.793L2.146 2.854a.5.5 0 1 1 .708-.708L13 12.293V7.5a.5.5 0 0 1 1 0v6z"/>
                    </svg>
                </div>
            )
        }
        if (number < 0 && number > -3) {
            return (
                <div className="mx-auto">
                    <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        class="bi bi-arrow-down-right" 
                        viewBox="0 0 16 16"
                        className="w-4 h-4 fill-lightRed mx-auto">
                        <path fill-rule="evenodd" d="M14 13.5a.5.5 0 0 1-.5.5h-6a.5.5 0 0 1 0-1h4.793L2.146 2.854a.5.5 0 1 1 .708-.708L13 12.293V7.5a.5.5 0 0 1 1 0v6z"/>
                    </svg>
                </div>
            )
        }
        if (number === 0) {
            return (
                <div className="mx-auto">
                    <svg xmlns="http://www.w3.org/2000/svg" 
                        class="bi bi-dash-lg" 
                        viewBox="0 0 16 16"
                        className="w-4 h-4 fill-lightGrey mx-auto">
                        <path fill-rule="evenodd" d="M2 8a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11A.5.5 0 0 1 2 8Z"/>
                    </svg>
                </div>
            )
        }
        if (number < 3 && number > 0) {
            return (
                <div className="mx-auto">
                    <svg xmlns="http://www.w3.org/2000/svg" 
                        class="bi bi-arrow-up-right" 
                        viewBox="0 0 16 16"
                        className="w-4 h-4 fill-lightGreen mx-auto">
                        <path fill-rule="evenodd" d="M14 2.5a.5.5 0 0 0-.5-.5h-6a.5.5 0 0 0 0 1h4.793L2.146 13.146a.5.5 0 0 0 .708.708L13 3.707V8.5a.5.5 0 0 0 1 0v-6z"/>
                    </svg>
                </div>
            )
        }
        if (number < 6 && number >= 3) {
            return (
                <div className="flex justify-center mx-auto">
                    <svg xmlns="http://www.w3.org/2000/svg"  
                        class="bi bi-arrow-up-right" 
                        viewBox="0 0 16 16"
                        className="w-4 h-4 fill-lightGreen">
                        <path fill-rule="evenodd" d="M14 2.5a.5.5 0 0 0-.5-.5h-6a.5.5 0 0 0 0 1h4.793L2.146 13.146a.5.5 0 0 0 .708.708L13 3.707V8.5a.5.5 0 0 0 1 0v-6z"/>
                    </svg>
                    <svg xmlns="http://www.w3.org/2000/svg" 
                        class="bi bi-arrow-up-right" 
                        viewBox="0 0 16 16"
                        className="w-4 h-4 fill-lightGreen">
                        <path fill-rule="evenodd" d="M14 2.5a.5.5 0 0 0-.5-.5h-6a.5.5 0 0 0 0 1h4.793L2.146 13.146a.5.5 0 0 0 .708.708L13 3.707V8.5a.5.5 0 0 0 1 0v-6z"/>
                    </svg>
                </div>
            )
        }
        if (number >= 6) {
            return (
                <div className="flex justify-center mx-auto">
                    <svg xmlns="http://www.w3.org/2000/svg"  
                        class="bi bi-arrow-up-right" 
                        viewBox="0 0 16 16"
                        className="w-4 h-4 fill-lightGreen">
                        <path fill-rule="evenodd" d="M14 2.5a.5.5 0 0 0-.5-.5h-6a.5.5 0 0 0 0 1h4.793L2.146 13.146a.5.5 0 0 0 .708.708L13 3.707V8.5a.5.5 0 0 0 1 0v-6z"/>
                    </svg>
                    <svg xmlns="http://www.w3.org/2000/svg"  
                        class="bi bi-arrow-up-right" 
                        viewBox="0 0 16 16"
                        className="w-4 h-4 fill-lightGreen">
                        <path fill-rule="evenodd" d="M14 2.5a.5.5 0 0 0-.5-.5h-6a.5.5 0 0 0 0 1h4.793L2.146 13.146a.5.5 0 0 0 .708.708L13 3.707V8.5a.5.5 0 0 0 1 0v-6z"/>
                    </svg><svg xmlns="http://www.w3.org/2000/svg"  
                        class="bi bi-arrow-up-right" 
                        viewBox="0 0 16 16"
                        className="w-4 h-4 fill-lightGreen">
                        <path fill-rule="evenodd" d="M14 2.5a.5.5 0 0 0-.5-.5h-6a.5.5 0 0 0 0 1h4.793L2.146 13.146a.5.5 0 0 0 .708.708L13 3.707V8.5a.5.5 0 0 0 1 0v-6z"/>
                    </svg>
                </div>
            )
        }
    }

    const checkColor = (number) => {
        if (number < 0) {
            return "#dc3545"
        }
        if (number > 0) {
            return "#319b6a"
        }
        if (number = 0) {
            return "#889096"
        }
    }


    return (
        <div className="stocks-wrapper relative w-[29%]  h-full xl:px-4 lg:px-2 md:px-1 xl:py-4 md:py-0 md:pt-2 md:pb-3 lg:rounded-[2rem] rounded-[1.5rem] bg-lightPurple border-[1px] border-darkPurple">
            <h3 className="lg:text-2xl md:text-xl sm:text-lg lg:leading-[3rem] md:leading-[2.5rem] sm:leading-[2rem] text-center font-semibold text-darkPurple">Popular Choice</h3>
            <div className="flex justify-between items-center flex-col lg:h-[calc(100%-3rem)] md:h-[calc(100%-2.5rem)] sm:h-[calc(100%-2rem)]">

            {Object.keys(live).map(stockKey => {
                const stock = live[stockKey]
                const company = selectedCompanies.find(c => c.stockSymbol == stockKey)
                return (
                    <div className="flex justify-between items-center w-full py-1 xl:px-4 lg:px-2 sm:px-1 rounded-xl h-[10%]"
                        style={{
                            background: selectedCompany === stockKey ? "#c7d2fe" : "inherit",
                            border: selectedCompany === stockKey ? "solid 1px #6366f1" : null
                        }}
                        onClick={()=> setSelectedCompany(stockKey)}
                    >
                        <div className="flex flex-col w-4/12">
                            <span className="lg:text-[1.05rem] sm:text-[0.85rem] font-medium">{company.stockSymbol}</span>
                            <span className="lg:text-sm sm:text-[0.7rem] text-lightGrey">{company.name}</span>
                        </div>
                        <div className="w-4/12 mx-auto self-center">{checkOnArrows(stock.dp)}</div>
                        <div className="flex flex-col w-4/12 text-right">
                            <div className="lg:text-[1.05rem] sm:text-[0.85rem]">{parseFloat(stock.c).toFixed(2)} $</div>
                            <div 
                                className="lg:text-[1rem] sm:text-[0.8rem]"
                                style={{color: checkColor(stock.dp)}}>
                                {`${parseFloat(stock.dp).toFixed(2)}%`}
                            </div>
                        </div>
                    </div>)
                }
            )}
            </div>
        </div>
    )
}

export default Stocks