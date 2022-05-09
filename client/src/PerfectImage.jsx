import { useEffect, useRef } from "react";
import { SkeletonImage } from "./skeletons";
const PerfectImage = ({ photos }) => {
  const ref = useRef({
    imgLink: "",
  });

  useEffect(() => {
    if (photos && photos.length > 0 && photos[0].getUrl()) {
      ref.current.imgLink = photos[0].getUrl();
    }
  }, [photos]);

  if (
    photos &&
    photos.length > 0 &&
    photos[0].getUrl() &&
    ref.current.imgLink &&
    ref.current.imgLink === photos[0].getUrl()
  ) {
    return (
      <img alt="place" src={ref.current.imgLink} className="drawer-image" />
    );
  } else {
    return <SkeletonImage />;
  }
};

export default PerfectImage;
