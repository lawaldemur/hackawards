'use client';
import  { mintNFT } from "~/server/mintNFT";
export default function MintHelper() {
  const handleMint = () => {
    // You should replace this with the actual image URL or method to get it
    const imageUrl = "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_640.jpg"
    mintNFT({ imageUrl })
  }

  return (
    <div>
      <button onClick={handleMint}>Mint NFT</button>
    </div>
  )
}