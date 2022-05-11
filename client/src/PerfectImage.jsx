import { useEffect, useState } from "react";
import { SkeletonImage } from "./skeletons";
import { CgPushChevronLeft, CgPushChevronRight } from "react-icons/cg";
const PerfectImage = ({ photos, drawerOpen }) => {
  const [featuredPhoto, setFeaturedPhoto] = useState("");
  const [currPhotoIdx, setPhotoIdx] = useState(0);
  useEffect(() => {
    if (photos && photos.length > 0 && photos[0].getUrl()) {
      setFeaturedPhoto(photos[0].getUrl({ height: "200px" }));
    }
  }, [photos]);

  useEffect(() => {
    if (!drawerOpen) {
      setPhotoIdx(0);
      const timer = setTimeout(() => {
        setFeaturedPhoto("");
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [drawerOpen]);

  const cycleRight = () => {
    setPhotoIdx((currIdx) => currIdx + 1);
    setFeaturedPhoto(photos[currPhotoIdx + 1].getUrl({ height: "200px" }));
  };

  const cycleLeft = () => {
    setPhotoIdx((currIdx) => currIdx - 1);
    setFeaturedPhoto(photos[currPhotoIdx - 1].getUrl());
  };

  if (featuredPhoto) {
    return (
      <div>
        {photos.length > 1 && (
          <div
            className="image controls"
            style={{
              zIndex: "1",
              position: "relative",
              top: "70px",
              display: "flex",
              justifyContent: "space-between",
              color: "white",
            }}
          >
            {currPhotoIdx !== 0 && (
              <div
                className="no-link pure-material-button-text"
                onClick={cycleLeft}
              >
                <CgPushChevronLeft
                  style={{
                    filter: "drop-shadow(3px 5px 2px rgb(0 0 0 / 1))",
                  }}
                />
              </div>
            )}
            {currPhotoIdx < photos.length - 1 && (
              <div
                className="no-link pure-material-button-text"
                onClick={cycleRight}
                style={{ position: "absolute", right: "0px" }}
              >
                <CgPushChevronRight
                  style={{
                    filter: "drop-shadow(3px 5px 2px rgb(0 0 0 / 1))",
                  }}
                />
              </div>
            )}
          </div>
        )}
        <img
          alt=""
          src={featuredPhoto}
          className="drawer-image"
          style={{ position: "absolute" }}
        />
      </div>
    );
  } else {
    return <SkeletonImage />;
  }
};

export default PerfectImage;
