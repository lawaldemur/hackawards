import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';

export async function POST(req: NextRequest) {
  console.log('API Route Hit'); // Log to see if this is reached

  try {
    // Parse the JSON body from the request
    const body = await req.json();
    console.log('Request Body:', body);

    const { data, description, name } = body;

    if (!data || !description || !name) {
      console.error('Missing required fields:', { data, description, name });
      return NextResponse.json(
        { error: 'Missing required fields: data, description, or name' },
        { status: 400 }
      );
    }

    const fileUrl =
      'https://static.independent.co.uk/s3fs-public/thumbnails/image/2016/02/01/13/jameson-pfeiffer-syndrome.jpg';

    const formData = new FormData();
    formData.append('allowPlatformToOperateToken', 'true');
    formData.append('chain', 'base-sepolia');
    formData.append('data', data);
    formData.append('description', description);
    formData.append('name', name);
    formData.append('filePath', "[HELP HERE]");
    formData.append(
      'recipientAddress',
      '0x8e24B16dFD5eC0B442602926c0D49B45C1287144'
    );

    const url = 'https://api.verbwire.com/v1/nft/mint/quickMintFromFile';

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
      console.error('API Error:', responseData);
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
