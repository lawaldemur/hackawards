"use client"

import { WalletDefault } from "@coinbase/onchainkit/wallet";

export default function Hero() {
    return (
        <div className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
            <h1 className="text-5xl font-extrabold tracking-tight sm:text-[5rem]">
                HackAwards
            </h1>
            <p className="text-2xl">
                Get rewarded with NTF for your hackathon
            </p>
            <WalletDefault />
        </div>
    );
    }