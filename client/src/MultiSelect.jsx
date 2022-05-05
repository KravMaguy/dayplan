import React from "react";
import axios from "axios";
import AsyncSelect from "react-select/async";
import makeAnimated from "react-select/animated";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
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
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.categories);
  const checkLength = () => {
    return categories.length < 3;
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

  console.log("length of categories ", categories.length);
  return (
    <div
      className="constrained"
      style={{
        position: "relative",
        top: "90px",
        margin: "0 auto",
        // minHeight: "calc(100vh - 90px)",
      }}
    >
      <h1 className="homepage-title">
        <span className="homepage-title-inner">
          Create a plan, choose up to three categories
        </span>
      </h1>

      <AsyncSelect
        cacheOptions
        defaultValue={categories}
        placeholder={"What do you feel like doing?"}
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
            : "max categories allowed in free plan";
        }}
      />
      {categories.length > 0 && (
        <button
          className="large-continue-btn"
          onClick={() => navigate("/location")}
        >
          Continue to Location
        </button>
      )}
    </div>
  );
}
