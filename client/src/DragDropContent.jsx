import { useState, useEffect, createRef } from "react";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import useMediaQuery from "./useMediaQuery";
import CustomDraggable from "./CustomDraggable";
import { SkeletonArticle } from "./skeletons";
const grid = 8;

const getListStyle = (isDraggingOver) => ({
  background: isDraggingOver ? "lightblue" : "lightgrey",
  padding: grid,
});

const DragDropContent = ({
  onDragEnd,
  derivedData,
  currIdx,
  collapsed,
  setCollapsed,
  handleSelectBox,
}) => {
  const matches = useMediaQuery("(min-width: 600px)");

  const [elRefs, setElRefs] = useState([]);

  useEffect(() => {
    if (derivedData.length > 0 && matches) {
      setElRefs((refs) =>
        Array(derivedData.length - 1)
          .fill()
          .map((_, i) => refs[i] || createRef())
      );
    }
  }, [derivedData.length, matches]);

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="droppable">
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            style={getListStyle(snapshot.isDraggingOver)}
          >
            {derivedData.length > 0
              ? derivedData.slice(1).map((location, idx, arr) => {
                  let previous = arr[idx - 1];
                  return (
                    <CustomDraggable
                      key={location.id}
                      location={location}
                      idx={idx}
                      currIdx={currIdx}
                      previous={previous}
                      collapsed={collapsed}
                      setCollapsed={setCollapsed}
                      refProp={elRefs[idx]}
                      handleSelectBox={handleSelectBox}
                    />
                  );
                })
              : [1, 2, 3, 4, 5, 6].map((n) => (
                  <SkeletonArticle key={n} theme="light" />
                ))}

            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default DragDropContent;
