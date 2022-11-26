import { z } from "zod";
import { useQuery } from "@tanstack/react-query";
const responseValidator = z.object({
  conversazioni: z
    .object({
      contatto: z.string(),
      messaggi: z
        .object({
          autore: z.string(),
          testo: z.string(),
          data: z.string(),
          giorno: z.string(),
          ora: z.string(),
          messaggioCitato: z
            .object({
              messaggio: z.string(),
              autore: z.string(),
            })
            .optional(),
        })
        .array(),
    })
    .array(),
});

export type WhatsappAPIResponse = z.infer<typeof responseValidator>;

export const useWhatsappScraper = () => {
  return useQuery(
    ["whastapp-scraper-query"],
    async () => {
      const res = await (await fetch(`/api/whatsapp/`)).json();

      return responseValidator.parse(res);
    },
    {
      onError: (err) => {
        console.error("Something went wrong", err);
      },
    }
  );
};
