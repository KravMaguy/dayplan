import { useEffect, useRef } from "react";
import { SkeletonImage } from "./skeletons";
const PerfectImage = ({ photos }) => {
  let ref = useRef(null);
  useEffect(() => {
    if (photos[0].getUrl()) {
      ref.current = photos[0].getUrl();
    }
  }, [photos]);

  if (
    photos &&
    photos.length > 0 &&
    photos[0].getUrl() &&
    ref.current === photos[0].getUrl()
  ) {
    return (
      <img alt="place" src={photos[0].getUrl()} className="drawer-image" />
    );
  } else {
    return <SkeletonImage />;
  }
};

export default PerfectImage;
