import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';

export async function POST(req: NextRequest) {
  console.log('API Route Hit'); // Log to see if this is reached

  try {
    // Parse the JSON body from the request
    const body = await req.json();
    console.log('Request Body:', body);

    const { description, name, imageUrl, recipientAddress } = body;

    if (!description || !name || !recipientAddress || !imageUrl) {
        console.error('Missing required fields:', { description, name, recipientAddress, imageUrl });
        return NextResponse.json(
          { error: 'Missing required fields: data, description, name, recipientAddress, or imageUrl' },
          { status: 400 }
        );
      }
      

    const formData = new FormData();
    formData.append('chain', 'base-sepolia');
    formData.append('data', 'test');
    formData.append('description', description);
    formData.append('name', name);
    formData.append('imageUrl', imageUrl);
    formData.append('recipientAddress', recipientAddress);

    const url = 'https://api.verbwire.com/v1/nft/mint/quickMintFromMetadata';

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        accept: 'application/json',
        'X-API-Key': process.env.VERBWIRE_KEY as string,
      },
      body: formData,
    });

    const responseData = await response.json();

    if (!response.ok) {
        console.error(`API Error (${response.status}):`, responseData);
        return NextResponse.json(responseData, { status: response.status });
    }
      

    return NextResponse.json(responseData);
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { error: 'An internal server error occurred' },
      { status: 500 }
    );
  }
}
