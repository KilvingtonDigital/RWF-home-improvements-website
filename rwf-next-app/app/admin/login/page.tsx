'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Lock, Loader2, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function LoginPage() {
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const res = await fetch('/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ password }),
            });

            if (res.ok) {
                // Determine redirect path
                const params = new URLSearchParams(window.location.search);
                const from = params.get('from') || '/admin/pricing';
                router.push(from);
                router.refresh();
            } else {
                const data = await res.json();
                setError(data.error || 'Login failed');
            }
        } catch (err) {
            setError('Something went wrong');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center p-4">
            <div className="mb-8 text-center">
                <Link href="/" className="text-2xl font-bold text-white tracking-tight hover:text-[#d4af37] transition-colors">
                    RWF Home Improvements
                </Link>
            </div>

            <div className="bg-white w-full max-w-md rounded-2xl shadow-xl overflow-hidden">
                <div className="p-8 pb-0 text-center">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-6">
                        <Lock className="w-8 h-8 text-gray-600" />
                    </div>
                    <h1 className="text-2xl font-bold text-gray-900 mb-2">Admin Access</h1>
                    <p className="text-gray-500 text-sm">Please enter your secure password to continue.</p>
                </div>

                <form onSubmit={handleSubmit} className="p-8 space-y-6">
                    {error && (
                        <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm text-center animate-in fade-in">
                            {error}
                        </div>
                    )}

                    <div className="space-y-2">
                        <label htmlFor="password" className="text-sm font-medium text-gray-700 block">Password</label>
                        <input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#d4af37] focus:border-transparent outline-none transition-all"
                            placeholder="Enter admin password"
                            required
                            autoFocus
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-[#1e293b] text-white font-bold py-3.5 rounded-lg hover:bg-[#0f172a] transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed group"
                    >
                        {loading ? <Loader2 className="animate-spin" /> : (
                            <>
                                Sign In <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                            </>
                        )}
                    </button>

                    <div className="text-center pt-4 border-t border-gray-100">
                        <Link href="/" className="text-sm text-gray-500 hover:text-gray-900">
                            Back to Website
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
}
