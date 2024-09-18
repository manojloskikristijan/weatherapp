import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import "./CustomCard.css";
import SearchIcon from "../icons/SearchIcon";
import Air from "../icons/Air";
import Humidity from "../icons/Humidity";

function CustomCard() {
  async function mockGetWeather(city) {
    let response;
    try {
      response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=3d23d427d40f99f66540165b8ef6734b`
      );
    } catch (err) {
      console.log(err.message);
    }

    return new Promise((resolve, reject) => {
      if (response.ok) {
        resolve({ ok: true });
      } else {
        resolve({ ok: false });
      }
    });
  }

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

  const [errorMessage, setErrorMessage] = useState(false);

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
        const response = await mockGetWeather(inputValue.toLowerCase());

        if (response.ok) {
          setIsExpanded(false); // Trigger collapse
        }

        await getWeather(inputValue.toLowerCase());

        setIsExpanded(true); // Re-expand after fetching data
        setIsLoading(false); // End loading
      } catch (err) {
        setInputError(true);
        setErrorMessage(true);
      }
    } else {
      setInputError(true);
      setTimeout(() => {
        setInputError(false);
      }, 100);
    }
  };

  const handleInputOnChange = (e) => {
    setInputValue(e.target.value);
    setInputError(false);
    setErrorMessage(false);
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
            scale: inputError ? [1.2, 1, 1] : null,
          }}
          transition={{ type: "spting", damping: 20, stiffness: 540 }}
          value={inputValue}
          onChange={handleInputOnChange}
          className="input"
          type="text"
          style={{
            // color: inputError && inputValue ? "red" : null,
            borderColor: inputError && inputValue ? "red" : null,
          }}
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

      {errorMessage && (
        <motion.p
          initial={{ y: -50, opacity: 0 }}
          animate={{
            // rotate: inputError ? [11, -11, 0] : null,
            y: 0,
            opacity: 1,
          }}
          transition={{ type: "spting", damping: 20, stiffness: 540 }}
          className="errorMessage"
        >
          City not found. Please try again.
        </motion.p>
      )}

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
