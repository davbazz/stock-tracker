function Header({ showHeader }) {
    return (
    showHeader 
    ? <div className="Header relative px-8 py-4 border-2 border-b-black w-full h-[9vh]">
            <h1 
                className="block mx-auto text-4xl text-center w-4/12">
                STOCKS TODAY
            </h1>
            {/*<button 
                className="w-4/12 top-[10px] right-[10px] text-end">
                themeToggle
            </button>*/}
    </div>
    : null
    )
}

export default Header