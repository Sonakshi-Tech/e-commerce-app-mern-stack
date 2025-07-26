import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from '../components/Title';
import { assets } from '../assets/assets';
import CartTotal from '../components/CartTotal';




const Cart = () => {
  const { products, currency, cartItems, updateQuantity,Navigate } = useContext(ShopContext);
  const [cartData, setCartData] = useState([]);
 



  useEffect(() => {
    const tempData = [];
    for (const items in cartItems) {
      for (const item in cartItems[items]) {
        if (cartItems[items][item] > 0) {
          tempData.push({
            _id: items,
            size: item,
            quantity: cartItems[items][item]
          })
        }
      }
    }
    setCartData(tempData);
  }, [cartItems]);

  return (
    <div className='border-t pt-14'>
      <div className='text-2xl mb-3'>
        <Title text1={'YOUR'} text2={'CART'} />
      </div>

      <div className='flex flex-col gap-6'>
        {cartData.map((item, index) => {
          const productData = products.find((product) => product._id === item._id);

          return (
            <div
              key={index}
              className="py-4 border-t border-b text-gray-700 flex items-center justify-between gap-4"
            >
              {/* Left: Product Info */}
              <div className="flex gap-4 items-start w-1/3">
                <img className="w-16 sm:w-20" src={productData.image[0]} alt="" />
                <div>
                  <p className="text-xs sm:text-lg font-medium">{productData.name}</p>
                  <div className="flex items-center gap-4 mt-2 text-sm">
                    <p>{currency}{productData.price}</p>
                    <p className="px-2 border bg-slate-50 rounded">{item.size}</p>
                  </div>
                </div>
              </div>

              {/* Middle: Quantity Input */}
              <div className="w-1/3 flex justify-center">
                <input onChange={(e)=> e.target.value === '' || e.target.value === '0' ? null : updateQuantity(item._id,item.size,Number(e.target.value))}
                  className="w-14 sm:w-16 h-10 border border-gray-300 rounded-md text-center px-2 py-1 focus:outline-none focus:ring-1 focus:ring-gray-400"
                  type="number"
                  min={1}
                  defaultValue={item.quantity}
                />
              </div>

              {/* Right: Bin Icon */}
              <div className="w-1/3 flex justify-end pr-2">
                <img onClick={()=>updateQuantity(item._id,item.size,0)}
                  className="w-5 sm:w-6 h-5 sm:h-6 cursor-pointer hover:scale-110 transition-transform duration-200"
                  src={assets.bin_icon}
                  alt="Delete"
                />
              </div>
            </div>
          );
        })}
      </div>
      <div className='flex justify-end my-20'>
          <div className='w-full sm:w-[450px]'>
          <CartTotal />
          <div className='w-full text-end'>
            <button onClick={()=>Navigate('/place-order')} className='bg-black text-white text-sm my-8 px-8 py-3'>PROCEED TO CHECKOUT</button>
             </div>
          </div>
      </div>
    </div>
  );
};

export default Cart;

