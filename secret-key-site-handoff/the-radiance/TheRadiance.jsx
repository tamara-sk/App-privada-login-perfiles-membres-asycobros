import { useState } from 'react';
import { useLanguage } from '../context/LanguageContext'; // ← match your project's actual hook (minified as `je` in the live bundle)
import copy from './copy.json';

/**
 * The Radiance — Bali
 *
 * Narrative arc (updated):
 *   1. Hero            — the flame was lit
 *   2. The Big Bang    — NEW: it began with a few, and it was magic
 *   3. What Opened     — NEW: what the circle kept producing after everyone flew home
 *   4. The Deepening   — the bridge from that to this
 *   5. What This Is    — CHANGED: no 8-person cap; the circle opens, held at ~50
 *   6. The Five Days   — unchanged
 *   7. What We Release — NEW: closing the cycle with intention, letting go
 *   8. The Decision    — unchanged
 *   9. Invitation form — CHANGED: no "eight spaces / closes forever" scarcity
 *
 * IMAGES: every background is declared once in IMAGES below. Three are now real
 * Bali photos; the three still marked STOCK need replacing with real SKWR
 * Big Bang photography (see README.md).
 */

const IMAGES = {
  // REAL — Bali, shot on location
  bigBang: '/images/the-radiance/bali-arrival.jpg',
  opened: '/images/the-radiance/bali-details.jpg',
  whatIs: '/images/the-radiance/bali-villa.jpg',

  // STOCK — replace with real SKWR Big Bang photography
  fiveDays: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920',
  release: 'https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920',
  decision: 'https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920',
  form: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920',
};

const VIDEOS = {
  hero: '/videos/bali-answer.mp4',
  deepening: '/videos/bali-invest.mp4',
};

const PAGE_BG = 'linear-gradient(180deg, #4a2c3e 0%, #6b3d2f 30%, #8b5e3c 65%, #a67c52 100%)';
const CREAM = '#fef3c7';
const CREAM_BRIGHT = '#fff9e6';
const CREAM_SOFT = '#fef9e7';
const GOLD = '#fbbf24';

/* ---------- small building blocks ---------- */

function MediaSection({ image, video, overlay, padding = '100px 40px', maxWidth = 1000, textAlign, fixed, children }) {
  return (
    <section
      style={{
        position: 'relative',
        padding,
        overflow: 'hidden',
        textAlign,
        ...(image && {
          backgroundImage: `url(${image})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          ...(fixed && { backgroundAttachment: 'fixed' }),
        }),
      }}
    >
      {video && (
        <video
          autoPlay
          muted
          loop
          playsInline
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            filter: 'brightness(0.55) saturate(1.1)',
          }}
        >
          <source src={video} type='video/mp4' />
        </video>
      )}
      <div style={{ position: 'absolute', inset: 0, background: overlay }} />
      <div style={{ position: 'relative', zIndex: 2, maxWidth, margin: '0 auto' }}>{children}</div>
    </section>
  );
}

function SectionHeading({ children, marginBottom = 30 }) {
  return (
    <h2 style={{ fontSize: '2.5rem', fontWeight: 300, marginBottom, color: CREAM_BRIGHT }}>{children}</h2>
  );
}

function SectionBody({ children, maxWidth = 700 }) {
  return (
    <p style={{ fontSize: '1.1rem', lineHeight: 1.8, opacity: 0.92, maxWidth, color: CREAM_SOFT }}>{children}</p>
  );
}

/* ---------- page ---------- */

export default function TheRadiance() {
  const { language } = useLanguage();
  const t = copy[language] || copy.en;

  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await fetch('/api/conscious-real-estate-funnel', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          message: form.message,
          source: 'the-radiance',
          event: 'The Radiance',
          language,
        }),
      });
      setSent(true);
      setForm({ name: '', email: '', message: '' });
    } catch (err) {
      console.error(err);
    }
    setSubmitting(false);
  };

  const inputStyle = {
    padding: '14px 16px',
    background: 'rgba(255, 249, 230, 0.08)',
    border: '1px solid rgba(251, 191, 36, 0.3)',
    borderRadius: '6px',
    color: CREAM_BRIGHT,
    fontSize: '1rem',
    fontFamily: 'inherit',
  };

  return (
    <div style={{ background: PAGE_BG, color: CREAM, fontFamily: 'system-ui, sans-serif', minHeight: '100vh' }}>
      {/* 1 — Hero */}
      <section
        style={{
          position: 'relative',
          height: '100vh',
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          paddingTop: '60px',
        }}
      >
        <video
          autoPlay
          muted
          loop
          playsInline
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            filter: 'brightness(0.62) saturate(1.15)',
          }}
        >
          <source src={VIDEOS.hero} type='video/mp4' />
        </video>
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'linear-gradient(135deg, rgba(61, 31, 71, 0.5) 0%, rgba(125, 60, 42, 0.4) 50%, rgba(212, 165, 116, 0.3) 100%)',
            pointerEvents: 'none',
          }}
        />
        <div style={{ position: 'relative', zIndex: 2, textAlign: 'center', maxWidth: '800px', padding: '40px' }}>
          <p
            style={{
              fontSize: '13px',
              letterSpacing: '0.2em',
              color: GOLD,
              marginBottom: '20px',
              fontFamily: "'DM Mono', monospace",
              textShadow: '0 2px 10px rgba(0,0,0,0.3)',
            }}
          >
            {t.eyebrow}
          </p>
          <h1
            style={{
              fontSize: 'clamp(2.5rem, 8vw, 4.5rem)',
              fontWeight: 300,
              lineHeight: 1.1,
              marginBottom: '20px',
              color: CREAM_BRIGHT,
              textShadow: '0 2px 20px rgba(0,0,0,0.4)',
            }}
          >
            {t.title} <em style={{ color: GOLD, fontStyle: 'italic' }}>{t.titleEm}</em>
          </h1>
          <p
            style={{
              fontSize: '1.2rem',
              lineHeight: 1.6,
              opacity: 0.95,
              color: CREAM_SOFT,
              textShadow: '0 1px 10px rgba(0,0,0,0.3)',
            }}
          >
            {t.subtitle}
          </p>
        </div>
      </section>

      {/* 2 — The Big Bang (NEW) */}
      <MediaSection
        image={IMAGES.bigBang}
        padding='110px 40px'
        overlay='linear-gradient(135deg, rgba(42,26,58,0.80) 0%, rgba(107,61,47,0.62) 100%)'
      >
        <SectionHeading>{t.bigBang}</SectionHeading>
        <SectionBody>{t.bigBangBody}</SectionBody>
      </MediaSection>

      {/* 3 — What Has Opened Since (NEW) */}
      <MediaSection
        image={IMAGES.opened}
        padding='110px 40px'
        overlay='linear-gradient(180deg, rgba(74,44,62,0.82) 0%, rgba(107,61,47,0.72) 100%)'
      >
        <SectionHeading>{t.opened}</SectionHeading>
        <SectionBody>{t.openedBody}</SectionBody>
      </MediaSection>

      {/* 4 — The Deepening */}
      <MediaSection
        video={VIDEOS.deepening}
        padding='110px 40px'
        overlay='linear-gradient(180deg, rgba(74,44,62,0.45) 0%, rgba(107,61,47,0.4) 100%)'
      >
        <SectionHeading>{t.sequence}</SectionHeading>
        <SectionBody>{t.sequenceBody}</SectionBody>
      </MediaSection>

      {/* 5 — What This Is (no 8-person cap) */}
      <MediaSection
        image={IMAGES.whatIs}
        overlay='linear-gradient(135deg, rgba(74,44,62,0.72) 0%, rgba(107,61,47,0.55) 100%)'
      >
        <SectionHeading>{t.whatIs}</SectionHeading>
        <SectionBody>{t.whatIsBody}</SectionBody>
      </MediaSection>

      {/* 6 — The Five Days */}
      <MediaSection
        image={IMAGES.fiveDays}
        maxWidth={1200}
        overlay='linear-gradient(180deg, rgba(42,26,58,0.82) 0%, rgba(107,61,47,0.78) 100%)'
      >
        <SectionHeading marginBottom={50}>{t.fiveDays}</SectionHeading>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '30px' }}>
          {t.days.map((d, i) => (
            <div
              key={i}
              style={{
                padding: '20px',
                paddingBottom: '30px',
                borderBottom: '1px solid rgba(251, 191, 36, 0.2)',
                background: 'linear-gradient(135deg, rgba(251, 191, 36, 0.08) 0%, rgba(217, 119, 6, 0.08) 100%)',
                borderRadius: '8px',
              }}
            >
              <p style={{ fontSize: '11px', color: GOLD, marginBottom: '10px' }}>{d.day}</p>
              <h3 style={{ fontSize: '1.2rem', marginBottom: '10px', color: CREAM_BRIGHT }}>{d.title}</h3>
              <p style={{ fontSize: '0.95rem', lineHeight: 1.6, opacity: 0.85, color: CREAM_SOFT }}>{d.desc}</p>
            </div>
          ))}
        </div>
      </MediaSection>

      {/* 7 — What We Come to Release (NEW) */}
      <MediaSection
        image={IMAGES.release}
        padding='120px 40px'
        overlay='linear-gradient(180deg, rgba(42,26,58,0.84) 0%, rgba(107,61,47,0.74) 100%)'
      >
        <SectionHeading>{t.release}</SectionHeading>
        <SectionBody>{t.releaseBody}</SectionBody>
      </MediaSection>

      {/* 8 — The Decision */}
      <MediaSection
        image={IMAGES.decision}
        padding='130px 40px'
        maxWidth={800}
        textAlign='center'
        fixed
        overlay='linear-gradient(180deg, rgba(42,26,58,0.72) 0%, rgba(107,61,47,0.62) 100%)'
      >
        <SectionHeading>{t.decision}</SectionHeading>
        <p style={{ fontSize: '1.1rem', lineHeight: 1.8, opacity: 0.9, color: CREAM_SOFT }}>{t.decisionBody}</p>
      </MediaSection>

      {/* 9 — Invitation */}
      <MediaSection
        image={IMAGES.form}
        padding='110px 40px'
        maxWidth={600}
        overlay='linear-gradient(180deg, rgba(74,44,62,0.85) 0%, rgba(107,61,47,0.8) 100%)'
      >
        <h2 style={{ fontSize: '2rem', fontWeight: 300, marginBottom: '20px', color: CREAM_BRIGHT }}>{t.formTitle}</h2>
        <p style={{ fontSize: '1rem', marginBottom: '40px', opacity: 0.9, color: CREAM_SOFT }}>{t.formBody}</p>

        {sent ? (
          <p style={{ fontSize: '1.05rem', color: GOLD }}>{t.formOk}</p>
        ) : (
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <input
              type='text'
              placeholder={t.formName}
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
              style={inputStyle}
            />
            <input
              type='email'
              placeholder={t.formEmail}
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
              style={inputStyle}
            />
            <textarea
              placeholder={t.formMessage}
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              rows={4}
              style={{ ...inputStyle, resize: 'vertical' }}
            />
            <button
              type='submit'
              disabled={submitting}
              style={{
                padding: '16px',
                background: `linear-gradient(135deg, ${GOLD} 0%, #d97706 100%)`,
                border: 'none',
                borderRadius: '6px',
                color: '#2a1a3a',
                fontSize: '1rem',
                fontWeight: 600,
                cursor: submitting ? 'default' : 'pointer',
                opacity: submitting ? 0.7 : 1,
              }}
            >
              {t.formSubmit}
            </button>
          </form>
        )}
      </MediaSection>

      {/* 10 — Footer */}
      <footer style={{ padding: '50px 40px', textAlign: 'center' }}>
        <p style={{ fontSize: '0.9rem', opacity: 0.7, color: CREAM_SOFT }}>{t.footer}</p>
      </footer>
    </div>
  );
}
