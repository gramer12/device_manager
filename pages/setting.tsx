import type { NextPage } from "next";
import Link from "next/link";
import { useState } from "react";
import Layout from "../components/Layout";

const Home: NextPage = () => {
  const [location, setLocation] = useState("");
  const [unit, setUnit] = useState("");
  const [product, setProduct] = useState("");
  const [memo, setMemo] = useState("");

  function 장비추가버튼() {
    document
      .querySelector("#container__add_device")
      ?.classList.toggle("hidden"); //토글 공부하기

    setUnit("");
    setProduct("");
    setLocation("");
    setMemo("");
  }
  return (
    <Layout title="setting">
      <div className="p-6 space-y-4">
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
          className="space-y-2 "
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

            <button
              className="flex justify-center items-center 
              bg-gray-500  p-3 rounded-2xl hover:bg-gray-400 relative top-2"
            >
              등록
            </button>
          </div>

          <hr />
        </div>
      </div>
    </Layout>
  );
};

export default Home;
