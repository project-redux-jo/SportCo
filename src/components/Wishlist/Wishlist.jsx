import { useSelector, useDispatch } from "react-redux";
import { removeFromWishlist } from "../../redux/wishlistSlice";

const Wishlist = () => {
  const { wishlistItems } = useSelector((state) => state.wishlist);
  const dispatch = useDispatch();

  return (
    <div className="p-6 max-w-6xl mx-auto border-2 mb-90 mt-20">
      <h2 className="text-2xl font-bold text-center mb-6 text-gray-800 ">
        Saved Stadiums
      </h2>

      {wishlistItems.length === 0 ? (
        //

        <p className="text-center text-gray-500">Your Favorites is empty</p>
      ) : (
        <>
          {wishlistItems.map((item) => (
            <div
              key={item.id}
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
            >
              <img src={item.image} alt={item.name} className="h-16" />
              <p>{item.name}</p>
              <p>{item.price}</p>
              <button
                onClick={() => dispatch(removeFromWishlist(item.id))}
                className="bg-red-500 text-white px-3 py-1 rounded my-2"
              >
                Remove
              </button>
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default Wishlist;






// import { useSelector, useDispatch } from "react-redux";
// import { removeFromWishlist } from "../../redux/wishlistSlice";
// import { motion } from "framer-motion";

// const Wishlist = () => {
//   const { wishlistItems } = useSelector((state) => state.wishlist);
//   const dispatch = useDispatch();

//   return (
//     <div className="p-6 max-w-6xl mx-auto">
//       <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
//         My Wishlist
//       </h2>
//       {wishlistItems.length === 0 ? (
//         <p className="text-center text-gray-500">Your wishlist is empty</p>
//       ) : (
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//           {wishlistItems.map((item) => (
//             <motion.div
//               key={item.id}
//               whileHover={{ scale: 1.05 }}
//               className="bg-white shadow-md rounded-lg overflow-hidden p-4 border border-gray-200"
//             >
//               <img
//                 src={item.image}
//                 alt={item.title}
//                 className="h-40 w-full object-contain"
//               />
//               <h3 className="text-lg font-semibold mt-2 text-gray-700">
//                 {item.title}
//               </h3>
//               <p className="text-gray-600 mt-1">${item.price}</p>
//               <button
//                 onClick={() => dispatch(removeFromWishlist(item.id))}
//                 className="mt-3 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg w-full transition-all"
//               >
//                 Remove
//               </button>
//             </motion.div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default Wishlist;
