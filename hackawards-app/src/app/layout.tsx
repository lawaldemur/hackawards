import "~/styles/globals.css";
import '@coinbase/onchainkit/styles.css'; 

import { type Metadata } from "next";
import { type ReactNode } from 'react';
import { cookieToInitialState } from 'wagmi';
import { getConfig } from '../wagmi';
import { Providers } from "~/providers";

export const metadata: Metadata = {
  title: "HackAwards",
  description: "Get rewarded with NTF for your hackathon",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout(props: { children: ReactNode }) {
  const initialState = cookieToInitialState(
    getConfig()
  );
  return (
    <html lang="en">
      <body className="bg-gradient-to-r from-red-500 via-yellow-500 via-green-500 via-blue-500 to-purple-500">
        <Providers initialState={initialState}>{props.children}</Providers>
      </body>
    </html>
  );
}