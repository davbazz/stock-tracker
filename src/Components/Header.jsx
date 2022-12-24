import Search from '../Components/Search'

function Header({ showHeader }) {
    return (
    showHeader 
    ? <div className="Header flex justify-between items-center px-8 border-2 border-b-black h-[9vh]">
            <Search />
            <h1 
                className="text-4xl text-center w-4/12">
                STOCKS TODAY
            </h1>
            <button 
                className="w-4/12 text-end">
                themeToggle
            </button>
    </div>
    : null
    )
}

export default Header