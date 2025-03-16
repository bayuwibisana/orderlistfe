'use client';

import React, { useState } from 'react';
import { API_ENDPOINTS } from '@/config';
import { getToken } from '@/utils/auth';


interface AddItemFormProps {
  onItemAdded: () => void;
}


const AddItemForm: React.FC<AddItemFormProps> = ({ onItemAdded }) => {
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [formData, setFormData] = useState({ nama: '', alamat: '', product: '' });

  const toggleForm = () => {
    setIsFormVisible(!isFormVisible);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch(API_ENDPOINTS.ORDER_ADD, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${getToken()}`
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        alert('Item added successfully!');
        onItemAdded();
        setFormData({ nama: '', alamat: '', product: '' }); // Reset form
        setIsFormVisible(false); // Sembunyikan form
      } else {
        alert('Failed to add item.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred. Please try again.');
    }
  };

  return (
    <div className="p-4">
      <button
        onClick={toggleForm}
        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        {isFormVisible ? 'Cancel' : 'Add Item'}
      </button>

      {isFormVisible && (
        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
          <div>
            <label htmlFor="nama" className="block text-sm font-medium text-gray-700">
              Nama
            </label>
            <input
              type="text"
              id="nama"
              name="nama"
              value={formData.nama}
              onChange={handleInputChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label htmlFor="alamat" className="block text-sm font-medium text-gray-700">
                Alamat
            </label>
            <textarea
              id="alamat"
              name="alamat"
              value={formData.alamat}
              onChange={handleInputChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={3}
              required
            />
          </div>

          <div>
            <label htmlFor="product" className="block text-sm font-medium text-gray-700">
                Produk
            </label>
            <textarea
              id="product"
              name="product"
              value={formData.product}
              onChange={handleInputChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={3}
              required
            />
          </div>    
          

          <div>
            <button
              type="submit"
              className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              Submit
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default AddItemForm;