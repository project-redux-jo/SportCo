// import React, { useState, useEffect } from "react";
// import axios from "axios";

// const PropertyManagement = () => {
//   // State to manage properties
//   const [properties, setProperties] = useState([]);

//   // State for the form inputs
//   const [formData, setFormData] = useState({
//     name: "",
//     description: "",
//     location: "",
//     price: "",
//     image: "",
//   });

//   // State to track if we're editing a property
//   const [editingId, setEditingId] = useState(null);

//   // Fetch properties from the backend on component mount
//   useEffect(() => {
//     fetchProperties();
//   }, []);

//   // Fetch properties from the backend
//   const fetchProperties = async () => {
//     try {
//       const response = await axios.get("http://localhost:5000/api/properties");
//       setProperties(response.data);
//     } catch (error) {
//       console.error("Error fetching properties:", error);
//     }
//   };

//   // Handle form input changes
//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: value,
//     });
//   };

//   // Handle form submission (add or update property)
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       if (editingId !== null) {
//         // Update existing property
//         await axios.put(`http://localhost:5000/api/properties/${editingId}`, formData);
//         const updatedProperties = properties.map((property) =>
//           property.id === editingId ? { ...property, ...formData } : property
//         );
//         setProperties(updatedProperties);
//         setEditingId(null);
//       } else {
//         // Add new property
//         const response = await axios.post("http://localhost:5000/api/properties", formData);
//         setProperties([...properties, response.data]);
//       }

//       // Clear the form
//       setFormData({
//         name: "",
//         description: "",
//         location: "",
//         price: "",
//         image: "",
//         status:"pending"
//         ,landlordId: ""
//       });
//     } catch (error) {
//       console.error("Error saving property:", error);
//     }
//   };

//   // Handle editing a property
//   const handleEdit = (id) => {
//     const propertyToEdit = properties.find((property) => property.id === id);
//     if (propertyToEdit) {
//       setFormData(propertyToEdit);
//       setEditingId(id);
//     }
//   };

//   // Handle deleting a property
//   const handleDelete = async (id) => {
//     try {
//       await axios.delete(`http://localhost:5000/api/properties/${id}`);
//       const updatedProperties = properties.filter((property) => property.id !== id);
//       setProperties(updatedProperties);
//     } catch (error) {
//       console.error("Error deleting property:", error);
//     }
//   };

//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-4">Property Management</h1>

//       {/* Add/Edit Property Form */}
//       <form onSubmit={handleSubmit} className="mb-6">
//         <div className="grid grid-cols-1 gap-4">
//           <input
//             type="text"
//             name="name"
//             placeholder="Property Name"
//             value={formData.name}
//             onChange={handleInputChange}
//             className="p-2 border rounded"
//             required
//           />
//           <input
//             type="text"
//             name="description"
//             placeholder="Description"
//             value={formData.description}
//             onChange={handleInputChange}
//             className="p-2 border rounded"
//             required
//           />
//           <input
//             type="text"
//             name="location"
//             placeholder="Location"
//             value={formData.location}
//             onChange={handleInputChange}
//             className="p-2 border rounded"
//             required
//           />
//           <input
//             type="number"
//             name="price"
//             placeholder="Price"
//             value={formData.price}
//             onChange={handleInputChange}
//             className="p-2 border rounded"
//             required
//           />
//           <input
//             type="text"
//             name="image"
//             placeholder="Image URL"
//             value={formData.image}
//             onChange={handleInputChange}
//             className="p-2 border rounded"
//             required
//           />

//         </div>
//         <button
//           type="submit"
//           className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
//         >
//           {editingId !== null ? "Update Property" : "Add Property"}
//         </button>
//       </form>

//       {/* List of Properties */}
//       <div>
//         <h2 className="text-xl font-bold mb-4">Your Properties</h2>
//         {properties.length === 0 ? (
//           <p>No properties added yet.</p>
//         ) : (
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//             {properties.map((property) => (
//               <div
//                 key={property.id}
//                 className="border p-4 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
//               >
//                 <img
//                   src={property.image}
//                   alt={property.name}
//                   className="w-full h-48 object-cover rounded-lg mb-4"
//                 />
//                 <h3 className="text-lg font-semibold">{property.name}</h3>
//                 <p className="text-gray-600">{property.description}</p>
//                 <p className="text-gray-800 font-bold">${property.price}/night</p>
//                 <p className="text-gray-600">{property.location}</p>
//                 <div className="mt-4 flex space-x-2">
//                   <button
//                     onClick={() => handleEdit(property.id)}
//                     className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
//                   >
//                     Edit
//                   </button>
//                   <button
//                     onClick={() => handleDelete(property.id)}
//                     className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
//                   >
//                     Delete
//                   </button>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default PropertyManagement;

////////////////////////////////////////


import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector,useDispatch } from "react-redux";
import api from "../../api";
import { fetchStadiums ,fetchselectedCourt,addStaduim} from '../../redux/StaduimsSlice';

const PropertyManagement = () => {
    const FinalStadiums=useSelector((state)=>state.courtInfo.courts);
  // Get the current user from Redux store
  const currentUser = useSelector((state) => state.Land.user);

  // State to manage properties
  const [properties, setProperties] = useState(FinalStadiums);
  const [editingId, setEditingId] = useState(null);
  const dispatch=useDispatch();
  // State for the form inputs
  useEffect(() => {
    setProperties(FinalStadiums);
  }, [FinalStadiums]);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    location: "",
    price: "",
    image: "",
    status: "pending",
    landlordId: currentUser ? currentUser.uid : "", // Set landlordId from Redux store
  });
  
  // Update landlordId when currentUser changes
//   useEffect(() => {
//     if (currentUser) {
//       setFormData((prevData) => ({
//         ...prevData,
//         landlordId: currentUser.uid,
//       }));
//     }
//   }, [currentUser]);

  // Fetch properties from the backend on component mount
//   useEffect(() => {
//     fetchProperties();
//   }, []);

  // Fetch properties from the backend
//   const fetchProperties = async () => {
//     try {
//       const response = await api.get("/bb");
//       setProperties(response.data);
//     } catch (error) {
//       console.error("Error fetching properties:", error);
//     }
//   };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle form submission (add or update property)
  const handleSubmit = async (e) => {
    e.preventDefault();
    const newStadium = {
        ...formData,
        available: "No",
        isPaid: false,
        landLordId: currentUser ? currentUser.uid : ""
    };
  dispatch(addStaduim(newStadium));


console.log(FinalStadiums)
   
try {
    // **إرسال البيانات إلى Firebase**
    const response = await axios.post(
        "https://redux-project-791e5-default-rtdb.firebaseio.com/Stadiums.json",
        newStadium
    );

    if (response.status === 200) {
        console.log("✅ الملعب تم حفظه في Firebase:", response.data);

        // **إضافة الملعب إلى Redux بعد الحفظ**
        dispatch(addStaduim(newStadium));
    }

    // **إعادة تعيين النموذج بعد الإضافة**
    setFormData({
        name: "",
        description: "",
        location: "",
        price: "",
        image: "",
        status: "pending",
        landlordId: currentUser ? currentUser.uid : "",
    });
} catch (error) {
    console.error("❌ فشل حفظ الملعب في Firebase:", error);
}
  };

  // Handle editing a property
//   const handleEdit = (id) => {
//     const propertyToEdit = properties.find((property) => property.id === id);
//     if (propertyToEdit) {
//       setFormData(propertyToEdit);
//       setEditingId(id);
//     }
//   };

  // Handle deleting a property
//   const handleDelete = async (id) => {
//     try {
//       await axios.delete(`/bb/${id}`);
//       const updatedProperties = properties.filter((property) => property.id !== id);
//       setProperties(updatedProperties);
//     } catch (error) {
//       console.error("Error deleting property:", error);
//     }
//   };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Property Management</h1>

      {/* Add/Edit Property Form */}
      <form  className="mb-6" onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 gap-4">
          <input
            type="text"
            name="name"
            placeholder="Property Name"
            value={formData.name}
            onChange={handleInputChange}
            className="p-2 border rounded"
            required
          />
          <input
            type="text"
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleInputChange}
            className="p-2 border rounded"
            required
          />
          <input
            type="text"
            name="location"
            placeholder="Location"
            value={formData.location}
            onChange={handleInputChange}
            className="p-2 border rounded"
            required
          />
          <input
            type="number"
            name="price"
            placeholder="Price"
            value={formData.price}
            onChange={handleInputChange}
            className="p-2 border rounded"
            required
          />
          <input
            type="text"
            name="image"
            placeholder="Image URL"
            value={formData.image}
            onChange={handleInputChange}
            className="p-2 border rounded"
            required
          />
        </div>
        <button
          type="submit"
        //   onClick={()=>handleSubmit(formData)}
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          {editingId !== null ? "Update Property" : "Add Property"}
        </button>
      </form>

      {/* List of Properties */}
      {/* <div>
        <h2 className="text-xl font-bold mb-4">Your Properties</h2>
        {properties.length === 0 ? (
          <p>No properties added yet.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {properties.map((property) => (
              <div
                key={property.id}
                className="border p-4 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <img
                  src={property.image}
                  alt={property.name}
                  className="w-full h-48 object-cover rounded-lg mb-4"
                />
                <h3 className="text-lg font-semibold">{property.name}</h3>
                <p className="text-gray-600">{property.description}</p>
                <p className="text-gray-800 font-bold">${property.price}/night</p>
                <p className="text-gray-600">{property.location}</p>
                <div className="mt-4 flex space-x-2">
                  <button
                    onClick={() => handleEdit(property.id)}
                    className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(property.id)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div> */}
    </div>
  );
};

export default PropertyManagement;