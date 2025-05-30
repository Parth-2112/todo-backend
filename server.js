import {app} from './app.js';
import { connectDB } from './data/database.js'; // Assuming you have a database connection function in data/database.js


connectDB(); // Connect to the database
// console.log(process.env.PORT);
app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT} in ${process.env.NODE_ENV} mode`);
});
  