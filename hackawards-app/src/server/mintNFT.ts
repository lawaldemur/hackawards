
import dotenv from 'dotenv';

dotenv.config({ path: '~/.env' });
  export async function mintNFT({imageUrl}: {imageUrl: string}) {
    
    const formData = new FormData();
    formData.append('chain', 'base-sepolia');
    formData.append('data', 'test');
    formData.append('imageUrl', imageUrl);
    formData.append('recipientAddress', '0x2CE24f80C52147C219E98808A4Fd0b303793745c');
    formData.append('description', 'Hello');
    formData.append('name', 'Name is good');
    const url = 'https://api.verbwire.com/v1/nft/mint/quickMintFromMetadata';
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        accept: 'application/json',
        'X-API-Key': process.env.NEXT_PUBLIC_VERBWIRE_KEY as string,
      },
      body: formData,
    });
    console.log(response);
    const responseData = await response.json();
    return responseData;
  }