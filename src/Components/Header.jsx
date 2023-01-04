function Header({ showHeader }) {
    return (
    showHeader 
    ? <div className="Header relative px-8 xl:py-4 md:py-5 sm:py-4 w-full h-[9vh]">
        <h1 
            className="block mx-auto lg:text-4xl md:text-3xl sm:text-2xl text-center w-4/12">
            STOCKS TODAY
        </h1>
    </div>
    : null
    )
}

export default Header