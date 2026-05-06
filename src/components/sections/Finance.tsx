"use client";

import { motion } from "framer-motion";
import { TrendingUp, BarChart3, Globe, Coins, PieChart, Activity, ArrowUpRight, Zap } from "lucide-react";
import TiltCard from "@/components/ui/TiltCard";

/* ── Static config – Tailwind JIT requires literal class strings ── */
const financialCards = [
  {
    title: "Equity & Stock Analysis",
    description: "Deep dive into fundamental and technical analysis of Indian and Global equities. Specialized in identifying growth patterns and financial health via ratios.",
    icon: TrendingUp,
    // green theme
    iconBg:        "bg-green-500/15 border-green-500/30",
    iconColor:     "text-green-400",
    titleHover:    "group-hover:text-green-400",
    barLast:       "bg-green-400 shadow-[0_0_15px_rgba(74,222,128,0.5)]",
    barRest:       "bg-white/15 group-hover:bg-green-500/20",
    bottomBar:     "bg-green-400",
    cardBorder:    "hover:border-green-500/40",
    metrics: ["P/E Ratios", "EBIDTA Growth", "Trend Analysis"],
    trend: [20, 40, 35, 50, 45, 70, 65],
  },
  {
    title: "Portfolio Strategy (MF/ETF)",
    description: "Systematic approach to Mutual Funds and ETFs with a focus on risk-adjusted returns and sector-specific indexing.",
    icon: PieChart,
    // blue theme
    iconBg:        "bg-blue-500/15 border-blue-500/30",
    iconColor:     "text-blue-400",
    titleHover:    "group-hover:text-blue-400",
    barLast:       "bg-blue-400 shadow-[0_0_15px_rgba(96,165,250,0.5)]",
    barRest:       "bg-white/15 group-hover:bg-blue-500/20",
    bottomBar:     "bg-blue-400",
    cardBorder:    "hover:border-blue-500/40",
    metrics: ["Alpha/Beta", "Expense Ratios", "AUM Quality"],
    trend: [30, 35, 45, 40, 55, 60, 75],
  },
  {
    title: "Macro Economics",
    description: "Understanding GDP cycles, inflation impacts, and central bank policies that drive global liquidity and market sentiment.",
    icon: Globe,
    // indigo theme
    iconBg:        "bg-indigo-500/15 border-indigo-500/30",
    iconColor:     "text-indigo-400",
    titleHover:    "group-hover:text-indigo-400",
    barLast:       "bg-indigo-400 shadow-[0_0_15px_rgba(129,140,248,0.5)]",
    barRest:       "bg-white/15 group-hover:bg-indigo-500/20",
    bottomBar:     "bg-indigo-400",
    cardBorder:    "hover:border-indigo-500/40",
    metrics: ["CPI/WPI", "Interest Rates", "Fiscal Deficit"],
    trend: [50, 45, 55, 60, 58, 65, 70],
  },
  {
    title: "Asset Allocation",
    description: "Diversified strategy including Digital Assets, Gold, and Liquid funds to maintain capital preservation during volatility.",
    icon: Coins,
    // yellow/amber theme
    iconBg:        "bg-yellow-500/15 border-yellow-500/30",
    iconColor:     "text-yellow-400",
    titleHover:    "group-hover:text-yellow-400",
    barLast:       "bg-yellow-400 shadow-[0_0_15px_rgba(250,204,21,0.5)]",
    barRest:       "bg-white/15 group-hover:bg-yellow-500/20",
    bottomBar:     "bg-yellow-400",
    cardBorder:    "hover:border-yellow-500/40",
    metrics: ["Gold Hedging", "Debt Instruments", "Liquidity"],
    trend: [40, 50, 45, 60, 55, 65, 80],
  },
];

const tickerItems = [
  "NIFTY 50: 22,453.20 (+0.85%)",
  "SENSEX: 73,876.15 (+0.72%)",
  "NASDAQ: 16,345.10 (+1.12%)",
  "GOLD: 71,450.00 (+0.25%)",
  "USD/INR: 83.45 (-0.05%)",
  "BTC: $64,234.10 (+2.45%)",
];

export default function Finance() {
  return (
    <section id="finance" className="py-24 relative overflow-hidden bg-black/20">
      <div className="container mx-auto px-6 md:px-12 relative z-10">

        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="mb-16 flex items-center space-x-4"
        >
          <BarChart3 className="w-8 h-8 text-cyan-400" />
          <h2 className="text-3xl md:text-4xl font-black text-white tracking-tighter uppercase">
            Financial_Intelligence
          </h2>
          <div className="flex-1 h-[2px] bg-gradient-to-r from-cyan-500/60 to-transparent ml-4" />
        </motion.div>

        {/* Ticker Bar */}
        <div className="mb-12 py-3 border-y border-white/15 bg-surface/50 backdrop-blur-md overflow-hidden relative">
          <motion.div
            animate={{ x: ["0%", "-50%"] }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            className="flex space-x-12 whitespace-nowrap"
          >
            {[...tickerItems, ...tickerItems].map((item, i) => (
              <span key={i} className="font-mono text-[11px] md:text-xs tracking-widest text-slate-300 font-medium">
                {item.includes("+") ? (
                  <span className="text-green-400 mr-2 font-bold">▲</span>
                ) : (
                  <span className="text-red-400 mr-2 font-bold">▼</span>
                )}
                {item}
              </span>
            ))}
          </motion.div>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {financialCards.map((card, idx) => (
            <TiltCard key={card.title} className="h-full">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className={`p-8 rounded-xl border border-white/20 bg-surface/90 backdrop-blur-xl h-full flex flex-col group relative overflow-hidden shadow-xl transition-all duration-300 ${card.cardBorder}`}
              >
                {/* Faded icon watermark */}
                <div className={`absolute top-2 right-2 p-4 opacity-5 group-hover:opacity-15 transition-opacity duration-300 ${card.iconColor}`}>
                  <card.icon className="w-36 h-36" />
                </div>

                {/* Header row */}
                <div className="flex items-start justify-between mb-6">
                  <div className={`p-3 rounded-xl ${card.iconBg} ${card.iconColor} border`}>
                    <card.icon className="w-6 h-6" />
                  </div>
                  <div className="flex items-center space-x-1.5 text-[10px] font-mono text-cyan-400 font-bold">
                    <Activity className="w-3 h-3" />
                    <span>REAL_TIME_ANALYSIS</span>
                  </div>
                </div>

                {/* Title */}
                <h3 className={`text-xl font-bold text-white mb-3 flex items-center ${card.titleHover} transition-colors tracking-tight`}>
                  {card.title}
                  <ArrowUpRight className="w-5 h-5 ml-2 opacity-0 -translate-y-1 translate-x-1 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all duration-300" />
                </h3>

                {/* Description */}
                <p className="text-slate-300 text-sm leading-relaxed mb-6 font-medium flex-1">
                  {card.description}
                </p>

                {/* Metrics tags */}
                <div className="flex flex-wrap gap-2 mb-5">
                  {card.metrics.map((m) => (
                    <span
                      key={m}
                      className="px-2.5 py-1 rounded-md bg-white/8 border border-white/20 text-[10px] font-mono text-slate-200 uppercase tracking-wider"
                    >
                      {m}
                    </span>
                  ))}
                </div>

                {/* Sparkline */}
                <div className="h-14 w-full flex items-end space-x-1.5">
                  {card.trend.map((val, i) => (
                    <motion.div
                      key={i}
                      initial={{ height: 0 }}
                      whileInView={{ height: `${val}%` }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.5 + i * 0.06, duration: 0.5 }}
                      className={`flex-1 rounded-t-md transition-colors duration-300 ${
                        i === card.trend.length - 1 ? card.barLast : card.barRest
                      }`}
                    />
                  ))}
                </div>

                {/* Bottom accent line */}
                <div className={`absolute bottom-0 left-0 h-1 w-0 ${card.bottomBar} group-hover:w-full transition-all duration-500 rounded-b-xl`} />
              </motion.div>
            </TiltCard>
          ))}
        </div>

        {/* Footer Insight Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-10 p-8 md:p-10 rounded-xl border border-cyan-500/30 bg-gradient-to-r from-surface to-cyan-500/10 backdrop-blur-2xl relative overflow-hidden shadow-2xl group"
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-4">
                <Zap className="w-5 h-5 text-cyan-400 fill-cyan-400/20" />
                <span className="font-mono text-xs text-cyan-400 tracking-widest font-black uppercase">Strategic Intelligence</span>
              </div>
              <h4 className="text-2xl md:text-3xl font-bold text-white mb-4 tracking-tight">
                Beyond Technology: Analytical Synergy
              </h4>
              <p className="text-slate-300 text-sm md:text-base leading-relaxed max-w-2xl font-medium">
                My interest in finance isn&apos;t just about markets; it&apos;s about the data-driven methodology used
                to understand complex global systems. Whether auditing a cloud architecture or analyzing a balance
                sheet, the core remains the same:{" "}
                <span className="text-white italic font-bold">
                  Identifying patterns, assessing risk, and optimizing for long-term stability.
                </span>
              </p>
            </div>
            <div className="relative w-28 h-28 md:w-36 md:h-36 flex items-center justify-center flex-shrink-0">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 border-2 border-dashed border-cyan-500/40 rounded-full"
              />
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
                className="absolute inset-4 border border-cyan-500/20 rounded-full"
              />
              <BarChart3 className="w-12 h-12 text-cyan-400" />
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
