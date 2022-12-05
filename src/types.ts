export type Option = { value: Scrapers; label: string };

export enum Scrapers {
  WHATSAPP = "whatsapp",
  TELEGRAM = "telegram",
}

// Modal
export type FormInput = {
  scrapers?: Scrapers[];
  phone?: string;
  contacts?: string;
};

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
  conversationId: string; // Valore identificiativo sequenziiale
  contact: string; // Tizio con cui si sta parlando (o gruppo)
  messageId: string; // Valore identificiativo sequenziiale
  sender: string; // Chi scrive il messaggio
  text: string; // Testo del messaggio
  date: string; // Data del messaggio
  hour: string; // Ora del messaggio
  messageQuotedId: string; // Se esiste è il messaggio a cui ci si riferisce
  textQuoted: string; // Testo del messaggio citato
  senderMessageQuoted: string; // Chi scrive il messaggio
  scraper: string; // Tipologia di scraper
};
