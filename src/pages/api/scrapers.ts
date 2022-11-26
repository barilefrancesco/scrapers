import type { NextApiRequest, NextApiResponse } from 'next'

type Options = {scrapers: string[], phone: string, contacts: string}

//api get handler nextjs
export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    // Process a POST request
    const options: Options = req.body;
    console.log("req.body: ", options);

    options.scrapers.map(value => {
        switch (value) {
            case "whatsapp":
                // Call function to get whatsapp datas
                console.log("Call function to get whatsapp datas")
                break;
            case "telegram":
                // Call function to get telegram datas
                console.log("Call function to get telegram datas")
                break;                
            default:
                break;
        }
    });

    res.status(200).json(options)
  } else {
    // Handle any other HTTP method
    // res.status(200).json({
    //   conversazioni: [
    //     {
    //       contatto: "michele",
    //       messaggi: [
    //         {
    //           autore: "asdfasdasdas",
    //           testo: "dasdasdas",
    //           data: "12321323213213TS",
    //           giorno: "10/12/98",
    //           ora: "dateTime",
    //           messaggioCitato: {
    //             messaggio: "",
    //             autore: "",
    //           },
    //         },
    //       ],
    //     },
    //   ],
    // });
  }
}
