import React, { useEffect, useState } from "react";
import axios from "axios";
import "./ComponentList.css"; 
const ComponentList = () => {
  const [components, setComponents] = useState([]);

  useEffect(() => {
    // Fetch all components from the backend when the component mounts
    axios.get("http://localhost:4000/api/getAll")
      .then(response => {
        // Update the state with the fetched components
        setComponents(response.data);
      })
      .catch(error => {
        console.error("Error fetching components:", error);
      });
  }, []); // Empty dependency array ensures that this effect runs only once on component mount

  return (
    <div className="component-list">
      <h2 className="component-list-title">All Components</h2>
      <ul className="component-list-items">
        {components.map(component => (
          <li key={component._id} className="component-list-item">
            <strong className="component-id">Component ID:</strong> {component.componentId}, 
            <strong className="component-name"> Name:</strong> {component.name}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ComponentList;
