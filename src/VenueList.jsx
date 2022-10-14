
const VenueList = ({venues}) => {
    return (
        <div id="list-of-venues">
            <h4>List of Venues</h4>
            {venues.map(venue=>(
                <div className="card my-3 shadow-sm">
                    <div className="card-body">
                        <button className="btn btn-sm btn-info float-end">
                            Open
                        </button>
                        <h5 className="card-title">{venue.name}</h5>
                        <div>{venue.building}</div>
                        <div>Capacity: {venue.capacity}</div>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default VenueList