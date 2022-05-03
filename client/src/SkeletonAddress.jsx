import React from "react";
import Shimmer from "./Shimmer";
import SkeletonElement from "./SkeletonElement";

const SkeletonAddress = ({ theme }) => {
  const themeClass = theme || "light";

  return (
    <div className={`skeleton-wrapper skeleton-address ${themeClass}`}>
      <div className="skeleton-article">
        {/* <SkeletonElement type="map" /> */}
        <SkeletonElement type="title" />
        <SkeletonElement type="text" />
      </div>
      <Shimmer />
    </div>
  );
};

export default SkeletonAddress;
