"use client"

import { 
    ConnectWallet, 
    Wallet, 
    WalletDropdown, 
    WalletDropdownDisconnect, 
  } from '@coinbase/onchainkit/wallet'; 
  import {
    Address,
    Avatar,
    Name,
    Identity,
  } from '@coinbase/onchainkit/identity';

  import { base } from 'wagmi/chains';
  import { useAccount } from 'wagmi';
import { useEffect, useState } from 'react';
    

export default function Hero() {
    const [tokens, setTokens] = useState([]);
    const account = useAccount()


    useEffect(() => {
        const fetchData = async () => {
            const requestHeaders: HeadersInit = {
                Accept: "application/json",
                
              };
        
              const requestOptions: RequestInit = {
                method: "GET",
                headers: requestHeaders,
              };
          try {
            await new Promise(resolve => setTimeout(resolve, 1500));
            const response = await fetch(
              `https://testnets-api.opensea.io/api/v2/chain/base_sepolia/account/${account?.address}/nfts`,
              requestOptions
            );
            const assets  = await response.json();
            setTokens(assets.nfts);
          } catch (err) {
            console.log(`Error fetching assets from Opensea: ${err}`);
            return new Error(`Error fetching assets from Opensea: ${err}`);
          }
          
        };
        
        fetchData();
      }, [account?.address]);
    
    return (
        <div className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
            <h1 className="text-5xl font-extrabold tracking-tight sm:text-[5rem]">
                HackAwards 
            </h1>
            <p className="text-2xl">
                Get rewarded with NTF for your hackathon achievements
                
            </p>
            <Wallet>
        <ConnectWallet>
          <Avatar className="h-6 w-6" chain={base}/>
          <Name chain={base}/>
        </ConnectWallet>
        <WalletDropdown>
          <Identity className="px-4 pt-3 pb-2" hasCopyAddressOnClick chain={base}>
            <Avatar chain={base}/>
            <Name chain={base} />
            
            <Address />
          </Identity>
          <WalletDropdownDisconnect />
        </WalletDropdown>
      </Wallet>
        {account.isConnected && (
          <div className="flex flex-col items-center justify-center gap-4">
            <p className="text-2xl">
              Connected to {account.address} on { account.connector?.name}
            </p>
          </div>
        )}
        <div>
            <h2 className="text-3xl font-bold self-start">Your NFTs</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6"> 
          {tokens?.map((token) => (
            <div key={token.identifier} className="bg-white/10 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 p-4">
              <div className="aspect-square overflow-hidden rounded-lg">
                <img 
                  src={token.image_url} 
                  alt={token.name} 
                  className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="mt-4 space-y-2">
                <p className="text-lg font-semibold truncate">{token.name}</p>
                <p className="text-sm text-gray-400">NFT ID#{token.identifier}</p>
              </div>
            </div>
          ))}
            </div>
        </div>
      </div>    );
    }