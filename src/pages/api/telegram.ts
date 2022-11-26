import type { NextApiRequest, NextApiResponse } from 'next'

//api get handler nextjs
export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    // Process a POST request
  } else {
    // Handle any other HTTP method
    res.status(200).json({
      conversazioni: [
        {
          contatto: "michele",
          messaggi: [
            {
              autore: "asdfasdasdas",
              testo: "dasdasdas",
              data: "12321323213213TS",
              giorno: "10/12/98",
              ora: "dateTime",
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
