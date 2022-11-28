import type { NextApiRequest, NextApiResponse } from "next";

//api get handler nextjs
export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    // Process a POST request
  } else {
    // Handle any other HTTP method
    res.status(200).json({
      conversazioni: [
        {
          contatto: "Pluto",
          messaggi: [
            {
              autore: "Pippo",
              testo: "Ciao, come va?",
              data: "1669413188",
              giorno: "24/11/2022",
              ora: "10:30",
              messaggioCitato: {
                messaggio: "",
                autore: "",
              },
            },
            {
              autore: "Pluto",
              testo: "Ehi tutto bene, tu come stai?",
              data: "1669413289",
              giorno: "24/11/2022",
              ora: "10:45",
              messaggioCitato: {
                messaggio: "Ciao, come va?",
                autore: "Pippo",
              },
            },
            {
              autore: "Pippo",
              testo: "Bene, ti va di uscire oggi?",
              data: "1669413390",
              giorno: "24/11/2022",
              ora: "10:55",
              messaggioCitato: {
                messaggio: "",
                autore: "",
              },
            },
            {
              autore: "Pluto",
              testo: "Sisi, ci vediamo alle 18:00 in piazza",
              data: "1669414001",
              giorno: "24/11/2022",
              ora: "10:59",
              messaggioCitato: {
                messaggio: "",
                autore: "",
              },
            },
          ],
        },
        {
          contatto: "Topolino",
          messaggi: [
            {
              autore: "Pippo",
              testo: "Ciao, come va?",
              data: "1669413188",
              giorno: "24/11/2022",
              ora: "10:30",
              messaggioCitato: {
                messaggio: "",
                autore: "",
              },
            },
            {
              autore: "Topolino",
              testo: "Ehi tutto bene, tu come stai?",
              data: "1669413289",
              giorno: "24/11/2022",
              ora: "10:45",
              messaggioCitato: {
                messaggio: "Ciao, come va?",
                autore: "Pippo",
              },
            },
            {
              autore: "Pippo",
              testo: "Bene",
              data: "1669413390",
              giorno: "24/11/2022",
              ora: "10:55",
              messaggioCitato: {
                messaggio: "",
                autore: "",
              },
            },
          ],
        },
      ],
    });
  }
}
