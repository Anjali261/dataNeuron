import React, { useEffect, useState } from "react";
import axios from "axios";
import ResizableComponent from "./component/ResizableComponent";
import "./App.css";
import ComponentList from "./component/ComponentList";

function App() {
  const [actionCount, setActionCount] = useState({ addCount: 0, updateCount: 0 });

  const handleAdd = async (componentId, name) => {
    try {
      console.log("Component ID:", componentId);
      console.log("Name:", name);

      // Call the Add API with the componentId and name
      await axios.post("http://localhost:4000/api/add", {
        componentId: componentId,
        name: name
      });
      
      // Increment add count
      setActionCount(prevCount => ({ ...prevCount, addCount: prevCount.addCount + 1 }));
    } catch (error) {
      console.error("Error adding data:", error);
    }
  };

  const handleUpdate = async (componentId, name) => {
    try {
      // Call the Update API with componentId and name
      await axios.put(`http://localhost:4000/api/update/${componentId}`, { name });
      setActionCount(prevCount => ({ ...prevCount, updateCount: prevCount.updateCount + 1 }));
    } catch (error) {
      console.error("Error updating data:", error);
    }
  };
  const components = [1, 2, 3];

  return (
    <div className="app">
      <div className="components-container">
        {components.map((componentId, index) => (
          <div key={index} className="buttons-container">
            {/* Buttons for each ResizableComponent */}
            <ResizableComponent
              componentId={componentId} // Pass componentId as a prop
              onAdd={(name) => handleAdd(componentId, name)}  // Pass componentId and name to handleAdd
              onUpdate={handleUpdate}
            />
          </div>
        ))}
      </div>
      <div className="count-container">
        <p>Add Count: {actionCount.addCount}</p>
        <p>Update Count: {actionCount.updateCount}</p>
        <p>Total Count: {actionCount.addCount + actionCount.updateCount}</p>
      </div>
      <ComponentList />
    </div>
  );
}

export default App;
