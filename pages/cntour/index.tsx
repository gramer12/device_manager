import { Device } from "@prisma/client";
import type { NextPage } from "next";
import Link from "next/link";
import { useEffect, useState } from "react";
import { json } from "stream/consumers";

import Layout from "../../components/Layout";
import { parseString } from "xml2js";
import Toggle from "react-toggle";
import { RingLoader } from "react-spinners";

// interface Item {
//   mng_no: string;
//   local_nm: string;
//   type: string;
//   nm: string;
//   nm_sub: string;
//   addr: string;
//   lat: string;
//   lng: string;
//   tel: string;
//   h_url: string;
//   desc: string;
//   list_img: string;
// }
// interface Item_info {
//   item: Item[];
// }
// interface Result {
//   item_info: Item_info;
// }
// interface CntourListRespons {
//   name: string;
//   result?: Result;
// }

export interface Root {
  name: string;
  result: Result;
}

export interface Result {
  item_info: ItemInfo;
}

export interface ItemInfo {
  item: Item[];
}

export interface Item {
  mng_no: string;
  local_nm: string;
  type: string;
  nm: string;
  nm_sub: string;
  addr: string;
  lat: string;
  lng: string;
  tel: string;
  h_url: string;
  desc: string;
  list_img: string;
}

const Home: NextPage = () => {
  const [totalCnt, setTotalcnt] = useState(0);
  const [tours, setTours] = useState<Item[] | undefined>([]);
  const [pageNo, setPageNo] = useState(1);
  useEffect(() => {
    console.log("하이");
    fetch("http://localhost:3000/api/tour/cntour")
      .then((res) => res.json())
      .then((json) => setTotalcnt(json.totalCnt));
  }, []);
  function 관광명소가져오기() {
    fetch(
      `http://localhost:3000/api/tour/cntourlist?start=${pageNo}&end=${
        pageNo + 4
      }`
    )
      .then((res) => res.json())
      .then((json: Root) => {
        const 기존배열 = tours || [];
        const 신규배열 = json.result?.item_info.item || [];

        setTours([...기존배열, ...신규배열]);
        setPageNo(pageNo + 3);
      });
  }

  useEffect(() => {
    관광명소가져오기();
  }, []);
  return (
    <Layout title="HOME">
      <div className="h-full ove p-6 overflow-y-scroll space-y-6">
        <div>충남관광명소페이지</div>
        <div>{totalCnt}개의 관광명소가 있습니다</div>
        {tours &&
          tours.map((ele, idx) => (
            // <Link href={`/cntour/${tour.mng_no}`}></Link>
            <div key={idx}>
              <div>
                <img src={ele.list_img} />
              </div>
              <div>주소 : {ele.addr}</div>
              <div>설명:{ele.desc}</div>
            </div>
          ))}
        <button
          className="w-full bg-red-200 flex items-center justify-center"
          onClick={관광명소가져오기}
        >
          더보기({tours?.length}/{totalCnt})
        </button>
      </div>
    </Layout>
  );
};

export default Home;
