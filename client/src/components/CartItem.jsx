import React from 'react'

export default function CartItem({product}) {
  return (
    <div className='rounded-xl bg-gray-1x00 p-3 shadow-lg hover:p-4 '>
        <div>
            <img src={product.profile_image} alt={product.name} />
        </div>
        <div className='flex '>
            <p>{product.name}</p>
            <p>{product.price} L.E.</p>
            <p>{product.discount} L.E.</p>
            <p>{product.description} L.E.</p>

        </div>
      
    </div>
  )
}
