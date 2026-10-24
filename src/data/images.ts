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

  // 9 Verified Unique Directory Images for Explore Real 7-Day Paths
  careerFrontend: {
    url: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=800&q=80',
    alt: 'Young professional candidate reviewing technical architecture during a modern engineering interview',
    credit: 'Headway via Unsplash',
    creditUrl: 'https://unsplash.com/photos/5QgIuuBxKwM',
    fallbackGradient: 'linear-gradient(135deg, #246B52 0%, #194C3A 100%)',
  },
  careerResume: {
    url: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?auto=format&fit=crop&w=800&q=80',
    alt: 'Professional polishing career CV and portfolio on a clean wooden desk with pen and tablet',
    credit: 'Firmbee.com via Unsplash',
    creditUrl: 'https://unsplash.com/photos/gcsNOsPEXfs',
    fallbackGradient: 'linear-gradient(135deg, #DCEBE1 0%, #246B52 100%)',
  },
  studyBiology: {
    url: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=800&q=80',
    alt: 'Student taking structured revision notes and reviewing anatomy exam concepts with highlighters',
    credit: 'Green Chameleon via Unsplash',
    creditUrl: 'https://unsplash.com/photos/s9CC2SKySJM',
    fallbackGradient: 'linear-gradient(135deg, #FAF8F3 0%, #DCEBE1 100%)',
  },
  studyThesis: {
    url: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&w=800&q=80',
    alt: 'Academic thesis research setup with open books, literature papers, and spectacles in quiet library',
    credit: 'Aaron Burden via Unsplash',
    creditUrl: 'https://unsplash.com/photos/6jYoi2GhVkU',
    fallbackGradient: 'linear-gradient(135deg, #DCEBE1 0%, #FAF8F3 100%)',
  },
  skillTypeScript: {
    url: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80',
    alt: 'Clean typed programming code on developer computer monitor with syntax highlighting',
    credit: 'Fotis Fotopoulos via Unsplash',
    creditUrl: 'https://unsplash.com/photos/LJ9KY8pIH3E',
    fallbackGradient: 'linear-gradient(135deg, #202720 0%, #246B52 100%)',
  },
  skillAccessibility: {
    url: 'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?auto=format&fit=crop&w=800&q=80',
    alt: 'Designer wireframing accessible digital UI components and testing inclusive typography on screen',
    credit: 'UX Indonesia via Unsplash',
    creditUrl: 'https://unsplash.com/photos/qC2n6RQU4Vw',
    fallbackGradient: 'linear-gradient(135deg, #FAF8F3 0%, #246B52 100%)',
  },
  projectPortfolio: {
    url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80',
    alt: 'Web developer designing and testing responsive React portfolio website layout on laptop',
    credit: 'Carlos Muza via Unsplash',
    creditUrl: 'https://unsplash.com/photos/hpjSkU2UYSU',
    fallbackGradient: 'linear-gradient(135deg, #DCEBE1 0%, #E98770 100%)',
  },
  projectBlog: {
    url: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=800&q=80',
    alt: 'Author typing technical blog tutorial on keyboard beside coffee and notebook',
    credit: 'Andrew Neel via Unsplash',
    creditUrl: 'https://unsplash.com/photos/cckf4TsHAuw',
    fallbackGradient: 'linear-gradient(135deg, #194C3A 0%, #E98770 100%)',
  },
  habitReading: {
    url: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=800&q=80',
    alt: 'Quiet morning reading habit with hardcover book, warm cup, and serene natural light',
    credit: 'Eliott Reyna via Unsplash',
    creditUrl: 'https://unsplash.com/photos/kcKWwKdO6wE',
    fallbackGradient: 'linear-gradient(135deg, #246B52 0%, #FAF8F3 100%)',
  },

  // Legacy mappings for backward compatibility
  careerInterview: {
    url: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=800&q=80',
    alt: 'Technical interview preparation',
    credit: 'Headway via Unsplash',
    creditUrl: 'https://unsplash.com',
    fallbackGradient: 'linear-gradient(135deg, #DCEBE1 0%, #246B52 100%)',
  },
  studentStudy: {
    url: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=800&q=80',
    alt: 'University study notes',
    credit: 'Green Chameleon via Unsplash',
    creditUrl: 'https://unsplash.com',
    fallbackGradient: 'linear-gradient(135deg, #FAF8F3 0%, #DCEBE1 100%)',
  },
  skillPractice: {
    url: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80',
    alt: 'Hands-on skill practice',
    credit: 'Fotis Fotopoulos via Unsplash',
    creditUrl: 'https://unsplash.com',
    fallbackGradient: 'linear-gradient(135deg, #202720 0%, #246B52 100%)',
  },
  creatorProject: {
    url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80',
    alt: 'Developer workspace for building side projects',
    credit: 'Carlos Muza via Unsplash',
    creditUrl: 'https://unsplash.com',
    fallbackGradient: 'linear-gradient(135deg, #DCEBE1 0%, #E98770 100%)',
  },
};
