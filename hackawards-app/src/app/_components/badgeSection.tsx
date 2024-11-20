"use client"
import badgeGen from "~/server/badgeGen";
import { useState } from "react";

export default function BadgeSection(){
    const [badgeUrl, setBadgeUrl] = useState<string | null>(null);

    const handleBadgeGen = async (name: string, description: string) => {
        const url = await badgeGen({ name, description });
        setBadgeUrl(url ?? null);
    }
    return (
        <div>
            <h1>Badge Section</h1>
            <button onClick={() => handleBadgeGen("Hackathon at Yale 2024", "Coded the most lines of code during the event")}>Generate Badge</button>
            {badgeUrl && <img src={badgeUrl} alt="Generated Badge" />}
        </div>
    )
}