function News({ filteredNews }) {

    const date = new Date()
    const currentDate = `${date.getDate()-2}-${date.getMonth()+1}-${date.getFullYear()}`

    return(
        <div className="news w-3/12 h-full border-2 border-black px-4 py-4">
            <h3 className="text-center">Related News</h3>
            <div className="multiple-news-wrapper h-full">
                {filteredNews.slice(0,3).map((item) => (
                    <div className="single-news-wrapper flex flex-col h-1/3">
                        <div className="top-wrapper flex justify-between">
                            <div className="news-text flex flex-col">
                                <div className="source">
                                    {item.source}
                                </div>
                                <div className="summary">
                                    {item.summary}
                                </div>
                            </div>
                            <div className="news-img">
                                <img src={item.image}/>
                            </div>
                        </div>  
                        <div className="bot-wrapper">
                            <div className="date">{currentDate}</div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default News