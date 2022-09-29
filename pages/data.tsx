import { Device } from "@prisma/client";
import type { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { json } from "stream/consumers";
import Layout from "../components/Layout";

const Home: NextPage = () => {
  const [devices, setDevices] = useState<Device[]>([]);
  const [selectedId, setSelectedId] = useState("");
  const [value, setValue] = useState(0);
  const router = useRouter();
  function 셀랙트박스변경이벤트(event: React.ChangeEvent<HTMLSelectElement>) {
    setSelectedId(event.currentTarget.value);
  }

  function 삽입(value: Number) {
    fetch(`/api/sencing/${selectedId}`, {
      method: "POST",
      body: JSON.stringify(value),
    })
      .then((response) => response.json())
      .then((json) => {});
    router;
  }

  useEffect(() => {
    console.log("DATA페이지 로딩됨");
    fetch(`/api/device/all`)
      .then((res) => res.json())
      .then((json) => {
        if (json.ok) {
          setDevices(json.alldevice);
        }
      });
  }, []);
  return (
    <Layout title="data">
      <div className="h-full ove p-6 overflow-y-scroll space-y-6">
        <h2 className="text-3xl font-bold">장비선택</h2>

        {0 < devices.length ? null : <div>등록된 장비가ㅏ 업습니다. </div>}
        {/* {0<devices.length&&()} */}
        <select
          className="h-10 ring-2 dark:text-black px-2 w-full"
          onChange={셀랙트박스변경이벤트}
        >
          <option hidden>장비를 선택해주세요</option>
          {devices.map((device) => (
            <option key={device.id} value={device.id}>
              {device.type} {device.product} ({device.location})
            </option>
          ))}
        </select>
        {selectedId ? (
          <div className="space-y-3 ">
            <h2 className="text-3xl font-bold">선택된 장비 : {selectedId}</h2>
            <input
              type="text"
              placeholder="측정값을 입력하세요"
              onChange={(event) => setValue(Number(event.currentTarget.value))}
              value={value}
              className="h-10 ring-2 dark:text-black px-2 w-full"
            />
            <button
              className="flex justify-center items-center 
              bg-gray-500  p-3 rounded-2xl hover:bg-gray-400 relative top-2 w-full"
              onClick={() => 삽입(value)}
            >
              등록
            </button>
          </div>
        ) : null}
      </div>
    </Layout>
  );
};

export default Home;
