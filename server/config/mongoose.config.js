const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO,{
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() =>  console.log('We are making connection!'))
    .catch(err => console.log(err));