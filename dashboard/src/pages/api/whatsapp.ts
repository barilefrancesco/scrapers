import type { NextApiRequest, NextApiResponse } from "next";

//api get handler nextjs
export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    // Process a POST request
  } else {
    // Handle any other HTTP method
    res.status(200).json({
      conversations: [
        {
          contact: "Pluto",
          messages: [
            {
              athor: "3802863702",
              message: "Ciao, come va?",
              date: "1669413188",
              giorno: "24/11/2022",
              hours: "10:30",
              mention: {
                message: "",
                athor: "",
              },
            },
            {
              athor: "Pluto",
              message: "Ehi tutto bene, tu come stai?",
              date: "1669413289",
              giorno: "24/11/2022",
              hours: "10:45",
              mention: {
                message: "Ciao, come va?",
                athor: "3802863702",
              },
            },
            {
              athor: "3802863702",
              message: "Bene, ti va di uscire oggi?",
              date: "1669413390",
              giorno: "24/11/2022",
              hours: "10:55",
              mention: {
                message: "",
                athor: "",
              },
            },
            {
              athor: "Pluto",
              message: "Sisi, ci vediamo alle 18:00 in piazza",
              date: "1669414001",
              giorno: "24/11/2022",
              hours: "10:59",
              mention: {
                message: "",
                athor: "",
              },
            },
          ],
        },
        {
          contact: "Topolino",
          messages: [
            {
              athor: "3802863702",
              message: "Ciao, come va?",
              date: "1669413188",
              giorno: "24/11/2022",
              hours: "10:30",
              mention: {
                message: "",
                athor: "",
              },
            },
            {
              athor: "Topolino",
              message: "Ehi tutto bene, tu come stai?",
              date: "1669413289",
              giorno: "24/11/2022",
              hours: "10:45",
              mention: {
                message: "Ciao, come va?",
                athor: "3802863702",
              },
            },
            {
              athor: "3802863702",
              message: "Bene",
              date: "1669413390",
              giorno: "24/11/2022",
              hours: "10:55",
              mention: {
                message: "",
                athor: "",
              },
            },
          ],
        },
      ],
    });
  }
}
