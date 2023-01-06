function Header({ showHeader }) {
    return (
    showHeader 
    ? <div className="Header relative px-8 md:py-5 py-4 w-full h-[9vh]">
        <h1 
            className="block mx-auto lg:text-4xl md:text-3xl sm:text-2xl text-3xl text-center">
            STOCKS TODAY
        </h1>
    </div>
    : null
    )
}

export default Header