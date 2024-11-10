// components/MintNFTForm.tsx
'use client';

import React, { useState } from 'react';

const MintNFTForm: React.FC = () => {
  const [imageUrl, setImageUrl] = useState('');
  const [recipientAddress, setRecipientAddress] = useState('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [responseMessage, setResponseMessage] = useState('');

  const handleMint = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setResponseMessage('');

    try {
      const res = await fetch('/api/mintNFT', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          imageUrl,
          recipientAddress,
          name,
          description,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        setResponseMessage('NFT minted successfully!');
      } else {
        setResponseMessage(`Error: ${data.error || 'Failed to mint NFT.'}`);
      }
    } catch (error) {
      console.error('Minting Error:', error);
      setResponseMessage('An error occurred while minting the NFT.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mint-nft-form">
      <h2>Mint a New NFT</h2>
      <form onSubmit={handleMint}>
        <div>
          <label htmlFor="imageUrl">Image URL:</label>
          <input
            type="url"
            id="imageUrl"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="recipientAddress">Recipient Address:</label>
          <input
            type="text"
            id="recipientAddress"
            value={recipientAddress}
            onChange={(e) => setRecipientAddress(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="name">NFT Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="description">NFT Description:</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? 'Minting...' : 'Mint NFT'}
        </button>
      </form>
      {responseMessage && <p>{responseMessage}</p>}
    </div>
  );
};

export default MintNFTForm;
