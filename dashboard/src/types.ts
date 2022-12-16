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
  telegram_api_id?: string;
  telegram_api_hash?: string;
  telegram_session_code?: string;
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

/* Whastapp types */
export type WhatsappChat = {
  contatto: string; // Tizio con cui si sta parlando (o gruppo)
  messaggi: WhatsappMessage[];
};

export type WhatsappMessage = {
  autore: string; // Chi scrive il messaggio
  data: {
    day: number;
    month: number;
    year: number;
  };
  giorno: string;
  messaggio: string;
  messaggioCitato: {
    autore: string;
    messaggio: string;
  };
  ora: string;
};

/* Telegram types */
export enum TelegramIDs {
  API_ID = "24332766",
  API_HASH = "167bf4d4000402e3e835ca4fd81e620c",
  FIRST_SESSION_CODE = "0",
}
