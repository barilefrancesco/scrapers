export type Option = { value: Scrapers; label: string };

export enum Scrapers {
  WHATSAPP = "whatsapp",
  TELEGRAM = "telegram",
}

// Modal
export type FormInput = { scrapers?: Scrapers[]; phone?: string; contacts?: string };

// API Response
export type Mention = {
  id: string;
  author: string;
  message: string;
};

export type Message = {
  athor: string;
  message: string;
  date: string;
  day: string;
  hours: string;
  mention: Mention;
};

export type Chat = {
  id: string;
  contact: string;
  messages: Message[];
};

export type Chats = {
  conversations: Chat[];
  scraper: Scrapers;
};

// Table
export type ScraperRow = {
  idConversazione: string; // Valore identificiativo sequenziiale
  contatto: string; // Tizio con cui si sta parlando (o gruppo)
  idMessaggio: string; // Valore identificiativo sequenziiale
  mittente: string; // Chi scrive il messaggio
  testo: string; // Testo del messaggio
  data: string; // Data del messaggio
  ora: string; // Ora del messaggio
  idMessaggioCitato: string; // Se esiste è il messaggio a cui ci si riferisce
  testoCitato: string; // Testo del messaggio citato
  mittenteCitato: string; // Chi scrive il messaggio
  scraper: string; // Tipologia di scraper
};