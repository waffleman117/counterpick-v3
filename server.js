const express = require('express');
const connectDB = require('./config/db');
const path = require('path');

const app = express();

//app.get('/', (req, res) => res.send('API running uwu'));

//Connect database
connectDB();

//Inicializar Middleware
app.use(express.json({ extended: false }));

//Definir Rutas
app.use('/api/chars', require('./routes/api/chars'));
app.use('/api/matchs', require('./routes/api/matchs'));

//Serve static assets in production
if (process.env.NODE_ENV === 'production') {
  //Set static folder
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server started on port ${PORT}`));
