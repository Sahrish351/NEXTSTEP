export interface ImageAsset {
  url: string;
  alt: string;
  credit: string;
  creditUrl: string;
  fallbackGradient: string;
}

export const IMAGES: Record<string, ImageAsset> = {
  // Hero lifestyle photo of young woman writing in notebook at warm sunlit desk
  heroWomanPlanning: {
    url: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=1200&q=80',
    alt: 'Young woman in a dark green sweater writing notes in a planner at a warm sunlit wooden desk with laptop and coffee',
    credit: 'Priscilla Du Preez via Unsplash',
    creditUrl: 'https://unsplash.com/photos/a-woman-sitting-at-a-table-writing-in-a-notebook-nF8xhLMmg0c',
    fallbackGradient: 'linear-gradient(135deg, #246B52 0%, #194C3A 100%)',
  },
  // Section 4 "How It Works" left photo: open notebook with handwritten notes on wooden desk
  processJournal: {
    url: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=1000&q=80',
    alt: 'Open linen notebook with pen and coffee on a wooden desk with house plants',
    credit: 'Green Chameleon via Unsplash',
    creditUrl: 'https://unsplash.com/photos/s9CC2SKySJM',
    fallbackGradient: 'linear-gradient(135deg, #DCEBE1 0%, #FAF8F3 100%)',
  },
  // Section 5 Final CTA: Hiker overlooking mountain ridges at golden sunrise
  finalCtaHiker: {
    url: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1600&q=80',
    alt: 'Hiker with backpack standing atop a scenic mountain ridge overlooking rolling peaks at golden sunrise',
    credit: 'Kalon Visuals via Unsplash',
    creditUrl: 'https://unsplash.com/photos/bx72n0f58o8',
    fallbackGradient: 'linear-gradient(135deg, #194C3A 0%, #246B52 60%, #E98770 100%)',
  },
  // Category 1: Career & Jobs (desk with laptop, coffee, notebook)
  careerCard: {
    url: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=800&q=80',
    alt: 'Clean workspace with laptop, coffee mug, and notebook organized for professional planning',
    credit: 'Andrew Neel via Unsplash',
    creditUrl: 'https://unsplash.com/photos/cckf4TsHAuw',
    fallbackGradient: 'linear-gradient(135deg, #DCEBE1 0%, #246B52 100%)',
  },
  // Category 2: Study & Learning (student focused studying in library)
  studyCard: {
    url: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80',
    alt: 'Young student focused intently on books and research notes in a bright library',
    credit: 'Priscilla Du Preez via Unsplash',
    creditUrl: 'https://unsplash.com/photos/XkKCui44iM0',
    fallbackGradient: 'linear-gradient(135deg, #FAF8F3 0%, #DCEBE1 100%)',
  },
  // Category 3: Skill Building (person practicing technical skills with laptop and notes)
  skillCard: {
    url: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80',
    alt: 'Developer writing code and testing ideas with notes and laptop at desk',
    credit: 'John Schnobrich via Unsplash',
    creditUrl: 'https://unsplash.com/photos/2Fl-oAn2BQ4',
    fallbackGradient: 'linear-gradient(135deg, #202720 0%, #246B52 100%)',
  },
  // Category 4: Personal Projects (hiker / creator exploring ambitious milestone)
  projectCard: {
    url: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=800&q=80',
    alt: 'Traveler standing in vast mountain landscape ready to explore ambitious horizons',
    credit: 'David Marcu via Unsplash',
    creditUrl: 'https://unsplash.com/photos/78A265wPi14',
    fallbackGradient: 'linear-gradient(135deg, #DCEBE1 0%, #E98770 100%)',
  },
  // Workspace assets
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
};
