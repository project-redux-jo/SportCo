// import React, { useState } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { sendPaymentData } from '../../redux/paymentSlice'; // Import the action
// import Swal from 'sweetalert2';

// function PaymentForm() {
//   const user = useSelector((state) => state.auth.user);
//   const selectedStadium = useSelector((state) => state.courtInfo.selectedCourt);
//   const selectedDate = useSelector((state) => state.payment.paymentData); 
  

//   const dispatch = useDispatch();
  
//   const [formData, setFormData] = useState({
//     cardNumber: "",
//     expirationDate: "",
//     ccv: "",
//     date: "",
//   });

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: value,
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
    
//     const paymentDetails = {
//       fullName: user?.fullName,
//       email: user?.email,
//       pitchName: selectedStadium.name,
//       location: selectedStadium.location,
//       date: formData.date,
//       cardNumber: formData.cardNumber,
//       expirationDate: formData.expirationDate,
//       ccv: formData.ccv,
//       price: selectedStadium.price,
//       stadiumId:selectedStadium.id, 
//       status:"approved",
//     };
  
//     dispatch(sendPaymentData(paymentDetails)); 
  
//     await Swal.fire({
//       title: 'Payment Successful!',
//       text: `The court  ${selectedStadium.name} is booked`,
//       icon: 'success',
//       confirmButtonText: 'OK'
//     });
//   };
  


//   return (
//     <div className="min-h-screen  flex flex-col justify-center items-center ">
//       <div className="flex flex-col md:flex-row max-w-7xl w-full bg-white shadow-xl  overflow-hidden mx-4">
//         <div className="hidden md:block md:w-1/2 relative">
//           <div className="absolute inset-0 bg-black/40 z-10" />
//           <img
//             src="https://thumbs.dreamstime.com/b/soccer-football-ground-2988395.jpg"
//             alt="Football Field"
//             className="h-full w-full object-cover"
//           />
//           <div className="absolute inset-0 z-20 flex flex-col justify-center items-center text-white p-8">
//             <h1 className="text-4xl font-bold mb-4">Book Your Perfect Pitch</h1>
//             <p className="text-lg text-center">Experience world-class facilities for your football matches</p>
//           </div>
//         </div>

//         <div className="w-full md:w-1/2 p-8">
//           <h2 className="text-3xl font-bold mb-8 text-gray-800 border-b pb-4">
//             Reserve Your Football Pitch
//           </h2>

//           <form onSubmit={handleSubmit} className="space-y-6">
//             <div className="space-y-4">
//               <h3 className="text-xl font-semibold text-gray-700">Personal Information</h3>
//               <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
//                 <div>
//                   <label htmlFor="FullName" className="block text-sm font-medium text-gray-700 mb-1">
//                    Full Name
//                   </label>
//                   <div className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 focus:outline-none transition-colors"
//                   > {user?.fullName}</div>
//                 </div>
//               </div>
//               <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
//                 <div>
//                   <label htmlFor="FullName" className="block text-sm font-medium text-gray-700 mb-1">
//                    Email
//                   </label>
//                   <input
//                     type="text"
//                     id="Email"
//                     name="Email"
//                     value={user?.email}
//                     onChange={handleInputChange}
//                     required
//                     className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 focus:outline-none transition-colors"
//                   />
//                 </div>
//               </div>
//             </div>

//             <div className="space-y-4">
//               <h3 className="text-xl font-semibold text-gray-700">Booking Details</h3>
//               <div className="space-y-4">
//                 <div>
//                   <label htmlFor="courtName" className="block text-sm font-medium text-gray-700 mb-1">
//                     Court Name
//                   </label>
//                   <div className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 focus:outline-none transition-colors"
//                   > {selectedStadium.name}</div>
//                 </div>
//                 <div>
//                   <label htmlFor="courtName" className="block text-sm font-medium text-gray-700 mb-1">
//                     Court location
//                   </label>
//                   <div className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 focus:outline-none transition-colors"
//                   > {selectedStadium.location}</div>
//                 </div>
//                 <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
//                   <div>
//                     <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">
//                       Reservation Date
//                     </label>
//                     <input
//                       type="date"
//                       id="date"
//                       name="date"
//                       value={formData.date}
//                       onChange={handleInputChange}
//                       required
//                       className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 focus:outline-none transition-colors"
//                     />
//                   </div>
//                 </div>
//               </div>
//             </div>

//             <div className="space-y-4">
//               <h3 className="text-xl font-semibold text-gray-700">Payment Details</h3>
//               <div className="space-y-4">
//                 <div>
//                   <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700 mb-1">
//                     Card Number
//                   </label>
//                   <input
//                     type="text"
//                     id="cardNumber"
//                     name="cardNumber"
//                     value={formData.cardNumber}
//                     onChange={handleInputChange}
//                     required
//                     maxLength="16"
//                     placeholder="1234 5678 9101 1121"
//                     className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 focus:outline-none transition-colors"
//                   />
//                 </div>
//                 <div className="grid grid-cols-2 gap-4">
//                   <div>
//                     <label htmlFor="expirationDate" className="block text-sm font-medium text-gray-700 mb-1">
//                       Expiration Date
//                     </label>
//                     <input
//                       type="text"
//                       id="expirationDate"
//                       name="expirationDate"
//                       value={formData.expirationDate}
//                       onChange={handleInputChange}
//                       required
//                       placeholder="MM/YY"
//                       className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 focus:outline-none transition-colors"
//                     />
//                   </div>
//                   <div>
//                     <label htmlFor="ccv" className="block text-sm font-medium text-gray-700 mb-1">
//                       CCV
//                     </label>
//                     <input
//                       type="text"
//                       id="ccv"
//                       name="ccv"
//                       value={formData.ccv}
//                       onChange={handleInputChange}
//                       required
//                       maxLength="3"
//                       placeholder="123"
//                       className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 focus:outline-none transition-colors"
//                     />
//                   </div>
//                 </div>
//               </div>
//             </div>


//             <div className="bg-gray-50 p-4 rounded-lg">
//               <p className="text-xl font-semibold text-gray-800 flex justify-between items-center">
//                 Total Amount: <span className="text-green-600">JD {selectedStadium.price}</span>
//               </p>
//             </div>

//             <button
//               type="submit"
//               className="w-full bg-green-600 text-white font-bold py-4 px-6 rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors"
//             >
//               Confirm Booking
//             </button>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default PaymentForm;



//////////////////
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { sendPaymentData } from '../../redux/paymentSlice';
import Swal from 'sweetalert2';
import emailjs from 'emailjs-com';

// دالة لإرسال البريد الإلكتروني
const sendEmail = (paymentDetails) => {
  const templateParams = {
    user_full_name: paymentDetails.fullName,
    user_email: paymentDetails.email,
    booking_date: paymentDetails.date,
    amount_paid: paymentDetails.price,
  };

  emailjs
    .send('service_csffxii', 'template_csffxii', templateParams, 'ySR76x2yYBeK64hYF3CbNLo')
    .then(
      (response) => {
        console.log('Email sent successfully:', response);
      },
      (error) => {
        console.error('Email sending failed:', error);
      }
    );
};

function PaymentForm() {
  const user = useSelector((state) => state.auth.user);
  const selectedStadium = useSelector((state) => state.courtInfo.selectedCourt);
  const dispatch = useDispatch();
  
  const [formData, setFormData] = useState({
    cardNumber: "",
    expirationDate: "",
    ccv: "",
    date: "",
  });

  // دالة لتحديث القيم عند تغيير المدخلات
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // دوال للتحقق من صحة البيانات المدخلة
  const validateCardNumber = (cardNumber) => {
    const regex = /^\d{16}$/;
    return regex.test(cardNumber);
  };

  const validateExpirationDate = (expirationDate) => {
    const currentDate = new Date();
    const [month, year] = expirationDate.split('/').map((item) => parseInt(item, 10));
    const expiration = new Date(`20${year}-${month < 10 ? '0' : ''}${month}-01`);
    return expiration > currentDate;
  };

  const validateCCV = (ccv) => {
    const regex = /^\d{3}$/;
    return regex.test(ccv);
  };

  const validateDate = (date) => {
    const currentDate = new Date();
    const inputDate = new Date(date);
    return inputDate >= currentDate;
  };

  // دالة لمعالجة عملية الدفع
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateCardNumber(formData.cardNumber)) {
      Swal.fire({
        title: 'Invalid Card Number',
        text: 'Please enter a valid 16-digit card number.',
        icon: 'error',
        confirmButtonText: 'OK',
      });
      return;
    }

    if (!validateExpirationDate(formData.expirationDate)) {
      Swal.fire({
        title: 'Invalid Expiration Date',
        text: 'The expiration date must be a future date.',
        icon: 'error',
        confirmButtonText: 'OK',
      });
      return;
    }

    if (!validateCCV(formData.ccv)) {
      Swal.fire({
        title: 'Invalid CCV',
        text: 'Please enter a valid 3-digit CCV.',
        icon: 'error',
        confirmButtonText: 'OK',
      });
      return;
    }

    if (!validateDate(formData.date)) {
      Swal.fire({
        title: 'Invalid Date',
        text: 'Please select a date that is not in the past.',
        icon: 'error',
        confirmButtonText: 'OK',
      });
      return;
    }

    // بيانات الدفع بعد التحقق
    const paymentDetails = {
      fullName: user?.fullName,
      email: user?.email,
      pitchName: selectedStadium.name,
      location: selectedStadium.location,
      date: formData.date,
      cardNumber: formData.cardNumber,
      expirationDate: formData.expirationDate,
      ccv: formData.ccv,
      price: selectedStadium.price,
    };

    // إرسال البيانات إلى الريدوكس
    dispatch(sendPaymentData(paymentDetails));

    // إرسال بريد إلكتروني
    await sendEmail(paymentDetails);

    // عرض رسالة النجاح
    await Swal.fire({
      title: 'Payment Successful!',
      text: `The court ${selectedStadium.name} is booked.`,
      icon: 'success',
      confirmButtonText: 'OK'
    });
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center">
      <div className="flex flex-col md:flex-row max-w-7xl w-full bg-white shadow-xl overflow-hidden mx-4">
        <div className="hidden md:block md:w-1/2 relative">
          <div className="absolute inset-0 bg-black/40 z-10" />
          <img
            src="https://thumbs.dreamstime.com/b/soccer-football-ground-2988395.jpg"
            alt="Football Field"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 z-20 flex flex-col justify-center items-center text-white p-8">
            <h1 className="text-4xl font-bold mb-4">Book Your Perfect Pitch</h1>
            <p className="text-lg text-center">Experience world-class facilities for your football matches</p>
          </div>
        </div>

        <div className="w-full md:w-1/2 p-8">
          <h2 className="text-3xl font-bold mb-8 text-gray-800 border-b pb-4">
            Reserve Your Football Pitch
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-gray-700">Personal Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
                <div>
                  <label htmlFor="FullName" className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name
                  </label>
                  <div className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 focus:outline-none transition-colors">
                    {user?.fullName}
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
                <div>
                  <label htmlFor="Email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <input
                    type="text"
                    id="Email"
                    name="Email"
                    value={user?.email}
                    onChange={handleInputChange}
                    required
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 focus:outline-none transition-colors"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-gray-700">Booking Details</h3>
              <div className="space-y-4">
                <div>
                  <label htmlFor="courtName" className="block text-sm font-medium text-gray-700 mb-1">
                    Court Name
                  </label>
                  <div className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 focus:outline-none transition-colors">
                    {selectedStadium.name}
                  </div>
                </div>
                <div>
                  <label htmlFor="courtLocation" className="block text-sm font-medium text-gray-700 mb-1">
                    Court Location
                  </label>
                  <div className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 focus:outline-none transition-colors">
                    {selectedStadium.location}
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
                  <div>
                    <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">
                      Reservation Date
                    </label>
                    <input
                      type="date"
                      id="date"
                      name="date"
                      value={formData.date}
                      onChange={handleInputChange}
                      required
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 focus:outline-none transition-colors"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-gray-700">Payment Details</h3>
              <div className="space-y-4">
                <div>
                  <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700 mb-1">
                    Card Number
                  </label>
                  <input
                    type="text"
                    id="cardNumber"
                    name="cardNumber"
                    value={formData.cardNumber}
                    onChange={handleInputChange}
                    maxLength="16"
                    required
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 focus:outline-none transition-colors"
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="expirationDate" className="block text-sm font-medium text-gray-700 mb-1">
                      Expiration Date (MM/YY)
                    </label>
                    <input
                      type="text"
                      id="expirationDate"
                      name="expirationDate"
                      value={formData.expirationDate}
                      onChange={handleInputChange}
                      maxLength="5"
                      required
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 focus:outline-none transition-colors"
                    />
                  </div>
                  <div>
                    <label htmlFor="ccv" className="block text-sm font-medium text-gray-700 mb-1">
                      CCV
                    </label>
                    <input
                      type="text"
                      id="ccv"
                      name="ccv"
                      value={formData.ccv}
                      onChange={handleInputChange}
                      maxLength="3"
                      required
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 focus:outline-none transition-colors"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-center">
              <button
                type="submit"
                className="py-3 px-6 bg-green-500 text-white text-lg font-bold rounded-md w-full"
              >
                Complete Payment
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default PaymentForm;