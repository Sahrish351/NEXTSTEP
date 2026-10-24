import React, { useRef, useState } from 'react';
import { Plan } from '../types';
import { exportPlanAsJSON, validatePlanJSON } from '../utils/storage';
import { 
  Download, 
  Upload, 
  Trash2, 
  ShieldCheck, 
  Info, 
  AlertTriangle, 
  Check, 
  FileCode,
  ArrowLeft
} from 'lucide-react';

interface SettingsViewProps {
  plan: Plan | null;
  onImportPlan: (plan: Plan) => void;
  onRequestReset: () => void;
  onNavigate: (view: any) => void;
}

export const SettingsView: React.FC<SettingsViewProps> = ({
  plan,
  onImportPlan,
  onRequestReset,
  onNavigate,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [importStatus, setImportStatus] = useState<{ success: boolean; message: string } | null>(null);
  const [showConfirmImportModal, setShowConfirmImportModal] = useState<Plan | null>(null);

  const handleExport = () => {
    if (!plan) return;
    exportPlanAsJSON(plan);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      const result = validatePlanJSON(content);

      if (!result.valid || !result.plan) {
        setImportStatus({
          success: false,
          message: result.error || 'Failed to parse plan file. Ensure it is a valid NextStep JSON file.'
        });
      } else {
        // If an active plan exists, prompt confirmation before overwriting
        if (plan) {
          setShowConfirmImportModal(result.plan);
        } else {
          onImportPlan(result.plan);
          setImportStatus({ success: true, message: `Successfully loaded plan: "${result.plan.goal}"` });
        }
      }
    };
    reader.readAsText(file);
    // Reset input
    e.target.value = '';
  };

  const handleConfirmImport = () => {
    if (showConfirmImportModal) {
      onImportPlan(showConfirmImportModal);
      setImportStatus({ success: true, message: `Successfully imported plan: "${showConfirmImportModal.goal}"` });
      setShowConfirmImportModal(null);
    }
  };

  return (
    <div style={{ paddingBottom: '3.5rem', maxWidth: '820px', margin: '0 auto' }}>
      {/* View Header */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        borderBottom: '1px solid var(--border)',
        paddingBottom: '1.25rem',
        marginBottom: '2rem',
        flexWrap: 'wrap',
        gap: '1rem'
      }}>
        <div>
          <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--primary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Data &amp; Preferences
          </span>
          <h1 className="serif-heading" style={{ fontSize: 'clamp(2rem, 4vw, 2.7rem)', color: 'var(--primary-dark)', marginTop: '0.2rem' }}>
            Application Settings
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', marginTop: '0.35rem' }}>
            Manage your local browser data, backup your plans, and verify privacy settings.
          </p>
        </div>

        {plan && (
          <button
            type="button"
            onClick={() => onNavigate('overview')}
            className="btn-secondary"
            style={{ fontSize: '0.85rem', padding: '0.5rem 1rem' }}
          >
            <ArrowLeft size={16} />
            <span>Return to Workspace</span>
          </button>
        )}
      </div>

      {/* Notification Banner */}
      {importStatus && (
        <div style={{
          padding: '0.9rem 1.25rem',
          borderRadius: 'var(--radius-md)',
          marginBottom: '1.5rem',
          display: 'flex',
          alignItems: 'center',
          gap: '0.65rem',
          fontSize: '0.9rem',
          background: importStatus.success ? 'var(--surface-sage)' : 'var(--accent-coral-light)',
          color: importStatus.success ? 'var(--primary-dark)' : 'var(--accent-coral-dark)',
          border: `1px solid ${importStatus.success ? 'var(--primary)' : 'var(--accent-coral)'}`
        }}>
          {importStatus.success ? <Check size={18} /> : <AlertTriangle size={18} />}
          <span>{importStatus.message}</span>
        </div>
      )}

      {/* Card 1: Data Backup & Portability */}
      <div style={{
        background: 'var(--surface)',
        border: '1px solid var(--border)',
        borderRadius: 'var(--radius-lg)',
        padding: '1.75rem',
        marginBottom: '1.75rem',
        boxShadow: 'var(--shadow-sm)'
      }}>
        <h2 style={{ fontSize: '1.25rem', color: 'var(--primary-dark)', marginBottom: '0.35rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <FileCode size={20} color="var(--primary)" />
          <span>Plan Data Portability</span>
        </h2>
        <p style={{ fontSize: '0.92rem', color: 'var(--text-muted)', lineHeight: 1.55, marginBottom: '1.5rem' }}>
          Because NextStep does not require account creation, you own your data. Export your current plan as a JSON file to transfer between browsers or back up your progress.
        </p>

        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <button
            type="button"
            disabled={!plan}
            onClick={handleExport}
            className="btn-primary"
            style={{ fontSize: '0.92rem', padding: '0.65rem 1.25rem' }}
          >
            <Download size={17} />
            <span>Export Active Plan (.json)</span>
          </button>

          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="btn-secondary"
            style={{ fontSize: '0.92rem', padding: '0.65rem 1.25rem' }}
          >
            <Upload size={17} />
            <span>Import Plan File</span>
          </button>

          <input
            ref={fileInputRef}
            type="file"
            accept=".json,application/json"
            style={{ display: 'none' }}
            onChange={handleFileChange}
          />
        </div>

        {!plan && (
          <span style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-light)', marginTop: '0.75rem' }}>
            Note: Export requires an active plan. Create or import a plan to enable export.
          </span>
        )}
      </div>

      {/* Card 2: Privacy & Storage Architecture */}
      <div style={{
        background: 'var(--surface)',
        border: '1px solid var(--border)',
        borderRadius: 'var(--radius-lg)',
        padding: '1.75rem',
        marginBottom: '1.75rem',
        boxShadow: 'var(--shadow-sm)'
      }}>
        <h2 style={{ fontSize: '1.25rem', color: 'var(--primary-dark)', marginBottom: '0.35rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <ShieldCheck size={20} color="var(--primary)" />
          <span>Privacy &amp; Local Storage Architecture</span>
        </h2>
        <p style={{ fontSize: '0.92rem', color: 'var(--text-muted)', lineHeight: 1.55, marginBottom: '1.25rem' }}>
          NextStep operates with zero server tracking and zero third-party databases:
        </p>

        <ul style={{ paddingLeft: '1.4rem', fontSize: '0.9rem', color: 'var(--text)', lineHeight: 1.6 }}>
          <li><strong>Client-Side Only:</strong> All plan generation, task customization, and completion checkboxes live entirely in your browser's <code>localStorage</code>.</li>
          <li><strong>No Cloud Sync:</strong> Data remains private on this specific device and browser profile.</li>
          <li><strong>Honest Templates:</strong> Starter tasks are sourced from transparent domain templates without hidden API calls.</li>
        </ul>
      </div>

      {/* Card 3: Danger Zone */}
      <div style={{
        background: 'var(--surface)',
        border: '1px solid var(--accent-coral)',
        borderRadius: 'var(--radius-lg)',
        padding: '1.75rem',
        marginBottom: '1.75rem',
        boxShadow: 'var(--shadow-sm)'
      }}>
        <h2 style={{ fontSize: '1.25rem', color: 'var(--accent-coral-dark)', marginBottom: '0.35rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Trash2 size={20} color="var(--accent-coral-dark)" />
          <span>Reset Plan Workspace</span>
        </h2>
        <p style={{ fontSize: '0.92rem', color: 'var(--text-muted)', lineHeight: 1.55, marginBottom: '1.25rem' }}>
          Permanently delete the current plan, clear completion checkmarks, and reset your workspace to the clean empty state.
        </p>

        <button
          type="button"
          disabled={!plan}
          onClick={onRequestReset}
          style={{
            background: 'var(--accent-coral-dark)',
            color: '#FFFFFF',
            fontWeight: 600,
            fontSize: '0.9rem',
            padding: '0.65rem 1.25rem',
            borderRadius: 'var(--radius-pill)',
            border: 'none',
            cursor: plan ? 'pointer' : 'not-allowed',
            opacity: plan ? 1 : 0.6,
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.45rem',
            transition: 'var(--transition)'
          }}
        >
          <Trash2 size={16} />
          <span>Reset and Clear Active Plan</span>
        </button>
      </div>

      {/* Card 4: About NextStep */}
      <div style={{
        padding: '1.5rem',
        background: 'var(--bg)',
        border: '1px solid var(--border)',
        borderRadius: 'var(--radius-md)',
        display: 'flex',
        alignItems: 'flex-start',
        gap: '0.85rem'
      }}>
        <Info size={20} color="var(--primary)" style={{ flexShrink: 0, marginTop: '0.15rem' }} />
        <div style={{ fontSize: '0.88rem', color: 'var(--text-muted)', lineHeight: 1.55 }}>
          <strong style={{ color: 'var(--text)' }}>NextStep — Make your next step obvious</strong> (v1.2.0)<br />
          Built for the Devpost Build with AI: Basics hackathon following official plan-first workflows. Released under the open-source MIT License.
        </div>
      </div>

      {/* Overwrite Confirmation Modal on File Import */}
      {showConfirmImportModal && (
        <div
          role="dialog"
          aria-modal="true"
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(32, 39, 32, 0.55)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1rem',
            zIndex: 100
          }}
        >
          <div style={{
            background: 'var(--surface)',
            border: '1px solid var(--border)',
            borderRadius: 'var(--radius-lg)',
            maxWidth: '480px',
            width: '100%',
            padding: '1.75rem',
            boxShadow: 'var(--shadow-lg)'
          }}>
            <h3 className="serif-heading" style={{ fontSize: '1.35rem', color: 'var(--primary-dark)', marginBottom: '0.5rem' }}>
              Replace Existing Plan?
            </h3>
            <p style={{ fontSize: '0.92rem', color: 'var(--text-muted)', lineHeight: 1.5, marginBottom: '1.25rem' }}>
              Importing will replace your current active plan (<em>"{plan?.goal}"</em>) with the imported plan: <strong>"{showConfirmImportModal.goal}"</strong>.
            </p>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.65rem' }}>
              <button
                type="button"
                onClick={() => setShowConfirmImportModal(null)}
                className="btn-secondary"
                style={{ fontSize: '0.88rem', padding: '0.5rem 1rem' }}
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirmImport}
                className="btn-primary"
                style={{ fontSize: '0.88rem', padding: '0.5rem 1.25rem' }}
              >
                Confirm &amp; Import
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

