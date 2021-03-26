import { useState, useEffect } from "react";
import "./Airbook.css";

function LocationBox(props) {
  const [locationCode, setLocationCode] = useState("");
  const [cityName, setCityName] = useState("");
  const [countryName, setCountryName] = useState("");

  useEffect(() => {
    const locObj = props.getLocationObj();
    if (typeof locObj != 'undefined') {
      setLocationCode(locObj.iataCode);
      setCityName(locObj.address.cityName);
      setCountryName(locObj.address.countryName);
    } else {
      setCityName("Select location");
    }
  }, []);

  return (
    <div
      style={{
        backgroundColor: "#08d",
        color: "#fff",
        fontFamily: "Quicksand, sans-serif",
        padding: "12px",
        height: "100px",
        width: "24vw",
        textAlign: props.alignment,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-evenly",
      }}
    >
      <div
        className="cityName"
        style={{
          fontWeight: "bold",
          fontSize: "24pt",
          fontFamily: "Roboto, sans-serif",
        }}
      >
        {cityName.length > 0 ?
        cityName.charAt(0) + cityName.toLocaleLowerCase().slice(1)
      : "Select location"}
      </div>
      <div>
        <div
          className="location-sel-code"
          style={{
            fontWeight: "bold",
          }}
        >
          {locationCode}
        </div>
        <div className="countryName">{countryName}</div>
      </div>
    </div>
  );
}

export default LocationBox;
