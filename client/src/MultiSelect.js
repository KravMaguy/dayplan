import React, { useState } from "react";
import { Link } from "react-router-dom";
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
    const { data } = await axios.get(`/autocomplete/${inputValue}`);
    const categories = data.categories.map((category) => {
      return { value: category.alias, label: category.title, def: "category" };
    });
    const terms = data.terms.map((term) => {
      return {
        value: term.text,
        label: term.text,
        def: "term",
      };
    });
    return [...categories, ...terms].filter((i) =>
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
        className="constrained"
        style={{
          position: "relative",
          top: "90px",
          // width: "90%",
          margin: "0 auto",
        }}
      >
        {/* <h1 style={{ marginBottom: "20px" }}>
          <span class="wrap">
            <span class="inner">
              Create a day plan based around popular activities, festivals,
              local buisnesses, or whatever you feel like.
            </span>
          </span>
        </h1> */}
        <h1 className="homepage-title">
          <span class="homepage-title-inner">Select categories</span>
        </h1>

        <AsyncSelect
          cacheOptions
          defaultValue={categories}
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
