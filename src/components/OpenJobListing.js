import { Button, CircularProgress } from '@mui/material';
import { useEffect, useState } from 'react';
import Filters from "./Filters";

function OpenJobListing() {

    const [listings, setListings] = useState({
        all: [],
        active: [],
    });
    const [render, setRender] = useState(false);
    const [locationFilter, setLocationFilter] = useState("ALL LOCATIONS");
    const [teamFilter, setTeamFilter] = useState("ALL TEAMS");
    const [workTypeFilter, setWorkTypeFilter] = useState("ALL WORK TYPES");
    const [teams, setTeams] = useState({
        unique: [],
        active: []
    });
    const [locations, setLocations] = useState({
        unique: [],
        active: []
    });
    const [workTypes, setWorkTypes] = useState({
        unique: [],
        active: []
    });
    const [matches, setMatches] = useState(window.matchMedia("(min-width: 800px)"));
    
    useEffect(() => {
        window
        .matchMedia("(min-width: 800px)")
        .addEventListener('change', e => setMatches( e.matches ));
    }, []);

    const fetchData = async () => {
        const url = `https://api.lever.co/v0/postings/paralleldomain?mode=json`;
        try {
            const response = await fetch(url);
            const json = await response.json();
            setListings({
                all: json,
                active: json,
            });
        } catch (error) {
            console.log("error", error);
        }
    };

    useEffect(() => {
        fetchData();
    }, [])

    useEffect(() => {
        if(listings.active.length > 0) {
            let uniqueTeams = [];
            let uniqueLocations = [];
            let uniqueWorkTypes = [];
            for(let i = 0; i < listings.active.length; i++) {
                const cat = listings.active[i].categories;
                if(!uniqueTeams.find(e => e === cat.team)){
                    uniqueTeams.push(cat.team);
                }
                if(!uniqueLocations.find(e => e === cat.location)){
                    uniqueLocations.push(cat.location);
                }
                if(!uniqueWorkTypes.find(e => e === cat.commitment)){
                    uniqueWorkTypes.push(cat.commitment);
                }
            }
            
            setTeams({
                unique: uniqueTeams,
                active: uniqueTeams
            });
            setLocations({
                unique: uniqueLocations,
                active: uniqueLocations
            });
            setWorkTypes({
                unique: uniqueWorkTypes,
                active: uniqueWorkTypes
            });

            setRender(true);
        }
        
    }, [listings.all])

    useEffect(() => {
        filterData();
    }, [locationFilter, teamFilter, workTypeFilter])

    useEffect(() => {
        setRender(true);
    }, [listings.active])

    const filterData = () => {
        let activeListings = listings.all;
        let activeTeams = [];

        if(locationFilter !== "ALL LOCATIONS") {
            activeListings = activeListings.filter(e => e.categories.location === locationFilter);
        }
        if(teamFilter !== "ALL TEAMS") {
            activeListings = activeListings.filter(e => e.categories.team === teamFilter);
        }
        if(workTypeFilter !== "ALL WORK TYPES") {
            activeListings = activeListings.filter(e => e.categories.commitment === workTypeFilter)
        }
        
        activeListings.map(e => {
            if(!activeTeams.find(f => f === e.categories.team)){
                activeTeams.push(e.categories.team);
            }
        });
        setListings({ 
            all: listings.all,
            active: activeListings,
        })
        setTeams({
            unique: teams.unique,
            active: activeTeams
        });
    }

    return (
        <div>
            {render ? 
                <div>
                    <Filters 
                    uniqueLocations={locations.unique} 
                    uniqueTeams={teams.unique} 
                    uniqueWorkTypes={workTypes.unique} 
                    locationFilter={locationFilter}
                    teamFilter={teamFilter}
                    workTypeFilter={workTypeFilter}
                    setLocationFilter={setLocationFilter}
                    setTeamFilter={setTeamFilter}
                    setWorkTypeFilter={setWorkTypeFilter}
                    matches={matches}
                    />
                    {teams.active.map((e,index) => {
                        return (
                        <div key={index}>
                            <p 
                            style={{ 
                                marginTop: "80px", 
                                marginBottom: "10px", 
                                color: "orange", 
                                textTransform: "uppercase",
                            }}
                            >
                                {e}
                            </p>
                            {listings.active.map((f, ind) => {
                                if(f.categories.team === e) {
                                    return (
                                        <div key={ind}>
                                            <a 
                                            href={f.applyUrl} 
                                            style={{
                                                    display: matches ? "flex" : "block", 
                                                    justifyContent: "space-between", 
                                                    alignItems: "center", 
                                                    flexWrap: "wrap", 
                                                    padding: "40px 0", 
                                                    width: "100%", 
                                                    borderBottom: "1px solid rgb(129, 146, 158)",
                                                    textDecoration: "none",
                                                    color: "white"
                                                }}
                                            >
                                                <div>
                                                    <h3 
                                                    style={{ 
                                                        fontSize: "24px", 
                                                        fontWeight: "400", 
                                                        lineHeight: "1.2", 
                                                        margin: "0 0 10px 0" 
                                                    }}
                                                    >
                                                        {f.text}
                                                    </h3>
                                                    <h6 
                                                    style={{ 
                                                        fontSize: "12px", 
                                                        fontWeight: "300", 
                                                        textTransform: "uppercase", 
                                                        letterSpacing: "2.5px", 
                                                        margin: "0" 
                                                        }}
                                                    >
                                                        {f.categories.location} / {f.categories.team}
                                                    </h6>
                                                </div>
                                                <Button size="medium" variant="outlined">
                                                    <span>Apply</span>
                                                </Button>
                                            </a>
                                        </div>
                                    );
                                }
                                return null;
                            })}
                        </div>
                        );
                    })}
                </div>
                :
                <>
                    <CircularProgress />
                </>
            }
        </div>
    );
}

export default OpenJobListing;