import { api_endpoint, api_key, api_secret } from "../Airbook";
import axios from "axios";

export default function apiGetCityList(accessToken, keyword) {
  const options = {
    headers: { Authorization: "Bearer " + accessToken },
  };
  const baseURL = api_endpoint + "/reference-data/locations";
  var cityList;
  const getCityList = async () => {
    await axios.get(baseURL + "?subType=CITY&keyword=" + keyword)
    .then((res) => console.log(res.data), (error) => console.log(error))
  }
  getCityList();
  console.log("GET CITY");
}