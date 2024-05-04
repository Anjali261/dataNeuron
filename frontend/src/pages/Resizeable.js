// ResizableComponent.js
import React from 'react';
import { Resizable } from 'react-resizable';
import '../pages/ResizableComponent.css';

const ResizableComponent = ({ id }) => {
  const handleResize = (event, { element, size, handle }) => {
    // Resize logic
  };

  return (
    <Resizable
      className="resizable-component"
      height={200}
      width={200}
      onResize={handleResize}
      resizeHandles={['n', 'e', 's', 'w', 'ne', 'se', 'sw', 'nw']}
    >
      <div className="component">
        <h2>Component {id}</h2>
      </div>
    </Resizable>
  );
};

export default ResizableComponent;


