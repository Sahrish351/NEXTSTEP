import React, { useState, useMemo } from 'react';
import { Category } from '../types';
import { GOAL_LIBRARY } from '../data/goalLibrary';
import { IMAGES } from '../data/images';
import { 
  Compass, 
  Search, 
  ArrowRight, 
  Sparkles, 
  Target, 
  SlidersHorizontal 
} from 'lucide-react';

interface ExploreGoalsViewProps {
  onSelectGoal: (goal: string, category: Category) => void;
  onOpenCustomCreate: () => void;
}

const CATEGORIES: ('All' | Category)[] = [
  'All',
  'Career',
  'Study',
  'Skill Building',
  'Personal Project',
  'Other',
];

export const ExploreGoalsView: React.FC<ExploreGoalsViewProps> = ({
  onSelectGoal,
  onOpenCustomCreate,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<'All' | Category>('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredGoals = useMemo(() => {
    return GOAL_LIBRARY.filter((item) => {
      const matchesCat = selectedCategory === 'All' || item.category === selectedCategory;
      const matchesQuery = 
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.targetAudience.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCat && matchesQuery;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <div className="view-fade-in" style={{ paddingBottom: '3.5rem' }}>
      {/* Editorial Header */}
      <div style={{
        background: 'var(--surface)',
        borderRadius: 'var(--radius-lg)',
        border: '1px solid var(--border-light)',
        padding: '2rem 2.25rem',
        marginBottom: '2rem',
        boxShadow: 'var(--shadow-sm)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', color: 'var(--primary)', marginBottom: '0.5rem' }}>
          <Compass size={22} />
          <span style={{ fontSize: '0.85rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Goal Inspiration Directory
          </span>
        </div>
        <h1 style={{
          fontFamily: 'var(--font-serif)',
          fontSize: '2.1rem',
          color: 'var(--text-main)',
          marginBottom: '0.6rem',
          lineHeight: 1.2
        }}>
          Explore Real 7-Day Paths
        </h1>
        <p style={{
          color: 'var(--text-muted)',
          maxWidth: '680px',
          lineHeight: 1.6,
          fontSize: '0.98rem'
        }}>
          Browse curated, field-tested goals across career acceleration, academic study, craft building, and side projects. Every goal maps into a calibrated 7-day action sequence that you can adapt freely.
        </p>

        {/* Search & Filter Bar */}
        <div style={{
          marginTop: '1.75rem',
          display: 'flex',
          flexWrap: 'wrap',
          gap: '1rem',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <div style={{
            position: 'relative',
            flex: '1 1 280px',
            maxWidth: '420px'
          }}>
            <Search 
              size={17} 
              style={{
                position: 'absolute',
                left: '0.9rem',
                top: '50%',
                transform: 'translateY(-50%)',
                color: 'var(--text-muted)'
              }} 
            />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search goals, topics, or audiences..."
              className="form-input"
              style={{ paddingLeft: '2.5rem', width: '100%', fontSize: '0.92rem' }}
              aria-label="Search goals"
            />
          </div>

          <button
            type="button"
            onClick={onOpenCustomCreate}
            className="btn-secondary"
            style={{ fontSize: '0.88rem', padding: '0.55rem 1rem' }}
          >
            <Sparkles size={16} />
            <span>Build custom goal</span>
          </button>
        </div>

        {/* Category Pills */}
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '0.5rem',
          marginTop: '1.25rem',
          paddingTop: '1.25rem',
          borderTop: '1px solid var(--border-light)'
        }}>
          <span style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.35rem',
            fontSize: '0.82rem',
            color: 'var(--text-muted)',
            marginRight: '0.25rem'
          }}>
            <SlidersHorizontal size={14} /> Category:
          </span>
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              style={{
                padding: '0.35rem 0.85rem',
                borderRadius: '999px',
                fontSize: '0.82rem',
                fontWeight: selectedCategory === cat ? 600 : 500,
                border: selectedCategory === cat ? '1px solid var(--primary)' : '1px solid var(--border)',
                background: selectedCategory === cat ? 'var(--primary-light)' : 'var(--surface)',
                color: selectedCategory === cat ? 'var(--primary-dark)' : 'var(--text-main)',
                cursor: 'pointer',
                transition: 'all 0.15s ease'
              }}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of Photo-Enriched Cards */}
      {filteredGoals.length === 0 ? (
        <div style={{
          textAlign: 'center',
          padding: '3rem 1.5rem',
          background: 'var(--surface)',
          borderRadius: 'var(--radius-md)',
          border: '1px dashed var(--border)'
        }}>
          <p style={{ color: 'var(--text-muted)', marginBottom: '1rem' }}>
            No goals found matching &quot;{searchQuery}&quot; in {selectedCategory}.
          </p>
          <button
            type="button"
            onClick={() => { setSearchQuery(''); setSelectedCategory('All'); }}
            className="btn-secondary"
            style={{ fontSize: '0.85rem' }}
          >
            Reset search filters
          </button>
        </div>
      ) : (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
          gap: '1.5rem'
        }}>
          {filteredGoals.map((item) => {
            const imgAsset = IMAGES[item.imageKey] || IMAGES.heroWorkspace;
            return (
              <div
                key={item.id}
                style={{
                  background: 'var(--surface)',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--border-light)',
                  overflow: 'hidden',
                  display: 'flex',
                  flexDirection: 'column',
                  boxShadow: 'var(--shadow-sm)',
                  transition: 'transform 0.2s ease, box-shadow 0.2s ease'
                }}
              >
                {/* Photo Header */}
                <div style={{
                  position: 'relative',
                  height: '160px',
                  background: imgAsset.fallbackGradient,
                  overflow: 'hidden'
                }}>
                  <img
                    src={imgAsset.url}
                    alt={imgAsset.alt}
                    loading="lazy"
                    onError={(e) => {
                      // Hide failed image and reveal fallback gradient
                      (e.target as HTMLElement).style.display = 'none';
                    }}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover'
                    }}
                  />
                  {/* Category Pill Tag */}
                  <span style={{
                    position: 'absolute',
                    top: '0.85rem',
                    left: '0.85rem',
                    background: 'rgba(32, 39, 32, 0.75)',
                    backdropFilter: 'blur(4px)',
                    color: '#FFFFFF',
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    padding: '0.25rem 0.65rem',
                    borderRadius: '999px',
                    letterSpacing: '0.03em'
                  }}>
                    {item.category}
                  </span>
                </div>

                {/* Card Body */}
                <div style={{
                  padding: '1.25rem 1.4rem',
                  display: 'flex',
                  flexDirection: 'column',
                  flex: 1
                }}>
                  <h3 style={{
                    fontFamily: 'var(--font-serif)',
                    fontSize: '1.22rem',
                    color: 'var(--text-main)',
                    marginBottom: '0.5rem',
                    lineHeight: 1.3
                  }}>
                    {item.title}
                  </h3>
                  
                  <p style={{
                    color: 'var(--text-muted)',
                    fontSize: '0.88rem',
                    lineHeight: 1.55,
                    marginBottom: '1rem'
                  }}>
                    {item.description}
                  </p>

                  {/* Target Audience */}
                  <div style={{
                    background: 'var(--bg-main)',
                    borderRadius: 'var(--radius-sm)',
                    padding: '0.65rem 0.85rem',
                    marginBottom: '1rem',
                    fontSize: '0.82rem',
                    color: 'var(--text-muted)'
                  }}>
                    <strong style={{ color: 'var(--text-main)', display: 'block', marginBottom: '0.15rem' }}>
                      Recommended for:
                    </strong>
                    {item.targetAudience}
                  </div>

                  {/* First Step Preview */}
                  <div style={{
                    marginTop: 'auto',
                    borderTop: '1px solid var(--border-light)',
                    paddingTop: '0.9rem',
                    marginBottom: '1.1rem'
                  }}>
                    <div style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '0.45rem',
                      fontSize: '0.82rem',
                      color: 'var(--primary-dark)'
                    }}>
                      <Target size={15} style={{ flexShrink: 0, marginTop: '2px', color: 'var(--primary)' }} />
                      <span>
                        <strong>Day 01 starting step:</strong> {item.firstStep}
                      </span>
                    </div>
                  </div>

                  {/* Action CTA */}
                  <button
                    type="button"
                    onClick={() => onSelectGoal(item.title, item.category)}
                    className="btn-primary"
                    style={{
                      width: '100%',
                      justifyContent: 'center',
                      fontSize: '0.88rem',
                      padding: '0.6rem 1rem'
                    }}
                  >
                    <span>Start with this goal</span>
                    <ArrowRight size={15} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
