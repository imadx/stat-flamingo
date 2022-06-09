import type { NextApiRequest, NextApiResponse } from "next";
import { load } from "cheerio";

type Data = {
  value: number;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  const response = await fetch(
    "https://wise.com/gb/currency-converter/usd-to-lkr-rate",
  );
  const html = load(await response.text());

  const value = +html(
    "#calculator > div.cc-calculator > div.text-xs-center.text-lg-left > h3 > span.text-success",
  ).text();

  res.status(200).json({ value });
}
