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
          contact: "Paperino",
          messages: [
            {
              athor: "3802863702",
              message: "Ciao, come stai?",
              date: "12321323213213TS",
              day: "10/12/2022",
              hours: "10:30",
              mention: {
                author: "",
                message: "",
              },
            },
          ],
        },
      ],
    });
  }
}
