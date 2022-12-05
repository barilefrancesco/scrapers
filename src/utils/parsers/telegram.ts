import { Chats, ScraperRow, Scrapers } from "../../types";

export default function parserTelegram(data: Chats) {
  const datasToRender: ScraperRow[] = [];

  data.conversations.forEach((conversations, indexC) => {
    conversations.messages.forEach((message, indexM) => {
      datasToRender.push({
        conversationId: indexC.toString(),
        contact: conversations.contact,
        messageId: indexM.toString(),
        sender: message.athor,
        text: message.message,
        date: message.date,
        hour: message.hours,
        messageQuotedId: "0",
        textQuoted: "",
        senderMessageQuoted: "",
        scraper: Scrapers.TELEGRAM,
      });
    });
  });
  return datasToRender;
}
