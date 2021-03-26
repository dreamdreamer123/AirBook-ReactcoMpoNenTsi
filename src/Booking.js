import PlaceInput from "./components/PlaceInput";
import { useEffect, useState } from "react";
import axios from "axios";
import { api_endpoint, api_key, api_secret } from "./Airbook";
import Suggestions from "./Suggestions";
import apiGetCityList from "./apiFunctions/apiGetCityList";
import apiFlightOffers from "./apiFunctions/apiFlightOffers";
import SelectSearch from "react-select-search";
import LocationBox from "./LocationBox";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./styles/react-datepicker-custom.css";
import FlightStatus from "./FlightStatus";
import Select from "react-select";
import Offer from "./Offer";
import PulseLoader from "react-spinners/PulseLoader";

function Booking(props) {
  //Value - text in the input
  const [originValue, setOriginValue] = useState("");
  const [destValue, setDestValue] = useState("");
  //Suggestions - array of objects from api
  const [originSuggestions, setOriginSuggestions] = useState([]);
  const [destSuggestions, setDestSuggestions] = useState([]);
  //Selection
  const [originSelection, setOriginSelection] = useState("");
  const [destSelection, setDestSelection] = useState("");
  const [departureDate, setDepartureDate] = useState(new Date());

  const [adults, setAdults] = useState(1);
  const [flightOffers, setFlightOffers] = useState([]);

  const [loading, setLoading] = useState(false);
  const [showLocationBox, setShowLocationBox] = useState(false);

  //styles for option elements in city selection
  const optionStyle = {
    display: "flex",
    alignItems: "left",
    flexDirection: "column",
    justifyContent: "center",
    height: "42px",
    fontWeight: "bold",
    fontSize: "20px",
    paddingLeft: "40px",
  };

  const passengerOptions = [
    { value: 1, label: "1" },
    { value: 2, label: "2" },
    { value: 3, label: "3" },
    { value: 4, label: "4" },
    { value: 5, label: "5" },
    { value: 6, label: "6" },
    { value: 7, label: "7" },
    { value: 8, label: "8" },
    { value: 9, label: "9" },
  ];

  useEffect(() => {
    getOriginSuggestions();
  }, [originSuggestions]);

  useEffect(() => {
    console.log(flightOffers);
    console.log(flightOffers.data);
    setLoading(false);
  }, [flightOffers]);

  useEffect(() => {
    setShowLocationBox(false);
    setShowLocationBox(true);
  }, [originSelection, destSelection]);

  function handleOriginSubmit(e) {
    if (e.key === "Enter") {
      searchCity(originValue);
      console.log("origin value enter");
    }
  }

  function handleDestSubmit(e) {
    if (e.key === "Enter") {
      searchCity(destValue);
      console.log(e);
    }
  }

  function searchCity(q) {
    const token = props.getToken();
    if (token == "") {
      return;
    }
    console.log(token);
    const options = {
      headers: { Authorization: "Bearer " + token },
    };
    const baseURL = api_endpoint + "/v1/reference-data/locations";
    var cityList;
    const getCityList = async () => {
      try {
        cityList = await axios
          .get(baseURL + "?subType=CITY&keyword=" + q, options)
          .then(
            //this notation is necessary to not violate immutability condition
            (res) =>
              q == originValue
                ? setOriginSuggestions([...res.data.data])
                : setDestSuggestions([...res.data.data]),
            (error) => console.log(error)
          );
      } catch (e) {
        console.error(e);
      }
    };
    getCityList();
  }

  const getOriginSuggestions = () => {
    const listItems = originSuggestions.map((el) => (
      <option value={el.iataCode} style={optionStyle}>
        {el.name} ({el.iataCode})
      </option>
    ));
    return listItems;
  };

  const getDestSuggestions = () => {
    const listItems = destSuggestions.map((el) => (
      <option value={el.iataCode} style={optionStyle}>
        {el.name} ({el.iataCode})
      </option>
    ));
    return listItems;
  };

  const getOriginLocationObj = () => {
    const origLocationObj = originSuggestions.find(
      (el) => el.iataCode == originSelection
    );
    return origLocationObj;
  };

  const getDestLocationObj = () => {
    const destLocationObj = destSuggestions.find(
      (el) => el.iataCode == destSelection
    );
    return destLocationObj;
  };

  function showFlightOffers() {
    const token = props.getToken();
    const options = {
      headers: { Authorization: "Bearer " + token },
    };
    const baseURL = api_endpoint + "/v2/shopping/flight-offers";
    const departureDateFormatted = departureDate.toISOString().split("T")[0];
    console.log(departureDateFormatted);
    const getFlightOffers = async () => {
      await axios
        .get(
          baseURL +
            "?originLocationCode=" +
            originSelection +
            "&destinationLocationCode=" +
            destSelection +
            "&departureDate=" +
            departureDateFormatted +
            "&adults=" +
            adults.toString(),
          options
        )
        .then(
          (res) => setFlightOffers([...res.data.data]),
          (error) => console.log(error)
        );
    };
    setLoading(true);
    getFlightOffers();
  }

  return (
    <div
      className="booking"
      style={{
        display: "flex",
        height: "100vw",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "left",
        backgroundColor: "#e50",
      }}
    >
      <div
        style={{
          marginTop: "29px",
          marginBottom: "29px",
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
        }}
      >
        <PlaceInput
          onchange={(e) => setOriginValue(e.target.value)}
          onenter={(e) => handleOriginSubmit(e)}
          placeholder="Origin"
          value={originValue}
        />
        <PlaceInput
          onchange={(e) => setDestValue(e.target.value)}
          onenter={(e) => handleDestSubmit(e)}
          placeholder="Destination"
          value={destValue}
        />
        <DatePicker
          selected={departureDate}
          onChange={(date) => setDepartureDate(date)}
        ></DatePicker>
        <div style={{ marginLeft: "20px" }}>
          <Select
            placeholder="Adults"
            options={passengerOptions}
            onChange={(n) => setAdults(n.value)}
          />
        </div>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "stretch",
          justifyContent: "space-between",
        }}
      >
        {
          /* {originSuggestions.length > 0 ? ( */
          <Suggestions
            getItems={getOriginSuggestions}
            updateSel={(e) => setOriginSelection(e.target.value)}
          ></Suggestions>
          // ) : (
          //   <></>
          // )
        }
        {
          /* {destSuggestions.length > 0 ? ( */
          <Suggestions
            getItems={getDestSuggestions}
            updateSel={(e) => setDestSelection(e.target.value)}
          ></Suggestions>
          // ) : (
          //   <></>
          // )
        }
      </div>
      <div>
        {/* {originSuggestions.length > 0 &&
        destSuggestions.length &&
        originSelection != "" &&
        destSelection != "" ? ( */}
          
          <div
            style={{
              width: "100vw",
              backgroundColor: "#047",
              boxShadow: "0px 8px 12px -4px #555",
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-around",
            }}
          >
            {showLocationBox == true ?
            <LocationBox
              getLocationObj={getOriginLocationObj}
              alignment="left"
            ></LocationBox>:<></>}
            <div>
              {originSuggestions.length > 0 &&
              destSuggestions.length &&
              originSelection != "" &&
              destSelection != "" ? (
                <button className="view-offers-btn" onClick={showFlightOffers}>
                  View flight offers
                </button>
              ) : (
                <></>
              )}
            </div>
            {showLocationBox == true ?
            <LocationBox
              getLocationObj={getDestLocationObj}
              alignment="right"
            ></LocationBox>:<></>}
          </div>
        {/* ) : (
          <></>
        )} */}
      </div>
      {/*Flight Offer results*/}
      <div>
        <PulseLoader color={"#fd0"} loading={loading} size={15} margin={2} />
        {flightOffers.length > 0 ? (
          flightOffers.map((el) => {
            return <Offer el={el}></Offer>;
          })
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}

export default Booking;
