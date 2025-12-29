import express from 'express'
import { loginUser,registerUser,adminLogin } from '../controllers/userController.js'

const userRouter = express.Router();

// User login route
userRouter.post('/login', loginUser);
// User registration route
userRouter.post('/register', registerUser); 
// Admin login route
userRouter.post('/admin', adminLogin);

export default userRouter;
/*
//   SIMPLIEPIED  method to use common route
app.use('/api/user',useRoute) // use common route for every route methods and this is to connect the middleware to app

const useRoute=express.route() // this is middlewar
useRoute.route('/').get().pos()

 */