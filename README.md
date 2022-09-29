#create-next-app

next.js typescript 프로젝트 생성

```
>npx create-next-app <폴더명> --typescript

```

# tailwind CSS 적용

1. tailwind 설치
   [tailwind 설치](https://tailwindcss.com/docs/guides/nextjs)

```
>npm install -D tailwindcss postcss autoprefixer
>npx tailwindcss init -p

tailwind.config.js에 content 안에
   "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
삽입

./styles/globals.css 안에
@tailwind base;
@tailwind components;
@tailwind utilities; 삽임

그후 실행 만약 안될시 설치 링크 들어가서 다시 확인필요
```

# prisma

DB ORM이다

1. VSCODE `prisma` 확장프로그램 설치

2. `prisma` 패키지 설치

```
>npm i prisma -D
>npx prisma init
```

warn You already have a .gitignore file. Don't forget to add `.env` in it to not commit any private information.

env 추가

```
//.gitignore
.env
```

Next steps:

1. Set the DATABASE_URL in the .env file to point to your existing database. If your database has no tables yet, read https://pris.ly/d/getting-started

```
//.env
DATABASE_URL=<내 데이터베이스 주소>
```

2. Set the provider of the datasource block in schema.prisma to match your database: postgresql, mysql, sqlite, sqlserver, mongodb or cockroachdb.

```
//prisma/schema.prisma

generator client{
   provider = "prisma-client-js"
}
datasource db{
   //postgresql, mysql, sqlite, sqlserver, mongodb or cockroachdb.
   provider = "mongodb" //사용할 데이터베이스 지정
   url = env("DATABASE_URL")
}
```

3. Run prisma db pull to turn your database schema into a Prisma schema.
4. Run prisma generate to generate the Prisma Client. You can then start querying your database.

종모양 클릭하고 확장프로그램 선택해야한데요

4데이터베이스 스키마 업로드
model User{
...
}
npx prisma db push //스키마 업로드
5 prsima studio 실행 (데이터베이스 웹 클라이언트)

이명령어가 실행중에만 접속할 수 있음

```
>npx prisma studio
```

6`prisma` client 설정

```
>npx prisma generate
```

프리즈마는 api에서만 실행가능

```
import { PrismaClient } from "@prisma/client";

export default new PrismaClient();
```

```
import client from "../../libs/server/client";


const newUser = await client.user.create({
      data: { name: "이덕화", age: 23, addr: "제주도" },
    });

```

[prisma CRUD](https://www.prisma.io/docs/concepts/components/prisma-client/crud)

패치하는 방법 ex

```
useEffect(()=>{
   fetch("/api/alluser")
      .then((res) => res.json())
      .then((json) => console.log(json));
})

```

//@ts-ignore
타입스크립트를 우회하는 방법 단 급할때만 쓴다 주석처리까지해야함

외래 키 할때
model Device{
Sencings Sencing[] 로 이름을 넣으면 Sencing의 모델에 추가됨
}

Device Device? @relation(fields: [deviceId], references: [id])
deviceId String? @db.ObjectId
이 Sencing 에 추가됨 프리즈마 확장프로그램이 해줌

db다 보니깐 정합성 문제 가 있음
속성추가할때 필수요소로하면 이상현상이 일어남

디비 커넥션을 연결했으면 끊어줘야함
안그러면 데이터베이스 잠김
