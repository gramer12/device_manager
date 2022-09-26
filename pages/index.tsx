import { User } from "@prisma/client";
import type { NextPage } from "next";
import { useEffect, useState } from "react";
import Counter from "../components/Counter";

const Home: NextPage = () => {
  const [users, setUsers] = useState<User[]>([]);
  function userAdd() {
    console.log("클릭완료");

    fetch("/api/adduser");
  }

  useEffect(() => {
    //컴포넌트가 로딩될때 한번만 실행됨
    //사용자목록을 가져와서 State 변수에 저장
    fetch("/api/alluser")
      .then((res) => res.json())
      .then((json) => setUsers(json.users));
  }, []);
  return (
    <>
      <Counter title="타입스크립연습" />;
      <button className="bg-slate-500" onClick={userAdd}>
        사용자추가
      </button>
      <div>
        {/* {users.map((user) => {
          <div key={user.id}>{user.id}</div>;
        })} */}
        <div className="flex flex-wrap">
          {users.map((user) => (
            <div key={user.id} className="border-2">
              <div className="text-2xl">
                <span>{user.name}</span>
                <span>({user.age}세)</span>
              </div>
              <div>{user.addr}</div>
              <div>{user.favfood}</div>
              <div>{user.createAt.toString()}</div> {/* 문자열로 바꾸어ㅑ함 */}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Home;
