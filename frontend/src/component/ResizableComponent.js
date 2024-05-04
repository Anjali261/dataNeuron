


// import React, { useRef, useEffect, useState } from "react";
// import "./ResizableComponent.css";

// const ResizableComponent = ({ children, onAdd, onUpdate, componentId }) => {
//   const ref = useRef(null);
//   const [initialWidth, setInitialWidth] = useState(0);
//   const [initialHeight, setInitialHeight] = useState(0);
//   const [isDragging, setIsDragging] = useState(false);
//   const [input, setInput] = useState("");

//   useEffect(() => {
//     const resizableEle = ref.current;
//     const styles = window.getComputedStyle(resizableEle);
//     setInitialWidth(parseInt(styles.width, 10));
//     setInitialHeight(parseInt(styles.height, 10));
//   }, []);

//   const onMouseMove = (event) => {
//     if (!isDragging) return;
//     const dx = event.clientX - ref.current.offsetLeft;
//     const dy = event.clientY - ref.current.offsetTop;
//     const newWidth = initialWidth + dx;
//     const newHeight = initialHeight + dy;
//     ref.current.style.width = `${newWidth}px`;
//     ref.current.style.height = `${newHeight}px`;
//   };

//   const onMouseDown = () => {
//     setIsDragging(true);
//   };

//   const onMouseUp = () => {
//     setIsDragging(false);
//   };

//   useEffect(() => {
//     document.addEventListener("mousemove", onMouseMove);
//     document.addEventListener("mouseup", onMouseUp);
//     return () => {
//       document.removeEventListener("mousemove", onMouseMove);
//       document.removeEventListener("mouseup", onMouseUp);
//     };
//   });

//   const handleAddButtonClick = () => {
//     console.log("Input:", input); // Log the input value before calling onAdd
//     onAdd(input); // Call onAdd with the input value
//   };

//   const handleUpdateButtonClick = () => {
//     onUpdate(componentId, input); // Call onUpdate with the component ID and input value
//   };

//   return (
//     <div ref={ref} className="resizable-component">
//       {children}
//       {/* Buttons for add and update actions */}
//       <button className="resizer-button" onClick={handleAddButtonClick}>Add</button>
//       <button className="resizer-button" onClick={handleUpdateButtonClick}>Update</button>
//       <input
//         type="text"
//         placeholder="Type any text"
//         value={input}
//         name="input"
//         onChange={(e) => setInput(e.target.value)}
//       />
//       {/* Resizer elements */}
//       <div className="resizer resizer-tl" onMouseDown={onMouseDown}></div>
//       <div className="resizer resizer-tr" onMouseDown={onMouseDown}></div>
//       <div className="resizer resizer-br" onMouseDown={onMouseDown}></div>
//       <div className="resizer resizer-bl" onMouseDown={onMouseDown}></div>
//     </div>
//   );
// };

// export default ResizableComponent;


import React, { useRef, useEffect, useState } from "react";
import "./ResizableComponent.css";

const ResizableComponent = ({ children, onAdd, onUpdate, componentId }) => {
  const ref = useRef(null);
  const [initialWidth, setInitialWidth] = useState(0);
  const [initialHeight, setInitialHeight] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [resizeStartX, setResizeStartX] = useState(0);
  const [resizeStartY, setResizeStartY] = useState(0);
  const [resizeWidth, setResizeWidth] = useState(0);
  const [resizeHeight, setResizeHeight] = useState(0);
  const [input, setInput] = useState("");

  useEffect(() => {
    const resizableEle = ref.current;
    const styles = window.getComputedStyle(resizableEle);
    setInitialWidth(parseInt(styles.width, 10));
    setInitialHeight(parseInt(styles.height, 10));
  }, []);

  useEffect(() => {
    if (isDragging) {
      document.addEventListener("mousemove", onMouseMove);
      document.addEventListener("mouseup", onMouseUp);
    } else {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
    }
    return () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
    };
  }, [isDragging]); 

  const onMouseMove = (event) => {
    if (!isDragging) return;
    const dx = event.clientX - resizeStartX;
    const dy = event.clientY - resizeStartY;
    let newWidth = resizeWidth + dx;
    let newHeight = resizeHeight + dy;
    if (ref.current.classList.contains('resizer-tl') || ref.current.classList.contains('resizer-tr')) {
      newHeight = initialHeight - dy;
    } else {
      newHeight = initialHeight + dy;
    }
    ref.current.style.width = `${newWidth}px`;
    ref.current.style.height = `${newHeight}px`;
  };

  const onMouseDown = (event) => {
    const { target } = event;
    if (!target.classList.contains("resizer")) return;
    setIsDragging(true);
    setResizeStartX(event.clientX);
    setResizeStartY(event.clientY);
    setResizeWidth(ref.current.offsetWidth);
    setResizeHeight(ref.current.offsetHeight);
  };

  const onMouseUp = () => {
    setIsDragging(false);
  };

  const handleAddButtonClick = () => {
    console.log("Input:", input);
    onAdd(input);
  };

  const handleUpdateButtonClick = () => {
    onUpdate(componentId, input);
  };

  return (
    <div ref={ref} className="resizable-component" onMouseDown={onMouseDown}>
      {children}
      <button className="resizer-button" onClick={handleAddButtonClick}>Add</button>
      <button className="resizer-button" onClick={handleUpdateButtonClick}>Update</button>
      <input
        type="text"
        placeholder="Type any text"
        value={input}
        name="input"
        onChange={(e) => setInput(e.target.value)}
      />
      <div className="resizer resizer-tl"></div>
      <div className="resizer resizer-tr"></div>
      <div className="resizer resizer-br"></div>
      <div className="resizer resizer-bl"></div>
    </div>
  );
};

export default ResizableComponent;
