// import React, { useContext, useState } from "react";
// import { useFormik } from "formik";
// import * as Yup from "yup";
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import { FallingLines } from 'react-loader-spinner';
// import { UserContext } from "../../Context/UserContext";
// import image from '../../Assets/images/signin-DlR7P608.png';
// import { FaEye, FaEyeSlash } from "react-icons/fa"; // استيراد الأيقونات

// export default function Login() {
//   const [showPassword, setShowPassword] = useState(false);
//   let navigate = useNavigate();
//   const [error, setError] = useState(null);
//   const [isLoading, setIsLoading] = useState(false);
//   let { setUserToken, setUserDetails } = useContext(UserContext);

//   async function loginSubmit(values) {
//     setIsLoading(true);
//     let { data } = await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signin`, values)
//       .catch((err) => {
//         setError(err.response.data.message);
//         setIsLoading(false);
//       });

//     if (data.message === "success") {
//       navigate("/");
//       localStorage.setItem('userToken', data.token);
//       setIsLoading(false);
//       setUserToken(data.token);
//       localStorage.setItem('userDetails', JSON.stringify(data.user));
//       setUserDetails(data.user);
//     }
//   }

//   let validationSchema = Yup.object({
//     email: Yup.string()
//       .email("Invalid email format")
//       .required("Email is required"),
//     password: Yup.string()
//       .matches(/^[A-Za-z][a-zA-Z0-9]{5,10}$/, "Password must start with a letter and be 6-11 characters long")
//       .required("Password is required"),
//   });

//   let formik = useFormik({
//     initialValues: {
//       email: "",
//       password: "",
//     },
//     validationSchema,
//     onSubmit: loginSubmit,
//   });

//   return (
//     <>
//       <div className="container pt-5">
//         <div className="row align-content-center justify-content-center ">
//           <div className="col-md-5 ">
//             <img src={image} alt="img" className="w-100" />
//           </div>
//           <div className="col-md-5">
//             <div className="mx-auto py-5">
//               <h3 className="pt-5 text-gray-900 fw-bolder">Sign in to FreshCart</h3>
//               <p className="text-gray-900p fw-bolder">Welcome back to FreshCart! Enter your email to get started.</p>

//               {error ? <div className="alert alert-danger p-2 mt-2">{error}</div> : null}

//               <form onSubmit={formik.handleSubmit}>
//                 {/* Email Input */}
//                 <label htmlFor="email" className="text-gray-900p fw-bolder py-2">Email</label>
//                 <input
//                   type="email"
//                   name="email"
//                   onBlur={formik.handleBlur}
//                   onChange={formik.handleChange}
//                   value={formik.values.email}
//                   className="form-control mb-2"
//                   id="email"
//                 />
//                 {formik.errors.email && formik.touched.email ? (
//                   <div className="alert alert-danger p-2 mt-2">{formik.errors.email}</div>
//                 ) : null}

//                 {/* Password Input with Eye Icon */}
//                 <label htmlFor="password" className="text-gray-900p fw-bolder py-2">Password</label>
//                 <div className="input-group mb-3">
//                   <input
//                     type={showPassword ? "text" : "password"}
//                     name="password"
//                     onBlur={formik.handleBlur}
//                     onChange={formik.handleChange}
//                     value={formik.values.password}
//                     className="form-control border-end-0"
//                     id="password"
//                   />
//                   <i
//                     type="button"
//                     className="btn border-0 border-end border-bottom border-top   "
//                     onClick={() => setShowPassword(!showPassword)}
//                   >
//                     {showPassword ? <FaEye /> : <FaEyeSlash />}
//                   </i>
//                 </div>
//                 {formik.errors.password && formik.touched.password ? (
//                   <div className="alert alert-danger p-2 mb-4">{formik.errors.password}</div>
//                 ) : null}

//                 {/* Submit Button */}
//                 {isLoading ? (
//                   <button className="btn bg-main text-white w-100 mt-4">
//                     <FallingLines color="#fff" width="20" visible={true} ariaLabel="falling-circles-loading" />
//                   </button>
//                 ) : (
//                   <button
//                     disabled={!(formik.isValid && formik.dirty)}
//                     type="submit"
//                     className="btn bg-main ps-1 text-white w-100"
//                   >
//                     Sign In
//                   </button>
//                 )}

//                 {/* Register Button */}
//                 <div className="mt-3 align-content-center">
//                   <p className="text-gray-900p fw-bolder py-2">
//                     You don't have an account?    
//                     <button
//                       type="button"
//                       className="btn bg-transparent text-main fw-bold px-1"
//                       onClick={() => navigate("/register")}
//                     >
//                       Sign Up
//                     </button>
//                   </p>
//                 </div>
//               </form>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }


import React, { useContext, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FallingLines } from 'react-loader-spinner';
import { UserContext } from "../../Context/UserContext";
import image from '../../Assets/images/signin-DlR7P608.png';
import { FaEye, FaEyeSlash } from "react-icons/fa"; // استيراد الأيقونات

export default function Login() {




   let navigate = useNavigate();
   const [error, setError]=useState(null);
  const[isLoading,setIsLoading]=useState(false);
  const[showPassword,setShowPassword]=useState(false);


  let {setUserToken,setUserDetails}=useContext(UserContext)

    async function loginSubmit(values){
        setIsLoading(true)
      let {data}= await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signin`,values)
      .catch((err)=> setError(err.response.data.message))
      
      if (data.message === 'success') {
        navigate("/");
        localStorage.setItem('userToken',data.token)
        setUserToken(data.token)
        setIsLoading(false)
        localStorage.setItem('userDetails', JSON.stringify(data.user));
        setUserDetails(data.user)
      }
    }

      let validationSchema=Yup.object({

        email:Yup.string().email("Invalid email format").required("Email is required"),
        password:Yup.string().matches(/^[A-Za-z][a-zA-Z0-9]{5,10}$/, "Password must start with a letter and be 6-11 characters long").required("Password is required"),
      })


      let formik = useFormik({
        initialValues:{
          email:"",
          password:"",
        },validationSchema,
         onSubmit:loginSubmit,
      })

   




  return (
    <>
      <div className="container pt-5">
        <div className="row align-content-center justify-content-center ">
          <div className="col-md-5 ">
            <img src={image} alt="img" className="w-100" />
          </div>
          <div className="col-md-5">
            <div className="mx-auto py-5">
              <h3 className="pt-5 text-gray-900 fw-bolder">Sign in to FreshCart</h3>
              <p className="text-gray-900p fw-bolder">Welcome back to FreshCart! Enter your email to get started.</p>

              {error ? <div className="alert alert-danger p-2 mt-2">{error}</div> : null}

              <form onSubmit={formik.handleSubmit}>
                {/* Email Input */}
                <label htmlFor="email" className="text-gray-900p fw-bolder py-2">Email</label>
                <input
                  type="email"
                  name="email"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.email}
                  className="form-control mb-2"
                  id="email"
                />
                {formik.errors.email && formik.touched.email ? (
                  <div className="alert alert-danger p-2 mt-2">{formik.errors.email}</div>
                ) : null}

                {/* Password Input with Eye Icon */}
                <label htmlFor="password" className="text-gray-900p fw-bolder py-2">Password</label>
                <div className="input-group mb-3">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    value={formik.values.password}
                    className="form-control border-end-0"
                    id="password"
                  />
                  <i
                    type="button"
                    className="btn border-0 border-end border-bottom border-top   "
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <FaEye /> : <FaEyeSlash />}
                  </i>
                </div>
                {formik.errors.password && formik.touched.password ? (
                  <div className="alert alert-danger p-2 mb-4">{formik.errors.password}</div>
                ) : null}

                {/* Submit Button */}
                {isLoading ? (
                  <button className="btn bg-main text-white w-100 mt-4">
                    <FallingLines color="#fff" width="20" visible={true} ariaLabel="falling-circles-loading" />
                  </button>
                ) : (
                  <button
                    disabled={!(formik.isValid && formik.dirty)}
                    type="submit"
                    className="btn bg-main ps-1 text-white w-100"
                  >
                    Sign In
                  </button>
                )}

                {/* Register Button */}
                <div className="mt-3 align-content-center">
                  <p className="text-gray-900p fw-bolder py-2">
                    You don't have an account?    
                    <button
                      type="button"
                      className="btn bg-transparent text-main fw-bold px-1"
                      onClick={() => navigate("/register")}
                    >
                      Sign Up
                    </button>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

   