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
  
export default function Hero() {

    const account = useAccount()

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
              Connected to {account.address}
            </p>
          </div>
        )}
        </div>
    );
    }