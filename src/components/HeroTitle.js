import React, { useState, useEffect } from "react";

import "./HeroTitle.css";

import { easeIn, motion } from "framer-motion";
import { Cursor, useTypewriter, Typewriter } from "react-simple-typewriter";
import { type } from "@testing-library/user-event/dist/type";

const title = "Whhat's the weather today?";

function HeroTitle() {
  const { text } = useTypewriter({
    words: ["Developer", "Designer", "Enterpenuer"],
    loop: {},
    typeSpeed: 120,
  });

  const [displayedText, setDisplayedText] = useState("");

  const titleVariants = {
    hidden: {
      opacity: 0,
      x: -200,
    },
    show: {
      opacity: 1,
      x: 0,
      transition: {
        ease: easeIn,
      },
    },
  };

  return (
    <>
      <h3>
        The weather can be{" "}
        <span className="word">
          <Typewriter
            words={[
              "Sunny",
              "Cloudy",
              "Windy",
              "Rainy",
              "but",
              "you got to keep going",
            ]}
            typeSpeed={70}
            deleteSpeed={50}
            cursor
            cursorStyle="_"
          />
        </span>
      </h3>
    </>
  );
}

export default HeroTitle;
