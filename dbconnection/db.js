const mongoose = require('mongoose')
try {
    mongoose.connect(process.env.dbURL, {
        useCreateIndex:true,
        useFindAndModify:true,
        useNewUrlParser:true,
        useUnifiedTopology:true
    })
}

catch(error){
    console.log(error)
}