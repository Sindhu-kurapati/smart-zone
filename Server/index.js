const express = require('express');
const cors = require('cors');
const {connect} = require('mongoose');
require('dotenv').config();

const userRoutes = require('./routes/userRoutes');
const sellerRoutes = require('./routes/sellerRoutes');
const productRoutes = require('./routes/productRoutes');
const {notFound, errorHandler} = require('./middleware/errorMiddleware');

//middleware
const app = express();

app.use(express.json({extended: true}));
app.use(express.urlencoded({extended: true}))

// app.use(cors({credentials: true}))
app.use(cors({credentials: true, origin: "https://smart-zone-sindhu.netlify.app"}));
//Routes
app.use('/api/users', userRoutes);
app.use('/api/sellers', sellerRoutes);
app.use('/api/products', productRoutes);
//Error Handling
app.use(notFound)
app.use(errorHandler)
// Connect to MongoDB and start server
connect(process.env.MONGO_URI)
.then(()=>{
    console.log("MongoDB connected successfuly");
    app.listen(process.env.PORT || 4000, () => console.log(`Server is running on PORT ${process.env.PORT}`));
})
.catch(error => {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1);
})


