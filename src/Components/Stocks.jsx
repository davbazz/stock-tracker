function Stocks() {
    return (
        <div className="Stocks">
            <h3 className="text-xl text-center">Often looking for</h3>
            <div className="list flex justify-between items-center">
                <div className="name flex flex-col">
                    <span>short name</span>
                    <span>full name</span>
                </div>
                <div>chart</div>
                <div>price</div>
            </div>
        </div>
    )
}

export default Stocks