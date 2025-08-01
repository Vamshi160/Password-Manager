
import React, { useState, FormEvent } from 'react';

interface LockScreenProps {
    pinIsSet: boolean;
    onSetPin: (pin: string) => void;
    onUnlock: (pin: string) => boolean;
}

const LockScreen: React.FC<LockScreenProps> = ({ pinIsSet, onSetPin, onUnlock }) => {
    const [pin, setPin] = useState('');
    const [confirmPin, setConfirmPin] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        setError('');
        if (pinIsSet) {
            if (!onUnlock(pin)) {
                setError('Incorrect PIN. Please try again.');
            }
        } else {
            if (pin.length < 4) {
                setError('PIN must be at least 4 digits long.');
                return;
            }
            if (pin !== confirmPin) {
                setError('PINs do not match.');
                return;
            }
            onSetPin(pin);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
            <div className="w-full max-w-md p-8 space-y-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg">
                <div className="text-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-12 w-12 text-indigo-600 dark:text-indigo-400" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M18 8a6 6 0 01-7.743 5.743L10 14l-1 1-1 1H6v2H2v-4l4.257-4.257A6 6 0 1118 8zm-6-4a1 1 0 100 2 1 1 0 000-2z" clipRule="evenodd" />
                    </svg>
                    <h1 className="mt-4 text-3xl font-extrabold text-gray-900 dark:text-white">
                        {pinIsSet ? 'Vault Locked' : 'Set a Master PIN'}
                    </h1>
                    <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                        {pinIsSet ? 'Enter your PIN to unlock your vault.' : 'Create a PIN to secure your data. This PIN will be required every time you visit.'}
                    </p>
                </div>
                <form className="space-y-6" onSubmit={handleSubmit}>
                    <div className="relative">
                        <input
                            id="pin"
                            name="pin"
                            type="password"
                            autoComplete="off"
                            required
                            value={pin}
                            onChange={(e) => setPin(e.target.value)}
                            className="w-full px-4 py-3 text-lg text-center tracking-widest bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 focus:outline-none"
                            placeholder={pinIsSet ? "Enter PIN" : "Enter New PIN"}
                        />
                    </div>
                    {!pinIsSet && (
                        <div className="relative">
                           <input
                                id="confirmPin"
                                name="confirmPin"
                                type="password"
                                autoComplete="off"
                                required
                                value={confirmPin}
                                onChange={(e) => setConfirmPin(e.target.value)}
                                className="w-full px-4 py-3 text-lg text-center tracking-widest bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 focus:outline-none"
                                placeholder="Confirm New PIN"
                            />
                        </div>
                    )}
                    {error && <p className="text-sm text-center text-red-500">{error}</p>}
                    <div>
                        <button
                            type="submit"
                            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:ring-offset-gray-800 transition-transform transform hover:scale-105"
                        >
                            {pinIsSet ? 'Unlock' : 'Set PIN & Open Vault'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default LockScreen;
