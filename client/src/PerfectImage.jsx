import { useEffect, useState } from "react";
import { SkeletonImage } from "./skeletons";
const PerfectImage = ({ photos, drawerOpen }) => {
  const [featuredPhoto, setFeaturedPhoto] = useState("");
  useEffect(() => {
    if (photos && photos.length > 0 && photos[0].getUrl()) {
      setFeaturedPhoto(photos[0].getUrl());
    }
  }, [photos]);

  useEffect(() => {
    if (!drawerOpen) {
      const timer = setTimeout(() => {
        setFeaturedPhoto("");
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [drawerOpen]);

  if (featuredPhoto) {
    return <img alt="" src={featuredPhoto} className="drawer-image" />;
  } else {
    return <SkeletonImage />;
  }
};

export default PerfectImage;
