import { useState, useEffect } from "react";

const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@700;800;900&family=Barlow:wght@400;500;600&family=Share+Tech+Mono&display=swap');
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  @keyframes emberRise {
    0%   { opacity: 1;   transform: translateY(0)      translateX(0)         scale(1);   }
    60%  { opacity: 0.6; }
    100% { opacity: 0;   transform: translateY(-320px) translateX(var(--tx)) scale(0.1); }
  }
  @keyframes letterIn {
    0%   { opacity: 0; transform: translateY(80px) skewX(-10deg); filter: blur(12px); }
    100% { opacity: 1; transform: translateY(0)    skewX(0deg);   filter: blur(0); }
  }
  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(28px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes lineGrow {
    from { transform: scaleX(0); }
    to   { transform: scaleX(1); }
  }
  @keyframes glowBreathe {
    0%,100% { text-shadow: 0 0 40px rgba(255,74,0,0.18), 0 0 80px rgba(255,100,0,0.06); }
    50%     { text-shadow: 0 0 60px rgba(255,74,0,0.45), 0 0 120px rgba(255,110,0,0.18); }
  }
  @keyframes badgeDrop {
    0%   { opacity: 0; transform: translateY(-30px) scale(0.8); }
    100% { opacity: 1; transform: translateY(0)     scale(1); }
  }
  @keyframes shieldPulse {
    0%,100% { filter: drop-shadow(0 0 4px rgba(255,74,0,0.2)); }
    50%     { filter: drop-shadow(0 0 12px rgba(255,74,0,0.55)); }
  }
  @keyframes borderFlash {
    0%,100% { border-color: #2A2A2A; }
    50%     { border-color: rgba(255,74,0,0.5); }
  }

  .card:hover { border-color: #FF4A00 !important; background: rgba(255,74,0,0.04) !important; }
  .pillar:hover { background: #FF4A00 !important; color: #0A0A0A !important; }
  .scroll-section { opacity: 0; transform: translateY(32px); transition: opacity 0.7s ease, transform 0.7s ease; }
  .scroll-section.visible { opacity: 1; transform: translateY(0); }
`;

const EMBERS = Array.from({ length: 32 }, (_, i) => ({
  id: i,
  left: Math.random() * 100,
  size: Math.random() * 5 + 2,
  delay: Math.random() * 6,
  dur: Math.random() * 2.5 + 1.8,
  tx: `${(Math.random() - 0.5) * 90}px`,
  color: Math.random() > 0.5 ? "#FF4A00" : "#FFA500",
}));

const PALETTE = [
  { label: "OBSIDIAN",   hex: "#0A0A0A",  border: true  },
  { label: "FORGE",      hex: "#FF4A00",  border: false },
  { label: "EMBER",      hex: "#FF9800",  border: false },
  { label: "STEEL",      hex: "#8C9BAB",  border: false },
  { label: "ASH",        hex: "#E8E4DC",  border: false },
];

const PILLARS = ["POWER","AGGRESSION","PRECISION","RESILIENCE","DISCIPLINE","LEGACY"];

const ALTS = [
  { name: "CRUCIBLE",  abbr: "CFC", meaning: "Where fighters are tested and refined under fire, emerging either stronger — or not at all." },
  { name: "FRACTURE",  abbr: "FFC", meaning: "Every limit is a bone waiting to break. The only way through is through." },
  { name: "SOVEREIGN", abbr: "SFC", meaning: "One throne. Infinite challengers. Supreme authority in the combat arena." },
];

function Shield({ size = 64, orange = "#FF4A00", dark = "#0A0A0A" }) {
  return (
    <svg width={size} height={size * 1.15} viewBox="0 0 100 115" fill="none">
      <path d="M50 4 L96 22 L96 70 L50 112 L4 70 L4 22 Z" fill={orange} />
      <path d="M50 14 L86 28 L86 67 L50 102 L14 67 L14 28 Z" fill={dark} opacity="0.3" />
      <text x="50" y="66" textAnchor="middle" fill={dark}
        fontFamily="'Barlow Condensed', sans-serif" fontWeight="900" fontSize="22" letterSpacing="1">
        FFC
      </text>
    </svg>
  );
}

export default function ForgeBrand() {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const t = setTimeout(() => setPhase(1), 150);

    // Scroll reveal
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) e.target.classList.add("visible");
      });
    }, { threshold: 0.15 });
    document.querySelectorAll(".scroll-section").forEach(el => obs.observe(el));

    return () => { clearTimeout(t); obs.disconnect(); };
  }, []);

  const c = {
    bg: "#080808",
    bg2: "#0E0E0E",
    orange: "#FF4A00",
    amber: "#FF9800",
    steel: "#8C9BAB",
    ash: "#E8E4DC",
    dim: "#222222",
    muted: "#555555",
    grid: "rgba(255,74,0,0.03)",
  };

  const H = ({ children, size = 11, spacing = 4, color, mb = 0 }) => (
    <div style={{ fontSize: size, letterSpacing: spacing, color: color || c.orange, marginBottom: mb, fontWeight: 700, textTransform: "uppercase" }}>
      {children}
    </div>
  );

  return (
    <>
      <style>{CSS}</style>
      <div style={{
        background: c.bg, minHeight: "100vh", color: c.ash,
        fontFamily: "'Barlow Condensed', sans-serif", overflowX: "hidden",
        backgroundImage: `linear-gradient(${c.grid} 1px, transparent 1px), linear-gradient(90deg, ${c.grid} 1px, transparent 1px)`,
        backgroundSize: "48px 48px",
      }}>

        {/* ── EMBER PARTICLES ── */}
        {EMBERS.map(e => (
          <div key={e.id} style={{
            position: "fixed", left: `${e.left}%`, bottom: `${Math.random() * 8}%`,
            width: e.size, height: e.size, borderRadius: "50%", background: e.color,
            "--tx": e.tx, animation: `emberRise ${e.dur}s ${e.delay}s ease-out infinite`,
            opacity: 0, zIndex: 2, pointerEvents: "none",
          }} />
        ))}

        {/* ── EMBER GLOW BACKDROP ── */}
        <div style={{
          position: "fixed", bottom: 0, left: 0, right: 0, height: "45%",
          background: "radial-gradient(ellipse at 50% 110%, rgba(255,74,0,0.14) 0%, rgba(255,120,0,0.05) 45%, transparent 70%)",
          pointerEvents: "none", zIndex: 1,
        }} />

        {/* ════════════════════════════════
             HERO SECTION
        ════════════════════════════════ */}
        <section style={{
          minHeight: "100vh", display: "flex", flexDirection: "column",
          alignItems: "center", justifyContent: "center", padding: "60px 24px",
          position: "relative", zIndex: 10,
        }}>

          {/* Tag line top */}
          <div style={{
            border: `1px solid rgba(255,74,0,0.4)`, padding: "6px 18px",
            fontSize: 11, letterSpacing: 5, color: c.orange, marginBottom: 36,
            animation: phase ? "fadeUp 0.6s ease forwards" : "none", opacity: 0,
          }}>
            COMBAT SPORTS · EST. 2025
          </div>

          {/* Shield badge */}
          <div style={{
            marginBottom: 32,
            animation: phase ? "badgeDrop 0.7s 0.2s cubic-bezier(0.34,1.56,0.64,1) forwards, shieldPulse 3s 1.5s ease-in-out infinite" : "none",
            opacity: 0,
          }}>
            <Shield size={70} />
          </div>

          {/* ── F O R G E ── */}
          <div style={{ display: "flex", lineHeight: 0.88 }}>
            {"FORGE".split("").map((letter, i) => (
              <span key={i} style={{
                fontSize: "clamp(96px, 20vw, 200px)",
                fontWeight: 900,
                color: "#FFFFFF",
                display: "block",
                animation: phase
                  ? `letterIn 0.65s ${0.3 + i * 0.07}s cubic-bezier(0.16,1,0.3,1) forwards, glowBreathe 4s ${1.5 + i * 0.15}s ease-in-out infinite`
                  : "none",
                opacity: 0,
              }}>
                {letter}
              </span>
            ))}
          </div>

          {/* Separator */}
          <div style={{
            width: 320, height: 2, marginTop: 16,
            background: `linear-gradient(to right, transparent, ${c.orange} 30%, ${c.amber} 70%, transparent)`,
            transformOrigin: "center",
            animation: phase ? "lineGrow 0.9s 0.9s ease forwards" : "none",
            transform: "scaleX(0)",
          }} />

          {/* Subtitle */}
          <div style={{
            fontSize: "clamp(14px, 2.2vw, 20px)", letterSpacing: 10,
            color: c.steel, fontWeight: 700, marginTop: 20, marginBottom: 20,
            animation: phase ? "fadeUp 0.7s 1.1s ease forwards" : "none", opacity: 0,
          }}>
            FIGHTING CHAMPIONSHIP
          </div>

          {/* Tagline */}
          <div style={{
            fontSize: "clamp(20px, 3.5vw, 40px)", fontWeight: 900,
            color: c.orange, letterSpacing: 4, textTransform: "uppercase",
            animation: phase ? "fadeUp 0.7s 1.3s ease forwards" : "none", opacity: 0,
            textAlign: "center",
          }}>
            Heat. Pressure. Perfection.
          </div>

          {/* Secondary tagline */}
          <div style={{
            fontSize: "clamp(12px, 1.5vw, 15px)", letterSpacing: 5,
            color: c.muted, marginTop: 12, fontWeight: 600,
            animation: phase ? "fadeUp 0.7s 1.5s ease forwards" : "none", opacity: 0,
          }}>
            WHERE CHAMPIONS ARE FORGED
          </div>

          {/* Scroll cue */}
          <div style={{
            marginTop: 64, fontSize: 11, letterSpacing: 4, color: c.muted,
            animation: phase ? "fadeUp 0.7s 2.2s ease forwards" : "none", opacity: 0,
            display: "flex", alignItems: "center", gap: 10,
          }}>
            <div style={{ width: 24, height: 1, background: c.muted }} />
            BRAND IDENTITY
            <div style={{ width: 24, height: 1, background: c.muted }} />
          </div>
        </section>

        {/* ════════════════════════════════
             STORY SECTION
        ════════════════════════════════ */}
        <section className="scroll-section" style={{
          maxWidth: 960, margin: "0 auto", padding: "80px 32px",
          display: "grid", gridTemplateColumns: "1fr 1.8fr", gap: 64,
          alignItems: "start", position: "relative", zIndex: 10,
        }}>
          {/* Decorative vertical line */}
          <div style={{
            position: "absolute", left: "35%", top: 40, bottom: 40,
            width: 1, background: `linear-gradient(to bottom, transparent, ${c.dim}, transparent)`,
          }} />

          <div>
            <H mb={10}>The Concept</H>
            <h2 style={{
              fontSize: "clamp(42px, 6vw, 72px)", fontWeight: 900,
              lineHeight: 0.9, color: c.ash, marginBottom: 20,
            }}>
              FORGED<br />IN<br />BATTLE.
            </h2>
            <div style={{ display: "flex", gap: 6 }}>
              <div style={{ width: 32, height: 3, background: c.orange }} />
              <div style={{ width: 8, height: 3, background: c.amber }} />
            </div>
          </div>

          <div>
            <p style={{
              fontFamily: "'Barlow', sans-serif", fontSize: 17,
              lineHeight: 1.75, color: c.steel, marginBottom: 24,
            }}>
              Raw iron only becomes unbreakable steel under extreme heat and relentless 
              pressure. Champions are no different. <strong style={{ color: c.ash }}>FORGE Fighting Championship</strong> is 
              the crucible where the world's elite competitors step in, get tested, 
              and either rise — or break.
            </p>
            <p style={{
              fontFamily: "'Barlow', sans-serif", fontSize: 17,
              lineHeight: 1.75, color: c.steel,
            }}>
              Inside the cage, there is no rank, no mercy, and no shortcuts. Only the 
              fire of competition and the will to endure it.
            </p>

            {/* Stats strip */}
            <div style={{ display: "flex", gap: 32, marginTop: 40, paddingTop: 32, borderTop: `1px solid ${c.dim}` }}>
              {[["8", "WEIGHT CLASSES"], ["12", "EVENTS PER YEAR"], ["32", "RANKED FIGHTERS"]].map(([n, l]) => (
                <div key={l}>
                  <div style={{ fontSize: 40, fontWeight: 900, color: c.orange, lineHeight: 1 }}>{n}</div>
                  <div style={{ fontSize: 10, letterSpacing: 3, color: c.muted, marginTop: 4 }}>{l}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ════════════════════════════════
             BRAND PILLARS
        ════════════════════════════════ */}
        <section className="scroll-section" style={{ padding: "40px 32px 80px", position: "relative", zIndex: 10 }}>
          <div style={{ maxWidth: 960, margin: "0 auto" }}>
            <H mb={24}>Brand Pillars</H>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
              {PILLARS.map(p => (
                <div key={p} className="pillar" style={{
                  border: `1px solid ${c.dim}`, padding: "10px 22px",
                  fontSize: 13, letterSpacing: 4, color: c.ash, fontWeight: 700,
                  cursor: "default", transition: "background 0.2s, color 0.2s",
                }}>
                  {p}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ════════════════════════════════
             COLOR PALETTE
        ════════════════════════════════ */}
        <section className="scroll-section" style={{ padding: "40px 32px 80px", position: "relative", zIndex: 10 }}>
          <div style={{ maxWidth: 960, margin: "0 auto" }}>
            <H mb={24}>Color Palette</H>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              {PALETTE.map(col => (
                <div key={col.hex} style={{ flex: "1 1 120px" }}>
                  <div style={{
                    height: 90, background: col.hex, marginBottom: 10,
                    border: col.border ? `1px solid ${c.dim}` : "none",
                  }} />
                  <div style={{ fontSize: 13, letterSpacing: 2, fontWeight: 800, marginBottom: 4 }}>{col.label}</div>
                  <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: 12, color: c.muted }}>{col.hex}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ════════════════════════════════
             ALTERNATIVE NAMES
        ════════════════════════════════ */}
        <section className="scroll-section" style={{ padding: "40px 32px 100px", position: "relative", zIndex: 10 }}>
          <div style={{ maxWidth: 960, margin: "0 auto" }}>
            <H mb={8}>Alternative Names</H>
            <p style={{ fontFamily: "'Barlow', sans-serif", fontSize: 14, color: c.muted, marginBottom: 28 }}>
              Other strong contenders if you prefer a different direction.
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 16 }}>
              {ALTS.map((alt) => (
                <div key={alt.name} className="card" style={{
                  border: `1px solid ${c.dim}`, padding: "32px 28px",
                  background: "rgba(255,255,255,0.01)", transition: "border-color 0.25s, background 0.25s",
                  cursor: "default", position: "relative", overflow: "hidden",
                }}>
                  <div style={{ position: "absolute", top: 0, right: 0, width: 48, height: 48, background: `linear-gradient(135deg, ${c.orange}22 0%, transparent 60%)` }} />
                  <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: 11, color: c.muted, letterSpacing: 3, marginBottom: 10 }}>
                    {alt.abbr}
                  </div>
                  <div style={{ fontSize: 40, fontWeight: 900, color: c.ash, lineHeight: 1, marginBottom: 12 }}>
                    {alt.name}
                  </div>
                  <div style={{ width: 28, height: 2, background: c.orange, marginBottom: 16 }} />
                  <p style={{ fontFamily: "'Barlow', sans-serif", fontSize: 14, color: c.steel, lineHeight: 1.6 }}>
                    {alt.meaning}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ════════════════════════════════
             FOOTER
        ════════════════════════════════ */}
        <footer style={{
          borderTop: `1px solid ${c.dim}`, padding: "40px 32px",
          display: "flex", alignItems: "center", justifyContent: "space-between",
          flexWrap: "wrap", gap: 20, position: "relative", zIndex: 10,
          background: c.bg2,
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <Shield size={36} />
            <div>
              <div style={{ fontSize: 24, fontWeight: 900, letterSpacing: 5, color: c.ash }}>FORGE FC</div>
              <div style={{ fontSize: 10, letterSpacing: 3, color: c.muted }}>FIGHTING CHAMPIONSHIP</div>
            </div>
          </div>
          <div style={{ fontSize: 11, color: c.muted, letterSpacing: 3, fontStyle: "italic" }}>
            "HEAT. PRESSURE. PERFECTION."
          </div>
        </footer>

      </div>
    </>
  );
}
