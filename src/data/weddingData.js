// src/data/weddingData.js

// Import placeholders (Replace with your real images later)
import Cover1 from '../assets/images/ServicesMenu/wedding.jpg'; 
import Cover2 from '../assets/images/ServicesMenu/Engagement.jpg';

export const WEDDINGS = [
  {
    id: "kasun-natasha",
    couple: "Kasun & Natasha",
    date: "January 14, 2024",
    location: "Galle Face Hotel, Colombo",
    description: "A timeless celebration of love amidst the colonial charm of Galle Face. Elegant, royal, and full of emotion.",
    coverImage: Cover1,
    gallery: [
       "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1200",
       "https://images.unsplash.com/photo-1511285560982-1351cdeb9821?q=80&w=1200",
       "https://images.unsplash.com/photo-1606800052052-a08af7148866?q=80&w=1200",
       "https://images.unsplash.com/photo-1520854221256-17451cc330e7?q=80&w=1200",
    ]
  },
  {
    id: "shehan-amanda",
    couple: "Shehan & Amanda",
    date: "December 02, 2023",
    location: "Araliya Green Hills, Nuwara Eliya",
    description: "Mist-covered mountains and intimate vows. A cozy, romantic destination wedding in the hills.",
    coverImage: Cover2,
    gallery: [
       "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?q=80&w=1200",
       "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?q=80&w=1200",
       "https://images.unsplash.com/photo-1523438885200-e635ba2c371e?q=80&w=1200",
    ]
  },
];