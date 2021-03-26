import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "./styles/react-tabs-custom.css";
import Booking from "./Booking";
import FlightStatus from "./FlightStatus";
import Header from "./Header";

import "./Airbook.css";
import { useState, useEffect } from "react";
import axios from "axios";

export const api_key = "zpil56THjlCGYRGgNnTfr3tQVMrd9Gh2";
export const api_secret = "c3EGygJLmUigeP6G";
export const api_endpoint = "https://test.api.amadeus.com";

function Airbook() {
  const [accessToken, setAccessToken] = useState("");

  // get the token on load, called only once
  useEffect(() => {
    getToken();
  }, []);

  useEffect(() => {
    console.log(accessToken);
  });

  function getToken() {
    const options = {
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
    };
    const data = new URLSearchParams({
      grant_type: "client_credentials",
      client_id: api_key,
      client_secret: api_secret,
    });
    const getAccessToken = async () => {
      await axios
        .post(
          "https://test.api.amadeus.com/v1/security/oauth2/token",
          data,
          options
        )
        .then(
          (res) => setAccessToken(res.data.access_token),
          (error) => console.log(error)
        );
    };
    getAccessToken();
  }

  return (
    <div>
      <Header />
      <Tabs forceRenderTabPanel>
        <TabList>
          <Tab>Book flights</Tab>
          <Tab>Flight status</Tab>
        </TabList>
        <TabPanel>
          <Booking getToken={() => accessToken}/>
        </TabPanel>
        <TabPanel>
          <FlightStatus />
        </TabPanel>
      </Tabs>
    </div>
  );
}

export default Airbook;
