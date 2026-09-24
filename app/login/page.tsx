"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Eye, EyeOff, ArrowRight, Palette } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

export default function LoginPage() {
    const supabase = createClient();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [showPassword, setShowPassword] = useState(false);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();

        setError("");
        setSuccess("");
        setLoading(true);

        const { error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (error) {
            setError(error.message);
            setLoading(false);
            return;
        }

        setSuccess("Login successful! Redirecting...");

        window.location.href = "/dashboard";
    };

    return (
        <main className="font-sans min-h-screen w-full bg-background">
            <div className="grid min-h-screen lg:grid-cols-2">

                <section className="flex min-h-screen items-center justify-center px-6 py-12 sm:px-10">

                    <div className="w-full max-w-md">

                        <div className="mb-8 flex flex-col items-center font-sans lg:items-start">

                            <p className="mb-3 text-sm font-bold uppercase tracking-[0.2em] text-[var(--primary)]">
                                Welcome back
                            </p>

                            <h2 className="text-center text-3xl font-black tracking-tight sm:text-4xl rainbow-text lg:text-left">
                                Log in to Huenicorn
                            </h2>

                            <p className="mt-3 text-center text-sm leading-6 text-foreground/80 lg:text-left">
                                Continue where you left off.
                            </p>

                            <Image src="/images/Login.png" width={320} height={320} alt="Huenicorn" className="relative z-10 h-auto lg:hidden my-6"
                            />

                        </div>


                        {error && (
                            <div className="mb-5 rounded-lg border border-[var(--accent)]/50 px-4 py-3 text-sm text-[var(--accent)]">
                                {error}
                            </div>
                        )}

                        {success && (
                            <div className="mb-5 rounded-lg border border-[var(--primary)]/50 px-4 py-3 text-sm text-[var(--primary)]">
                                {success}
                            </div>
                        )}


                        <form onSubmit={handleLogin} className="space-y-5">

                            <div className="font-sans">

                                <label htmlFor="email" className="mb-2 block text-sm font-semibold text-foreground/60">
                                    Email address
                                </label>

                                <input
                                    id="email"
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="you@example.com"
                                    required
                                    className="h-12 w-full rounded-md border border-gray-200 bg-white px-4 text-sm text-[#1A233A] outline-none transition placeholder:text-gray-400 focus:border-[#5578C9] focus:ring-4 focus:ring-[#5578C9]/10"
                                />

                            </div>


                            <div>

                                <div className="font-sans mb-2 flex items-end justify-between">

                                    <label htmlFor="password"
                                        className="block text-sm font-semibold text-foreground/60">
                                        Password
                                    </label>

                                    <Link href="/forgot-password"
                                        className="text-xs font-semibold text-[var(--primary)] transition hover:text-[var(--accent)]">
                                        Forgot password?
                                    </Link>

                                </div>

                                <div className="relative font-sans">

                                    <input
                                        id="password"
                                        type={showPassword ? "text" : "password"}
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder="Enter your password"
                                        required
                                        className="h-12 w-full rounded-md border border-gray-200 bg-white px-4 pr-12 text-sm text-[#1A233A] outline-none transition placeholder:text-gray-400 focus:border-[#5578C9] focus:ring-4 focus:ring-[#5578C9]/10"
                                    />

                                    <button type="button" onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 transition hover:text-[#5578C9]">
                                        {showPassword ? (
                                            <EyeOff size={18} className="cursor-pointer"/>
                                        ) : (
                                            <Eye size={18} className="cursor-pointer"/>
                                        )}
                                    </button>

                                </div>

                            </div>

                            <button type="submit" disabled={loading}
                                className="group flex h-12 w-full cursor-pointer items-center justify-center gap-2 rounded-md bg-[var(--primary)] transition duration-300 ease-in-out
                                text-sm font-bold text-white shadow-lg shadow-[#5578C9]/20 disabled:cursor-not-allowed disabled:opacity-60 hover:bg-[var(--accent)]">
                                {loading ? (
                                    <>
                                        <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                                        Signing in...
                                    </>
                                ) : (
                                    <>
                                        Sign in
                                        <ArrowRight size={18} className="transition-transform group-hover:translate-x-1"/>
                                    </>
                                )}
                            </button>

                        </form>

                        <p className="mt-8 text-center text-sm text-gray-500">
                            Don't have an account?{" "}
                            <Link href="/signup" className="font-bold text-[var(--primary)] transition hover:text-[var(--accent)]">
                                Create account
                            </Link>

                        </p>


                        <div className="mt-6 flex w-full justify-center overflow-hidden">
                            {[
                                "#5578C9",
                                "#96B4EB",
                                "#F6E06E",
                                "#D789B9",
                                "#B35D91",
                            ].map((color) => (
                                <div key={color} className="h-3 w-full max-w-[60px]"
                                    style={{
                                        backgroundColor: color,
                                    }}
                                />
                            ))}
                        </div>

                    </div>

                </section>

                <section className="relative hidden overflow-hidden bg-[#5578C9] lg:flex">

                    <div className="absolute -left-20 -top-20 h-72 w-72 rounded-full bg-[#96B4EB]/50 blur-3xl" />

                    <div className="absolute -bottom-20 -right-20 h-80 w-80 rounded-full bg-[#D789B9]/50 blur-3xl" />

                    <div className="absolute left-1/2 top-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#F6E06E]/20 blur-3xl" />

                    <div className="relative z-10 flex w-full flex-col justify-between p-12 xl:p-16">

                        <div className="h-full flex flex-col items-center text-center justify-center">

                            <div className="relative mb-8">
                                <div className="absolute inset-0 rounded-full bg-[#F6E06E]/30 blur-3xl" />
                                <Image src="/images/Login.png" width={320} height={320} alt="Huenicorn" className="relative z-1 h-auto"/>
                            </div>

                            <h1 className="max-w-xl text-4xl font-black leading-tight text-white xl:text-5xl">
                                Welcome back!
                            </h1>

                            <p className="mt-5 max-w-md text-base leading-7 text-white/80">
                                Continue creating beautiful palettes, picking
                                colors, and exploring new combinations with Huenicorn.
                            </p>

                        </div>

                    </div>
                </section>

            </div>
        </main>
    );
}

