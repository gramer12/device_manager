import { Device } from "@prisma/client";
import { useEffect, useState } from "react";
import { json } from "stream/consumers";
import { cls } from "../libs/client/utils";

interface DeviceCardProps {
  device: Device;
  realTime: Boolean;
}
export default function DeviceCard({ device, realTime }: DeviceCardProps) {
  const [value, setValue] = useState(-1);
  const [timerID, setTimerID] = useState<NodeJS.Timer>();
  const [bbong, setBbong] = useState("");
  function 센싱데이터업데이트() {
    fetch(`/api/sencing/${device.id}`)
      .then((res) => res.json())
      .then((json) => {
        setValue(json.value);
        if (json.value !== value) {
          setBbong("text-red-500");
          setTimeout(() => {
            setBbong("");
          }, 10000);
        }
      });
  }

  useEffect(() => {
    if (realTime) {
      const temptimerID = setInterval(() => {
        센싱데이터업데이트();
      }, 5000);
      setTimerID(temptimerID);
    } else {
      clearInterval(timerID);
    }
  }, [realTime]);

  useEffect(() => {
    센싱데이터업데이트();
  }, []);

  return (
    <div
      data-comment="장비카드"
      className="bg-red-200 border-2 w-60 h-56 p-4 flex flex-col justify-between m-3"
    >
      <div className="flex justify-end space-x-2">
        <span className={cls("text-5xl ")}>{value ? value : "-"}</span>
        <span className="text-gray-500">{device.unit}</span>
      </div>
      <div className="flex flex-col space-y-2">
        <div className="flex flex-col items-baseline">
          <span className="text-lg">{device.location} </span>
          <span className="text-right text-lg">{device.memo}</span>
        </div>

        <span className="text-3xl">{device.product}</span>
      </div>
    </div>
  );
}
