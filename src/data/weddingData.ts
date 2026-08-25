import { WeddingData, RsvpEntry } from '../types';

export const initialWeddingData: WeddingData = {
  groom: {
    firstName: 'AHMED',
    fullName: 'AHMED ABO EL ELA',
  },
  bride: {
    firstName: 'JANA',
    fullName: 'JANA MAGHRABY',
  },
  date: {
    iso: '2027-01-21T18:00:00',
    day: '21',
    month: 'JANUARY',
    year: '2027',
    fullDateDisplay: '21 JANUARY 2027',
    dayOfWeek: 'Thursday',
    shortDisplay: '21 · 01 · 2027',
    time: '6:00 PM',
    timePhrase: 'AT SIX O’CLOCK IN THE EVENING',
  },
  invitationText: {
    header: 'TOGETHER WITH THEIR FAMILIES',
    body: 'request the pleasure of your company as they celebrate their wedding',
  },
  venue: {
    name: 'The Imperial Pavilion & Courtyard',
    subname: 'Nile Corniche',
    address: 'Garden City',
    city: 'Cairo, Egypt',
    googleMapsUrl: 'https://maps.google.com/?q=Garden+City+Cairo+Egypt',
    dressCode: 'Black Tie & Formal Evening Attire',
    receptionTime: '6:00 PM',
    dinnerTime: '8:00 PM',
  },
  selectedQuoteId: 'quran-30-21',
  quotes: [
    {
      id: 'quran-30-21',
      type: 'quran',
      title: 'Surat Ar-Rum',
      source: 'Surat Ar-Rum (30:21)',
      arabic: 'وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُم مِّنْ أَنفُسِكُمْ أَزْوَاجًا لِّتَسْكُنُوا إِلَيْهَا وَجَعَلَ بَيْنَكُم مَّوَدَّةً وَرَحْمَةً',
      text: '“And among His signs is that He created for you from yourselves spouses that you may find tranquility in them; and He placed between you affection and mercy.”',
    },
  ],
  photos: [
    {
      id: 'photo-1',
      url: 'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1600&auto=format&fit=crop',
      caption: 'THE BEGINNING',
      subcaption: 'A quiet afternoon under the Mediterranean sun',
      orientation: 'portrait',
    },
    {
      id: 'photo-2',
      url: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?q=80&w=1600&auto=format&fit=crop',
      caption: 'THE MOMENTS',
      subcaption: 'Laughter, timeless architecture, and endless shared sunsets',
      orientation: 'landscape',
    },
    {
      id: 'photo-3',
      url: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=1600&auto=format&fit=crop',
      caption: 'THE MEMORIES',
      subcaption: 'Walking together towards everything still to come',
      orientation: 'portrait',
    },
  ],
  timeline: [
    {
      id: 'event-1',
      time: '18:00',
      title: 'WELCOME RECEPTION',
      location: 'The Palm Veranda',
      description: 'Chilled refreshments, artisanal mocktails & live acoustic string quartet',
    },
    {
      id: 'event-2',
      time: '19:30',
      title: 'KATB EL KETAB & CEREMONY',
      location: 'The Grand Archway',
      description: 'Solemn celebration of marriage vows and traditional blessings',
    },
    {
      id: 'event-3',
      time: '20:30',
      title: 'DINNER BANQUET',
      location: 'The Imperial Pavilion',
      description: 'A curated multi-course culinary experience with family speeches',
    },
    {
      id: 'event-4',
      time: '22:00',
      title: 'FIRST DANCE & CELEBRATION',
      location: 'The Main Hall',
      description: 'Cake cutting, musical celebration and festivities into the night',
    },
    {
      id: 'event-5',
      time: '01:00',
      title: 'MIDNIGHT TOAST & FAREWELL',
      location: 'The Lantern Courtyard',
      description: 'A quiet sparkler send-off under the Cairo starlight',
    },
  ],
  rsvpDeadline: '15 December 2026',
};

export const sampleRsvps: RsvpEntry[] = [
  {
    id: 'rsvp-1',
    guestName: 'Kareem & Sarah Mansour',
    guestsCount: 2,
    attending: true,
    notes: 'So thrilled to celebrate this special day with you both!',
    submittedAt: '2026-08-20T10:15:00',
  },
  {
    id: 'rsvp-2',
    guestName: 'Dr. Tarek El Maghraby',
    guestsCount: 2,
    attending: true,
    notes: 'Mabrouk Ahmed and Jana! Looking forward to an unforgettable night.',
    submittedAt: '2026-08-22T14:30:00',
  },
];
