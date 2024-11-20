'use client';
import  { mintNFT } from "~/server/mintNFT";
export default function MintButton() {
  const handleMint = async (imageUrl: string) => {
    // You should replace this with the actual image URL or method to get it
    await mintNFT({ imageUrl })
  }

  return (
    <div>
      <button onClick={() => handleMint("https://letsenhance.io/static/73136da51c245e80edc6ccfe44888a99/1015f/MainBefore.jpg")}>Mint NFT</button>
    </div>
  )
}