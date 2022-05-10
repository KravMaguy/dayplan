import React from "react";
import Shimmer from "./Shimmer";
import SkeletonElement from "./SkeletonElement";
const SkeletonPlaceDetails = ({ theme }) => {
  const themeClass = theme || "light";

  return (
    <div className={`skeleton-wrapper ${themeClass} skeleton-place-details`}>
      <div className="skeleton-article">
        <SkeletonElement type="title" />
        {new Array(7).fill(null).map((_, idx) => (
          <SkeletonElement type="text" key={idx} />
        ))}
      </div>
      <Shimmer />
    </div>
  );
};

export default SkeletonPlaceDetails;
