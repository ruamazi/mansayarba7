import React, { useRef } from "react";

const Start = ({ setUserName }) => {
  const inputRef = useRef();

  const handlegetUserName = () => {
    inputRef.current.value && setUserName(inputRef.current.value);
  };

  return (
    <div className="start">
      <input
        className="start-input"
        type="text"
        placeholder="Enter your name"
        ref={inputRef}
      />
      <button className="start-button" onClick={handlegetUserName}>
        start
      </button>
    </div>
  );
};

export default Start;
