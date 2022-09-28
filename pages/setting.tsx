import { Device } from "@prisma/client";
import type { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { json } from "stream/consumers";
import Layout from "../components/Layout";

const Home: NextPage = () => {
  const router = useRouter();
  const [location, setLocation] = useState(""); //설치 위치
  const [unit, setUnit] = useState(""); //측정단위
  const [type, setType] = useState(""); //장치 종류

  const [product, setProduct] = useState(""); //제품명
  const [memo, setMemo] = useState(""); //메모

  const [errMessage, setErrMessage] = useState("");
  const [devices, setdevices] = useState<Device[]>([]);
  function 장비추가() {
    //입력폼에 데이터가 잇는지 확인
    // if (!product || !location || !unit || !memo) {
    //   alert("제품/설치위치/단위를 입력해 주세요");
    // }
    setErrMessage("");

    if (true) {
      if (!product) {
        setErrMessage("제품명을 입력하세요");
        return;
      }
      if (!location) {
        setErrMessage("설피위치을 입력하세요");
        return;
      }
      if (!unit) {
        setErrMessage("단위을 입력하세요");
        return;
      }
      if (!type) {
        setErrMessage("장치를 입력하세요");
        return;
      }
    }
    // 서버에 body로 실어서 보낼 데이터
    const data = { product, location, type, unit, memo };
    fetch("/api/device/add", {
      method: "POST",
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((json) => {
        if (json.ok) {
          //등록성공
          //전송완료시 입력창 초기화

          document
            .querySelector("#container__add_device")
            ?.classList.toggle("hidden"); //토글 공부하기
          const tempArr = [...devices, json.newDevice];
          setdevices(tempArr);
          ClearForm();
        } else {
          //오류가있을때 표시해야함
          setErrMessage("등록에 실팼습니다.");
        }
      });
    //서버로 데이터 전송

    //전송완료시 입력창 초기화

    //오류가 있으면 표시해야줘야함
  }

  function 장치삭제(장치ID: string) {
    //서버에 삭제요청
    if (!장치ID) return;
    fetch(`/api/device/${장치ID}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((json) => {
        console.log(json);
        if (json.ok === true) {
          console.log(json.id);

          const tempArr = devices.filter((device) => device.id !== json.id);
          setdevices(tempArr);
        }
      });
  }
  //<select> change
  function 장치종류변경(event: React.ChangeEvent<HTMLSelectElement>) {
    setType(event.currentTarget.value);
  }

  useEffect(() => {
    fetch("/api/device/all")
      .then((res) => res.json())
      .then((json) => setdevices(json.alldevice));
  }, []);

  function ClearForm() {
    setUnit("");
    setProduct("");
    setLocation("");
    setMemo("");
    setErrMessage("");
  }
  function 장비추가버튼() {
    document
      .querySelector("#container__add_device")
      ?.classList.toggle("hidden"); //토글 공부하기

    ClearForm();
  }

  return (
    <Layout title="setting">
      <div className="h-full ove p-6 overflow-y-scroll space-y-6">
        <div data-comment={"장비추가버튼"} className="flex justify-end">
          <Link href={"/setting"}>
            <button className="sunmoon_btn" onClick={장비추가버튼}>
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

        <div
          id="container__add_device"
          data-comment={"new Devce"}
          className="space-y-2 hidden"
        >
          <hr />
          <div className="text-3xl font-bold">New Device</div>
          <div className="flex flex-col space-y-2">
            <span>location *</span>
            <input
              type="text"
              value={location}
              onChange={(event) => setLocation(event.currentTarget.value)}
              placeholder="거실, 안방... ect"
              className="h-10 ring-2 dark:text-black px-2"
            />
            <span>product</span>
            <input
              type="text"
              value={product}
              onChange={(event) => setProduct(event.currentTarget.value)}
              placeholder="제품를 입력하세요"
              className="h-10 ring-2 dark:text-black px-2"
            />
            <div className="flex flex-col">
              <span>장치종류</span>
              <select
                className="h-10 ring-2 dark:text-black px-2"
                value={type}
                onChange={장치종류변경}
              >
                <option hidden>장치 종류를 선택하세요.</option>
                <option value="TEMP">온도 센서</option>
                <option value="HUMI">습도 센서</option>
                <option value="CO2">co2 센서</option>
              </select>
            </div>

            <span>unit </span>
            <input
              type="text"
              value={unit}
              onChange={(event) => setUnit(event.currentTarget.value)}
              placeholder="측정단위 (eg:°C,%,°F)"
              className="h-10 ring-2 dark:text-black px-2"
            />
            <span>memo</span>
            <input
              type="text"
              value={memo}
              onChange={(event) => setMemo(event.currentTarget.value)}
              placeholder="메모르를 입력하세요"
              className="h-10 ring-2 dark:text-black px-2"
            />
            {errMessage ? <div>{errMessage}</div> : null}

            <button
              className="flex justify-center items-center 
              bg-gray-500  p-3 rounded-2xl hover:bg-gray-400 relative top-2"
              onClick={장비추가}
            >
              등록
            </button>
          </div>

          <hr />
        </div>

        <div data-comment={"장비삭제메뉴"}>
          <h2 className="text-3xl font-bold"> 장치목록</h2>
          {0 < devices.length}
          <div>
            {devices.map((device, idx) => (
              <div
                key={idx}
                className="border-b-2 py-2 flex justify-between items-center "
              >
                <div>
                  <div>{device.id}</div>
                  <div>
                    [HUMI]{device.product}({device.location})
                  </div>
                  <div>{device.memo}</div>
                </div>
                <button
                  className="text-2xl text-red-700 bg-red-200 h-11 w-11 hover:bg-red-400"
                  onClick={() => 장치삭제(device.id)}
                >
                  X
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Home;
function 장치삭제(id: string): void {
  throw new Error("Function not implemented.");
}
