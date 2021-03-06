import { DragDropContext, Droppable } from "react-beautiful-dnd";
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
  // const [elRefs, setElRefs] = useState([]);

  // useEffect(() => {
  //   if (window.innerWidth > 600) {
  //     if (derivedData.length > 0) {
  //       setElRefs((refs) =>
  //         Array(derivedData.length - 1)
  //           .fill()
  //           .map((_, i) => refs[i] || createRef())
  //       );
  //     }
  //   }
  // }, [derivedData.length]);

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
                      // refProp={elRefs[idx]}
                      handleSelectBox={handleSelectBox}
                    />
                  );
                })
              : [1, 2, 3, 4, 5, 6].map((_, idx) => (
                  <div className="card-spacing" key={idx}>
                    <SkeletonArticle theme="light" />
                  </div>
                ))}

            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default DragDropContent;
