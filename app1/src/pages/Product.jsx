import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext';
import { assets, products } from '../assets/assets';
import RelatedProducts from '../components/RelatedProducts';

const Product = () => {

  const {productId} = useParams();
  const {products, currency, addToCart} = useContext(ShopContext);
  const [productData,setProductData] = useState(false);
  const [image,setImage] = useState('');
  const[size,setSize] = useState('');

  const fetchProductData = async () => {
    products.map((item)=>{
      if (item._id === productId) {
        setProductData(item)
        setImage(item.image[0])              
        return null;
      }
    })
  }

  useEffect(()=>{
    fetchProductData()
  },[products])
  
  return productData ? (
    <div className='border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100'>
      {/* Product Data */}
      <div className='flex gap-12 sm:gap-12 flex-col sm:flex-row'>
      {/* Product Images */}
      <div className="flex-1 flex gap-3 flex-col sm:flex-row">
  {/* Small thumbnails */}
  <div className="flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18%] w-full">
    {productData.image.map((item, index) => (
      <img
        key={index}
        onClick={() => setImage(item)}
        src={item}
        className={`w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer 
          ${image === item ? "border-2 border-black" : ""}`} // highlight selected
        alt=""
      />
    ))}
  </div>
        <div className='w-full sm:2[80%]'>
          <img className='w-full h-auto' src={image} alt="" />
        </div>
      </div>
      {/* ----------- Product Info */}
      <div className='flex-1'>
        <h1 className='font-medium text-2xl mt-2'>{productData.name}</h1>
        <div className='flex items-center gap-1 mt-2'>
          <img src={assets.star_icon} alt="" className="w-3 5" />
          <img src={assets.star_icon} alt="" className="w-3 5" />
          <img src={assets.star_icon} alt="" className="w-3 5" />
          <img src={assets.star_icon} alt="" className="w-3 5" />
          <img src={assets.star_dull_icon} alt="" className="w-3 5" />
          <p className='pl-2'>(122)</p>
        </div>
        <p className='mt-5 text-3xl font-medium'>{currency}{productData.price}</p>
        <p className='mt-5 text-gray-500 md:w-4/5'>{productData.description}</p>
        <div className='flex flex-col gap-4 my-8'>
          <p>Select Size</p>
          <div className='flex gap-2'>
            {productData.sizes.map((item,index)=>(
              <button onClick={()=>setSize(item)} className={`border py-2 px-4 bg-gray-100 ${item === size ? 'border-orange-500' : ''}`} key={index}>{item}</button>
            ))}
          </div>
        </div>
        <button onClick={()=>addToCart(productData._id,size)} className='bg-black text-white px-8 py-3 text-sm active:bg-gray-700'>ADD TO CART</button>
          <hr className='mt-8 sm:w-4/5'/>
          <div className='text-sm text-gray-500 mt-5 flex flex-col gap-1'>
            <p>100% Original Product</p>
            <p>Cash on delivery is available on this product</p>
            <p>Easy return & exchange policy within 7 days</p>
          </div>
      </div>
      </div>
      {/* Description & Review Section */}
      <div className='mt-20'>
            <div className='flex'>
              <b className='border px-5 py-3 text-sm'>Description</b>
              <p className='border px-5 py-3 text-sm'>Reviews (122)</p>
            </div>
            <div className='flex flex-col gap-4 border px-6 py-6 text-sm text-gray-600'>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo repellendus rem itaque, et provident quis aliquid molestiae, quasi quas consequatur molestias soluta. Laboriosam quas similique deserunt necessitatibus repellat reiciendis illum ducimus, odio minus ipsa nam veritatis sint autem ipsum est rerum dolor possimus exercitationem ut cumque rem eaque sequi modi?</p>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt sapiente, iusto impedit cupiditate nostrum quis rerum similique hic id. Rem eveniet beatae tempora accusantium nemo officiis, ex libero nisi est a eos delectus at possimus perferendis laudantium perspiciatis porro, eligendi provident! Dolorum odit quo qui non consequatur et dolor excepturi?</p>
            </div>
      </div>

      {/* ----------------Display Related Products----------------- */}
      <RelatedProducts category={productData.category} subCategory={productData.subCategory}/> 

    </div>
  ) : <div className='opacity-0'></div>
}

export default Product


// import React, { useContext, useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import { ShopContext } from "../context/ShopContext";
// import { assets, products } from "../assets/assets";
// import RelatedProducts from "../components/RelatedProducts";

// const Product = () => {
//   const { productId } = useParams();
//   const { currency, addToCart } = useContext(ShopContext);
//   const [productData, setProductData] = useState(null);
//   const [image, setImage] = useState("");
//   const [size, setSize] = useState("");

//   const fetchProductData = () => {
//     const item = products.find((p) => p._id === productId);
//     if (item) {
//       setProductData(item);
//       setImage(item.image[0]);
//     }
//   };

//   useEffect(() => {
//     fetchProductData();
//   }, [productId]);

//   if (!productData) {
//     return <p className="text-center mt-10">Product not found</p>;
//   }

//   return (
//     <div className="border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100">
//       {/* Product Data */}
//       <div className="flex gap-12 sm:gap-12 flex-col sm:flex-row">
//         {/* Product Images */}
//         <div className="flex-1 flex gap-3 flex-col sm:flex-row">
//           {/* Small thumbnails */}
//           <div className="flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18%] w-full">
//             {productData.image.map((item, index) => (
//               <img
//                 key={index}
//                 onClick={() => setImage(item)}
//                 src={item}
//                 className={`w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer 
//           ${image === item ? "border-2 border-black" : ""}`}
//                 alt=""
//               />
//             ))}
//           </div>
//           <div className="w-full sm:w-[80%]">
//             <img className="w-full h-auto" src={image} alt="" />
//           </div>
//         </div>
//         {/* ----------- Product Info */}
//         <div className="flex-1">
//           <h1 className="font-medium text-2xl mt-2">{productData.name}</h1>
//           <div className="flex items-center gap-1 mt-2">
//             <img src={assets.star_icon} alt="" className="w-3.5" />
//             <img src={assets.star_icon} alt="" className="w-3.5" />
//             <img src={assets.star_icon} alt="" className="w-3.5" />
//             <img src={assets.star_icon} alt="" className="w-3.5" />
//             <img src={assets.star_dull_icon} alt="" className="w-3.5" />
//             <p className="pl-2">(122)</p>
//           </div>
//           <p className="mt-5 text-3xl font-medium">
//             {currency}
//             {productData.price}
//           </p>
//           <p className="mt-5 text-gray-500 md:w-4/5">
//             {productData.description}
//           </p>
//           <div className="flex flex-col gap-4 my-8">
//             <p>Select Size</p>
//             <div className="flex gap-2">
//               {productData.sizes.map((item, index) => (
//                 <button
//                   onClick={() => setSize(item)}
//                   className={`border py-2 px-4 bg-gray-100 ${
//                     item === size ? "border-orange-500" : ""
//                   }`}
//                   key={index}
//                 >
//                   {item}
//                 </button>
//               ))}
//             </div>
//           </div>
//           <button
//             onClick={() => addToCart(productData._id, size)}
//             className="bg-black text-white px-8 py-3 text-sm active:bg-gray-700"
//           >
//             ADD TO CART
//           </button>
//           <hr className="mt-8 sm:w-4/5" />
//           <div className="text-sm text-gray-500 mt-5 flex flex-col gap-1">
//             <p>100% Original Product</p>
//             <p>Cash on delivery is available on this product</p>
//             <p>Easy return & exchange policy within 7 days</p>
//           </div>
//         </div>
//       </div>
//       {/* Description & Review Section */}
//       <div className="mt-20">
//         <div className="flex">
//           <b className="border px-5 py-3 text-sm">Description</b>
//           <p className="border px-5 py-3 text-sm">Reviews (122)</p>
//         </div>
//         <div className="flex flex-col gap-4 border px-6 py-6 text-sm text-gray-600">
//           <p>Product description here...</p>
//         </div>
//       </div>
//       {/* ----------------Display Related Products----------------- */}
//       <RelatedProducts
//         category={productData.category}
//         subCategory={productData.subCategory}
//       />
//     </div>
//   );
// };

// export default Product;
