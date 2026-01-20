export type Major = 
  | "Aerospace"
  | "Biomedical"
  | "Energy Systems"
  | "Engineering Physics"
  | "Electrical and Computer"
  | "Math Stats Finance"
  | "Machine Intelligence"
  | "Robotics"
  | "Transportation";

export interface Student {
  id: number;
  name: string;
  major: Major;
}

export interface MajorInfo {
  name: Major;
  color: string;
  icon: string;
  shortName: string;
  description: string;
}

export const MAJORS: MajorInfo[] = [
  { 
    name: "Aerospace", 
    color: "#00BCD4", 
    icon: "🚀", 
    shortName: "AERO",
    description: "Designing the future of flight and space exploration"
  },
  { 
    name: "Biomedical", 
    color: "#E91E63", 
    icon: "🧬", 
    shortName: "BME",
    description: "Engineering solutions for healthcare and medicine"
  },
  { 
    name: "Energy Systems", 
    color: "#FF9800", 
    icon: "⚡", 
    shortName: "ENRG",
    description: "Powering a sustainable future"
  },
  { 
    name: "Engineering Physics", 
    color: "#9C27B0", 
    icon: "⚛️", 
    shortName: "PHYS",
    description: "Understanding and harnessing the laws of nature"
  },
  { 
    name: "Electrical and Computer", 
    color: "#4CAF50", 
    icon: "💻", 
    shortName: "ECE",
    description: "Building the digital infrastructure of tomorrow"
  },
  { 
    name: "Math Stats Finance", 
    color: "#607D8B", 
    icon: "📊", 
    shortName: "MSF",
    description: "Quantitative methods for complex systems"
  },
  { 
    name: "Machine Intelligence", 
    color: "#2196F3", 
    icon: "🤖", 
    shortName: "MI",
    description: "Creating intelligent systems that learn and adapt"
  },
  { 
    name: "Robotics", 
    color: "#F44336", 
    icon: "🦾", 
    shortName: "ROB",
    description: "Designing autonomous machines for the real world"
  },
  { 
    name: "Transportation", 
    color: "#795548", 
    icon: "🚄", 
    shortName: "TRANS",
    description: "Revolutionizing how people and goods move"
  },
];

export const ENGSCI_QUOTES = [
  "Engineering Science: Where the impossible becomes the curriculum.",
  "9 majors, infinite possibilities.",
  "Solving tomorrow's problems today.",
  "The hardest program, the brightest future.",
  "From foundational science to cutting-edge engineering.",
  "Where math meets matter and ideas become reality.",
  "Trained to tackle any challenge, prepared for every field.",
  "EngSci 2T8: The future starts here.",
];
