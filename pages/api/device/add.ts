import { Device, User } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import client from "../../../libs/server/client";

interface Data {
  user?: User;
  ok: boolean;
  error?: String;
  newDevice?: Device;
}
export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse<Data>
) {
  //405 allow metho check
  if (request.method !== "POST") {
    response.status(405).json({
      ok: false,
      error: `지원하지 않는 메서드 입니다. : ${request.method}`,
    });
    return;
  }
  //   const {
  //     body: { product, location, type, unit, memo },
  //   } = request;
  const { product, location, type, unit, memo } = JSON.parse(request.body);

  //입력필드 검증
  if (true) {
    if (!product)
      return response
        .status(200)
        .json({ ok: false, error: "product이 없습니다." });

    if (!location)
      return response
        .status(200)
        .json({ ok: false, error: "location이 없습니다." });

    if (!type)
      return response
        .status(200)
        .json({ ok: false, error: "type이 없습니다." });

    if (!unit)
      return response
        .status(200)
        .json({ ok: false, error: "unit이 없습니다." });

    if (!location)
      return unit.status(200).json({ ok: false, error: "unit이 없습니다." });
  }

  console.log(request.body);

  try {
    //@ts-ignore
    const newDevice = await client.device.create({
      data: {
        product,
        location,
        type,
        unit,
        memo,
      },
    });
    response.status(200).json({ ok: true, newDevice });
  } catch (err) {
    response.status(200).json({ ok: false, error: `${err}` });
  } finally {
    //예외가 있던ㅇ벗던 실행되는 블럭
    await client.$disconnect();
  }
}
