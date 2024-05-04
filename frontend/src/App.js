
import React, { useState } from 'react';
import SplitPane from "react-split-pane";
import ResizableComponent from './component/ResizableComponent'; 
import ComponentList from './component/ComponentList'; 
import axios from 'axios'; 

function App() {
  const [actionCount, setActionCount] = useState({ addCount: 0, updateCount: 0 });
  const components = [1, 2, 3];

  const handleAdd = async (componentId, name) => {
    try {
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
      await axios.put(`http://localhost:4000/update/${componentId}`, { name });
      console.log('Component updated successfully');
    } catch (error) {
      console.error("Error updating data:", error);
    }
  };

  return (
    <SplitPane split="horizontal" minSize={50} defaultSize="50%">
      <div style={{ background: "grey", height: "100%", width: "50%" }}>
        <SplitPane split="vertical" minSize={50} defaultSize="33%">
          {components.map((componentId, index) => (
            <div key={index} className="buttons-container">
              {/* Buttons for each ResizableComponent */}
              <ResizableComponent
                componentId={componentId} // Pass componentId as a prop
                onAdd={(name) => handleAdd(componentId, name)}  // Pass componentId and name to handleAdd
                onUpdate={(name) => handleUpdate(componentId, name)} // Pass componentId and name to handleUpdate
              />
            </div>
          ))}
        </SplitPane>
      </div>
      <div style={{ backgroundColor: "white", height: "100%", width: "50%" }}>
        <div>
          <p>Add Count: {actionCount.addCount}</p>
          <p>Update Count: {actionCount.updateCount}</p>
          <p>Total Count: {actionCount.addCount + actionCount.updateCount}</p>
        </div>
        <ComponentList />
      </div>
    </SplitPane>
  );
}

export default App;


