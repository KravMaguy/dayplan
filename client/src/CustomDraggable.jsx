import { Draggable } from "react-beautiful-dnd";

const grid = 8;
const highlightedColor = "#8d7fbf";
const getItemStyle = (isDragging, draggableStyle, currIdx, idx, collapsed) => ({
  userSelect: "none",
  cursor: "move",
  padding: grid * 2,
  margin: `0 0 ${grid}px 0`,
  background: isDragging
    ? "lightgreen"
    : currIdx === idx + 1
    ? highlightedColor
    : "grey",
  ...draggableStyle,
});

const CustomDraggable = ({
  location,
  idx,
  currIdx,
  previous,
  collapsed,
  setCollapsed,
  refProp,
  handleSelectBox,
}) => {
  return (
    <Draggable
      className="draggable-element"
      draggableId={location.id}
      index={idx}
    >
      {(provided, snapshot) => {
        // if (idx + 1 === currIdx && window.innerWidth >= 600) {
        //   refProp?.current?.scrollIntoView({
        //     behavior: "smooth",
        //     block: "nearest",
        //   });
        // }
        return (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            style={getItemStyle(
              snapshot.isDragging,
              provided.draggableProps.style,
              currIdx,
              idx,
              collapsed
            )}
          >
            <div
              style={{
                color: currIdx === idx + 1 ? "white" : "black",
                textShadow:
                  idx + 1 === currIdx ? "1px 1px 2px #000000" : "none",
              }}
              className="plan-card"
              // ref={refProp}
            >
              <div
                className={
                  idx + 1 === currIdx && currIdx !== collapsed
                    ? "points-container seconddiv coolclass"
                    : "seconddiv hidden"
                }
              >
                <div className="numberCircle">
                  {String.fromCharCode("A".charCodeAt(0) + idx)}
                </div>
                <div className="line"></div>
                <div className="numberCircle">
                  {String.fromCharCode("B".charCodeAt(0) + idx)}
                </div>
              </div>
              <div className="locations">
                <div
                  className={
                    idx + 1 === currIdx && currIdx !== collapsed
                      ? "text top seconddiv coolclass"
                      : "seconddiv"
                  }
                >
                  <p>{previous ? previous.name : "Starting Location"}</p>
                </div>
                <div style={{ display: "flex" }}>
                  <div className="text">
                    <p>{location.name} </p>
                    {}
                    <p className="drag-address">
                      {idx + 1 !== currIdx && (
                        <a
                          style={{ fontStyle: "italic" }}
                          className=""
                          href={`https://www.google.com/maps?q=${encodeURI(
                            `${location.name} ${location?.address1} ${location?.city} ${location?.zip}`
                          )}`}
                          target="_blank"
                        >
                          {location?.address1}
                        </a>
                      )}
                    </p>
                  </div>

                  {idx + 1 === currIdx && currIdx !== collapsed ? (
                    <button
                      className="no-link pure-material-button-text"
                      style={{
                        position: "absolute",
                        right: 0,
                        top: 0,
                      }}
                      onClick={() => setCollapsed(idx + 1)}
                    >
                      Close
                    </button>
                  ) : (
                    <button
                      className="no-link pure-material-button-text"
                      style={{
                        position: "absolute",
                        right: 0,
                        top: 0,
                      }}
                      onClick={() => handleSelectBox(idx + 1)}
                    >
                      Open
                    </button>
                  )}
                </div>
              </div>
            </div>
            <div
              className={
                idx + 1 === currIdx && collapsed !== currIdx
                  ? "mt-40"
                  : "hidden"
              }
              id={`panel-${idx + 1}`}
            />
          </div>
        );
      }}
    </Draggable>
  );
};

export default CustomDraggable;
