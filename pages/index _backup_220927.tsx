import { User } from "@prisma/client";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { json } from "stream/consumers";
import Counter from "../components/Counter";

const Home: NextPage = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [rename, setRename] = useState("");

  const router = useRouter();
  function userAdd() {
    console.log("클릭완료");

    fetch("/api/adduser")
      .then((res) => res.json())
      .then((json) => {
        setUsers([...users, json.user]);
      });

    // router.reload(); //라우터(페이지) 새로고침
  }
  function 이름변경(targetID: String) {
    if (!rename) return;

    const data = { name: rename };

    console.log(targetID + "  " + rename);
    fetch(`/api/user/update/${targetID}`, {
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  function userDel(targetId: string) {
    console.log(targetId);
    fetch(`/api/user/delete/${targetId}`)
      .then((res) => res.json())
      .then((json) => {
        const filterUsers = users.filter((user) => user.id !== json.deletedId);
        setUsers(filterUsers);
      });
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
              <div>{user.id}</div>
              <div>
                <input
                  type="text"
                  className="border"
                  value={rename}
                  onChange={(e) => setRename(e.currentTarget.value)}
                />
                <button
                  className="bg-gray-400 text-red-500 px-1 rounded hover:bg-gray-200"
                  onClick={() => 이름변경(user.id)}
                >
                  수정
                </button>
              </div>
              <button
                className="bg-gray-400 text-red-500 px-1 rounded hover:bg-gray-200"
                onClick={() => userDel(user.id)}
              >
                삭제
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Home;
