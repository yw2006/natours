const mongoose= require('mongoose');
const dotenv = require('dotenv');
const app = require('./app');

dotenv.config();

const DB=process.env.DATABASE.replace("<PASSWORD>",process.env.DATABASE_PASSWORD)
mongoose.connect(DB)
  .then(() => console.log('db connection successfull!👌'));

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
