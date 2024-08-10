const mongoose = require('mongoose');
const dotenv = require('dotenv');
const fs =require('fs')
const Tour= require('../../models/tourModel.js')
dotenv.config();

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);
mongoose.connect(DB).then(() => console.log('db connection successfull!👌'));

const tours= JSON.parse(fs.readFileSync(__dirname+'/tours-simple.json'))

// import data into DB
const importData=async()=>{
    try {
            await Tour.create(tours);
            console.log('added succeffly')
    } catch (error) {
        console.log(error.message);
    }
        process.exit();
}

// import data from DB
const deleteData = async () => {
  try {
    await Tour.deleteMany();
    console.log('deleted succeffly');

  } catch (error) {
    console.log(error.message);
  }
      process.exit();
};
if(process.argv[2]=="--import"){
    importData()
}else if (process.argv[2]=="--delete"){
    deleteData()
}