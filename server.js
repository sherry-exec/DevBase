const express = require('express');
const connectDb = require('./config/db');

// Routes
const apiRouteCollection = require('./routes/api');

// Connect database
connectDb();

// Init app
const app = express();

// Init middleware
app.use(express.json({
    extended: false
}));

// Default route
app.get('/', (req, res) => res.send('API Running'));

// Register routes
apiRouteCollection.forEach(route => {
    app.use(route.prefixUrl, route.router);
});

// Run server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));