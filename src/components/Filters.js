import { Select, MenuItem, FormControl } from "@mui/material";

const Filters = (props) => {

  const handleLocationChange = (e) => {
    props.setLocationFilter(e.target.value);
  }

  const handleTeamChange = (e) => {
    props.setTeamFilter(e.target.value);
  }

  const handleWorkTypeChange = (e) => {
    props.setWorkTypeFilter(e.target.value);
  }

  return (
    <div>
      <form style={props.matches ? { display: "flex", flexDirection: "row", flexWrap: "wrap", width: "100%", alignItems: "center" } : { width: "100%"}}>
        <span style={{ marginRight: "20px", marginBottom: "20px", display: 'block', fontSize: "14px", letterSpacing: "2px" }}>FILTER BY: </span>
        <div style={{ marginLeft: props.matches ? "20px" : "", marginBottom: "20px", width: "auto", minWidth: "150px" }}>
          <FormControl 
          variant="standard" 
          sx={props.matches ? { minWidth: 160 } : { width: "100%" }} 
          >
            <Select 
              id="select-location" 
              value={props.locationFilter}
              onChange={handleLocationChange}
            >
              <MenuItem value={"ALL LOCATIONS"}>
                ALL LOCATIONS
              </MenuItem>
              {props.uniqueLocations.map((e, i) => {
                return (
                  <MenuItem sx={{ 
                    backgroundColor: "#111a20",
                    ":hover": {
                      backgroundColor: "#111a20"
                    }
                  }} 
                  key={e} 
                  value={e}
                  >
                    {e}
                  </MenuItem>
                )
              })}
            </Select>
          </FormControl>
        </div>
        <div style={{ marginLeft: props.matches ? "20px" : "", marginBottom: "20px", width: "auto", minWidth: "150px" }}>
        <FormControl 
        variant="standard" 
        sx={props.matches ? { minWidth: 160 } : { width: "100%" }} 
        >
          <Select value={props.teamFilter} onChange={handleTeamChange}>
            <MenuItem value={"ALL TEAMS"}>ALL TEAMS</MenuItem>
            {props.uniqueTeams.map((e, i) => {
                return (
                  <MenuItem key={e} value={e}>{e}</MenuItem>
                )
            })}
          </Select>
        </FormControl>
        </div>
        <div style={{ marginLeft: props.matches ? "20px" : "", marginBottom: "20px", width: "auto", minWidth: "150px" }}>
          <FormControl 
          variant="standard" 
          sx={props.matches ? { minWidth: 160 } : { width: "100%" }} 
          >
            <Select value={props.workTypeFilter} onChange={handleWorkTypeChange}>
              <MenuItem value={"ALL WORK TYPES"}>ALL WORK TYPES</MenuItem>
              {props.uniqueWorkTypes.map((e, i) => {
                if(e != undefined){
                  return (
                    <MenuItem key={e} value={e}>{e}</MenuItem>
                  )
                }
              })}
            </Select>
          </FormControl>
        </div>
      </form>
    </div>
  );
}

export default Filters;