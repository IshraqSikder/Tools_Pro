import { useState, useEffect } from "react";

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

  const [errors, setErrors] = useState({});
  const [users, setUsers] = useState([]);

  const validateForm = () => {
    let isValid = true;
    let errors = {};

    // Validation logic
    if (!formData.firstName) errors.firstName = "First name is required";
    if (!formData.lastName) errors.lastName = "Last name is required";
    if (!formData.dob) errors.dob = "Date of birth is required";
    if (!formData.address) errors.address = "Address is required";
    if (!formData.phoneNumber) errors.phoneNumber = "Phone number is required";
    else if (!/^\d{10,15}$/.test(formData.phoneNumber))
      errors.phoneNumber = "Invalid phone number";

    if (!formData.userEmail) errors.userEmail = "Email is required";
    else if (
      !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(
        formData.userEmail
      )
    )
      errors.userEmail = "Invalid email";

    if (!formData.userPassword) errors.userPassword = "Password is required";
    else if (formData.userPassword.length < 6)
      errors.userPassword = "Password must be at least 6 characters";
    else if (!/^(?=.*[a-z])(?=.*[A-Z])/.test(formData.userPassword))
      errors.userPassword =
        "At least one lowercase letter and one uppercase letter";

    if (formData.confirmPassword !== formData.userPassword)
      errors.confirmPassword = "Passwords do not match";

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      fetch("http://localhost:5000/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })
        .then((res) => res.json())
        .then(() => {
          // Clear form data
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
          fetchUsers(); // Fetch updated user list
        })
        .catch((err) => console.error("Error:", err));
    }
  };

  const fetchUsers = () => {
    fetch("http://localhost:5000/get-user")
      .then((res) => res.json())
      .then((data) => setUsers(data))
      .catch((err) => console.error("Error fetching users:", err));
  };

  useEffect(() => {
    fetchUsers(); // Fetch users when the component mounts
  }, []);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white">
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
        <div className="mb-4 text-center border-b-2 border-gray-600">
          <h1 className="my-2 text-4xl font-extrabold text-white">Register</h1>
        </div>
        <form onSubmit={handleSubmit} className="grid gap-4">
          <div>
            <label htmlFor="firstName">First Name</label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
              className="w-full outline-none px-3 py-2 border rounded-md border-gray-500 bg-gray-700 text-white focus:border-blue-500"
            />
            {errors.firstName && (
              <p className="text-red-500">{errors.firstName}</p>
            )}
          </div>
          <div>
            <label htmlFor="lastName">Last Name</label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
              className="w-full outline-none px-3 py-2 border rounded-md border-gray-500 bg-gray-700 text-white focus:border-blue-500"
            />
            {errors.lastName && (
              <p className="text-red-500">{errors.lastName}</p>
            )}
          </div>
          <div>
            <label htmlFor="dob">Date of Birth</label>
            <input
              type="date"
              id="dob"
              name="dob"
              value={formData.dob}
              onChange={handleInputChange}
              className="w-full outline-none px-3 py-2 border rounded-md border-gray-500 bg-gray-700 text-white focus:border-blue-500"
            />
            {errors.dob && <p className="text-red-500">{errors.dob}</p>}
          </div>
          <div>
            <label htmlFor="address">Address</label>
            <input
              type="text"
              id="address"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              className="w-full outline-none px-3 py-2 border rounded-md border-gray-500 bg-gray-700 text-white focus:border-blue-500"
            />
            {errors.address && <p className="text-red-500">{errors.address}</p>}
          </div>
          <div>
            <label htmlFor="phoneNumber">Phone Number</label>
            <input
              type="text"
              id="phoneNumber"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleInputChange}
              className="w-full outline-none px-3 py-2 border rounded-md border-gray-500 bg-gray-700 text-white focus:border-blue-500"
            />
            {errors.phoneNumber && (
              <p className="text-red-500">{errors.phoneNumber}</p>
            )}
          </div>
          <div>
            <label htmlFor="userEmail">Email</label>
            <input
              type="email"
              id="userEmail"
              name="userEmail"
              value={formData.userEmail}
              onChange={handleInputChange}
              className="w-full outline-none px-3 py-2 border rounded-md border-gray-500 bg-gray-700 text-white focus:border-blue-500"
            />
            {errors.userEmail && (
              <p className="text-red-500">{errors.userEmail}</p>
            )}
          </div>
          <div>
            <label htmlFor="userPassword">Password</label>
            <input
              type="password"
              id="userPassword"
              name="userPassword"
              value={formData.userPassword}
              onChange={handleInputChange}
              className="w-full outline-none px-3 py-2 border rounded-md border-gray-500 bg-gray-700 text-white focus:border-blue-500"
            />
            {errors.userPassword && (
              <p className="text-red-500">{errors.userPassword}</p>
            )}
          </div>
          <div>
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              className="w-full outline-none px-3 py-2 border rounded-md border-gray-500 bg-gray-700 text-white focus:border-blue-500"
            />
            {errors.confirmPassword && (
              <p className="text-red-500">{errors.confirmPassword}</p>
            )}
          </div>
          <button type="submit" className="bg-green-600 p-2 rounded">
            Register
          </button>
        </form>
      </div>

      <div className="mt-10 w-full max-w-2xl">
        <h2 className="text-2xl font-bold mb-4">Registered Users</h2>
        <ul>
          {users.map((user) => (
            <li key={user._id} className="bg-gray-700 p-2 mb-2 rounded">
              {user.firstName} {user.lastName} - {user.userEmail}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Register;
