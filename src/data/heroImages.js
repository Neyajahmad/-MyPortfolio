import { projects } from './mockData';

// We gather all project images and gallery images to create the floating array
// Cosmos.so uses 10-15 images. We have exactly 7 unique images between our 3 projects.
// We will duplicate some with different aspect ratios/crops or just use the 7 across the screen.
const baseImages = projects.flatMap(p => [p.image, ...(p.gallery || [])]);

// Let's create an array of 12 positioned floating cards
export const heroImages = [
  { id: 1, src: baseImages[0], top: "10%", left: "5%", width: "160px", delay: 0 },
  { id: 2, src: baseImages[1], top: "25%", left: "20%", width: "140px", delay: 1.2 },
  { id: 3, src: baseImages[2], top: "60%", left: "8%", width: "180px", delay: 0.5 },
  { id: 4, src: baseImages[3], top: "80%", left: "25%", width: "150px", delay: 2.1 },
  { id: 5, src: baseImages[4], top: "15%", right: "8%", width: "170px", delay: 0.8 },
  { id: 6, src: baseImages[5], top: "35%", right: "22%", width: "130px", delay: 1.5 },
  { id: 7, src: baseImages[6], top: "70%", right: "12%", width: "160px", delay: 0.3 },
  { id: 8, src: baseImages[0], top: "85%", right: "28%", width: "140px", delay: 2.5 },
  // Additional filler using same images but positioned to fill space
  { id: 9, src: baseImages[1], top: "5%", left: "40%", width: "120px", delay: 1.8 },
  { id: 10, src: baseImages[2], top: "8%", right: "35%", width: "130px", delay: 0.9 },
  { id: 11, src: baseImages[3], top: "88%", left: "45%", width: "150px", delay: 1.1 },
  { id: 12, src: baseImages[4], top: "92%", right: "45%", width: "140px", delay: 1.7 },
];
