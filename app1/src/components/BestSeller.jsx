// import React, { useContext, useEffect, useState } from "react";
// import { ShopContext } from "../context/ShopContext";
// import Title from "./Title";
// import ProductItem from "./ProductItem";

// /**
//  * BestSeller.jsx
//  * - Shows up to 5 products flagged as `bestSeller`
//  * - Re-runs filter whenever products change (important if products arrive async)
//  * - Shows Loading / Empty messages appropriately
//  */
// const BestSeller = () => {
//   // get products from context (could be [] or undefined)
//   const ctx = useContext(ShopContext);
//   const products = ctx?.products ?? [];

//   const [bestSeller, setBestSeller] = useState([]);

//   useEffect(() => {
//     // If products array is empty, clear bestSeller and return (will show Loading)
//     if (!products || products.length === 0) {
//       setBestSeller([products]);
//       return;
//     }

//     // Filter items that have bestSeller truthy and take first 5
//     const bestProduct = products.filter((item) => !!item.bestSeller);
//     setBestSeller(bestProduct.slice(0, 5));
//   }, [products]); // <-- important: re-run when products changes

//   return (
//     <div className="my-10">
//       {/* Section Title */}
//       <div className="text-center text-3xl py-8">
//         <Title text1={"BEST"} text2={"SELLERS"} />
//         <p className="w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600">
//           Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis,
//           repellat!
//         </p>
//       </div>

//       {/* Products Grid */}
//       <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 gap-y-6">
//         {bestSeller.length > 0 ? (
//           // Render bestSeller items in the grid
//           bestSeller.map((item, index) => (
//             <ProductItem
//               key={item._id ?? index} // prefer unique id, fallback to index
//               id={item._id}
//               name={item.name}
//               image={item.image}
//               price={item.price}
//             />
//           ))
//         ) : products.length === 0 ? (
//           // products not loaded yet
//           <p className="col-span-full text-center text-sm text-gray-500">
//             Loading products...
//           </p>
//         ) : (
//           // products loaded but no bestsellers found
//           <p className="col-span-full text-center text-sm text-gray-500">
//             No bestsellers found.
//           </p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default BestSeller;

import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from './Title'
import ProductItem from './ProductItem'

const BestSeller = () => {

    const { products } = useContext(ShopContext)
    const [bestSeller,setBestSeller] = useState([])

    useEffect(()=>{
        const bestProduct = products.filter((item)=>(item.bestseller))
        setBestSeller(bestProduct.slice(0,5))
    },[products])

  return (
    <div className='my-10'>
        <div className='text-center text-3xl py-8'>
            <Title text1={'BEST'} text2={'SELLERS'}/>
            <p className='w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600'>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis, repellat!
            </p>
        </div>

        {/* Rendering products */}
        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 gap-y-6'>
            {
                bestSeller.map((item,index)=>(
                    <ProductItem key={index} id={item._id} name={item.name} image={item.image} price={item.price}/>
                ))
            }
        </div>
    </div>
  )
}

export default BestSeller
