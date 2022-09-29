import { User } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import client from "../../libs/server/client";
// type Data = {
//   name: string;
// };

interface ResponeseDataType {
  name: string;
  users: User[];
}
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponeseDataType>
) {
  try {
    const users = await client.user.findMany();
    console.log(users);
    res.status(200).json({ name: "MNNNNNNN", users });
  } catch (err) {
  } finally {
    //예외가 있던ㅇ벗던 실행되는 블럭
    await client.$disconnect();
  }
}
