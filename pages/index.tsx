import { Device } from "@prisma/client";
import type { NextPage } from "next";
import Link from "next/link";
import { useEffect, useState } from "react";
import { json } from "stream/consumers";
import DeviceCard from "../components/DeviceCard";
import Layout from "../components/Layout";

const Home: NextPage = () => {
  const [devices, setDevices] = useState<Device[]>([]);

  useEffect(() => {
    fetch("/api/device/all")
      .then((res) => res.json())
      .then((json) => setDevices(json.alldevice));
  }, []);
  return (
    <Layout title="HOME">
      <div className="h-full ove p-6 overflow-y-scroll space-y-6">
        <div id="웰컴메시지" className=" flex justify-between items-center">
          <div>
            <div className="text-4xl">Hello gramer✌</div>
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
          <div>aaa</div>
        </div>

        <div id="센서목록" className="flex flex-wrap justify-center">
          {devices.map((device, idx) => (
            <DeviceCard key={idx} device={device} />
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Home;
