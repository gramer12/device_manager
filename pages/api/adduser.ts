import type { NextApiRequest, NextApiResponse } from "next";
import client from "../../libs/server/client";
type Data = {
  name: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  try {
    const newUser = await client.user.create({
      data: { name: "이덕화", age: 23, addr: "제주도" },
    });
    res.status(200).json({ name: "okokokok" });
  } catch (err) {
    res.status(200).json({ name: "MNNNNNNN" });
  }
}
