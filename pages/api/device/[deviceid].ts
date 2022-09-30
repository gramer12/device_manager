import { Device, User } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import client from "../../../libs/server/client";

interface Data {
  ok: boolean;
  id?: String;
  error?: String;
}
export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse<Data>
) {
  if (request.method !== "DELETE") {
    response.status(405).json({
      ok: false,
      error: `지원하지 않는 메서드 입니다. : ${request.method}`,
    });
    return;
  }

  try {
    const { deviceid } = request.query;

    const deleteDevice = await client.device.delete({
      where: {
        id: deviceid?.toString(),
      },
    });

    response.status(200).json({ ok: true, id: deleteDevice.id });
  } catch (err) {
    response.status(200).json({ ok: false, error: `${err}` });
  } finally {
    //예외가 있던ㅇ벗던 실행되는 블럭
    await client.$disconnect();
  }
}
