// src/components/dashboard/AdminDashboard.js
import React, { useState } from 'react';
import DashboardLayout from './DashboardLayout';

const AdminDashboard = () => {
  const [products, setProducts] = useState([]);
  const [licenses, setLicenses] = useState([]);

  const addProduct = (productName, version, description) => {
    const newProduct = { productName, version, description };
    setProducts([...products, newProduct]);
  };

  const generateLicense = (productId) => {
    const newLicense = { productId, licenseKey: generateRandomKey(), status: 'Not Activated' };
    setLicenses([...licenses, newLicense]);
  };

  const generateRandomKey = () => {
    // This is a simplified key generation, replace it with a more secure method
    return Math.random().toString(36).substr(2, 8).toUpperCase();
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
          <select id="productId" className="border p-2">
            {products.map((product, index) => (
              <option key={index} value={index}>
                {product.productName}
              </option>
            ))}
          </select>
          <button
            onClick={() => {
              const productId = document.getElementById('productId').value;
              generateLicense(productId);
            }}
            className="ml-2 bg-green-500 text-white p-2 rounded"
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
                <th className="border p-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {licenses.map((license, index) => (
                <tr key={index}>
                  <td className="border p-2">{license.licenseKey}</td>
                  <td className="border p-2">{products[license.productId].productName}</td>
                  <td className="border p-2">{license.status}</td>
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
