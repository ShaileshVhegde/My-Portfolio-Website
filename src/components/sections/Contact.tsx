"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Terminal, Send, CheckCircle2, AlertCircle, Lock, ShieldCheck, Mail, Zap, Download } from "lucide-react";
import { personalInfo } from "@/data/personalInfo";
import TiltCard from "@/components/ui/TiltCard";

export default function Contact() {
  const [formState, setFormState] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [activeField, setActiveField] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormState("sending");

    const formData = new FormData(e.currentTarget);
    // Add your Web3Forms Access Key here
    formData.append("access_key", "48bced87-69d7-43a1-84ea-cc31a9280fd1");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData
      });

      const data = await response.json();

      if (data.success) {
        setFormState("success");
        (e.target as HTMLFormElement).reset();
        setTimeout(() => setFormState("idle"), 5000);
      } else {
        console.error("Submission Error:", data);
        setFormState("error");
        setTimeout(() => setFormState("idle"), 5000);
      }
    } catch (error) {
      console.error("Network Error:", error);
      setFormState("error");
      setTimeout(() => setFormState("idle"), 5000);
    }
  };

  return (
    <section id="contact" className="py-24 relative overflow-hidden border-t border-white/5">
      <div className="container mx-auto px-6 md:px-12 max-w-5xl relative z-10">

        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="mb-16 flex flex-col items-center text-center"
        >
          <div className="w-16 h-16 rounded-full bg-cyan-500/10 flex items-center justify-center mb-6 border border-cyan-500/20 shadow-[0_0_30px_rgba(6,182,212,0.1)]">
            <Terminal className="w-8 h-8 text-cyan-400" />
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-white tracking-tighter uppercase mb-4">
            Secure_Uplink
          </h2>
          <p className="font-mono text-xs text-cyan-500/60 uppercase tracking-[0.3em]">Establish encrypted communication channel</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

          {/* Left: Metadata & Status */}
          <div className="lg:col-span-4 space-y-6">
            <TiltCard glowColor="rgba(6,182,212,0.15)">
              <div className="bg-surface/80 backdrop-blur-2xl border border-white/10 p-6 rounded-lg font-mono shadow-2xl">
                <h3 className="text-white text-xs font-bold uppercase tracking-widest mb-6 flex items-center">
                  <ShieldCheck className="w-4 h-4 mr-2 text-green-500" />
                  Link_Metadata
                </h3>

                <div className="space-y-4">
                  <div className="p-3 rounded bg-white/5 border border-white/10">
                    <p className="text-[9px] text-gray-500 uppercase mb-1">Destination_Addr</p>
                    <p className="text-[11px] text-cyan-400 truncate">{personalInfo.email}</p>
                  </div>
                  <div className="p-3 rounded bg-white/5 border border-white/10">
                    <p className="text-[9px] text-gray-500 uppercase mb-1">Enc_Protocol</p>
                    <p className="text-[11px] text-white">AES-256-GCM / RSA-4096</p>
                  </div>
                  <div className="p-3 rounded bg-white/5 border border-white/10">
                    <p className="text-[9px] text-gray-500 uppercase mb-1">Link_Status</p>
                    <div className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                      <p className="text-[11px] text-green-500 font-bold">READY_FOR_UPLINK</p>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t border-white/10 flex justify-center">
                  <a
                    href="/ShaileshHegde.pdf"
                    download="Shailesh_Hegde_Resume.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 w-full px-4 py-3 bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 rounded text-cyan-400 font-mono text-[10px] uppercase tracking-widest transition-all hover:shadow-[0_0_15px_rgba(6,182,212,0.3)]"
                  >
                    <Download className="w-4 h-4" />
                    Download_Resume.pdf
                  </a>
                </div>

                <div className="mt-8 pt-6 border-t border-white/10">
                  <p className="text-[10px] text-gray-600 leading-relaxed uppercase tracking-tighter">
                    Warning: All transmissions are logged and audited by the local security daemon. No unauthorized access.
                  </p>
                </div>
              </div>
            </TiltCard>

            <motion.div
              whileHover={{ scale: 1.02 }}
              className="p-6 rounded-lg bg-surface border border-cyan-500/30 flex items-center gap-4 group cursor-pointer shadow-lg"
              onClick={() => window.location.href = `mailto:${personalInfo.email}`}
            >
              <div className="w-10 h-10 rounded bg-cyan-500 flex items-center justify-center text-black group-hover:shadow-[0_0_20px_rgba(6,182,212,0.5)] transition-all">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <p className="font-mono text-[10px] text-gray-400 uppercase tracking-widest">Manual_Bypass</p>
                <p className="font-mono text-xs font-bold text-white uppercase tracking-tighter">Open Default Client</p>
              </div>
            </motion.div>
          </div>

          {/* Right: Terminal Form */}
          <div className="lg:col-span-8">
            <TiltCard glowColor="rgba(6,182,212,0.2)">
              <div className="bg-surface/90 backdrop-blur-2xl border border-white/10 rounded-lg overflow-hidden flex flex-col h-full shadow-2xl">
                {/* Terminal Window Header */}
                <div className="bg-white/10 px-4 py-3 border-b border-white/10 flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="flex space-x-1.5">
                      <div className="w-2.5 h-2.5 rounded-full bg-red-500/50" />
                      <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/50" />
                      <div className="w-2.5 h-2.5 rounded-full bg-green-500/50" />
                    </div>
                    <span className="ml-4 font-mono text-[10px] text-gray-500 tracking-[0.2em] uppercase">terminal_node@uplink_main</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Zap className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                    <span className="font-mono text-[9px] text-yellow-500/80">PWR_STABLE</span>
                  </div>
                </div>

                <div className="p-6 md:p-10 flex-1">
                  <div className="mb-10 font-mono text-sm leading-6">
                    <p className="text-gray-500 flex items-center gap-2">
                      <span className="text-cyan-500">$</span> ssh operator@shailesh.sys
                    </p>
                    <p className="text-green-500/80">Authenticated. Establishing P2P Tunnel...</p>
                    <p className="text-gray-400 mt-2 italic text-xs">Waiting for packet payload definition...</p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      {/* Name Input */}
                      <div className="space-y-3">
                        <label className={`font-mono text-[10px] uppercase tracking-[0.3em] transition-colors ${activeField === "name" ? "text-cyan-400" : "text-gray-500"}`}>
                          01_IDENT_LABEL (Name)
                        </label>
                        <div className="relative group">
                          <input
                            name="name"
                            type="text"
                            required
                            onFocus={() => setActiveField("name")}
                            onBlur={() => setActiveField(null)}
                            className="w-full bg-white/5 border border-white/20 rounded-md px-4 py-3 text-white font-mono text-sm focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/20 transition-all placeholder:text-gray-700"
                            placeholder="Enter designation..."
                          />
                          <div className={`absolute bottom-0 left-0 h-0.5 bg-cyan-500 transition-all duration-300 ${activeField === "name" ? "w-full" : "w-0"}`} />
                        </div>
                      </div>

                      {/* Email Input */}
                      <div className="space-y-3">
                        <label className={`font-mono text-[10px] uppercase tracking-[0.3em] transition-colors ${activeField === "email" ? "text-cyan-400" : "text-gray-500"}`}>
                          02_RETURN_PATH (Email)
                        </label>
                        <div className="relative group">
                          <input
                            name="email"
                            type="email"
                            required
                            onFocus={() => setActiveField("email")}
                            onBlur={() => setActiveField(null)}
                            className="w-full bg-white/5 border border-white/20 rounded-md px-4 py-3 text-white font-mono text-sm focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/20 transition-all placeholder:text-gray-700"
                            placeholder="operator@network.local"
                          />
                          <div className={`absolute bottom-0 left-0 h-0.5 bg-cyan-500 transition-all duration-300 ${activeField === "email" ? "w-full" : "w-0"}`} />
                        </div>
                      </div>
                    </div>

                    {/* Message Input */}
                    <div className="space-y-3">
                      <label className={`font-mono text-[10px] uppercase tracking-[0.3em] transition-colors ${activeField === "message" ? "text-cyan-400" : "text-gray-500"}`}>
                        03_DATA_PAYLOAD (Message)
                      </label>
                      <div className="relative group">
                        <textarea
                          name="message"
                          required
                          rows={4}
                          onFocus={() => setActiveField("message")}
                          onBlur={() => setActiveField(null)}
                          className="w-full bg-white/5 border border-white/20 rounded-md px-4 py-3 text-white font-mono text-sm focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/20 transition-all resize-none placeholder:text-gray-700"
                          placeholder="Transmission details..."
                        />
                        <div className={`absolute bottom-0 left-0 h-0.5 bg-cyan-500 transition-all duration-300 ${activeField === "message" ? "w-full" : "w-0"}`} />
                      </div>
                    </div>

                    {/* Submit Button */}
                    <div className="flex items-center justify-between pt-6 border-t border-white/5">
                      <div className="hidden md:flex items-center gap-2">
                        <Lock className="w-3 h-3 text-gray-600" />
                        <span className="font-mono text-[9px] text-gray-600 uppercase tracking-widest">End-to-End Encryption Active</span>
                      </div>

                      <motion.button
                        type="submit"
                        disabled={formState !== "idle" && formState !== "success"}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className={`px-10 py-4 font-mono text-xs uppercase tracking-[0.2em] rounded-md transition-all flex items-center shadow-lg relative overflow-hidden group/btn ${formState === "idle" || formState === "success" ? "bg-cyan-600 hover:bg-cyan-500 text-white shadow-cyan-500/20" : "bg-black border border-white/10"
                          }`}
                      >
                        <AnimatePresence mode="wait">
                          {formState === "idle" && (
                            <motion.div
                              key="idle"
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -10 }}
                              className="flex items-center gap-3"
                            >
                              <Send className="w-4 h-4 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
                              INIT_TRANSMISSION 
                            </motion.div>
                          )}
                          {formState === "sending" && (
                            <motion.div
                              key="sending"
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              className="flex items-center gap-3 text-cyan-400"
                            >
                              <div className="w-4 h-4 border-2 border-cyan-500 border-t-transparent rounded-full animate-spin" />
                              ENCRYPTING...
                            </motion.div>
                          )}
                          {formState === "success" && (
                            <motion.div
                              key="success"
                              initial={{ opacity: 0, scale: 0.5 }}
                              animate={{ opacity: 1, scale: 1 }}
                              className="flex items-center gap-3 text-green-400 font-bold"
                            >
                              <CheckCircle2 className="w-5 h-5" />
                              LINK_ESTABLISHED
                            </motion.div>
                          )}
                          {formState === "error" && (
                            <motion.div
                              key="error"
                              initial={{ opacity: 0, scale: 0.5 }}
                              animate={{ opacity: 1, scale: 1 }}
                              className="flex items-center gap-3 text-red-400 font-bold"
                            >
                              <AlertCircle className="w-5 h-5" />
                              LINK_FAILED
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </motion.button>
                    </div>
                  </form>
                </div>
              </div>
            </TiltCard>
          </div>
        </div>
      </div>
    </section>
  );
}
