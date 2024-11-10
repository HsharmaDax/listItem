const express = require('express');
const cors = require('cors');
const app = express();
const user = require('./routes/userRoutes');
const item = require('./routes/itemRoutes')

app.use(cors());
app.use(express.json())

app.get('/test', (req, res) => {
    res.send('Hello ')
})

app.use('/user', user);
app.use('/item', item)

app.listen(5000, () => {
    console.log('server started');
})