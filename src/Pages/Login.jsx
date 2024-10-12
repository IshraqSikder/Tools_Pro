import { useState } from "react";
import { IoEye, IoEyeOff } from "react-icons/io5";

const Login = () => {
  const [show, setShow] = useState(false);
  const [formData, setFormData] = useState({
    userEmail: "",
    userPassword: "",
  });
  const [errors, setErrors] = useState({
    userEmail: "",
    userPassword: "",
  });

  const togglePasswordVisibility = () => {
    setShow(!show);
  };

  const validateForm = () => {
    let isValid = true;
    let errors = {};

    if (!formData.userEmail) {
      errors.userEmail = "Email is required";
      isValid = false;
    } else if (
      !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(
        formData.userEmail
      )
    ) {
      errors.userEmail = "Invalid Email";
      isValid = false;
    }

    if (!formData.userPassword) {
      errors.userPassword = "Password is required";
      isValid = false;
    } else if (formData.userPassword.length < 6) {
      errors.userPassword = "Password must be at least 6 characters";
      isValid = false;
    } else if (!/^(?=.*[a-z])(?=.*[A-Z])/.test(formData.userPassword)) {
      errors.userPassword =
        "At least one lowercase letter and one uppercase letter";
      isValid = false;
    }

    setErrors(errors);
    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      fetch("http://localhost:5000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userEmail: formData.userEmail,
          userPassword: formData.userPassword,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
        });

      setFormData({
        userEmail: "",
        userPassword: "",
      });
    }
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="flex items-center justify-center min-h-[80vh] bg-gradient-to-b from-gray-900 via-gray-800 to-gray-700">
      <div className="flex bg-gray-800 flex-col lg:mt-10 md:w-[450px] p-10 pb-4 pt-2 rounded-xl shadow-lg border border-gray-600">
        <div className="mb-4 text-center border-b-2 border-gray-600">
          <h1 className="my-2 text-4xl font-extrabold text-white">Login</h1>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <div>
              <label
                htmlFor="email"
                className="block mb-2 text-sm text-gray-300">
                Email address
              </label>
              <input
                type="email"
                name="userEmail"
                id="email"
                placeholder="Enter your email address"
                className="w-full outline-none px-3 py-2 border rounded-md border-gray-500 bg-gray-700 text-white focus:border-blue-500"
                value={formData.userEmail}
                onChange={handleInputChange}
              />
              {errors.userEmail && (
                <small className="text-red-500 font-bold">
                  {errors.userEmail}
                </small>
              )}
            </div>
            <div>
              <div className="flex justify-between mb-2">
                <label htmlFor="password" className="text-sm text-gray-300">
                  Password
                </label>
              </div>
              <div className="relative">
                <input
                  type={show ? "text" : "password"}
                  name="userPassword"
                  placeholder="Enter your password"
                  className="w-full px-3 py-2 outline-none border rounded-md border-gray-500 bg-gray-700 text-white focus:border-blue-500"
                  value={formData.userPassword}
                  onChange={handleInputChange}
                />
                <span
                  onClick={togglePasswordVisibility}
                  className="absolute right-[2%] top-[31%] cursor-pointer text-gray-300">
                  {!show ? <IoEyeOff size={20} /> : <IoEye size={20} />}
                </span>
              </div>
              {errors.userPassword && (
                <small className="text-red-500 font-bold">
                  {errors.userPassword}
                </small>
              )}
            </div>
          </div>
          <div className="pt-1">
            <button
              type="submit"
              className="w-full px-8 btn transition-colors duration-300 transform py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md text-xl shadow-md hover:shadow-lg">
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
