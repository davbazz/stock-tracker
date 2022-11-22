import Diagram from "./Diagram"
import Fall from "./Fall"
import Rise from "./Rise"
import Stocks from "./Stocks"

function MainPage() {
    return (
        <div className="MainPage flex justify-between items-start h-[85vh] px-8 py-4">
            <div className="w-3/12 h-full border-2 border-black px-4 py-4">
                <Stocks />
            </div>
            <div className="flex justify-between items-start flex-col w-8/12 h-full border-2 border-black gap-4 px-4 py-4">
                <Diagram />
                <div className="flex justify-between items-start gap-4 w-full h-2/5">
                    <Rise />
                    <Fall />
                </div>
            </div>
        </div>
    )
}

export default MainPage