'use client';
import React, { useState } from 'react';

const MintNFTForm: React.FC = () => {
  const [formData, setFormData] = useState({
    data: '',
    description: '',
    name: '',
  });

  const [responseMessage, setResponseMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setResponseMessage(null);

    try {
      const response = await fetch('/api/mintNFT', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Something went wrong');
      }

      const result = await response.json();
      setResponseMessage('NFT minted successfully!');
      console.log('Minting Result:', result);
    } catch (error: any) {
      setResponseMessage(`Error: ${error.message}`);
      console.error('Error submitting form:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <h2>Mint a New NFT</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="data">Data:</label>
          <input
            type="text"
            id="data"
            name="data"
            value={formData.data}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="description">Description:</label>
          <input
            type="text"
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Minting...' : 'Mint NFT'}
        </button>
      </form>
      {responseMessage && <p>{responseMessage}</p>}
    </div>
  );
};

export default MintNFTForm;
