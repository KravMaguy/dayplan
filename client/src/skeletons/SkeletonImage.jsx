import React from "react";
import Shimmer from "./Shimmer";

const SkeletonImage = ({ theme }) => {
  const themeClass = theme || "light";

  return (
    <div
      className={`skeleton-wrapper drawer-image ${themeClass} skeleton-image `}
    >
      <div className="skeleton-article center-text">Loading Image</div>
      <Shimmer />
    </div>
  );
};

export default SkeletonImage;
