import Router from 'express'

import {verifyToken} from '../utils/verifyToken.js'
import {  getUserProducts,getAllUsers ,getOneUser ,updateUser ,deleteUser } 
from '../controller/user.controller.js'
const userRouter=Router();

userRouter.post('/user-product/:id',getUserProducts);
userRouter.get('/',getAllUsers);
userRouter.get('/:id',getOneUser);
userRouter.post('/update/:id',updateUser)
userRouter.delete('/delete/:id',deleteUser)


export default userRouter;