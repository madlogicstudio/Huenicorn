"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { Eye, EyeOff, ArrowRight } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

export default function SignupPage() {
    const supabase = createClient();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleSignup = async (e: React.FormEvent) => {
        e.preventDefault();

        setError("");
        setSuccess("");

        if (password !== confirmPassword) {
            setError("Passwords do not match.");
            return;
        }

        if (password.length < 6) {
            setError("Password must be at least 6 characters.");
            return;
        }

        setLoading(true);

        const { data, error } = await supabase.auth.signUp({
            email,
            password,
            options: {
                emailRedirectTo: `${window.location.origin}/auth/callback`,
            },
        });

        if (error) {
            if (error.message.toLowerCase().includes("rate limit")) {
                setError(
                    "Too many signup emails have been requested. Please try again later."
                );
            } else {
                setError(error.message);
            }

            setLoading(false);
            return;
        }

        setSuccess(
            "Account created! Please check your email and click the confirmation link to continue."
        );

        setLoading(false);

    };

    useEffect(() => {
        const {
            data: { subscription },
        } = supabase.auth.onAuthStateChange((event, session) => {
            if (session && event === "SIGNED_IN") {
                window.location.replace("/dashboard");
            }
        });

        return () => subscription.unsubscribe();
    }, []);

    return (
        <main className="font-sans min-h-screen w-full bg-background">

            <div className="grid min-h-screen lg:grid-cols-2">

                <section className="relative lg:flex hidden overflow-hidden bg-[#5578C9]">

                    <div className="absolute -left-20 -top-20 h-72 w-72 rounded-full bg-[#96B4EB]/50 blur-3xl" />

                    <div className="absolute -bottom-20 -right-20 h-80 w-80 rounded-full bg-[#D789B9]/50 blur-3xl" />

                    <div className="absolute left-1/2 top-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#F6E06E]/20 blur-3xl" />

                    <div className="relative z-1 flex w-full flex-col justify-between p-12 xl:p-16">

                        <div className="h-full flex flex-col items-center text-center justify-center">

                            <div className="relative mb-8">
                                <div className="absolute inset-0 rounded-full bg-[#F6E06E]/30 blur-3xl" />
                                <Image src="/images/Signup.png" width={320} height={320} alt="Huenicorn" className="relative z-1 h-auto"/>
                            </div>

                            <h1 className="max-w-xl text-4xl font-black leading-tight text-white xl:text-5xl">
                                Your colors. Your creativity.
                            </h1>

                            <p className="mt-5 max-w-md text-base leading-7 text-white/80">
                                Create beautiful palettes, pick colors from images,
                                and explore new color combinations with Huenicorn.
                            </p>

                        </div>

                    </div>
                </section>

                <section className="flex min-h-screen items-center justify-center px-6 py-12 sm:px-10">

                    <div className="w-full max-w-md">

                        <div className="font-sans mb-8 flex flex-col lg:items-start items-center">

                            <p className="mb-3 text-sm font-bold uppercase tracking-[0.2em] text-[var(--primary)]">
                                Welcome to Huenicorn
                            </p>

                            <h2 className="text-3xl font-black tracking-tight sm:text-4xl rainbow-text">
                                Create your account
                            </h2>

                            <p className="mt-3 text-sm leading-6 text-foreground/80 lg:text-left text-center">
                                Save your favorite colors, palettes and unlock more features.
                            </p>

                            <Image src="/images/Signup.png" width={220} height={220} alt="Huenicorn" 
                                className="lg:hidden flex relative z-1 h-auto mt-6"/>

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

                        <form onSubmit={handleSignup} className="space-y-5">

                        <div>
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
                            <label htmlFor="password" className="mb-2 block text-sm font-semibold text-foreground/60">
                                Password
                            </label>

                            <div className="relative">

                            <input
                                id="password"
                                type={showPassword ? "text" : "password"}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="At least 6 characters"
                                required
                                className="h-12 w-full rounded-md border border-gray-200 bg-white px-4 pr-12 text-sm text-[#1A233A] outline-none transition placeholder:text-gray-400 focus:border-[#5578C9] focus:ring-4 focus:ring-[#5578C9]/10"
                            />

                            <button type="button" onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 transition hover:text-[#5578C9]">
                                {showPassword ? (
                                    <EyeOff size={18} className="cursor-pointer" />
                                    ) : (
                                    <Eye size={18} className="cursor-pointer" />
                                )}
                            </button>

                            </div>
                        </div>


                        <div>
                            <label htmlFor="confirmPassword" className="mb-2 block text-sm font-semibold text-foreground/60">
                                Confirm password
                            </label>

                            <div className="relative">

                            <input
                                id="confirmPassword"
                                type={showConfirmPassword ? "text" : "password"}
                                value={confirmPassword}
                                onChange={(e) =>
                                    setConfirmPassword(e.target.value)
                                }
                                placeholder="Repeat your password"
                                required
                                className="h-12 w-full rounded-md border border-gray-200 bg-white px-4 pr-12 text-sm text-[#1A233A] outline-none transition placeholder:text-gray-400 focus:border-[#5578C9] focus:ring-4 focus:ring-[#5578C9]/10"
                            />

                            <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 transition hover:text-[#5578C9]">
                                {showConfirmPassword ? (
                                    <EyeOff size={18} className="cursor-pointer" />
                                    ) : (
                                    <Eye size={18} className="cursor-pointer" />
                                )}
                            </button>

                            </div>
                        </div>

                        <p className="text-sm leading-5 text-foreground/60 lg:text-left text-center">
                            By creating an account, you agree to use Huenicorn
                            responsibly and keep your account information secure.
                        </p>


                        <button
                            type="submit"
                            disabled={loading}
                            className="group flex h-12 w-full items-center justify-center gap-2 rounded-md bg-[var(--primary)] text-sm font-bold text-white shadow-lg shadow-[#5578C9]/20 cursor-pointer">
                            {loading ? (
                                <>
                                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                                    Creating account...
                                </>
                                ) : (
                                <>
                                    Create account
                                    <ArrowRight size={18} className="transition-transform group-hover:translate-x-1"/>
                                </>
                            )}
                        </button>

                        </form>

                        <p className="mt-8 text-center text-sm text-gray-500">
                            Already have an account?{" "}

                            <Link href="/login" className="font-bold text-[var(--primary)] transition hover:text-[var(--accent)]">
                                Log in
                            </Link>
                        </p>

                        <div className="w-full mt-6 flex overflow-hidden justify-center">
                            {[
                                "#5578C9",
                                "#96B4EB",
                                "#F6E06E",
                                "#D789B9",
                                "#B35D91",
                            ].map((color) => (
                                <div key={color} className="h-3 max-w-[60px] w-full" style={{ backgroundColor: color }} />
                            ))}
                        </div>

                    </div>

                </section>

            </div>

        </main>
    );
}