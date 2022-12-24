import { useEffect } from "react"

function Intro() {

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

    return(
        <div className="Intro">
            <h2 className='hello'>hello</h2>
            <h2 className='get-data get-data-off'>get data on stocks easily</h2>
            <h2 className='just-enter'>just enter stock symbol in the search</h2>
            <h2 className='and'>and that is it</h2>
            <div className='search'>
                <h3>enter here</h3>
                <input type='text' placeholder='Search'/>
            </div>
        </div>
    )
}

export default Intro