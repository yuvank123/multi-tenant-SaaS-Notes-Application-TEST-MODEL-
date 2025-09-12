import React from 'react';
export default function UpgradeBanner({ onUpgrade }) {
    return (
        <div className="bg-yellow-100 p-4 border-l-4 border-yellow-500 mb-4">
            <p className="mb-2">Free plan limit reached. Upgrade to Pro for unlimited notes.</p>
            <button className="bg-yellow-500 text-white px-2 py-1" onClick={onUpgrade}>Upgrade</button>
        </div>
    );
}