import {
  Chat,
  Chats,
  Message,
  Mention,
  ScraperRow,
  Scrapers,
  WhatsappMessage,
  WhatsappChat,
} from "../../types";

export default function parserWhatsapp(data: WhatsappChat[]) {
  let singleChat: Chat;
  let conversations: Chat[] = [];

  let messages: Message[] = [];
  for (const chat of data) {
    const chatName = chat.contatto;
    const chatMessages: WhatsappMessage[] = chat.messaggi;

    for (const message of chatMessages) {
      let mention: Mention = {
        id: Date.now().toString(),
        author: message.messaggioCitato.autore,
        message: message.messaggioCitato.messaggio,
      };
      messages = [
        ...messages,
        {
          athor: message.autore,
          message: message.messaggio,
          date: message.giorno,
          day: "",
          hours: message.ora,
          mention: mention,
        },
      ];
    }

    singleChat = {
      id: Date.now().toString(),
      contact: chatName,
      messages: messages,
    };

    conversations = [...conversations, singleChat];
  }

  let chats: Chats = {
    scraper: Scrapers.WHATSAPP,
    conversations: conversations,
  };

  const datasToRender: ScraperRow[] = [];

  chats.conversations.forEach((conversations, indexC) => {
    conversations.messages.forEach((message, indexM) => {
      datasToRender.push({
        conversationId: indexC.toString() ? indexC.toString() : "-",
        contact: conversations.contact ? conversations.contact : "-",
        messageId: indexM.toString() ? indexM.toString() : "-",
        sender: message.athor ? message.athor : "-",
        text: message.message ? message.message : "-",
        date: message.date ? message.date : "-",
        hour: message.hours ? message.hours : "-",
        messageQuotedId: message.mention.id ? message.mention.id : "-",
        textQuoted: message.mention.message ? message.mention.message : "-",
        senderMessageQuoted: message.mention.author
          ? message.mention.author
          : "-",
        scraper: Scrapers.WHATSAPP,
      });
    });
  });
  return datasToRender;
}
