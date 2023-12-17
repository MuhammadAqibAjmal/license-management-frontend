import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DashboardLayout from './DashboardLayout';
import emailjs from "@emailjs/browser";
const AdminDashboard = () => {
  const [products, setProducts] = useState([]);
  const [users, setUsers] = useState([]);
  const [licenses, setLicenses] = useState([]);
  const [newProductName, setNewProductName] = useState('');
  const [newVersion, setNewVersion] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [selectedProductId, setSelectedProductId] = useState('');
  const [selectedUserId, setSelectedUserId] = useState('');
  const [isGenerateButtonDisabled, setIsGenerateButtonDisabled] = useState(true);

  useEffect(() => {
    // Fetch all products and users when the component mounts
    fetchAllProducts();
    fetchAllUsers();
    fetchAllLicenses();
  }, []);

  const addProduct = async (productName, version, description) => {
    try {
      // Make a request to create a new product
      const response = await axios.post('http://localhost:5000/api/products', {
        name: productName,
        version: version,
        description: description,
      });

      // If the request is successful, update the products state
      setProducts([...products, response.data]);

      // Clear the input fields
      setNewProductName('');
      setNewVersion('');
      setNewDescription('');
    } catch (error) {
      console.error('Error creating new product:', error.message);
    }
  };

  const fetchAllProducts = async () => {
    try {
      // Make a request to fetch all products
      const response = await axios.get('http://localhost:5000/api/products');
      setProducts(response.data.products);
    } catch (error) {
      console.error('Error fetching products:', error.message);
    }
  };

  const fetchAllUsers = async () => {
    try {
      // Make a request to fetch all users
      const response = await axios.get('http://localhost:5000/api/users');
      setUsers(response.data.users);
    } catch (error) {
      console.error('Error fetching users:', error.message);
    }
  };

  const fetchAllLicenses = async () => {
    try {
      // Make a request to fetch all licenses
      const response = await axios.get('http://localhost:5000/api/licenses');
      setLicenses(response.data.licenses);
    } catch (error) {
      console.error('Error fetching licenses:', error.message);
    }
  };

  const generateLicense = async () => {
    try {
      console.log('Generating license...', selectedProductId, selectedUserId);
      // Make a request to create a new license
      const response = await axios.post('http://localhost:5000/api/licenses', {
        key: generateRandomKey(),
        product: selectedProductId,
        user: selectedUserId,
        activated: false,
      });

      // If the request is successful, update the licenses state
      setLicenses([...licenses, response.data.license]);

      // Send an email to the user with the license details
      sendEmail(response.data.license);

    } catch (error) {
      console.error('Error generating license:', error.message);
    }
  };
  const sendEmail = (license) => {
    emailjs
      .send(
        'service_thxtuif', // Replace with your service ID
        'template_0dfb85s', // Replace with your template ID
        {
          to_email: users.find(u => u._id === license.user)?.email,
          license_key: license.key,
          product_name: products.find(p => p._id === license.product)?.name,
          user_name: users.find(u => u._id === license.user)?.username,
          to_name: users.find(u => u._id === license.user)?.username,
          
          
        },
        'U8CaJyibOwChYKggY' // Replace with your user ID
      )
      .then(
        (response) => {
          console.log('Email sent successfully:', response);
        },
        (error) => {
          console.error('Error sending email:', error);
        }
      );
  };
  const generateRandomKey = () => {
    // This is a simplified key generation, replace it with a more secure method
    return Math.random().toString(36).substr(2, 8).toUpperCase();
  };

  const handleProductChange = (e) => {
    setSelectedProductId(e.target.value);
    updateGenerateButtonState();
  };

  const handleUserChange = (e) => {
    setSelectedUserId(e.target.value);
    updateGenerateButtonState();
  };

  const updateGenerateButtonState = () => {
    setIsGenerateButtonDisabled(!selectedProductId || !selectedUserId);
  };

  return (
    <DashboardLayout>
      <div>
        <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
        <p>Welcome to the admin dashboard! Here you can manage products and licenses.</p>
        {/* Product Registration Form */}
        <div className="my-4">
          <h2 className="text-xl font-bold mb-2">Product Registration</h2>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const { productName, version, description } = e.target.elements;
              
              addProduct(productName.value, version.value, description.value);
            }}
          >
            <div className="grid grid-cols-3 gap-4">
              <input
                type="text"
                id="productName"
                name="productName"
                placeholder="Product Name"
                required
                className="border p-2"
              />
              <input type="text" id="version" name="version" placeholder="Version" required className="border p-2" />
              <input
                type="text"
                id="description"
                name="description"
                placeholder="Description"
                required
                className="border p-2"
              />
            </div>
            <button type="submit" className="mt-2 bg-blue-500 text-white p-2 rounded">
              Register Product
            </button>
          </form>
        </div>

        {/* License Generation */}
        <div className="my-4">
          <h2 className="text-xl font-bold mb-2">License Generation</h2>
          <select
            id="productId"
            className="border p-2"
            onChange={handleProductChange}
            value={selectedProductId}
          >
            <option value="" disabled>Select Product</option>
            {products?.map((product, index) => (
              <option key={index} value={product._id}>
                {product?.name}
              </option>
            ))}
          </select>
          <select
            id="userId"
            className="border p-2"
            onChange={handleUserChange}
            value={selectedUserId}
          >
            <option value="" disabled>Select User</option>
            {users?.map((user, index) => (
              <option key={index} value={user._id}>
                {user?.username}
              </option>
            ))}
          </select>
          <button
            onClick={generateLicense}
            className="ml-2 bg-green-500 text-white p-2 rounded"
            disabled={isGenerateButtonDisabled}
          >
            Generate License
          </button>
        </div>

        {/* License Management Dashboard */}
        <div className="my-4">
  <h2 className="text-xl font-bold mb-2">License Management Dashboard</h2>
  <table className="table-auto w-full">
    <thead>
      <tr>
        <th className="border p-2">License Key</th>
        <th className="border p-2">Product</th>
        <th className="border p-2">User</th>
        <th className="border p-2">Activated</th>
      </tr>
    </thead>
    <tbody>
      {licenses.map((license, index) => (
        <tr key={index}>
          <td className="border p-2">{license.key}</td>
          <td className="border p-2">{products.find(p => p._id === license.product)?.name}</td>
          <td className="border p-2">{users.find(u => u._id === license.user)?.username}</td>
          <td className="border p-2">{license.activated ? 'Activated' : 'Not Activated'}</td>
        </tr>
      ))}
    </tbody>
  </table>
</div>
      </div>
    </DashboardLayout>
  );
};

export default AdminDashboard;
