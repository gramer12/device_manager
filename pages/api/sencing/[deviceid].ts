import { Device, User } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import client from "../../../libs/server/client";

interface Data {
  ok: boolean;
  error?: String;
  value?: number;
}
export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse<Data>
) {
  if (request.method !== "GET") {
    response.status(405).json({
      ok: false,
      error: `지원하지 않는 메서드 입니다. : ${request.method}`,
    });

    return;
  }
  const { deviceid } = request.query;

  if (!deviceid) {
    response.status(200).json({
      ok: false,
      error: `장치 ID(${deviceid})를 입력해주세요`,
    });
  }
  try {
    console.log("여기까지 출력됨");

    const result = await client.sencing.findFirst({
      where: {
        //필터링
        deviceId: deviceid?.toString(),
      },
      select: {
        //필드를 선택해서 가져올수있음 boolean
        value: true,
      },
      orderBy: {
        createAt: "desc",
      },
    });
    console.log(result);
    response.status(200).json({ ok: true, value: result?.value });
  } catch (err) {
    response.status(200).json({ ok: false, error: `${err}` });
  }
}
