import React from "react";

const Input = ({ label, name, handleChange }) => {
  return (
    <div>
      <label htmlFor={label}>{label}</label>
      <input
        id={label}
        type="text"
        required
        name={name}
        onChange={handleChange}
      />
    </div>
  );
};

export default Input;
