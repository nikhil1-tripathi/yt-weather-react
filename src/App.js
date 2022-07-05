import "./App.css";
import Navbar from "./Components/Navbar";
import Input from "./Components/Input";
import { Container } from "@mui/material";
import UilReact from "@iconscout/react-unicons/icons/uil-react";
import TimeAndLocation from "./Components/TimeAndLocation";
import TempratureDetails from "./Components/TempratureDetails";
import HourlyDaily from "./Components/HourlyDaily/HourlyDaily";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  CityNameWeatherData,
  FinalFormatedWeatherData,
  FormatedWeatherData,
  getWeatherData,
  LatLonWeatherData,
} from "./Components/DataFetching/FetchData";
import { useEffect, useState } from "react";

function App() {
  const [query, setQuery] = useState({ q: "berlin" });
  const [units, setUnits] = useState("metric");
  const [weather, setWeather] = useState(null);

  const fetchWeather = async () => {
    const message = query.q ? query.q : "current location.";

    toast.info("Fetching weather for " + message);

    await FinalFormatedWeatherData({ ...query, units }).then((data) => {
      toast.success(
        `Successfully fetched weather for ${data.name}, ${data.country}.`
      );
      setWeather(data);
    });
  };

  useEffect(() => {
    fetchWeather();
  }, [query, units]);

  // const fetchWeather = async () => {
  //   const data = await FinalFormatedWeatherData({ q: "london" });
  //   console.log(data);
  // };
  // fetchWeather();
  // console.log(weather);
  // console.log(weather?.dt);
  return (
    <div className="App">
      {weather && (
        <div>
          <Container>
            <Navbar setQuery={setQuery} />
            <Input setQuery={setQuery} units={units} setUnits={setUnits} />
            <TimeAndLocation weather={weather} />
            <TempratureDetails weather={weather} />
            <HourlyDaily title="Hourly Forecast" items={weather.hourly} />
            <HourlyDaily title="Daily Forecast" items={weather.daily} />
            <ToastContainer
              autoClose={5000}
              theme="colored"
              newestOnTop={true}
            />
          </Container>
        </div>
      )}
    </div>
  );
}

export default App;
