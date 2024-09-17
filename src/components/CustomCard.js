import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import "./CustomCard.css";
import SearchIcon from "../icons/SearchIcon";
import Air from "../icons/Air";
import Humidity from "../icons/Humidity";

function CustomCard() {
  async function getWeather(city) {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=3d23d427d40f99f66540165b8ef6734b`
      );
      const data = await response.json();

      setIconUrl(
        `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
      );
      setTemperature((+data.main.temp - 273.15).toFixed(2));
      setDescription(data.weather[0].description);
      setCity(city);
      setHumidity(data.main.humidity);
      setWind(data.wind.speed);
    } catch (err) {
      throw err;
    }
  }

  // State to manage the visibility of the body and footer
  const [isExpanded, setIsExpanded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [inputError, setInputError] = useState(false);

  // WEATHER DATA
  const [iconUrl, setIconUrl] = useState("");
  const [city, setCity] = useState("");
  const [temperature, setTemperature] = useState(null);
  const [wind, setWind] = useState(null);
  const [humidity, setHumidity] = useState(null);
  const [description, setDescription] = useState("");

  // Function to handle the click on the search button
  const handleSearchClick = async () => {
    if (inputValue) {
      try {
        setInputError(false);
        setIsLoading(true); // Set loading state
        setIsExpanded(false); // Trigger collapse

        await new Promise((resolve) => setTimeout(resolve, 300)); // Wait for collapse animation
        await getWeather(inputValue.toLowerCase());

        setIsExpanded(true); // Re-expand after fetching data
        setIsLoading(false); // End loading
      } catch (err) {
        setInputError(true);
        console.log(err);
      }
    } else {
      setInputError(true);
    }
  };

  const handleInputOnChange = (e) => {
    setInputValue(e.target.value);
  };

  const cardVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10,
        delay: 0.2,
        bounce: 0.4,
      },
    },
  };

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      className="card"
    >
      <div className="header">
        <motion.input
          animate={{
            rotate: inputError ? [11, -11, 0] : null,
            color: inputError && inputValue ? "red" : null,
          }}
          transition={{ type: "spting", damping: 20, stiffness: 140 }}
          value={inputValue}
          onChange={handleInputOnChange}
          className="input"
          type="text"
          placeholder="Search 
                for a city..."
        />

        <motion.span
          className="button"
          onClick={handleSearchClick}
          whileHover={{ scale: 1.2, rotate: -5 }}
          transition={{
            type: "spring",
            stiffness: 200,
            damping: 10,
          }}
        >
          <SearchIcon />
        </motion.span>
      </div>

      {/* Body and Footer: Initially hidden, shown on button click */}
      {isExpanded && (
        <>
          {/* Entire card slides down as the body appears */}
          <AnimatePresence>
            <motion.div
              initial={{ height: 0, opacity: 0, rotateX: -90 }}
              animate={{ height: "auto", opacity: 1, rotateX: 0 }}
              exit={{ height: 0, opacity: 0, rotateX: -90 }}
              transition={{
                type: "spring",
                damping: 20,
                bounce: 0.4,
              }}
            >
              <div className="body">
                <img src={iconUrl} alt="Weather Icon" />
                <h3 style={{ color: "#173B45", fontWeight: "bold" }}>
                  {city.toUpperCase()}
                </h3>
                <p>{temperature}°C</p>
                <div className="mainInfo">
                  <p>
                    <Air /> {wind.toFixed(2)} km/h
                  </p>
                  <p>
                    <Humidity /> {humidity} %
                  </p>
                </div>
              </div>

              {/* Footer with slide down animation */}
              <div className="footer">
                <p style={{ color: "#173B45", fontWeight: "bold" }}>
                  {description.toUpperCase()}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>
        </>
      )}
    </motion.div>
  );
}

export default CustomCard;
