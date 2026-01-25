export const NAV_LINKS = [
  { name: 'Home', path: '/' },
  { name: 'About us', path: '/about' },
  { name: 'Services', path: '/services' },
  { 
    name: 'Gallery', 
    path: '/gallery', 
    dropdown: [
      { name: 'Weddings', path: '/gallery/weddings' },
      { name: 'Engagements', path: '/gallery/engagements' },
      { name: 'Birthdays', path: '/gallery/birthdays' },
      { name: 'Baby Shoots', path: '/gallery/baby' },
    ] 
  },
  { name: 'Contact', path: '/contact' },
];
export const HERO_CONTENT = {
  // We will structure the "Boxed" text inside the component
  description: "At Lakmal Sinharage Photography, we believe every story deserves to be told beautifully. With an artistic eye and a passion for timeless storytelling, we create frames that celebrate love, style, and life's most meaningful occasions — across Sri Lanka and the world."
};
export const SERVICES = [
  {
    id: 1,
    title: "Wedding Tales",
    image: "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=800",
    desc: "Cinematic love stories captured forever."
  },
  {
    id: 2,
    title: "Portraiture",
    image: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?q=80&w=800",
    desc: "Personal branding and artistic portraits."
  },
  {
    id: 3,
    title: "Events",
    image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=800",
    desc: "Corporate and private celebrations."
  }
];

