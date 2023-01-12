import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  data?: any;
  error?: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {}
