import { ScraperRow, Scrapers } from "../../types";

export default function parserTelegram(messages: string[]) {
  const datasToRender: ScraperRow[] = [];

  for (const message of messages) {
    const messageJson = JSON.parse(message);

    datasToRender.push({
      conversationId: messageJson.chat.id.toString(),
      contact: messageJson.chat.title ? messageJson.chat.title : "",
      messageId: messageJson.id.toString() ? messageJson.id.toString() : "",
      sender: messageJson.sender
        ? messageJson.sender.username
          ? messageJson.sender.username.toString()
          : ""
        : "",
      text: messageJson.text.toString() ? messageJson.text.toString() : "",
      date: messageJson.date.split(", ")[0]
        ? messageJson.date.split(", ")[0]
        : "",
      hour: messageJson.date.split(", ")[1]
        ? messageJson.date.split(", ")[1]
        : "",
      messageQuotedId: "",
      textQuoted: "",
      senderMessageQuoted: "",
      scraper: Scrapers.TELEGRAM,
    });
  }

  return datasToRender;
}
