import React from "react";

import "./HeroTitle.css";

import { Typewriter } from "react-simple-typewriter";

// const title = "Whhat's the weather today?";
const title = "Your day could start ";

function HeroTitle() {
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
