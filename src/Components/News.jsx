import { useEffect, useState } from "react";

function News({ filteredNews, mobileDisplay }) {

    const [fourNews, setFourNews] = useState(false)

    const displayNews = () => {
        if (mobileDisplay == true) {
            document.querySelector(".News").classList.add('hide-when-mobile')
        }
    }

    const toNormalTime = (timestamp) => {
        const date = new Date(timestamp * 1000);
        const year = date.getFullYear()
        const month = date.getMonth()+1
        const day = date.getDate()
        const hours = date.getHours()
        const minutes = JSON.stringify(date.getMinutes())
        if (minutes.length < 2) {
            const adjustedMinutes = `0${minutes}`
            return `${year}-${month}-${day} at ${hours}:${adjustedMinutes}`
        } else {
            return `${year}-${month}-${day} at ${hours}:${minutes}`
        }
    }

    const checkWidth = () => {
        if (window.innerWidth <= 1023) {
            setFourNews(true)
        } 
        if (window.innerWidth > 1023) {
            setFourNews(false)
        } 
    }

    useEffect(() => {
        displayNews()
        checkWidth()
        console.log(window.innerWidth)
    }, [])

    const shownews = () => {console.log(fourNews)}

    return(
        <div className="News w-[29%] h-full xl:px-4 lg:px-2 px-1 xl:py-4 lg:py-2 md:py-0 md:pt-2 md:pb-3 lg:rounded-[2rem] rounded-[1.5rem] bg-lightPurple text-indigo-600 border-[1px] border-darkPurple">
            <h3 className="text-center lg:text-2xl md:text-xl text-lg lg:leading-[3rem] md:leading-[2.5rem] leading-[2rem] text-darkPurple font-semibold">Related News</h3>
            <div className="multiple-news-wrapper flex flex-col gap-[2%] lg:h-[calc(100%-3rem)] md:h-[calc(100%-2.5rem)] h-[calc(100%-2rem)]">

            {fourNews == true 
            ?   filteredNews.slice(0,4).map((item, i) => (
                <div className="single-news-wrapper flex flex-col h-[23%] w-full xl:px-4 lg:px-3 md:px-2 px-2 xl:py-4 lg:py-3 md:py-2 py-2 border-[1px] bg-[#eef2ff] border-darkPurple hover:border-lightBlue rounded-[1rem] cursor-pointer xl:hover:-ml-2 xl:hover:w-[calc(100%+16px)] md:hover:-ml-1 md:hover:w-[calc(100%+8px)] focus:absolute focus:top-0 focus:bg-lightRed duration-300">
                    <div className="top-wrapper flex justify-between items-start w-full h-[90%] overflow-hidden border-b-[1px] border-darkGrey">
                        <div className="news-text flex flex-col xl:gap-2 gap-1 w-[55%] h-full">
                            <div className="source lg:text-lg md:text-base text-[12px] font-semibold">
                                {item.source}
                            </div>
                            <div className="summary lg:text-base md:text-sm text-[12px] text-lightGrey">
                                {item.summary}
                            </div>
                        </div>
                        <div className="news-img w-[40%] xl:h-full lg:h-[70%] sm:h-[80%] rounded-[1rem]">
                            <img src={item.image}
                                className="w-full block rounded-[1rem] lg:h-[95%] sm:h-[92%] object-fill"
                            />
                        </div>
                    </div> 
                    <div className="bot-wrapper lg:text-base md:text-sm text-[12px] text-center text-lightGrey w-full h-[10%] xl:mt-2 sm:mt-[2px] xl:mb-0 sm:mb-[3px]">
                        {toNormalTime(item.datetime)}
                    </div>
                </div>
                ))
            :   filteredNews.slice(0,3).map((item) => (
                <div className="single-news-wrapper flex flex-col h-[32%] w-full xl:px-4 lg:px-3 md:px-2 px-2 xl:py-4 lg:py-3 md:py-2 py-2 border-[1px] bg-[#eef2ff] border-darkPurple hover:border-lightBlue rounded-[1rem] cursor-pointer xl:hover:-ml-2 xl:hover:w-[calc(100%+16px)] md:hover:-ml-1 md:hover:w-[calc(100%+8px)] focus:absolute focus:top-0 focus:bg-lightRed duration-300">
                    <div className="top-wrapper flex justify-between items-start w-full h-[90%] overflow-hidden border-b-[1px] border-darkGrey">
                        <div className="news-text flex flex-col xl:gap-2 gap-1 w-[55%] h-full">
                            <div className="source lg:text-lg md:text-base text-[12px] font-semibold">
                                {item.source}
                            </div>
                            <div className="summary lg:text-base md:text-sm text-[12px] text-lightGrey">
                                {item.summary}
                            </div>
                        </div>
                        <div className="news-img w-[40%] xl:h-full lg:h-[70%] h-[60%] rounded-[1rem]">
                            <img src={item.image}
                                className="w-full block rounded-[1rem] lg:h-[95%] sm:h-[92%] object-fill"
                            />
                        </div>
                    </div> 
                    <div className="bot-wrapper lg:text-base md:text-sm text-[12px] text-center text-lightGrey w-full h-[10%] xl:mt-2 sm:mt-[2px] xl:mb-0 sm:mb-[3px]">
                        {toNormalTime(item.datetime)}
                    </div>
                </div>
            ))} 
            </div>
        </div>
    )
}

export default News


{/*

*/}

{/*
<div className="top-wrapper float-left lg:flex lg:justify-between lg:items-start w-full h-[90%] overflow-hidden border-b-[1px] border-darkGrey">
    <div className="news-text flex flex-col xl:gap-2 gap-1 w-[55%] h-full">
        <div className="source lg:text-lg text-base font-semibold">
            {item.source}
        </div>
        <div className="summary lg:text-base text-sm text-lightGrey">
            {item.summary}
        </div>
    </div>
    <div className="news-img float-right w-[40%] xl:h-full lg:h-[70%] md:h-[60%] rounded-[1rem]">
        <img src={item.image}
            className="w-full block rounded-[1rem] h-[95%] object-fill"
        />
    </div>
</div>  
*/}