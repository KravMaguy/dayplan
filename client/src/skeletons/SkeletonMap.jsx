import React from "react";
import Shimmer from "./Shimmer";
import SkeletonElement from "./SkeletonElement";

const SkeletonMap = ({ theme }) => {
  const themeClass = theme || "light";

  return (
    <div className={`skeleton-wrapper skeleton-map ${themeClass}`}>
      <div className="skeleton-article center-text">Loading Map</div>
      <Shimmer />
    </div>
  );
};

export default SkeletonMap;
