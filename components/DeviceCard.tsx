import { Device } from "@prisma/client";
import { useEffect, useState } from "react";
import { json } from "stream/consumers";

interface DeviceCardProps {
  device: Device;
}
export default function DeviceCard({ device }: DeviceCardProps) {
  const [value, setValue] = useState(-1);
  useEffect(() => {
    fetch(`/api/sencing/${device.id}`)
      .then((res) => res.json())
      .then((json) => {
        setValue(json.value);
      });
    console.log(device.id);
  }, []);
  return (
    <div
      data-comment="장비카드"
      className="bg-red-200 border-2 w-60 h-56 p-4 flex flex-col justify-between m-3"
    >
      <div className="flex justify-end space-x-2">
        <span className="text-5xl ">{value ? value : "-"}</span>
        <span className="text-gray-500">{device.unit}</span>
      </div>
      <div className="flex flex-col space-y-2">
        <div className="flex flex-col items-baseline">
          <span className="text-lg">{device.location} </span>
          <span className="text-right text-gray-500">{device.memo}</span>
        </div>

        <span className="text-3xl">{device.product}</span>
      </div>
    </div>
  );
}
