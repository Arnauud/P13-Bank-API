const express = require('express')

const dotEnv = require('dotenv')
dotEnv.config()
const cors = require('cors')
const swaggerUi = require('swagger-ui-express')
const yaml = require('yamljs')
const swaggerDocs = yaml.load('./swagger.yaml')
const dbConnection = require('./database/connection')

dotEnv.config()

const app = express()
const PORT = process.env.PORT || 3001

// Connect to the database
dbConnection()

// Handle CORS issues
app.use(cors())

// Request payload middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Handle custom routes
app.use('/api/v1/user', require('./routes/userRoutes'))

// API Documentation
if (process.env.NODE_ENV !== 'production') {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs))
}

app.get('/', (req, res, next) => {
  res.send('Hello from my Express server v2!')
})

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`)
})



// ARNAUD //// ADDED TO TEST CONNNECTION SERVER after backend Launch => npm run dev:server  ///





// const axios = require('axios')
// const signupApi = 'http://localhost:3001/api/v1/user/signup'

// const users = [
//   {
//     firstName: 'Tony',
//     lastName: 'Stark',
//     email: 'tony@stark.com',
//     password: 'password123'
//   },
//   {
//     firstName: 'Steve',
//     lastName: 'Rogers',
//     email: 'steve@rogers.com',
//     password: 'password456'
//   }
// ]

// console.log('Starting script...'); // Add at the very top of the file

// users.forEach(user => {
//   console.log('Creating user:', user); // Add before axios call
//   axios
//     .post(signupApi, user)
//     .then(response => console.log('User response:', response.data))
//     .catch(error => console.log('Error response:', error.message));
// });

// async function createUser() {
//   console.log('Inside createUser function...'); // Add here
//   try {
//     const response = await axios.post('http://localhost:3001/api/v1/user/signup', {
//       firstName: 'Tony',
//       lastName: 'Stark',
//       email: 'tony@stark.com',
//       password: 'password123',
//     });
//     console.log('User created:', response.data);
//   } catch (error) {
//     console.error('Error creating user:', error.message);
//   }
// }

// createUser();