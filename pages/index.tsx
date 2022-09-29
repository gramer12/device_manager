import { Device } from "@prisma/client";
import type { NextPage } from "next";
import Link from "next/link";
import { useEffect, useState } from "react";
import { json } from "stream/consumers";
import DeviceCard from "../components/DeviceCard";
import Layout from "../components/Layout";

import Toggle from "react-toggle";
import { RingLoader } from "react-spinners";
const Home: NextPage = () => {
  const [devices, setDevices] = useState<Device[]>([]);
  const [bToggle, setBToggle] = useState(false);

  useEffect(() => {
    fetch("/api/device/all")
      .then((res) => res.json())
      .then((json) => setDevices(json.alldevice));
  }, []);
  function 토글변경() {
    setBToggle(!bToggle);

    if (!bToggle) {
      console.log("실시간 ON");
    } else {
      console.log("실시간 OFF");
    }
  }
  return (
    <Layout title="HOME">
      <div className="h-full ove p-6 overflow-y-scroll space-y-6">
        <div></div>
        <div id="웰컴메시지" className=" flex justify-between items-center">
          <div>
            <div className="text-4xl">Hello YSJ✌</div>
            <div className="text-gray-500">welcome back to home</div>
          </div>
          <Link href={"/setting"}>
            <button className="sunmoon_btn">
              <span> Add Device</span>
              <span data-comment="플러스아이콘">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    fillRule="evenodd"
                    d="M12 3.75a.75.75 0 01.75.75v6.75h6.75a.75.75 0 010 1.5h-6.75v6.75a.75.75 0 01-1.5 0v-6.75H4.5a.75.75 0 010-1.5h6.75V4.5a.75.75 0 01.75-.75z"
                    clipRule="evenodd"
                  />
                </svg>
              </span>
            </button>
          </Link>
        </div>

        <div id="링크드투유" className="flex justify-between items-center">
          <div className=" text-xl">Linked to you</div>
          <div className="select-none flex items-center space-x-2">
            <Toggle
              id="cheese-status"
              defaultChecked={bToggle}
              onChange={토글변경}
            />
            {bToggle && <RingLoader color="#36d7b7" />}
            <label htmlFor="cheese-status">
              실시간 <span>{!bToggle ? "ON" : "OFF"}</span>
            </label>
          </div>
        </div>

        <div id="센서목록" className="flex flex-wrap justify-center">
          {0 < devices.length ? null : <div>등록된 장비가ㅏ 업습니다. </div>}
          {devices.map((device, idx) => (
            <DeviceCard key={idx} device={device} realTime={!bToggle} />
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Home;
