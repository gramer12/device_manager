import { User } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import client from "../../libs/server/client";
// type Data = {
//   name: string;
// };
interface Data {
  user?: User;
  ok: boolean;
}
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  try {
    const user = await client.user.create({
      data: { name: "이덕화", age: 23, addr: "제주도" },
    });

    //@ts-ignore
    res.status(200).json({ ok: true, user });
  } catch (err) {
    res.status(200).json({ ok: false });
  }
}
