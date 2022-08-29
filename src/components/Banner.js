import banner from "../images/banner.jpeg" 
function Banner() {
    return (
    <div style={{position: "relative", width: "100%", height: "188px"}}>
        <img src={banner} alt="banner" style={{ position: "absolute", width: "100%", height: "180px", objectFit: "cover", objectPosition: "50% 50%" }}/>
        <h2 
        style={{
            position: "absolute", 
            transform: "translateY(-50%)", 
            width: "100%", 
            textAlign: "center",
            top: "50%",
            padding: "0 20px",
            margin: "0",
            fontSize: "2.5rem"
            }}
            >
            Join Us
        </h2>  
    </div>
    );
}

export default Banner;