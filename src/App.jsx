import { useEffect, useState } from 'react'
import VenueList from './VenueList'

function App() {

  const [venues, setVenues] = useState(null)
  const [selectedVenue, setSelectedVenue] = useState(null)
  const [isPending, setIsPending] = useState(true)
  const [isNoSelection, setIsNoSelection] = useState(true)

  useEffect(()=>{
    fetch('https://sis.materdeicollege.com/api/venues')
      .then(res=>{
        return res.json()
      }).then(data=>{
        setVenues(data.venues)
        setIsPending(false)
      })
  },[])

  const showVenue = (id) => {
    fetch('https://sis.materdeicollege.com/api/venues/' + id)
      .then(res=>{
        return res.json()
      }).then(data=>{
        setSelectedVenue(data)
        setIsNoSelection(false)
      })
  }

  return (
    <div className="App">
      
      <div className="row">
        <div className="col-md-4 bg-warning p-4" style={{height:"100vh",overflow:"auto"}}>
          {isPending && <p>Loading...</p>}
          {venues && (
              <div id="list-of-venues">
                  <h4>List of Venues</h4>
                  {venues.map(venue=>(
                      <div className="card my-3 shadow-sm">
                          <div className="card-body">
                              <button className="btn btn-sm btn-info float-end" onClick={()=>showVenue(venue.id)}>
                                  Open
                              </button>
                              <h5 className="card-title">{venue.name}</h5>
                              <div>{venue.building}</div>
                              <div>Capacity: {venue.capacity}</div>
                          </div>
                      </div>
                  ))}
              </div>
          )}
        </div>
        <div className="col-md-8" style={{height:"100vh",overflow:"auto"}}>
          {selectedVenue && (
            <div id="view-venue">
              <h1>{selectedVenue.venue.name}</h1>
              <h4>{selectedVenue.venue.building}</h4>
              <hr />
              <div className="d-flex flex-wrap">
                {selectedVenue.schedules.map(sched=>(
                  <div className="card m-3 shadow-sm" style={{width: 350}}>
                    <div className="card-header">
                      <div className="card-title">{sched.course_no}</div>
                    </div>
                    <div className="card-body">
                      <div className="card-text">{sched.description}</div>
                      <div className="card-text">Teacher: {sched.teacher}</div>
                      <div className="card-text">Schedule: {sched.schedule}</div>

                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

    </div>
  )
}

export default App
