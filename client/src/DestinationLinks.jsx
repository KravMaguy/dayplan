const DestinationLinks = ({ derivedData, removeLocation }) => {
  return (
    <div id="delete_location_links" className="map-destination-links-container">
      {derivedData.map((x, idx) => {
        return (
          idx > 0 && (
            <div
              key={x.id ? x.id : x.coordinates.id}
              className="css-mod-1rhbuit-multiValue"
            >
              <div className="css-mod-12jo7m5">
                <a className="pill" target="_blank" href={x.url}>
                  <div
                    className="numberCircle"
                    style={{
                      marginRight: "2px",
                      position: "relative",
                      bottom: "1px",
                    }}
                  >
                    {String.fromCharCode("A".charCodeAt(0) + idx)}
                  </div>

                  {x.name.length > 30 ? x.name.slice(0, 29) + "..." : x.name}
                </a>
              </div>
              <div
                onClick={() => removeLocation(x.id)}
                role="button"
                className="css-mod-xb97g8"
                aria-label={`remove ${x.name}`}
              >
                <svg
                  height={14}
                  width={14}
                  viewBox="0 0 20 20"
                  aria-hidden="true"
                  focusable="false"
                  className="css-mod-tj5bde-Svg"
                >
                  <path d="M14.348 14.849c-0.469 0.469-1.229 0.469-1.697 0l-2.651-3.030-2.651 3.029c-0.469 0.469-1.229 0.469-1.697 0-0.469-0.469-0.469-1.229 0-1.697l2.758-3.15-2.759-3.152c-0.469-0.469-0.469-1.228 0-1.697s1.228-0.469 1.697 0l2.652 3.031 2.651-3.031c0.469-0.469 1.228-0.469 1.697 0s0.469 1.229 0 1.697l-2.758 3.152 2.758 3.15c0.469 0.469 0.469 1.229 0 1.698z" />
                </svg>
              </div>
            </div>
          )
        );
      })}
    </div>
  );
};

export default DestinationLinks;
