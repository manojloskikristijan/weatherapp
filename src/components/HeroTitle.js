import React, { useState, useEffect } from "react";

import "./HeroTitle.css";

import { easeIn, motion } from "framer-motion";
import { Cursor, useTypewriter, Typewriter } from "react-simple-typewriter";
import { type } from "@testing-library/user-event/dist/type";

// const title = "Whhat's the weather today?";
const title = "Your day could start ";

function HeroTitle() {
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
        {title}
        <span className="word">
          <Typewriter
            // Bright, Windy, or even Stormy, but keep moving forward.
            words={[
              "Bright",
              "Windy",
              "or even Stormy",
              "but keep moving forward.",
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
