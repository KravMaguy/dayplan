import { OverlayView } from "@react-google-maps/api";

const CustomLocationOverlay = ({ title, position, classes, keyId }) => {
  return (
    <OverlayView
      position={position}
      mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
    >
      <div className={`dot-shadow ${classes}`}>
        <div key={keyId && keyId} className={`dot ${classes}`} title={title}>
          <div className={`dot-child ${classes}`}></div>
        </div>
      </div>
    </OverlayView>
  );
};

export default CustomLocationOverlay;
