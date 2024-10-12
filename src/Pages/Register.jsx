import { useState } from "react";

const Register = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    dob: "",
    address: "",
    phoneNumber: "",
    userEmail: "",
    userPassword: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    dob: "",
    address: "",
    phoneNumber: "",
    userEmail: "",
    userPassword: "",
    confirmPassword: "",
  });

  const validateForm = () => {
    let isValid = true;
    let errors = {};

    if (!formData.firstName) {
      errors.firstName = "First name is required";
      isValid = false;
    }

    if (!formData.lastName) {
      errors.lastName = "Last name is required";
      isValid = false;
    }

    if (!formData.dob) {
      errors.dob = "Date of birth is required";
      isValid = false;
    }

    if (!formData.address) {
      errors.address = "Address is required";
      isValid = false;
    }

    if (!formData.phoneNumber) {
      errors.phoneNumber = "Phone number is required";
      isValid = false;
    } else if (!/^\d{10,15}$/.test(formData.phoneNumber)) {
      errors.phoneNumber = "Invalid phone number";
      isValid = false;
    }

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

    if (formData.confirmPassword !== formData.userPassword) {
      errors.confirmPassword = "Passwords do not match";
      isValid = false;
    }

    setErrors(errors);
    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      fetch("http://localhost:5000/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
        });

      setFormData({
        firstName: "",
        lastName: "",
        dob: "",
        address: "",
        phoneNumber: "",
        userEmail: "",
        userPassword: "",
        confirmPassword: "",
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
      <div className="flex bg-gray-800 flex-col lg:mt-10 md:w-[600px] p-10 pb-4 pt-2 rounded-xl shadow-lg border border-gray-600">
        <div className="mb-4 text-center border-b-2 border-gray-600">
          <h1 className="my-2 text-4xl font-extrabold text-white">Register</h1>
        </div>
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-4 space-y-0">
          <div>
            <label className="block mb-2 text-sm text-gray-300">
              First Name
            </label>
            <input
              type="text"
              name="firstName"
              placeholder="Enter your first name"
              className="w-full px-3 py-2 border rounded-md border-gray-500 bg-gray-700 text-white"
              value={formData.firstName}
              onChange={handleInputChange}
            />
            {errors.firstName && (
              <small className="text-red-500">{errors.firstName}</small>
            )}
          </div>
          <div>
            <label className="block mb-2 text-sm text-gray-300">
              Last Name
            </label>
            <input
              type="text"
              name="lastName"
              placeholder="Enter your last name"
              className="w-full px-3 py-2 border rounded-md border-gray-500 bg-gray-700 text-white"
              value={formData.lastName}
              onChange={handleInputChange}
            />
            {errors.lastName && (
              <small className="text-red-500">{errors.lastName}</small>
            )}
          </div>
          <div>
            <label className="block mb-2 text-sm text-gray-300">
              Date of Birth
            </label>
            <input
              type="date"
              name="dob"
              className="w-full px-3 py-2 border rounded-md border-gray-500 bg-gray-700 text-white"
              value={formData.dob}
              onChange={handleInputChange}
            />
            {errors.dob && <small className="text-red-500">{errors.dob}</small>}
          </div>
          <div>
            <label className="block mb-2 text-sm text-gray-300">Address</label>
            <input
              type="text"
              name="address"
              placeholder="Enter your address"
              className="w-full px-3 py-2 border rounded-md border-gray-500 bg-gray-700 text-white"
              value={formData.address}
              onChange={handleInputChange}
            />
            {errors.address && (
              <small className="text-red-500">{errors.address}</small>
            )}
          </div>
          <div>
            <label className="block mb-2 text-sm text-gray-300">
              Phone Number
            </label>
            <input
              type="text"
              name="phoneNumber"
              placeholder="Enter your phone number"
              className="w-full px-3 py-2 border rounded-md border-gray-500 bg-gray-700 text-white"
              value={formData.phoneNumber}
              onChange={handleInputChange}
            />
            {errors.phoneNumber && (
              <small className="text-red-500">{errors.phoneNumber}</small>
            )}
          </div>
          <div>
            <label className="block mb-2 text-sm text-gray-300">
              Email address
            </label>
            <input
              type="email"
              name="userEmail"
              placeholder="Enter your email address"
              className="w-full px-3 py-2 border rounded-md border-gray-500 bg-gray-700 text-white"
              value={formData.userEmail}
              onChange={handleInputChange}
            />
            {errors.userEmail && (
              <small className="text-red-500">{errors.userEmail}</small>
            )}
          </div>
          <div>
            <label className="block mb-2 text-sm text-gray-300">Password</label>
            <input
              type="password"
              name="userPassword"
              placeholder="Enter your password"
              className="w-full px-3 py-2 border rounded-md border-gray-500 bg-gray-700 text-white"
              value={formData.userPassword}
              onChange={handleInputChange}
            />
            {errors.userPassword && (
              <small className="text-red-500">{errors.userPassword}</small>
            )}
          </div>
          <div>
            <label className="block mb-2 text-sm text-gray-300">
              Confirm Password
            </label>
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm your password"
              className="w-full px-3 py-2 border rounded-md border-gray-500 bg-gray-700 text-white"
              value={formData.confirmPassword}
              onChange={handleInputChange}
            />
            {errors.confirmPassword && (
              <small className="text-red-500">{errors.confirmPassword}</small>
            )}
          </div>
          <div className="md:col-span-2 pt-1">
            <button
              type="submit"
              className="w-full px-8 btn transition-colors duration-300 transform py-2 bg-green-600 hover:bg-green-700 text-white rounded-md text-xl shadow-md hover:shadow-lg">
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
