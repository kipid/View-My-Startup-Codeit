# 코드잇 풀스택 2기 Part-2 1팀

팀 협업 문서: [Notion](https://www.notion.so/Daily-10c5702ff9e280dea94bdd17999b1185)



## 팀원 구성

김영은 [https://github.com/Maybeiley]

김재원 [https://github.com/galaxy-78]

김태영 [https://github.com/csbizz]

이강수 [https://github.com/kipid]



## 각자 개발 환경에 다음과 같은 `.env` 추가하기.

DATABASE_URL="postgresql://postgres:[password]@localhost:5432/view_my_startup_dev?schema=public"
PORT=3100



## 프로젝트 소개

- 스타트업 정보 확인 및 모의 투자 서비스

최근에는 벤처 캐피탈에 비해 개인 투자자들의 스타트업에 대한 관심이 증가하고 있습니다. 하지만 스타트업에 관한 정보 접근성에는 여전히 큰 격차가 존재합니다. 이러한 상황을 개선하기 위해, 개인 투자자들이 스타트업을 선택하여 그들의 누적 투자 금액, 매출액 등을 확인하고 비교할 수 있는 모의 투자 서비스를 제작합니다.

- 프로젝트 기간: 2024-09-25 ~ 2024-10-16



## 기술 스택

- Frontend: HTML, JavaScript, React.js, CSS (module.css)
- Backend: Express.js, PrismaORM
- Database: PostgreSQL
- 공통 Tool: Git & Github, Discord, Zoom



## 팀원별 구현 기능 상세



### 김영은



### 김재원



### 김태영



### 이강수



## 파일 구조

```
├── .env
├── .eslintrc
├── .gitignore
├── .nvmrc
├── .prettierrc
├── ERD.svg
├── file-structs.js
├── file-structure.txt
├── http
│   ├── account.http
│   ├── company.http
│   ├── example.http
│   ├── investment.http
│   └── user.http
├── mock
│   └── mock.js
├── package-lock.json
├── package.json
├── prisma
│   ├── migrations
│   │   ├── 20241008115611_init
│   │   │   └── migration.sql
│   │   └── migration_lock.toml
│   ├── schema.prisma
│   ├── seed.js
│   └── structs.js
├── README.md
└── src
    ├── app.js
    ├── connection
    │   └── postgres.connection.js
    ├── containers
    │   ├── auth.container.js
    │   ├── company.container.js
    │   ├── comparison.container.js
    │   ├── example.container.js
    │   ├── investment.container.js
    │   ├── user.container.js
    │   ├── userSession.container.js
    │   └── watch.container.js
    ├── controllers
    │   ├── auth.controller.js
    │   ├── company.controller.js
    │   ├── comparison.controller.js
    │   ├── example.controller.js
    │   ├── investment.controller.js
    │   ├── user.controller.js
    │   ├── userSession.controller.js
    │   └── watch.controller.js
    ├── data
    │   ├── company.data.js
    │   ├── comparison.data.js
    │   ├── example.data.js
    │   ├── investment.data.js
    │   ├── user.data.js
    │   ├── userSession.data.js
    │   └── watch.data.js
    ├── routes
    │   ├── account.route.js
    │   ├── company.route.js
    │   ├── comparison.route.js
    │   ├── example.route.js
    │   ├── investment.route.js
    │   └── watch.route.js
    ├── services
    │   ├── company.service.js
    │   ├── comparison.service.js
    │   ├── example.service.js
    │   ├── investment.service.js
    │   ├── user.service.js
    │   ├── userSession.service.js
    │   └── watch.service.js
    └── utils
        ├── constants.js
        ├── encrypt.js
        ├── error.js
        └── HttpStatus.js
```



## 구현 홈페이지

https://view-my-startup-by-team-1.netlify.app/



## 프로젝트 회고록

