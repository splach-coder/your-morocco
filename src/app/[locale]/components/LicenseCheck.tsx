'use client';

import { useEffect, useState } from 'react';

// You can host a simple JSON file on GitHub Gist, Vercel Blob, or any public URL.
// The JSON should look like: { "active": true } or { "active": false }
// Example Gist Raw URL: https://gist.githubusercontent.com/username/gist-id/raw/status.json
const LICENSE_ENDPOINT = process.env.NEXT_PUBLIC_LICENSE_ENDPOINT;

export default function LicenseCheck() {
    const [isAllowed, setIsAllowed] = useState(true);

    useEffect(() => {
        // If no endpoint is configured, assume valid (or invalid, depending on your preference)
        // For safety/dev, we default to allowed if no endpoint is set.
        if (!LICENSE_ENDPOINT) return;

        const checkLicense = async () => {
            try {
                const response = await fetch(LICENSE_ENDPOINT);
                if (response.ok) {
                    const data = await response.json();
                    // If active is strictly false, disable access
                    if (data.active === false) {
                        setIsAllowed(false);
                    }
                }
            } catch (error) {
                // Determine what to do on error (e.g., network failure).
                // Usually standard to keep running to avoid accidental outages.
                console.error('License check failed', error);
            }
        };

        checkLicense();
        // Optional: Interval check every 5-10 minutes
        const interval = setInterval(checkLicense, 1000 * 60 * 10);
        return () => clearInterval(interval);

    }, []);

    if (isAllowed) return null;

    return (
        <div className="fixed inset-0 z-[9999] bg-white flex flex-col items-center justify-center p-8 text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Maintenance Mode</h1>
            <p className="text-xl text-gray-600 max-w-lg">
                This website is currently undergoing scheduled maintenance or is temporarily unavailable.
                Please check back later or contact the administrator.
            </p>
        </div>
    );
}
