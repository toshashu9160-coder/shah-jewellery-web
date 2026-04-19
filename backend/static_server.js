const express = require('express');
const path = require('path');
const app = express();
app.use(express.static(path.join(__dirname, '..')));
app.listen(5500, () => console.log('Frontend server running on http://localhost:5500'));
