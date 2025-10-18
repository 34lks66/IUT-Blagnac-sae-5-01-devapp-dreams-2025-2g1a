const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const routes = require('./routes/MemberRoute');

require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

mongoose
    .connect(process.env.MONGODB_URL)
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.log(err));

app.get('/', (req, res) => {
    res.json({ 
        message: 'Server is running!',
        routes: {
            getMembers: 'GET /api/get',
            saveMember: 'POST /api/save',
            updateMember: 'PUT /api/update/:id',
            deleteMember: 'DELETE /api/delete/:id'
        }
    });
});

app.use('/api', routes);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));