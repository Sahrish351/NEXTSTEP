import React from 'react';
import { IMAGES } from '../data/images';
import { 
  Sparkles, 
  ShieldCheck, 
  BrainCircuit, 
  HeartHandshake, 
  ExternalLink, 
  Github, 
  Code2, 
  Camera 
} from 'lucide-react';

export const AboutView: React.FC = () => {
  return (
    <div className="view-fade-in" style={{ paddingBottom: '4rem', maxWidth: '840px', margin: '0 auto' }}>
      {/* Hero Header */}
      <div style={{
        background: 'var(--surface)',
        borderRadius: 'var(--radius-lg)',
        border: '1px solid var(--border-light)',
        padding: '2.5rem 2.25rem',
        marginBottom: '2rem',
        boxShadow: 'var(--shadow-sm)'
      }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: 'var(--primary)', marginBottom: '0.75rem' }}>
          <Sparkles size={20} />
          <span style={{ fontSize: '0.85rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Product Philosophy & Architecture
          </span>
        </div>
        <h1 style={{
          fontFamily: 'var(--font-serif)',
          fontSize: '2.4rem',
          color: 'var(--text-main)',
          marginBottom: '0.75rem',
          lineHeight: 1.15
        }}>
          Make Your Next Step Obvious
        </h1>
        <p style={{
          color: 'var(--text-muted)',
          fontSize: '1.05rem',
          lineHeight: 1.65,
          margin: 0
        }}>
          NextStep was born from a simple observation: people rarely fail their goals because they lack ambition. They fail because they face a blank screen, experience decision paralysis, and don&apos;t know what to do next today.
        </p>
      </div>

      {/* The 3 Pillars */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
        gap: '1.25rem',
        marginBottom: '2.5rem'
      }}>
        <div style={{
          background: 'var(--surface)',
          borderRadius: 'var(--radius-md)',
          border: '1px solid var(--border-light)',
          padding: '1.5rem',
          boxShadow: 'var(--shadow-sm)'
        }}>
          <div style={{
            width: '40px',
            height: '40px',
            borderRadius: '10px',
            background: 'var(--primary-light)',
            color: 'var(--primary)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '0.9rem'
          }}>
            <BrainCircuit size={20} />
          </div>
          <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.18rem', marginBottom: '0.4rem' }}>
            Cognitive Chunking
          </h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', lineHeight: 1.55, margin: 0 }}>
            Instead of a daunting 90-day roadmap, 7 days is the cognitive sweet spot: long enough to build meaningful momentum, short enough to see the finish line.
          </p>
        </div>

        <div style={{
          background: 'var(--surface)',
          borderRadius: 'var(--radius-md)',
          border: '1px solid var(--border-light)',
          padding: '1.5rem',
          boxShadow: 'var(--shadow-sm)'
        }}>
          <div style={{
            width: '40px',
            height: '40px',
            borderRadius: '10px',
            background: 'var(--primary-light)',
            color: 'var(--primary)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '0.9rem'
          }}>
            <ShieldCheck size={20} />
          </div>
          <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.18rem', marginBottom: '0.4rem' }}>
            Zero-Friction Privacy
          </h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', lineHeight: 1.55, margin: 0 }}>
            100% client-side persistence in your browser. No forced accounts, no passwords, no behavioral ad tracking. Your goals belong exclusively to you.
          </p>
        </div>

        <div style={{
          background: 'var(--surface)',
          borderRadius: 'var(--radius-md)',
          border: '1px solid var(--border-light)',
          padding: '1.5rem',
          boxShadow: 'var(--shadow-sm)'
        }}>
          <div style={{
            width: '40px',
            height: '40px',
            borderRadius: '10px',
            background: 'var(--primary-light)',
            color: 'var(--primary)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '0.9rem'
          }}>
            <HeartHandshake size={20} />
          </div>
          <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.18rem', marginBottom: '0.4rem' }}>
            Total User Agency
          </h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', lineHeight: 1.55, margin: 0 }}>
            Every generated suggestion is fully editable. You can rename tasks, re-sequence days, and tailor descriptions to fit your exact reality.
          </p>
        </div>
      </div>

      {/* Engineering & Technology */}
      <section style={{
        background: 'var(--surface)',
        borderRadius: 'var(--radius-lg)',
        border: '1px solid var(--border-light)',
        padding: '2rem 2.25rem',
        marginBottom: '2.5rem',
        boxShadow: 'var(--shadow-sm)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--primary)', marginBottom: '0.5rem' }}>
          <Code2 size={20} />
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.45rem', margin: 0, color: 'var(--text-main)' }}>
            Technical Architecture
          </h2>
        </div>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem', lineHeight: 1.6, marginBottom: '1.25rem' }}>
          NextStep is engineered with modern frontend standards focusing on performance, accessibility, and zero external dependency risk:
        </p>
        <ul style={{ paddingLeft: '1.25rem', color: 'var(--text-main)', fontSize: '0.9rem', lineHeight: 1.7, margin: 0 }}>
          <li><strong>React 18 & TypeScript 5:</strong> Fully type-safe component hierarchy with strict compilation.</li>
          <li><strong>Vite Build Engine:</strong> Sub-second HMR and optimized production bundling under 70KB gzip.</li>
          <li><strong>Lucide Icons:</strong> Consistent, accessible SVG iconography.</li>
          <li><strong>Local-First Storage Schema:</strong> Resilient localStorage driver with schema validation, migration fallback, and clean JSON backup/restore.</li>
          <li><strong>WCAG 2.1 AA Compliance:</strong> Contrast ratios above 4.5:1, keyboard focus rings, and full screen reader accessibility.</li>
        </ul>
      </section>

      {/* Photography & Visual Credits */}
      <section style={{
        background: 'var(--surface)',
        borderRadius: 'var(--radius-lg)',
        border: '1px solid var(--border-light)',
        padding: '2rem 2.25rem',
        boxShadow: 'var(--shadow-sm)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--primary)', marginBottom: '0.5rem' }}>
          <Camera size={20} />
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.45rem', margin: 0, color: 'var(--text-main)' }}>
            Photography & Art Direction
          </h2>
        </div>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem', lineHeight: 1.6, marginBottom: '1.25rem' }}>
          We believe thoughtful tools should look human, warm, and inviting. NextStep uses curated photography under the generous Unsplash Free License:
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
          {Object.entries(IMAGES).map(([key, asset]) => (
            <div
              key={key}
              style={{
                background: 'var(--bg-main)',
                borderRadius: 'var(--radius-sm)',
                padding: '0.85rem 1rem',
                border: '1px solid var(--border-light)',
                fontSize: '0.82rem'
              }}
            >
              <strong style={{ display: 'block', color: 'var(--text-main)', marginBottom: '0.2rem' }}>
                {key}
              </strong>
              <div style={{ color: 'var(--text-muted)', marginBottom: '0.4rem' }}>
                {asset.alt.slice(0, 50)}...
              </div>
              <a
                href={asset.creditUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.25rem',
                  color: 'var(--primary)',
                  fontWeight: 500,
                  textDecoration: 'none'
                }}
              >
                <span>{asset.credit}</span>
                <ExternalLink size={12} />
              </a>
            </div>
          ))}
        </div>

        <div style={{
          marginTop: '1.75rem',
          paddingTop: '1.25rem',
          borderTop: '1px solid var(--border-light)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1rem',
          fontSize: '0.85rem',
          color: 'var(--text-muted)'
        }}>
          <div>Created for the Devpost <strong>Build with AI: Basics</strong> Hackathon.</div>
          <a
            href="https://github.com/Sahrish351/NEXTSTEP.git"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary"
            style={{ fontSize: '0.82rem', padding: '0.45rem 0.85rem' }}
          >
            <Github size={15} />
            <span>GitHub Repository</span>
          </a>
        </div>
      </section>
    </div>
  );
};

