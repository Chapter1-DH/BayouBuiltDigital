import { useState, useEffect } from "react";

// ── FONTS ──────────────────────────────────────────────────────────────────────
const fontLink = document.createElement("link");
fontLink.rel = "stylesheet";
fontLink.href = "https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=DM+Serif+Display:ital@0;1&family=DM+Sans:ital,wght@0,300;0,400;0,500;1,300&display=swap";
document.head.appendChild(fontLink);

// ── DESIGN TOKENS ─────────────────────────────────────────────────────────────
const T = {
  bg:       "#F5F0E8",
  ink:      "#1A1208",
  paper:    "#FDFAF4",
  gold:     "#C4922A",
  goldDark: "#8F6718",
  goldPale: "#F5E4BE",
  book:     "#2B5F6E",
  bookPale: "#D6EDF2",
  bookDark: "#1A3D47",
  doll:     "#9E3D55",
  dollPale: "#F9E4EA",
  dollDark: "#6B2238",
  mid:      "#8C7B5E",
  border:   "#DDD5C2",
  shadow:   "rgba(26,18,8,0.12)",
};

const FONT_HEAD  = "'Syne', sans-serif";
const FONT_SERIF = "'DM Serif Display', Georgia, serif";
const FONT_BODY  = "'DM Sans', sans-serif";

const btn = (bg, color, border) => ({
  background: bg, color, border: border || "none",
  borderRadius: 6, padding: "12px 24px",
  fontFamily: FONT_HEAD, fontSize: 14, fontWeight: 700,
  letterSpacing: "0.04em", cursor: "pointer",
  transition: "all 0.18s ease",
});

// ── PRICING DATA ──────────────────────────────────────────────────────────────
const UNIFIED = {
  core: { monthly: 14.99, y1: 149.99, y2: 119.99, y3: 89.99 },
  pro:  { monthly: 19.99, y1: 199.99, y2: 159.99, y3: 119.99 },
};
const STANDALONE = {
  core: { monthly: 8.99,  y1: 89.99,  y2: 71.99,  y3: 53.99 },
  pro:  { monthly: 12.99, y1: 129.99, y2: 103.99, y3: 77.99 },
};

// ── NAV ───────────────────────────────────────────────────────────────────────
function Nav({ page, setPage }) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);

  const links = [
    { id: "home",     label: "Home" },
    { id: "bookflip", label: "BookFlip" },
    { id: "dollflip", label: "DollFlip" },
    { id: "pricing",  label: "Pricing" },
  ];

  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 999,
      background: scrolled ? "rgba(245,240,232,0.96)" : "transparent",
      backdropFilter: scrolled ? "blur(12px)" : "none",
      borderBottom: scrolled ? `1px solid ${T.border}` : "none",
      transition: "all 0.3s ease", padding: "0 32px",
    }}>
      <div style={{ maxWidth: 1100, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", height: 64 }}>
        <button onClick={() => setPage("home")} style={{ background: "none", border: "none", cursor: "pointer" }}>
          <div style={{ display: "flex", gap: 2 }}>
            <span style={{ fontFamily: FONT_SERIF, fontSize: 22, color: T.book, fontStyle: "italic" }}>Flip</span>
            <span style={{ fontFamily: FONT_SERIF, fontSize: 22, color: T.doll, fontStyle: "italic" }}>Suite</span>
          </div>
        </button>
        <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
          {links.map(l => (
            <button key={l.id} onClick={() => setPage(l.id)} style={{
              background: "none", border: "none", padding: "8px 16px", borderRadius: 6,
              fontFamily: FONT_HEAD, fontSize: 14, fontWeight: page === l.id ? 700 : 500,
              color: page === l.id ? T.gold : T.ink, cursor: "pointer",
              borderBottom: page === l.id ? `2px solid ${T.gold}` : "2px solid transparent",
              transition: "all 0.15s",
            }}>{l.label}</button>
          ))}
          <button onClick={() => setPage("pricing")} style={{ ...btn(T.gold, "#fff"), marginLeft: 12, padding: "9px 20px", fontSize: 13 }}>
            Get Started
          </button>
        </div>
      </div>
    </nav>
  );
}

// ── HOME PAGE ─────────────────────────────────────────────────────────────────
function HomePage({ setPage }) {
  return (
    <div>
      <section style={{
        minHeight: "100vh",
        background: `linear-gradient(160deg, ${T.bg} 0%, #EDE6D6 60%, ${T.goldPale} 100%)`,
        display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
        padding: "120px 24px 80px", position: "relative", overflow: "hidden",
      }}>
        <div style={{ position: "absolute", top: "10%", right: "8%", width: 280, height: 280, borderRadius: "50%", background: T.bookPale, opacity: 0.5, filter: "blur(60px)" }} />
        <div style={{ position: "absolute", bottom: "15%", left: "5%", width: 220, height: 220, borderRadius: "50%", background: T.dollPale, opacity: 0.5, filter: "blur(50px)" }} />

        <div style={{ textAlign: "center", maxWidth: 720, position: "relative" }}>
          <div style={{
            display: "inline-block", background: T.goldPale, border: `1px solid ${T.gold}55`,
            borderRadius: 20, padding: "5px 16px", fontFamily: FONT_HEAD, fontSize: 12,
            fontWeight: 700, color: T.goldDark, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 24,
          }}>Built for Resellers. Manual or AI — You Choose.</div>

          <h1 style={{ fontFamily: FONT_SERIF, fontSize: "clamp(48px, 8vw, 82px)", color: T.ink, lineHeight: 1.1, marginBottom: 24, fontStyle: "italic" }}>
            List faster.<br /><span style={{ color: T.gold }}>Sell smarter.</span>
          </h1>

          <p style={{ fontFamily: FONT_BODY, fontSize: 18, color: T.mid, lineHeight: 1.7, maxWidth: 560, margin: "0 auto 40px" }}>
            FlipSuite gives resellers two specialized tools — BookFlip and DollFlip — to identify, price, and list items fast. Start with manual entry on Core, or unlock AI identification and pricing on Pro. Your tools, your tier.
          </p>

          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
            <button onClick={() => setPage("pricing")} style={{ ...btn(T.gold, "#fff"), padding: "14px 32px", fontSize: 15 }}>
              See Plans & Pricing →
            </button>
            <button onClick={() => setPage("bookflip")} style={{ ...btn("transparent", T.ink, `2px solid ${T.border}`), padding: "14px 32px", fontSize: 15 }}>
              See the apps
            </button>
          </div>
        </div>

        <div style={{ display: "flex", gap: 20, marginTop: 72, maxWidth: 780, width: "100%", flexWrap: "wrap", justifyContent: "center" }}>
          {[
            { label: "BookFlip", emoji: "📚", desc: "Scan or enter books. AI identifies edition, prices the market, writes your listing.", color: T.book, pale: T.bookPale, page: "bookflip" },
            { label: "DollFlip", emoji: "🪆", desc: "Snap a doll. AI identifies brand, era, completeness, and generates a collector-ready listing.", color: T.doll, pale: T.dollPale, page: "dollflip" },
          ].map(c => (
            <button key={c.label} onClick={() => setPage(c.page)} style={{
              flex: "1 1 300px", maxWidth: 360, background: T.paper, border: `1px solid ${T.border}`,
              borderRadius: 16, padding: "28px 28px 24px", textAlign: "left", cursor: "pointer",
              boxShadow: `0 4px 20px ${T.shadow}`, transition: "transform 0.2s, box-shadow 0.2s",
            }}
              onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = `0 12px 32px ${T.shadow}`; }}
              onMouseLeave={e => { e.currentTarget.style.transform = ""; e.currentTarget.style.boxShadow = `0 4px 20px ${T.shadow}`; }}
            >
              <div style={{ fontSize: 36, marginBottom: 12 }}>{c.emoji}</div>
              <div style={{ fontFamily: FONT_HEAD, fontSize: 20, fontWeight: 800, color: c.color, marginBottom: 8 }}>{c.label}</div>
              <div style={{ fontFamily: FONT_BODY, fontSize: 14, color: T.mid, lineHeight: 1.6 }}>{c.desc}</div>
              <div style={{ marginTop: 16, fontFamily: FONT_HEAD, fontSize: 12, fontWeight: 700, color: c.color, letterSpacing: "0.06em" }}>LEARN MORE →</div>
            </button>
          ))}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section style={{ background: T.paper, padding: "100px 24px" }}>
        <div style={{ maxWidth: 1000, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 64 }}>
            <h2 style={{ fontFamily: FONT_SERIF, fontSize: 42, color: T.ink, fontStyle: "italic", marginBottom: 12 }}>Two ways to list. Zero guesswork.</h2>
            <p style={{ fontFamily: FONT_BODY, fontSize: 16, color: T.mid, maxWidth: 480, margin: "0 auto" }}>
              Whether you prefer AI speed or hands-on control, FlipSuite has you covered.
            </p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 32 }}>
            {[
              { step: "01", icon: "📷", title: "Photograph or Enter", desc: "Upload a photo for AI scan (Pro), or manually type in what you know. Both paths create the same polished listing." },
              { step: "02", icon: "🔍", title: "AI Identifies & Prices", desc: "Pro subscribers get instant AI identification of title, condition, edition, era, and current market pricing." },
              { step: "03", icon: "📋", title: "Copy-Ready Listing", desc: "Get a complete, platform-tailored listing description you can paste directly to eBay, Mercari, Etsy, and more." },
              { step: "04", icon: "📦", title: "Track Your Inventory", desc: "Every item — AI-scanned or manual — lives in your inventory panel with condition, price, and platform tags." },
            ].map(s => (
              <div key={s.step}>
                <div style={{ fontFamily: FONT_HEAD, fontSize: 11, fontWeight: 800, color: T.gold, letterSpacing: "0.14em", marginBottom: 16 }}>{s.step}</div>
                <div style={{ fontSize: 28, marginBottom: 12 }}>{s.icon}</div>
                <div style={{ fontFamily: FONT_HEAD, fontSize: 17, fontWeight: 700, color: T.ink, marginBottom: 8 }}>{s.title}</div>
                <div style={{ fontFamily: FONT_BODY, fontSize: 14, color: T.mid, lineHeight: 1.65 }}>{s.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PERPETUAL BANNER */}
      <section style={{ background: `linear-gradient(135deg, ${T.goldDark} 0%, ${T.gold} 100%)`, padding: "64px 24px" }}>
        <div style={{ maxWidth: 760, margin: "0 auto", textAlign: "center" }}>
          <div style={{ fontSize: 40, marginBottom: 16 }}>🔒</div>
          <h2 style={{ fontFamily: FONT_SERIF, fontSize: 36, color: "#fff", fontStyle: "italic", marginBottom: 16 }}>Your tools. Forever.</h2>
          <p style={{ fontFamily: FONT_BODY, fontSize: 17, color: "rgba(255,255,255,0.85)", lineHeight: 1.7, marginBottom: 32 }}>
            Subscribe for 12 consecutive months and earn a <strong>perpetual fallback license</strong> — that version of FlipSuite is yours to keep, even if you cancel. Stay on annual and your price drops 20% in Year 2 and 40% in Year 3+.
          </p>
          <button onClick={() => setPage("pricing")} style={{ ...btn("#fff", T.goldDark), padding: "13px 28px", fontSize: 15 }}>
            See Pricing & Loyalty Discounts →
          </button>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section style={{ background: T.bg, padding: "100px 24px" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <h2 style={{ fontFamily: FONT_SERIF, fontSize: 40, color: T.ink, fontStyle: "italic", textAlign: "center", marginBottom: 56 }}>Resellers love it.</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 24 }}>
            {[
              { quote: "BookFlip cut my listing time in half. I used to spend 10 minutes per book. Now it's under 2.", name: "Rhonda T.", role: "eBay book reseller, 3 years" },
              { quote: "The manual entry is perfect for estate sale hauls when I don't have signal. I fill it in later and it formats everything perfectly.", name: "Marcus W.", role: "Flea market vendor" },
              { quote: "DollFlip identified a Madame Alexander I'd been guessing at for weeks. Priced it right and sold in two days.", name: "Celeste P.", role: "Vintage doll collector & seller" },
            ].map((t, i) => (
              <div key={i} style={{ background: T.paper, border: `1px solid ${T.border}`, borderRadius: 14, padding: "28px 24px", boxShadow: `0 2px 12px ${T.shadow}` }}>
                <div style={{ fontFamily: FONT_BODY, fontSize: 15, color: T.ink, lineHeight: 1.7, marginBottom: 20, fontStyle: "italic" }}>"{t.quote}"</div>
                <div style={{ fontFamily: FONT_HEAD, fontSize: 13, fontWeight: 700, color: T.gold }}>{t.name}</div>
                <div style={{ fontFamily: FONT_BODY, fontSize: 12, color: T.mid }}>{t.role}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: T.ink, padding: "80px 24px", textAlign: "center" }}>
        <h2 style={{ fontFamily: FONT_SERIF, fontSize: 42, color: "#fff", fontStyle: "italic", marginBottom: 16 }}>Ready to flip faster?</h2>
        <p style={{ fontFamily: FONT_BODY, fontSize: 16, color: "rgba(255,255,255,0.6)", marginBottom: 32 }}>
          Core from $14.99/mo · Pro with AI from $19.99/mo · Both get cheaper every year you stay.
        </p>
        <button onClick={() => setPage("pricing")} style={{ ...btn(T.gold, "#fff"), padding: "15px 36px", fontSize: 16 }}>
          Choose Your Plan →
        </button>
      </section>
    </div>
  );
}

// ── PRODUCT PAGE ──────────────────────────────────────────────────────────────
function ProductPage({ product, setPage }) {
  const isBook    = product === "book";
  const color     = isBook ? T.book     : T.doll;
  const colorDk   = isBook ? T.bookDark : T.dollDark;
  const colorPale = isBook ? T.bookPale : T.dollPale;
  const emoji     = isBook ? "📚" : "🪆";
  const name      = isBook ? "BookFlip" : "DollFlip";
  const tagline   = isBook
    ? "The fastest way to identify, price, and list used books for resale."
    : "AI-powered doll identification for collectors and resellers.";
  const platforms = isBook
    ? ["eBay", "Amazon", "AbeBooks", "ThriftBooks", "Mercari", "Facebook"]
    : ["eBay", "Etsy", "Ruby Lane", "Dollshops", "Mercari", "Facebook"];

  const features = isBook ? [
    { icon: "📖", title: "Title & Author ID", desc: "AI reads spine, cover, or barcode to identify edition, print run, and publisher. Pro only." },
    { icon: "💰", title: "Live Market Pricing", desc: "Returns Low / Avg / High and a recommended Your Price based on current resale comps. Pro only." },
    { icon: "🏷️", title: "Condition Grading", desc: "Five-level grading (Like New → Poor) with automatic condition language in the listing. All plans." },
    { icon: "✏️", title: "Manual Entry Mode", desc: "Type in any book without a photo. Same structured listing output, no AI required. All plans." },
    { icon: "📋", title: "Copy-Ready Description", desc: "Platform-aware listing copy written for book buyers — honest, detailed, compelling. All plans." },
    { icon: "📦", title: "Inventory Tracker", desc: "Every item saves to your session inventory with condition, price, and platform tags. All plans." },
  ] : [
    { icon: "🪆", title: "Brand & Model ID", desc: "AI identifies manufacturer, model line, decade, and material from a single photo. Pro only." },
    { icon: "📅", title: "Era Dating", desc: "Pinpoints the decade and collector category — critical for accurate vintage pricing. Pro only." },
    { icon: "✅", title: "Completeness Check", desc: "Tracks doll only vs. outfit vs. full set with box — all affect price significantly. Pro only." },
    { icon: "✏️", title: "Manual Entry Mode", desc: "Enter any doll by hand: brand, era, material, size, completeness, and more. All plans." },
    { icon: "💎", title: "Collector-Grade Listings", desc: "Descriptions written for doll collector audiences — knowledgeable and honest. All plans." },
    { icon: "📦", title: "Inventory Tracker", desc: "Full inventory with condition grades, prices, and platform targeting tracked. All plans." },
  ];

  return (
    <div>
      <section style={{
        minHeight: "85vh",
        background: `linear-gradient(150deg, ${colorPale} 0%, ${T.bg} 70%)`,
        display: "flex", alignItems: "center", padding: "120px 24px 80px",
      }}>
        <div style={{ maxWidth: 1000, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, alignItems: "center", width: "100%" }}>
          <div>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: colorPale, border: `1px solid ${color}44`, borderRadius: 20, padding: "5px 14px", marginBottom: 24 }}>
              <span style={{ fontSize: 16 }}>{emoji}</span>
              <span style={{ fontFamily: FONT_HEAD, fontSize: 12, fontWeight: 700, color: colorDk, letterSpacing: "0.1em", textTransform: "uppercase" }}>{name}</span>
            </div>
            <h1 style={{ fontFamily: FONT_SERIF, fontSize: "clamp(36px, 5vw, 58px)", color: T.ink, fontStyle: "italic", lineHeight: 1.15, marginBottom: 20 }}>{tagline}</h1>
            <p style={{ fontFamily: FONT_BODY, fontSize: 16, color: T.mid, lineHeight: 1.7, marginBottom: 36 }}>
              {isBook
                ? "BookFlip combines AI vision with resale market data to deliver a complete listing in under 30 seconds (Pro). Or skip the camera and enter manually — same output, no AI required (Core)."
                : "DollFlip knows what collectors care about: brand, era, completeness, and condition. AI identification from a single photo (Pro), or full manual entry for every detail (Core)."}
            </p>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              <button onClick={() => setPage("pricing")} style={{ ...btn(color, "#fff"), padding: "13px 28px" }}>Get {name} →</button>
              <button onClick={() => setPage("pricing")} style={{ ...btn("transparent", T.ink, `2px solid ${T.border}`), padding: "13px 28px" }}>View Pricing</button>
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {[
              "AI photo identification (Pro)",
              "Manual entry mode (all plans)",
              "Market pricing — Low / Avg / High (Pro)",
              "Copy-ready listing descriptions (all plans)",
              "Platform targeting (all plans)",
              "Session inventory tracker (all plans)",
              isBook ? "ISBN & edition lookup (Pro)" : "Era dating & completeness grading (Pro)",
            ].map(f => (
              <div key={f} style={{ display: "flex", alignItems: "center", gap: 12, background: T.paper, border: `1px solid ${T.border}`, borderRadius: 10, padding: "12px 18px" }}>
                <div style={{ width: 8, height: 8, borderRadius: "50%", background: color, flexShrink: 0 }} />
                <span style={{ fontFamily: FONT_BODY, fontSize: 14, color: T.ink }}>{f}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURE GRID */}
      <section style={{ background: T.paper, padding: "100px 24px" }}>
        <div style={{ maxWidth: 1000, margin: "0 auto" }}>
          <h2 style={{ fontFamily: FONT_SERIF, fontSize: 40, color: T.ink, fontStyle: "italic", textAlign: "center", marginBottom: 56 }}>Everything {name} does.</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 24 }}>
            {features.map(f => (
              <div key={f.title} style={{ background: T.bg, border: `1px solid ${T.border}`, borderRadius: 12, padding: "24px 22px" }}>
                <div style={{ fontSize: 28, marginBottom: 12 }}>{f.icon}</div>
                <div style={{ fontFamily: FONT_HEAD, fontSize: 16, fontWeight: 700, color: color, marginBottom: 8 }}>{f.title}</div>
                <div style={{ fontFamily: FONT_BODY, fontSize: 14, color: T.mid, lineHeight: 1.65 }}>{f.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CORE vs PRO */}
      <section style={{ background: T.bg, padding: "100px 24px" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <h2 style={{ fontFamily: FONT_SERIF, fontSize: 40, color: T.ink, fontStyle: "italic", textAlign: "center", marginBottom: 16 }}>Core vs. Pro</h2>
          <p style={{ fontFamily: FONT_BODY, fontSize: 15, color: T.mid, textAlign: "center", marginBottom: 52 }}>Both tiers include manual entry and inventory. Pro adds AI on top.</p>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
            {[
              {
                tier: "Core", price: `$${STANDALONE.core.monthly}/mo`, badge: "Manual entry included", badgeColor: T.mid,
                points: ["Full manual entry form", "Condition grading buttons", "Your own pricing fields", "Platform selection", "Copy-ready listing output", "Session inventory tracker", "Perpetual fallback after 12 mo."],
              },
              {
                tier: "Pro", price: `$${STANDALONE.pro.monthly}/mo`, badge: "AI included", badgeColor: T.gold,
                points: ["Everything in Core", "AI photo identification", "AI market pricing (Low/Avg/High)", "AI listing description generation", "Perpetual fallback after 12 mo.", "20% off in Year 2 · 40% off in Year 3+"],
              },
            ].map(m => (
              <div key={m.tier} style={{ background: T.paper, border: `1px solid ${T.border}`, borderRadius: 16, padding: "28px 24px", boxShadow: `0 2px 14px ${T.shadow}` }}>
                <div style={{ fontFamily: FONT_HEAD, fontSize: 19, fontWeight: 800, color: T.ink, marginBottom: 4 }}>{m.tier}</div>
                <div style={{ fontFamily: FONT_SERIF, fontSize: 28, color: color, fontStyle: "italic", marginBottom: 12 }}>{m.price}</div>
                <div style={{ display: "inline-block", background: m.badgeColor + "20", border: `1px solid ${m.badgeColor}55`, borderRadius: 12, padding: "3px 12px", fontFamily: FONT_HEAD, fontSize: 11, fontWeight: 700, color: m.badgeColor, marginBottom: 20, letterSpacing: "0.05em" }}>{m.badge}</div>
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  {m.points.map(p => (
                    <div key={p} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                      <div style={{ color: color, fontWeight: 700, flexShrink: 0, marginTop: 1 }}>✓</div>
                      <div style={{ fontFamily: FONT_BODY, fontSize: 14, color: T.mid }}>{p}</div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div style={{ textAlign: "center", marginTop: 32 }}>
            <button onClick={() => setPage("pricing")} style={{ ...btn(T.gold, "#fff"), padding: "13px 28px" }}>
              See Full Pricing & Loyalty Discounts →
            </button>
          </div>
        </div>
      </section>

      {/* PLATFORMS */}
      <section style={{ background: T.paper, padding: "64px 24px" }}>
        <div style={{ maxWidth: 800, margin: "0 auto", textAlign: "center" }}>
          <h3 style={{ fontFamily: FONT_HEAD, fontSize: 14, fontWeight: 700, letterSpacing: "0.12em", color: T.mid, textTransform: "uppercase", marginBottom: 28 }}>Supports listings for</h3>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 12, justifyContent: "center" }}>
            {platforms.map(p => (
              <div key={p} style={{ background: colorPale, border: `1px solid ${color}44`, borderRadius: 8, padding: "8px 18px", fontFamily: FONT_HEAD, fontSize: 13, fontWeight: 600, color: colorDk }}>{p}</div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ background: colorDk, padding: "72px 24px", textAlign: "center" }}>
        <h2 style={{ fontFamily: FONT_SERIF, fontSize: 38, color: "#fff", fontStyle: "italic", marginBottom: 16 }}>Ready to try {name}?</h2>
        <p style={{ fontFamily: FONT_BODY, fontSize: 15, color: "rgba(255,255,255,0.7)", marginBottom: 32 }}>Available on Core (manual) and Pro (manual + AI). Both tiers include BookFlip and DollFlip.</p>
        <button onClick={() => setPage("pricing")} style={{ ...btn("#fff", colorDk), padding: "14px 32px", fontSize: 15 }}>See Plans & Pricing →</button>
      </section>
    </div>
  );
}

// ── PRICING PAGE ──────────────────────────────────────────────────────────────
function PricingPage({ setPage }) {
  const [view, setView] = useState("unified");
  const [year, setYear] = useState("y1");

  const prices = view === "unified" ? UNIFIED : STANDALONE;

  const yearMeta = {
    monthly: { label: "Monthly",          sub: "Billed month to month · No loyalty discounts" },
    y1:      { label: "Year 1 Annual",    sub: "First year billed annually" },
    y2:      { label: "Year 2  −20%",     sub: "Second year · 20% loyalty discount unlocked" },
    y3:      { label: "Year 3+  −40%",    sub: "Third year onward · 40% loyalty discount locked in" },
  };

  const formatPrice = (tier) => {
    const p = prices[tier];
    if (year === "monthly") return { main: `$${p.monthly}`, sub: "/mo", note: "Billed monthly — no loyalty discounts apply" };
    const annual  = p[year];
    const monthly = (annual / 12).toFixed(2);
    const notes   = { y1: `$${annual}/yr · billed annually`, y2: `$${annual}/yr · 20% off full price`, y3: `$${annual}/yr · 40% off full price` };
    return { main: `$${monthly}`, sub: "/mo", note: notes[year] };
  };

  const planDefs = [
    {
      id: "core", name: "Core", highlight: false,
      desc: (v) => v === "unified"
        ? "Full manual entry for both BookFlip and DollFlip. Build listings, track inventory — no AI required."
        : "Full manual entry for one app of your choice. Build listings and track inventory — no AI required.",
      features: (v) => [
        { text: v === "unified" ? "BookFlip — manual entry" : "One app — manual entry", yes: true },
        { text: v === "unified" ? "DollFlip — manual entry" : "Full condition & pricing fields", yes: true },
        { text: "Session inventory tracker", yes: true },
        { text: "Copy-ready listing output", yes: true },
        { text: "Platform selection & targeting", yes: true },
        { text: "Condition grading tools", yes: true },
        { text: "Perpetual fallback after 12 mo.", yes: true },
        { text: "AI photo identification", yes: false },
        { text: "AI market pricing (Low/Avg/High)", yes: false },
        { text: "AI listing generation", yes: false },
      ],
      cta: "Start Core",
    },
    {
      id: "pro", name: "Pro", badge: "Most Popular", highlight: true,
      desc: (v) => v === "unified"
        ? "Everything in Core plus AI-powered identification, market pricing, and listing generation for both BookFlip and DollFlip."
        : "Everything in Core plus AI-powered identification, market pricing, and listing generation for your chosen app.",
      features: (v) => [
        { text: v === "unified" ? "BookFlip — AI scan + manual" : "One app — AI scan + manual", yes: true },
        { text: v === "unified" ? "DollFlip — AI scan + manual" : "Full condition & pricing fields", yes: true },
        { text: "Session inventory tracker", yes: true },
        { text: "Copy-ready listing output", yes: true },
        { text: "Platform selection & targeting", yes: true },
        { text: "Condition grading tools", yes: true },
        { text: "Perpetual fallback after 12 mo.", yes: true },
        { text: "AI photo identification", yes: true },
        { text: "AI market pricing (Low/Avg/High)", yes: true },
        { text: "AI listing generation", yes: true },
      ],
      cta: "Start Pro",
    },
  ];

  return (
    <div style={{ background: T.bg, minHeight: "100vh", paddingTop: 100 }}>

      {/* HEADER */}
      <section style={{ padding: "64px 24px 0", textAlign: "center" }}>
        <h1 style={{ fontFamily: FONT_SERIF, fontSize: "clamp(40px, 6vw, 64px)", color: T.ink, fontStyle: "italic", marginBottom: 16 }}>
          Simple, honest pricing.
        </h1>
        <p style={{ fontFamily: FONT_BODY, fontSize: 17, color: T.mid, maxWidth: 540, margin: "0 auto 36px" }}>
          Two clean tiers. No add-ons. AI is built into Pro. Stay longer and unlock deeper discounts — your loyalty is rewarded every year.
        </p>

        {/* Unified / Standalone toggle */}
        <div style={{ display: "inline-flex", background: T.paper, border: `1px solid ${T.border}`, borderRadius: 10, padding: 4, marginBottom: 24 }}>
          {[["unified", "FlipSuite — Both Apps"], ["standalone", "Single App"]].map(([id, label]) => (
            <button key={id} onClick={() => setView(id)} style={{
              background: view === id ? T.ink : "transparent",
              color: view === id ? "#fff" : T.mid,
              border: "none", borderRadius: 7, padding: "8px 22px",
              fontFamily: FONT_HEAD, fontSize: 13, fontWeight: 700,
              cursor: "pointer", transition: "all 0.2s",
            }}>{label}</button>
          ))}
        </div>

        {/* Year selector */}
        <div style={{ display: "flex", justifyContent: "center", gap: 8, flexWrap: "wrap" }}>
          {Object.entries(yearMeta).map(([id, meta]) => (
            <button key={id} onClick={() => setYear(id)} style={{
              background: year === id ? T.gold : T.paper,
              color: year === id ? "#fff" : T.mid,
              border: `1px solid ${year === id ? T.gold : T.border}`,
              borderRadius: 8, padding: "7px 18px",
              fontFamily: FONT_HEAD, fontSize: 12, fontWeight: 700,
              cursor: "pointer", transition: "all 0.2s", letterSpacing: "0.03em",
            }}>{meta.label}</button>
          ))}
        </div>
        <div style={{ marginTop: 10, fontFamily: FONT_BODY, fontSize: 13, color: year !== "monthly" ? T.gold : T.mid }}>
          {yearMeta[year].sub}
        </div>
      </section>

      {/* PLAN CARDS */}
      <section style={{ padding: "48px 24px 0", maxWidth: 860, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 24 }}>
          {planDefs.map(plan => {
            const p = formatPrice(plan.id);
            return (
              <div key={plan.id} style={{
                background: T.paper,
                border: plan.highlight ? `2px solid ${T.gold}` : `1px solid ${T.border}`,
                borderRadius: 18, overflow: "hidden",
                boxShadow: plan.highlight ? `0 8px 32px ${T.gold}28` : `0 4px 20px ${T.shadow}`,
                position: "relative",
              }}>
                {plan.badge && (
                  <div style={{ position: "absolute", top: 20, right: 20, background: T.gold, color: "#fff", borderRadius: 12, padding: "3px 12px", fontFamily: FONT_HEAD, fontSize: 11, fontWeight: 800, letterSpacing: "0.06em" }}>{plan.badge}</div>
                )}
                <div style={{ padding: "32px 28px 0" }}>
                  <div style={{ fontFamily: FONT_HEAD, fontSize: 13, fontWeight: 800, color: plan.highlight ? T.gold : T.mid, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 8 }}>{plan.name}</div>
                  <div style={{ display: "flex", alignItems: "flex-end", gap: 4, marginBottom: 4 }}>
                    <span style={{ fontFamily: FONT_SERIF, fontSize: 52, color: T.ink, fontStyle: "italic", lineHeight: 1 }}>{p.main}</span>
                    <span style={{ fontFamily: FONT_BODY, fontSize: 14, color: T.mid, paddingBottom: 8 }}>{p.sub}</span>
                  </div>
                  <div style={{ fontFamily: FONT_BODY, fontSize: 12, color: year !== "monthly" ? T.gold : T.mid, marginBottom: 4 }}>{p.note}</div>
                  <p style={{ fontFamily: FONT_BODY, fontSize: 14, color: T.mid, lineHeight: 1.6, margin: "12px 0 24px" }}>{plan.desc(view)}</p>
                  <button style={{ ...btn(plan.highlight ? T.gold : T.ink, "#fff"), width: "100%", textAlign: "center", padding: "13px", fontSize: 14 }}>{plan.cta}</button>
                </div>
                <div style={{ padding: "24px 28px 32px" }}>
                  <div style={{ width: "100%", height: 1, background: T.border, marginBottom: 20 }} />
                  <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                    {plan.features(view).map((f, i) => (
                      <div key={i} style={{ display: "flex", gap: 10, alignItems: "flex-start", opacity: f.yes ? 1 : 0.35 }}>
                        <span style={{ color: f.yes ? T.gold : T.mid, fontWeight: 700, flexShrink: 0, fontSize: 13 }}>{f.yes ? "✓" : "✗"}</span>
                        <span style={{ fontFamily: FONT_BODY, fontSize: 13, color: T.ink }}>{f.text}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {view === "standalone" && (
          <div style={{ marginTop: 24, background: T.goldPale, border: `1px solid ${T.gold}55`, borderRadius: 12, padding: "20px 24px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16 }}>
            <div>
              <div style={{ fontFamily: FONT_HEAD, fontSize: 14, fontWeight: 800, color: T.goldDark, marginBottom: 4 }}>💡 Need both apps?</div>
              <div style={{ fontFamily: FONT_BODY, fontSize: 13, color: T.goldDark }}>
                Two standalone Pros = ${(STANDALONE.pro.y1 * 2).toFixed(2)}/yr &nbsp;·&nbsp; FlipSuite Pro = ${UNIFIED.pro.y1}/yr &nbsp;·&nbsp; Save ${((STANDALONE.pro.y1 * 2) - UNIFIED.pro.y1).toFixed(2)} in Year 1 alone.
              </div>
            </div>
            <button onClick={() => setView("unified")} style={{ ...btn(T.gold, "#fff"), padding: "10px 20px", fontSize: 13, whiteSpace: "nowrap" }}>View FlipSuite →</button>
          </div>
        )}
      </section>

      {/* LOYALTY TABLE */}
      <section style={{ maxWidth: 860, margin: "0 auto", padding: "48px 24px 0" }}>
        <div style={{ background: T.paper, border: `1px solid ${T.border}`, borderRadius: 16, overflow: "hidden" }}>
          <div style={{ padding: "28px 32px 24px", borderBottom: `1px solid ${T.border}` }}>
            <div style={{ fontFamily: FONT_HEAD, fontSize: 14, fontWeight: 800, letterSpacing: "0.08em", color: T.ink, textTransform: "uppercase", marginBottom: 6 }}>🏆 Loyalty Discount Schedule</div>
            <div style={{ fontFamily: FONT_BODY, fontSize: 14, color: T.mid }}>
              The longer you stay on annual, the less you pay. Modeled after the JetBrains personal subscription structure — the gold standard for developer tools loyalty pricing.
            </div>
          </div>
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontFamily: FONT_BODY, fontSize: 14 }}>
              <thead>
                <tr style={{ background: T.bg }}>
                  {["Plan", "Monthly", "Year 1 Annual", "Year 2 (−20%)", "Year 3+ (−40%)"].map(h => (
                    <th key={h} style={{ padding: "12px 20px", textAlign: "left", fontFamily: FONT_HEAD, fontSize: 11, fontWeight: 700, color: T.mid, letterSpacing: "0.06em", textTransform: "uppercase", borderBottom: `1px solid ${T.border}` }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {(view === "unified" ? [
                  { label: "FlipSuite Core", tier: "core" },
                  { label: "FlipSuite Pro",  tier: "pro"  },
                ] : [
                  { label: "Standalone Core", tier: "core" },
                  { label: "Standalone Pro",  tier: "pro"  },
                ]).map((row, i) => {
                  const p = prices[row.tier];
                  return (
                    <tr key={i} style={{ borderBottom: `1px solid ${T.border}`, background: i % 2 === 0 ? "transparent" : T.bg + "66" }}>
                      <td style={{ padding: "14px 20px", fontWeight: 700, color: T.ink }}>{row.label}</td>
                      <td style={{ padding: "14px 20px", color: T.mid }}>${p.monthly}/mo</td>
                      <td style={{ padding: "14px 20px", color: T.ink }}>
                        <div style={{ fontWeight: 600 }}>${(p.y1 / 12).toFixed(2)}/mo</div>
                        <div style={{ fontSize: 11, color: T.mid }}>${p.y1}/yr</div>
                      </td>
                      <td style={{ padding: "14px 20px" }}>
                        <div style={{ fontWeight: 700, color: T.gold }}>${(p.y2 / 12).toFixed(2)}/mo</div>
                        <div style={{ fontSize: 11, color: T.mid }}>${p.y2}/yr</div>
                      </td>
                      <td style={{ padding: "14px 20px" }}>
                        <div style={{ fontWeight: 700, color: T.goldDark }}>${(p.y3 / 12).toFixed(2)}/mo</div>
                        <div style={{ fontSize: 11, color: T.mid }}>${p.y3}/yr</div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <div style={{ padding: "16px 32px 20px", background: T.goldPale }}>
            <div style={{ fontFamily: FONT_BODY, fontSize: 13, color: T.goldDark, lineHeight: 1.6 }}>
              <strong>Annual only.</strong> Monthly billing stays at full price always — discounts apply exclusively to annual subscriptions. Miss a renewal? You have a 6-month grace window to backdate and preserve your loyalty streak.
            </div>
          </div>
        </div>
      </section>

      {/* PERPETUAL FALLBACK */}
      <section style={{ maxWidth: 860, margin: "0 auto", padding: "32px 24px 0" }}>
        <div style={{ background: T.paper, border: `1px solid ${T.border}`, borderRadius: 16, padding: "32px" }}>
          <div style={{ fontFamily: FONT_HEAD, fontSize: 14, fontWeight: 800, letterSpacing: "0.08em", color: T.ink, textTransform: "uppercase", marginBottom: 20 }}>🔒 The Perpetual Fallback License</div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(190px, 1fr))", gap: 28, marginBottom: 24 }}>
            {[
              { n: "01", title: "Subscribe",       desc: "Start any plan — monthly or annual, Core or Pro." },
              { n: "02", title: "Stay 12 months",  desc: "Maintain an uninterrupted subscription for 12 consecutive months." },
              { n: "03", title: "It's yours",      desc: "Earn a permanent license to the current version. Cancel anytime — the app stays yours." },
              { n: "04", title: "Keep saving",     desc: "Stay on annual and your price drops 20% in Year 2, then 40% in Year 3 and every year after." },
            ].map(s => (
              <div key={s.n}>
                <div style={{ fontFamily: FONT_HEAD, fontSize: 11, fontWeight: 800, color: T.gold, letterSpacing: "0.14em", marginBottom: 8 }}>{s.n}</div>
                <div style={{ fontFamily: FONT_HEAD, fontSize: 15, fontWeight: 700, color: T.ink, marginBottom: 6 }}>{s.title}</div>
                <div style={{ fontFamily: FONT_BODY, fontSize: 13, color: T.mid, lineHeight: 1.65 }}>{s.desc}</div>
              </div>
            ))}
          </div>
          <div style={{ padding: "14px 18px", background: T.goldPale, borderRadius: 8, fontFamily: FONT_BODY, fontSize: 13, color: T.goldDark, lineHeight: 1.6 }}>
            <strong>Core subscribers</strong> earn a perpetual license to the manual-entry version. <strong>Pro subscribers</strong> earn a perpetual license to the full AI-enabled version. You keep what you paid for — permanently.
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section style={{ maxWidth: 760, margin: "0 auto", padding: "64px 24px 100px" }}>
        <h2 style={{ fontFamily: FONT_SERIF, fontSize: 36, color: T.ink, fontStyle: "italic", marginBottom: 40, textAlign: "center" }}>Common questions.</h2>
        {[
          { q: "What's the difference between Core and Pro?", a: "Both tiers include full manual entry for BookFlip and DollFlip (unified) or your chosen app (standalone), session inventory tracking, copy-ready listing output, and condition grading. Pro adds AI photo identification, AI market pricing (Low/Avg/High), and AI listing generation. There are no add-ons — AI is part of Pro, period." },
          { q: "How do the loyalty discounts work?", a: "Annual subscribers receive 20% off in their second year and 40% off from their third year onward — as long as the subscription stays uninterrupted. Monthly billing always stays at full price. If you miss a renewal, you have a 6-month grace window to backdate and preserve your discount streak without losing your progress." },
          { q: "What is the perpetual fallback license?", a: "After 12 consecutive months of uninterrupted subscription, you earn the right to use the version of FlipSuite current at that time — forever, with no further payments. Core subscribers keep the manual-entry version. Pro subscribers keep the full AI-enabled version. You won't receive future updates after canceling, but the apps remain fully functional." },
          { q: "What happens if I cancel before 12 months?", a: "You lose access at the end of your billing period with no perpetual fallback. Your loyalty discount clock also resets. If you resubscribe, both the 12-month perpetual clock and the discount progression start fresh from zero." },
          { q: "Should I get FlipSuite or a standalone app?", a: `FlipSuite is the better deal for anyone who handles both books and dolls — estate sale flippers, general resellers, thrift store hunters. Two standalone Pros at Year 1 cost $${(STANDALONE.pro.y1 * 2).toFixed(2)}/yr. FlipSuite Pro is $${UNIFIED.pro.y1}/yr. If you truly specialize in only one category and never expect to cross over, the standalone is a clean, lower entry point.` },
          { q: "Does AI require an internet connection?", a: "Yes. AI features require an active connection. Manual entry works fully offline — ideal for estate sales and flea markets with poor signal. Your inventory saves locally and stays accessible without internet." },
          { q: "Is this a download or a web app?", a: "FlipSuite runs entirely in your browser — no download, no installation required. It works on desktop and mobile. The perpetual fallback license applies to the browser-based version current at the time of your cancellation." },
        ].map((faq, i) => <FAQItem key={i} q={faq.q} a={faq.a} />)}
      </section>
    </div>
  );
}

function FAQItem({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ borderBottom: `1px solid ${T.border}` }}>
      <button onClick={() => setOpen(o => !o)} style={{ width: "100%", textAlign: "left", background: "none", border: "none", padding: "20px 0", cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span style={{ fontFamily: FONT_HEAD, fontSize: 15, fontWeight: 700, color: T.ink }}>{q}</span>
        <span style={{ fontFamily: FONT_HEAD, fontSize: 20, color: T.gold, flexShrink: 0, marginLeft: 16, transition: "transform 0.2s", transform: open ? "rotate(45deg)" : "none" }}>+</span>
      </button>
      {open && <div style={{ fontFamily: FONT_BODY, fontSize: 14, color: T.mid, lineHeight: 1.7, paddingBottom: 20 }}>{a}</div>}
    </div>
  );
}

// ── FOOTER ────────────────────────────────────────────────────────────────────
function Footer({ setPage }) {
  return (
    <footer style={{ background: T.ink, padding: "56px 24px 36px" }}>
      <div style={{ maxWidth: 1000, margin: "0 auto" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 32, marginBottom: 48 }}>
          <div>
            <div style={{ display: "flex", gap: 2, marginBottom: 12 }}>
              <span style={{ fontFamily: FONT_SERIF, fontSize: 22, color: T.book, fontStyle: "italic" }}>Flip</span>
              <span style={{ fontFamily: FONT_SERIF, fontSize: 22, color: T.doll, fontStyle: "italic" }}>Suite</span>
            </div>
            <div style={{ fontFamily: FONT_BODY, fontSize: 13, color: "rgba(255,255,255,0.4)", maxWidth: 240, lineHeight: 1.6 }}>Tools for resellers who move fast and price smart.</div>
          </div>
          <div style={{ display: "flex", gap: 48, flexWrap: "wrap" }}>
            {[
              { label: "Products", links: [{ name: "BookFlip", page: "bookflip" }, { name: "DollFlip", page: "dollflip" }] },
              { label: "Company",  links: [{ name: "Pricing",  page: "pricing"  }, { name: "Home",    page: "home"    }] },
            ].map(col => (
              <div key={col.label}>
                <div style={{ fontFamily: FONT_HEAD, fontSize: 11, fontWeight: 800, color: "rgba(255,255,255,0.3)", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 16 }}>{col.label}</div>
                {col.links.map(l => (
                  <button key={l.name} onClick={() => setPage(l.page)} style={{ display: "block", background: "none", border: "none", fontFamily: FONT_BODY, fontSize: 14, color: "rgba(255,255,255,0.6)", cursor: "pointer", marginBottom: 10, padding: 0, textAlign: "left" }}>{l.name}</button>
                ))}
              </div>
            ))}
          </div>
        </div>
        <div style={{ borderTop: "1px solid rgba(255,255,255,0.1)", paddingTop: 24, display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
          <div style={{ fontFamily: FONT_BODY, fontSize: 12, color: "rgba(255,255,255,0.3)" }}>© 2026 FlipSuite · D&G Fuzion LLC</div>
          <div style={{ fontFamily: FONT_BODY, fontSize: 12, color: "rgba(255,255,255,0.3)" }}>Perpetual fallback after 12 months · 20% off Year 2 · 40% off Year 3+ · Inspired by JetBrains</div>
        </div>
      </div>
    </footer>
  );
}

// ── APP SHELL ─────────────────────────────────────────────────────────────────
export default function FlipSuite() {
  const [page, setPage] = useState("home");
  useEffect(() => { window.scrollTo({ top: 0, behavior: "smooth" }); }, [page]);

  return (
    <div style={{ background: T.bg, minHeight: "100vh", fontFamily: FONT_BODY }}>
      <style>{`* { box-sizing: border-box; margin: 0; padding: 0; } button { font-family: inherit; }`}</style>
      <Nav page={page} setPage={setPage} />
      <main>
        {page === "home"     && <HomePage setPage={setPage} />}
        {page === "bookflip" && <ProductPage product="book" setPage={setPage} />}
        {page === "dollflip" && <ProductPage product="doll" setPage={setPage} />}
        {page === "pricing"  && <PricingPage setPage={setPage} />}
      </main>
      <Footer setPage={setPage} />
    </div>
  );
}
