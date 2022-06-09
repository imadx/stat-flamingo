import type { NextApiRequest, NextApiResponse } from "next";
import { load } from "cheerio";
import { Source } from "../../types";

type Data = {
  buying: string | null;
  selling: string | null;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  let buying = null,
    selling = null;

  switch (req.query.source as Source) {
    case "sampath": {
      const response = await fetchBank();
      buying = response.buying;
      selling = response.selling;
      break;
    }

    case "wise": {
      const response = await fetchWise();
      buying = response.buying;
      break;
    }

    case "google": {
      const response = await fetchGoogle();
      buying = response.buying;
      break;
    }
  }

  res.status(200).json({ buying, selling });
}

const fetchBank = async (): Promise<Data> => {
  const response = await fetch("https://www.sampath.lk/en/exchange-rates");
  const html = load(await response.text());

  const dataBankBuying = html(
    ".exch-rates > tbody > tr:nth-child(17) > td:nth-child(2)",
  ).text();
  const dataBankSelling = html(
    ".exch-rates > tbody > tr:nth-child(17) > td:nth-child(4)",
  ).text();

  return { buying: dataBankBuying, selling: dataBankSelling };
};

const fetchGoogle = async (): Promise<Data> => {
  const response = await fetch(
    "https://www.google.com/search?q=value+of+usd+in+lkr&oq=value+of",
  );
  const html = load(await response.text());

  const value = html(".BNeawe.iBp4i.AP7Wnd > div")
    .text()
    .replace("Sri Lankan Rupee", "");

  return { buying: value, selling: null };
};

const fetchWise = async (): Promise<Data> => {
  const response = await fetch(
    "https://wise.com/gb/currency-converter/usd-to-lkr-rate",
  );
  const html = load(await response.text());

  const value = html(
    "#calculator > div.cc-calculator > div.text-xs-center.text-lg-left > h3 > span.text-success",
  ).text();

  return { buying: value, selling: null };
};
