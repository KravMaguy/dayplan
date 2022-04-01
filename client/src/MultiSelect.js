import React, { useState } from "react";
import axios from "axios";
import AsyncSelect from "react-select/async";
import makeAnimated from "react-select/animated";
import { useDispatch, useSelector } from "react-redux";
import Login from "./Login";
const animatedComponents = makeAnimated();
const customStyles = {
  option: (provided, state) => ({
    ...provided,
    borderBottom: "1px dotted purple",
    color: state.isSelected ? "red" : "blue",
    padding: 20,
  }),
  singleValue: (provided, state) => {
    const opacity = state.isDisabled ? 0.5 : 1;
    const transition = "opacity 300ms";
    return { ...provided, opacity, transition };
  },
};

export default function MultiSelectAsync() {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.categories);
  const checkLength = () => {
    return categories.length < 2;
  };
  const loadOptions = async (inputValue, { action }) => {
    const options = [];
    const { data } = await axios.get(`/autocomplete/${inputValue}`);
    const myData = data.categories.map((category) =>
      options.push({ value: category.alias, label: category.title })
    );
    const data2 = data.terms.map((term) =>
      options.push({
        value: term.text,
        label: term.text,
      })
    );
    console.log(options, "in loadoptions we have");
    return options.filter((i) =>
      i.label.toLowerCase().includes(inputValue.toLowerCase())
    );
  };

  const [inputValue, setInputValue] = useState("");
  const handleInputChange = (newValue) => {
    const inputValue = newValue.replace(/\W/g, "");
    setInputValue(newValue);
    return inputValue;
  };

  return (
    <>
      <Login />
      <div
        className="homepage-main"
        style={{
          position: "relative",
          top: "90px",
          width: "90%",
          margin: "0 auto",
        }}
      >
        <p>
          Create a day plan based around popular activities, festivals, local
          buisnesses, or whatever you feel like.
        </p>
        <button>Lets go</button>
        <AsyncSelect
          cacheOptions
          defaultOptions
          placeholder={"What do you feel like doing?"}
          onInputChange={handleInputChange}
          loadOptions={checkLength() && loadOptions}
          components={animatedComponents}
          isMulti
          styles={customStyles}
          onChange={(e) => {
            dispatch({
              type: "SET_CATEGORIES",
              payload: e,
            });
          }}
          noOptionsMessage={({ inputValue }) => {
            return checkLength()
              ? "no options found"
              : "choose max 3 categories, remove an option or continue";
          }}
        />
      </div>
    </>
  );
}
