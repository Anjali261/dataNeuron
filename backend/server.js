
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

// MongoDB connection

const connectDB = async () => {
    try {
        await mongoose.connect(`mongodb+srv://mail2anjalisingh2610:bdoGQWTEBNpEze8p@cluster0.ybo0zd5.mongodb.net/`, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            // Add any other options as needed
        });
        console.log('MongoDB connected successfully');
    } catch (error) {
        console.error('MongoDB connection error:', error);
        process.exit(1);
    }
};

// Call connectDB function
connectDB();
app.use(cors());


const componentSchema = new mongoose.Schema({
  componentId: {
    type: Number,
    required: true
  },
  name: {
    type: String,
    required: true
  }
});

const Component = mongoose.model("Component", componentSchema);

module.exports = Component;

// API endpoints
app.use(express.json());

app.post("/api/add", async (req, res) => {
  const { componentId, name } = req.body;

  try {
    // Create a new Component document
    const newComponent = new Component({ componentId, name });
    // Save it to the database
    await newComponent.save();
    console.log("Data added:", { componentId, name });
    res.status(200).json({ message: "Data added successfully" });
  } catch (error) {
    console.error("Error adding data:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});




app.put('/update/:componentId', async (req, res) => {
  const { componentId } = req.params;
  const { name } = req.body;

  try {
    // Find the component by componentId
    let component = await Component.findOne({ componentId });

    // If component not found, return 404 error
    if (!component) {
      return res.status(404).json({ error: 'Component not found' });
    }

    // Update the component name
    component.name = name;

    // Save the updated component
    await component.save();

    // Send success response
    return res.status(200).json({ message: 'Component updated successfully' });
  } catch (error) {
    // Handle errors
    console.error('Error updating component:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/api/getAll', async (req, res) => {
  try {
    // Retrieve all components from the database
    const components = await Component.find();

    // Send the components as a response
    return res.status(200).json(components);
  } catch (error) {
    // Handle errors
    console.error('Error fetching components:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});


app.get('/api/count', async (req, res) => {
  const count = await ComponentData.countDocuments();
  res.json({ count });
});

app.listen(4000, () => console.log('Server started on port 5000'));