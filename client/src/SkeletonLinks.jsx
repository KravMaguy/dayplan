import React from "react";
import Shimmer from "./Shimmer";
import SkeletonElement from "./SkeletonElement";

const SkeletonLinks = ({ theme }) => {
  const themeClass = theme || "light";

  return (
    <div className={`skeleton-wrapper skeleton-links ${themeClass}`}>
      <div className="skeleton-article">
        <SkeletonElement type="text wide" />
      </div>
      <Shimmer />
    </div>
  );
};

export default SkeletonLinks;
