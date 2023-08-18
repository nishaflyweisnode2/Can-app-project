const express = require('express');
const mongoose = require('mongoose');



const routes = require('./src/routes/userRoutes');
const professionRoutes = require('./src/routes/professionRoutes');
const chooseProfessionRoutes = require('./src/routes/chooseProfessionRoutes');
const profileRoutes = require('./src/routes/profileRoutes');
const pageRoutes = require('./src/routes/pageRoutes');
const resumeRoutes = require('./src/routes/resumeRoutes');
const callRoutes = require('./src/routes/callRoutes');
const websiteRoutes = require('./src/routes/websiteRoutes');
const youtubeRoutes = require('./src/routes/youtubeRoutes');
const brochureRoutes = require('./src/routes/brochureRoutes');
const introductionRoutes = require('./src/routes/introductionRoutes');
const instagramRoutes = require('./src/routes/instagramRoutes');
const appointmentRoutes = require('./src/routes/appointmentRoutes');
const galleryRoutes = require('./src/routes/galleryRoutes');
const categoryRoutes = require('./src/routes/categoryRoutes');
const postRoutes = require('./src/routes/postRoutes');




const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 8000;
const DB_URI = process.env.DB_URI;




mongoose.set('strictQuery', true)



app.get("/", (req, res) => {
    res.json("Hello Can-app !! TESTING DB Updated")
});



mongoose.connect(DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('MongoDB is Connected');
})
    .catch((error) => {
        console.error('Error connecting to MongoDB:', error);
    });



app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.json());



app.use('/user', routes);
app.use('/profession', professionRoutes);
app.use('/chooseProfession', chooseProfessionRoutes);
app.use('/profile', profileRoutes);
app.use('/page', pageRoutes);
app.use('/resume', resumeRoutes);
app.use('/call', callRoutes);
app.use('/website', websiteRoutes);
app.use('/youtube', youtubeRoutes);
app.use('/brochure', brochureRoutes);
app.use('/introduction', introductionRoutes);
app.use('/instagram', instagramRoutes);
app.use('/appointment', appointmentRoutes);
app.use('/gallery', galleryRoutes);
app.use('/category', categoryRoutes);
app.use('/post', postRoutes);







app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});