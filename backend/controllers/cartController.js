import userModel from "../models/userModel.js"

// Add products to user product cart
const addToCart = async (req,res) => {
    try {
        const { userId,itemId,size } = req.body;

        const userData = await userModel.findById(userId);
        let cartData = userData.cartData;

        if (cartData[itemId]) {
            if (cartData[itemId][size]) {
                cartData[itemId][size] += 1;
            } else {
                cartData[itemId][size] = 1;
            }
        } else {
            cartData[itemId] = {};
            cartData[itemId][size] = 1;
        }

        await userModel.findByIdAndUpdate(userId, { cartData }, { new: true });
        res.json({ success: true, message: 'Added to cart' });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}

// Update products in user product cart
const updateCart = async (req,res) => {
    try {
        const { userId,itemId,size,quantity } = req.body;

        const userData = await userModel.findById(userId);
        let cartData = userData.cartData;

        cartData[itemId][size] = quantity;

        // if (cartData[itemId]) {
        //     cartData[itemId][size] = quantity;
        // }

        await userModel.findByIdAndUpdate(userId, { cartData }, { new: true });
        res.json({ success: true, message: 'Cart updated' });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}

// const updateCart = async (req, res) => {
//   try {
//     const { userId, itemId, size, quantity } = req.body;

//     const userData = await userModel.findById(userId);
    
//     if (!userData) {
//       return res.status(404).json({ success: false, message: "User not found" });
//     }

//     // Ensure cartData exists
//     if (!userData.cartData) userData.cartData = {};

//     let cartData = userData.cartData;

//     // Ensure itemId exists
//     if (!cartData[itemId]) cartData[itemId] = {};

//     // Update quantity
//     cartData[itemId][size] = quantity;

//     await userModel.findByIdAndUpdate(userId, { cartData }, { new: true });

//     res.json({ success: true, message: "Cart updated" });

//   } catch (error) {
//     console.log(error);
//     res.json({ success: false, message: error.message });
//   }
// };


// Get User Cart data
const getUserCart = async (req,res) => {
    try {
        const { userId } = req.body;

        const userData = await userModel.findById(userId);
        let cartData = userData.cartData;

        res.json({ success: true, cartData });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}

export { addToCart, updateCart, getUserCart }

// import userModel from "../models/userModel.js";

// // Add products to user product cart
// const addToCart = async (req, res) => {
//   try {
//     const { userId, itemId, size } = req.body;

//     const userData = await userModel.findById(userId);
//     let cartData = userData.cartData;

//     if (cartData[itemId]) {
//       if (cartData[itemId][size]) {
//         cartData[itemId][size] += 1;
//       } else {
//         cartData[itemId][size] = 1;
//       }
//     } else {
//       cartData[itemId] = {};
//       cartData[itemId][size] = 1;
//     }

//     await userModel.findByIdAndUpdate(userId, { cartData }, { new: true });
//     res.json({ success: true, message: "Added to cart" });
//   } catch (error) {
//     console.log(error);
//     res.json({ success: false, message: error.message });
//   }
// };

// // Update products in user product cart
// const updateCart = async (req, res) => {
//   try {
//     const { userId, itemId, size, quantity } = req.body;

//     const userData = await userModel.findById(userId);
//     let cartData = userData.cartData;

//     if (cartData[itemId]) {
//       cartData[itemId][size] = quantity;
//     }

//     await userModel.findByIdAndUpdate(userId, { cartData }, { new: true });
//     res.json({ success: true, message: "Cart updated" });
//   } catch (error) {
//     console.log(error);
//     res.json({ success: false, message: error.message });
//   }
// };

// // Get User Cart data
// const getUserCart = async (req, res) => {
//   try {
//     const { userId } = req.body;

//     const userData = await userModel.findById(userId);
//     let cartData = userData.cartData;

//     res.json({ success: true, cartData });
//   } catch (error) {
//     console.log(error);
//     res.json({ success: false, message: error.message });
//   }
// };

// export { addToCart, updateCart, getUserCart };
