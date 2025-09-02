import Router from 'express'

import {create,getAllProducts,getOneProduct,update,deleteProduct} from 
'../controller/proudct.controller.js'

const productRouter=Router();

productRouter.post('/create',create)
productRouter.get('/',getAllProducts)
productRouter.get('/:id',getOneProduct)
productRouter.post('/update/:id',update)
productRouter.delete('/delete/:id',deleteProduct)

 


export default productRouter;