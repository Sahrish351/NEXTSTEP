export interface ImageAsset {
  url: string;
  alt: string;
  credit: string;
  creditUrl: string;
  fallbackGradient: string;
}

export const IMAGES: Record<string, ImageAsset> = {
  heroWorkspace: {
    url: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=1200&q=80',
    alt: 'Sunlit minimalist wooden desk with a notebook, pen, coffee cup, and laptop prepared for focused planning',
    credit: 'Andrew Neel via Unsplash',
    creditUrl: 'https://unsplash.com/photos/cckf4TsHAuw',
    fallbackGradient: 'linear-gradient(135deg, #246B52 0%, #194C3A 100%)',
  },
  careerInterview: {
    url: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80',
    alt: 'Confident professional woman reviewing notes and preparing thoughtfully for an interview',
    credit: 'Christina @ wocintechchat.com via Unsplash',
    creditUrl: 'https://unsplash.com/photos/0Zx1bDv5BNY',
    fallbackGradient: 'linear-gradient(135deg, #DCEBE1 0%, #246B52 100%)',
  },
  studentStudy: {
    url: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80',
    alt: 'Focused university students reviewing academic textbooks and study notes in a warm library',
    credit: 'Priscilla Du Preez via Unsplash',
    creditUrl: 'https://unsplash.com/photos/XkKCui44iM0',
    fallbackGradient: 'linear-gradient(135deg, #FAF8F3 0%, #DCEBE1 100%)',
  },
  skillPractice: {
    url: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80',
    alt: 'Hands typing code on a laptop beside handwritten learning cheat sheets and a tablet',
    credit: 'John Schnobrich via Unsplash',
    creditUrl: 'https://unsplash.com/photos/2Fl-oAn2BQ4',
    fallbackGradient: 'linear-gradient(135deg, #202720 0%, #246B52 100%)',
  },
  creatorProject: {
    url: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80',
    alt: 'Developer desk with wireframe sketches, dual monitors, and clean workspace for building side projects',
    credit: 'Christopher Gower via Unsplash',
    creditUrl: 'https://unsplash.com/photos/m_HRfLhgABo',
    fallbackGradient: 'linear-gradient(135deg, #DCEBE1 0%, #E98770 100%)',
  },
  reflectionJournal: {
    url: 'https://images.unsplash.com/photo-1517842645767-c639042777db?auto=format&fit=crop&w=800&q=80',
    alt: 'Open fountain pen and linen journal on a warm wooden table for reflective writing',
    credit: 'Cathryn Lavery via Unsplash',
    creditUrl: 'https://unsplash.com/photos/fMD_Wrhfnif',
    fallbackGradient: 'linear-gradient(135deg, #FAF8F3 0%, #DCEBE1 100%)',
  },
  calmHabit: {
    url: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=800&q=80',
    alt: 'Serene morning routine with coffee and a clean journal overlooking nature',
    credit: 'Arto Marttinen via Unsplash',
    creditUrl: 'https://unsplash.com/photos/w6daSmgtupI',
    fallbackGradient: 'linear-gradient(135deg, #246B52 0%, #FAF8F3 100%)',
  },
};

