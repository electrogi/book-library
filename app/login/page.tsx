"use client";
import { useState } from "react";
import { login } from "@/actions/auth";
import { motion } from "framer-motion";
import { Lock, ArrowRight } from "lucide-react";

export default function LoginPage() {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (formData: FormData) => {
    setLoading(true);
    setError("");
    try {
      const res = await login(formData);
      if (res?.error) {
        setError(res.error);
      }
    } catch (e: any) {
      setError(e.message || "An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#09090b] text-[#F5F5F0] flex flex-col md:flex-row relative overflow-hidden font-sans">
      {/* Cinematic Ambient Background Blur */}
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-neutral-900/30 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] rounded-full bg-neutral-950 blur-[150px] pointer-events-none" />

      {/* Left Column: Artistic / Editorial Hero Section */}
      <div className="flex-1 p-8 md:p-16 lg:p-24 flex flex-col justify-between border-b md:border-b-0 md:border-r border-neutral-900 z-10">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex items-center space-x-3"
        >
          <span className="font-mono text-xs tracking-widest text-zinc-500 uppercase">
            System Archive v1.2
          </span>
        </motion.div>

        <div className="my-12 md:my-0 space-y-6 max-w-lg">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-serif tracking-tight leading-none text-zinc-100"
          >
            The Private <br />
            <span className="italic text-stone-400 font-light">Folio Registry</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="text-sm text-zinc-400 leading-relaxed font-light"
          >
            A high-end curated depository for physical publications, literary artifacts, and personal shelf records. Strictly limited to private administrative access.
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="hidden md:flex flex-col space-y-1 text-xs font-mono text-zinc-600"
        >
          <span>OPERATOR AUTHENTICATION REQUIRED</span>
          <span>ESTABLISHED 2026. NEON POSTGRES POWERED.</span>
        </motion.div>
      </div>

      {/* Right Column: High-End Minimal Form */}
      <div className="flex-1 p-8 md:p-16 lg:p-24 flex items-center justify-center z-10">
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="w-full max-w-sm space-y-8"
        >
          <div className="space-y-2">
            <h2 className="text-xl font-serif text-zinc-200">Security Gateway</h2>
            <p className="text-xs font-mono text-zinc-500 uppercase tracking-widest">
              Identity Verification
            </p>
          </div>

          <form action={handleSubmit} className="space-y-6">
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-3 bg-red-950/30 border border-red-900/50 rounded text-red-300 text-xs font-mono"
              >
                {error}
              </motion.div>
            )}

            <div className="relative group border-b border-neutral-800 focus-within:border-zinc-400 transition-colors py-1">
              <span className="absolute left-0 top-1/2 -translate-y-1/2 text-zinc-600 group-focus-within:text-zinc-400 transition-colors">
                <Lock size={16} />
              </span>
              <input
                type="password"
                name="password"
                placeholder="ACCESS PASSWORD"
                className="w-full bg-transparent border-none pl-7 pr-4 py-2 text-sm text-zinc-100 placeholder-zinc-700 focus:outline-none focus:ring-0 tracking-wider font-mono"
                required
                disabled={loading}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full group relative flex items-center justify-between border border-neutral-800 hover:border-zinc-300 bg-transparent hover:bg-zinc-100 hover:text-zinc-950 transition-all duration-300 rounded px-4 py-3 text-xs font-mono tracking-widest uppercase"
            >
              <span>{loading ? "AUTHENTICATING..." : "INITIATE ACCESS"}</span>
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </form>

          <div className="pt-4 border-t border-neutral-900 md:hidden flex flex-col space-y-1 text-[10px] font-mono text-zinc-600">
            <span>OPERATOR AUTHENTICATION REQUIRED</span>
            <span>SYSTEM SECURITY VERIFIED</span>
          </div>
        </motion.div>
      </div>
    </div>
  );
}