import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DashboardLayout from './DashboardLayout';

const UserDashboard = () => {
  const [licenses, setLicenses] = useState([]);
  const [products, setProducts] = useState([]);
  const userId = localStorage.getItem('userId');

  useEffect(() => {
    // Fetch all licenses and products upon component mount
    if (userId) {
      fetchAllLicenses();
      fetchAllProducts();
    }
  }, [userId]);

  const fetchAllLicenses = async () => {
    try {
      // Make a request to fetch all licenses
      const response = await axios.get('http://localhost:5000/api/licenses');
      setLicenses(response.data.licenses);
    } catch (error) {
      console.error('Error fetching licenses:', error.message);
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

  const activateLicense = async (licenseId) => {
    try {
      // Make a request to activate the license
      await axios.patch(`http://localhost:5000/api/licenses/${licenseId}/activate`);

      // Update the state to reflect the activation
      setLicenses((prevLicenses) =>
        prevLicenses.map((license) =>
          license._id === licenseId ? { ...license, activated: true } : license
        )
      );
    } catch (error) {
      console.error('Error activating license:', error.message);
    }
  };

  const filteredLicenses = licenses.filter((license) => license.user === userId);

  return (
    <DashboardLayout>
      <div>
        <h1 className="text-2xl font-bold mb-4">User Dashboard</h1>
        <p>Welcome to the user dashboard! Here you can view your activated licenses.</p>
        <table className="table-auto w-full">
          <thead>
            <tr>
              <th className="border p-2">License Key</th>
              <th className="border p-2">Product Name</th>
              <th className="border p-2">Activated</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredLicenses.map((license, index) => {
              const product = products.find((p) => p._id === license.product);

              return (
                <tr key={index}>
                  <td className="border p-2">{license.key}</td>
                  <td className="border p-2">{product ? product.name : 'Product Not Found'}</td>
                  <td className="border p-2">
                    {license.activated ? 'Activated' : 'Not Activated'}
                  </td>
                  <td className="border p-2">
                    {!license.activated && (
                      <button
                        onClick={() => activateLicense(license._id)}
                        className="bg-green-500 text-black p-2 rounded"
                      >
                        Activate
                      </button>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </DashboardLayout>
  );
};

export default UserDashboard;
