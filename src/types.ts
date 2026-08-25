export interface WeddingEvent {
  id: string;
  time: string;
  title: string;
  location: string;
  description?: string;
}

export interface QuoteOption {
  id: string;
  type: 'quran' | 'quote';
  title: string;
  source: string;
  arabic?: string;
  text: string;
  author?: string;
}

export interface EditorialPhoto {
  id: string;
  url: string;
  caption: string;
  subcaption?: string;
  orientation?: 'portrait' | 'landscape';
}

export interface WeddingData {
  groom: {
    firstName: string;
    fullName: string;
  };
  bride: {
    firstName: string;
    fullName: string;
  };
  date: {
    iso: string; // e.g. "2027-01-21T18:00:00"
    day: string; // "21"
    month: string; // "JANUARY"
    year: string; // "2027"
    fullDateDisplay: string; // "21 JANUARY 2027"
    dayOfWeek: string; // "Thursday"
    shortDisplay: string; // "21 · 01 · 2027"
    time?: string; // "6:00 PM"
    timePhrase?: string; // "AT SIX O'CLOCK IN THE EVENING"
  };
  invitationText: {
    header: string;
    body: string;
  };
  venue: {
    name: string;
    subname: string;
    address: string;
    city: string;
    googleMapsUrl: string;
    dressCode: string;
    receptionTime: string;
    dinnerTime: string;
  };
  selectedQuoteId: string;
  quotes: QuoteOption[];
  photos: EditorialPhoto[];
  timeline: WeddingEvent[];
  rsvpDeadline: string;
}

export interface RsvpEntry {
  id: string;
  guestName: string;
  guestsCount: number;
  attending: boolean;
  notes?: string;
  submittedAt: string;
}
