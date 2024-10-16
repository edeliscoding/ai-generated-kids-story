"use client";
import { useState } from "react";
import { FaRegPauseCircle, FaRegPlayCircle } from "react-icons/fa";

export const SpeechPlayer = ({ text }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const utterance = new SpeechSynthesisUtterance(text);

  const flipbookContainer = document.querySelector(".HTMLFlipBook");

  const toggleSpeech = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (isPlaying) {
      window.speechSynthesis.pause();
      setIsPlaying(false);
      flipbookContainer.classList.remove("disable-pointer-events");
    } else {
      if (window.speechSynthesis.paused) {
        window.speechSynthesis.resume();
      } else {
        window.speechSynthesis.speak(utterance);
      }
      setIsPlaying(true);
      flipbookContainer.classList.add("disable-pointer-events");
    }

    utterance.onend = () => {
      setIsPlaying(false);
      flipbookContainer.classList.remove("disable-pointer-events");
    };
  };

  return (
    <span onClick={(e) => toggleSpeech(e)}>
      {isPlaying ? (
        <FaRegPauseCircle size={30} />
      ) : (
        <FaRegPlayCircle size={30} />
      )}
    </span>
  );
};
