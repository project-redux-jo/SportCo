// import { useState } from "react";

// export default function Contactus() {
//   const [darkMode, setDarkMode] = useState(false);

//     const [userData, setUserData] = useState({
//       Name: "",
//       Email: "",
//       Message:"",
//     });
// let name,value
//     const data =(e)=>{
//      name = e.target.name;
//      value=e.target.value;
// setUserData ( {...userData, [name]:value});

//     }

//     const send=async(e)=>{
//       const { Name, Email, Message } = userData;
//       e.preventDefault()
//       const option ='POST'
//       headers:{
//         'Content-type':'aplication/json'
//            boby:JSON.stringify({

//         Name, Email, Message
//       })
//       }
//   const res=fetch('')
//     }
//   return (
//     <div
//       className={
//         darkMode ? "dark bg-gray-900 text-white" : "bg-gray-100 text-gray-900"
//       }
//     >
//       <div className="xl:container mx-auto mb-32">
//         {/* زر التبديل بين الوضع الفاتح والداكن */}
//         <div className="flex justify-end p-4">
//           <button
//             onClick={() => setDarkMode(!darkMode)}
//             className="bg-gray-800 text-white px-4 py-2 rounded-lg dark:bg-gray-200 dark:text-gray-900"
//           >
//             {darkMode ? "Light Mode" : "Dark Mode"}
//           </button>
//         </div>

//         <div
//           className="flex justify-center items-center"
//           style={{
//             background:
//               "radial-gradient(circle, rgba(0, 0, 0, 1) 40%, rgba(128, 157, 60, 1) 100%)",
//             height: "250px",
//           }}
//         >
//           <h1 className="text-5xl sm:text-7xl text-white uppercase">Contact</h1>
//         </div>

//         <div className="flex justify-center px-4 my-10">
//           <div className="rounded-lg shadow-lg bg-white dark:bg-gray-800 -mt-24 py-10 md:py-12 px-6 md:px-8 w-full max-w-2xl">
//             <h2 className="text-2xl font-semibold text-gray-800 dark:text-white text-center mb-6">
//               Contact us
//             </h2>
//             <form className="space-y-6 ">
//               <div>
//                 <label className="text-gray-700 dark:text-gray-300 text-lg">
//                   Full Name
//                 </label>
//                 <input
//                   type="text"
//                   name="Name"
//                   value={userData.Name}
//                   className="w-full mt-2 p-4 text-lg h-14 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
//                   placeholder="Enter your name"
//                   onChange={data}
//                 />
//               </div>

//               <div>
//                 <label className="block text-gray-700 dark:text-gray-300 text-lg">
//                   Email
//                 </label>
//                 <input
//                   type="email"
//                   name="Email"
//                   value={userData.Email}
//                   className="w-full mt-2 p-4 text-lg h-14 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
//                   placeholder="example@email.com"
//                   onChange={data}
//                 />
//               </div>

//               <div>
//                 <label className="block text-gray-700 dark:text-gray-300 text-lg">
//                   Message
//                 </label>
//                 <textarea
//                   name="Message"
//                   value={userData.Message}
//                   rows="6"
//                   className="w-full mt-2 p-4 text-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
//                   placeholder="Write your message here..."
//                   onChange={data}
//                 ></textarea>
//               </div>

//               <button
//                 type="submit"
//                 className="w-full bg-green-600 text-white py-4 text-lg font-semibold rounded-lg hover:bg-green-700 transition duration-300"
//                 onClick={send}
//               >
//                 Send
//               </button>
//             </form>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
import { useState } from "react";
import axios from "axios";

export default function Contactus() {

  const [userData, setUserData] = useState({
    Name: "",
    Email: "",
    Message: "",
  });

  const data = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const send = async (e) => {
    e.preventDefault();
    const { Name, Email, Message } = userData;

    try {
      const response = await axios.post(
        "https://contact-d8d7d-default-rtdb.firebaseio.com/user.json",
        {
          Name,
          Email,
          Message,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        alert("Message sent successfully!");
        setUserData({ Name: "", Email: "", Message: "" });
      }
    } catch (error) {
      console.error("Error sending message:", error);
      alert("Failed to send message. Please try again later.");
    }
  };

  return (
    <div
   
    >
      <div className="xl:container mx-auto mb-32">
       
        <div
          className="flex justify-center items-center"
          style={{
            background:
              "radial-gradient(circle, rgba(0, 0, 0, 1) 40%, rgba(128, 157, 60, 1) 100%)",
            height: "250px",
          }}
        >
          <h1 className="text-5xl sm:text-7xl text-white uppercase">Contact</h1>
        </div>

        <div className="flex justify-center px-4 my-10">
          <div className="rounded-lg shadow-lg bg-white dark:bg-gray-800 -mt-24 py-10 md:py-12 px-6 md:px-8 w-full max-w-2xl">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-white text-center mb-6">
              Contact us
            </h2>
            <form className="space-y-6 ">
              <div>
                <label className="text-gray-700 dark:text-gray-300 text-lg">
                  Full Name
                </label>
                <input
                  type="text"
                  name="Name"
                  value={userData.Name}
                  className="w-full mt-2 p-4 text-lg h-14 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="Enter your name"
                  onChange={data}
                />
              </div>

              <div>
                <label className="block text-gray-700 dark:text-gray-300 text-lg">
                  Email
                </label>
                <input
                  type="email"
                  name="Email"
                  value={userData.Email}
                  className="w-full mt-2 p-4 text-lg h-14 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="example@email.com"
                  onChange={data}
                />
              </div>

              <div>
                <label className="block text-gray-700 dark:text-gray-300 text-lg">
                  Message
                </label>
                <textarea
                  name="Message"
                  value={userData.Message}
                  rows="6"
                  className="w-full mt-2 p-4 text-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="Write your message here..."
                  onChange={data}
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-green-600 text-white py-4 text-lg font-semibold rounded-lg hover:bg-green-700 transition duration-300"
                onClick={send}
              >
                Send
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
