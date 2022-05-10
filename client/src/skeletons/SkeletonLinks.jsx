import React from "react";
import Shimmer from "./Shimmer";
import SkeletonElement from "./SkeletonElement";

const SkeletonLinks = ({ theme, titleClass }) => {
  const themeClass = theme || "light";
  const appliedClass = titleClass || "";

  return (
    <div
      className={`skeleton-wrapper skeleton-links ${themeClass} ${appliedClass}`}
    >
      <div className="skeleton-article">
        <SkeletonElement type="text wide" />
      </div>
      <Shimmer />
    </div>
  );
};

export default SkeletonLinks;
