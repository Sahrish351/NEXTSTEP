import React, { useState, useMemo } from 'react';
import { Category } from '../types';
import { GOAL_LIBRARY } from '../data/goalLibrary';
import { 
  Lightbulb, 
  Search, 
  ArrowRight, 
  Sparkles, 
  Briefcase, 
  BookOpen, 
  Wrench, 
  FolderKanban, 
  UserCheck 
} from 'lucide-react';

interface InspirationLibraryViewProps {
  onSelectGoal: (goal: string, category: Category) => void;
  onOpenCreate: () => void;
}

const CATEGORY_MAP: Record<Category, { icon: React.ReactNode; color: string; bg: string }> = {
  'Career': { icon: <Briefcase size={16} />, color: '#1B4D3E', bg: '#DCEBE1' },
  'Study': { icon: <BookOpen size={16} />, color: '#2B4C7E', bg: '#E3ECFA' },
  'Skill Building': { icon: <Wrench size={16} />, color: '#6A4A1C', bg: '#F6EBDD' },
  'Personal Project': { icon: <FolderKanban size={16} />, color: '#8A3B28', bg: '#FDEAE6' },
  'Other': { icon: <Sparkles size={16} />, color: '#4A3B69', bg: '#EFEBF5' },
};

export const InspirationLibraryView: React.FC<InspirationLibraryViewProps> = ({
  onSelectGoal,
  onOpenCreate,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<'All' | Category>('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filtered = useMemo(() => {
    return GOAL_LIBRARY.filter((item) => {
      const matchCat = selectedCategory === 'All' || item.category === selectedCategory;
      const matchQuery = 
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.firstStep.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCat && matchQuery;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <div className="view-fade-in" style={{ paddingBottom: '3.5rem' }}>
      {/* Header */}
      <div style={{
        background: 'var(--surface)',
        borderRadius: 'var(--radius-lg)',
        border: '1px solid var(--border-light)',
        padding: '2rem 2.25rem',
        marginBottom: '2rem',
        boxShadow: 'var(--shadow-sm)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', color: 'var(--primary)', marginBottom: '0.5rem' }}>
          <Lightbulb size={22} />
          <span style={{ fontSize: '0.85rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Action Blueprints
          </span>
        </div>
        <h1 style={{
          fontFamily: 'var(--font-serif)',
          fontSize: '2.1rem',
          color: 'var(--text-main)',
          marginBottom: '0.6rem',
          lineHeight: 1.2
        }}>
          Inspiration Library
        </h1>
        <p style={{
          color: 'var(--text-muted)',
          maxWidth: '680px',
          lineHeight: 1.6,
          fontSize: '0.98rem'
        }}>
          Every journey begins with a realistic starting step. Explore ready-to-use goal blueprints designed to overcome friction, reduce overwhelm, and set achievable 7-day milestones.
        </p>

        {/* Search & Actions */}
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
              placeholder="Search blueprints by topic or step..."
              className="form-input"
              style={{ paddingLeft: '2.5rem', width: '100%', fontSize: '0.92rem' }}
              aria-label="Search blueprints"
            />
          </div>

          <button
            type="button"
            onClick={onOpenCreate}
            className="btn-primary"
            style={{ fontSize: '0.88rem', padding: '0.55rem 1.1rem' }}
          >
            <Sparkles size={16} />
            <span>Create Custom Goal</span>
          </button>
        </div>

        {/* Filter Pills */}
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '0.5rem',
          marginTop: '1.25rem',
          paddingTop: '1.25rem',
          borderTop: '1px solid var(--border-light)'
        }}>
          {(['All', 'Career', 'Study', 'Skill Building', 'Personal Project', 'Other'] as ('All' | Category)[]).map((cat) => (
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

      {/* Blueprints Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
        gap: '1.5rem'
      }}>
        {filtered.map((item) => {
          const catStyle = CATEGORY_MAP[item.category] || CATEGORY_MAP.Other;
          return (
            <div
              key={item.id}
              style={{
                background: 'var(--surface)',
                borderRadius: 'var(--radius-lg)',
                border: '1px solid var(--border-light)',
                padding: '1.6rem 1.75rem',
                display: 'flex',
                flexDirection: 'column',
                boxShadow: 'var(--shadow-sm)',
                transition: 'transform 0.2s ease, box-shadow 0.2s ease'
              }}
            >
              {/* Category Pill */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.9rem' }}>
                <span style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  fontSize: '0.78rem',
                  fontWeight: 600,
                  color: catStyle.color,
                  background: catStyle.bg,
                  padding: '0.25rem 0.7rem',
                  borderRadius: '999px'
                }}>
                  {catStyle.icon}
                  {item.category}
                </span>
                <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                  7-Day Blueprint
                </span>
              </div>

              {/* Title */}
              <h3 style={{
                fontFamily: 'var(--font-serif)',
                fontSize: '1.28rem',
                color: 'var(--text-main)',
                marginBottom: '0.6rem',
                lineHeight: 1.3
              }}>
                {item.title}
              </h3>

              {/* Description */}
              <p style={{
                color: 'var(--text-muted)',
                fontSize: '0.88rem',
                lineHeight: 1.55,
                marginBottom: '1.1rem'
              }}>
                {item.description}
              </p>

              {/* Target Audience */}
              <div style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '0.45rem',
                background: 'var(--bg-main)',
                borderRadius: 'var(--radius-sm)',
                padding: '0.65rem 0.8rem',
                fontSize: '0.82rem',
                color: 'var(--text-muted)',
                marginBottom: '1.1rem'
              }}>
                <UserCheck size={15} style={{ flexShrink: 0, marginTop: '2px', color: 'var(--primary)' }} />
                <span>
                  <strong style={{ color: 'var(--text-main)' }}>Designed for: </strong>
                  {item.targetAudience}
                </span>
              </div>

              {/* Day 01 First Step Focus */}
              <div style={{
                marginTop: 'auto',
                borderTop: '1px solid var(--border-light)',
                paddingTop: '0.9rem',
                marginBottom: '1.25rem'
              }}>
                <div style={{ fontSize: '0.82rem', color: 'var(--primary-dark)', lineHeight: 1.5 }}>
                  <strong style={{ display: 'block', marginBottom: '0.2rem', color: 'var(--primary)' }}>
                    🎯 Day 01 Immediate Step:
                  </strong>
                  {item.firstStep}
                </div>
              </div>

              {/* CTA Button */}
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
                <span>Use this blueprint</span>
                <ArrowRight size={15} />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};
