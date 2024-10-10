# 코드잇 풀스택 2기 Part-2 1팀

팀 협업 문서: [Notion](https://www.notion.so/Daily-10c5702ff9e280dea94bdd17999b1185)



## 팀원 구성

김영은 [https://github.com/Maybeiley]

김재원 [https://github.com/galaxy-78]

김태영 [https://github.com/csbizz]

이강수 [https://github.com/kipid]



## 각자 BE 개발 환경에 다음과 같은 `.env` 추가하기.

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

### BackEnd

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



### FrontEnd

```
├── .env
├── .eslintrc
├── .gitignore
├── .nvmrc
├── .prettierrc
├── build
│   ├── asset-manifest.json
│   ├── favicon.ico
│   ├── images
│   │   ├── btn_visibility_off_24px.svg
│   │   ├── btn_visibility_on_24px.svg
│   │   ├── ic_search.png
│   │   ├── oauth-Google.png
│   │   ├── oauth-Kakao.png
│   │   └── site-logo.png
│   ├── index.html
│   ├── static
│   │   ├── css
│   │   │   ├── main.0ba8d8a5.css
│   │   │   └── main.0ba8d8a5.css.map
│   │   ├── js
│   │   │   ├── main.539f57b7.js
│   │   │   ├── main.539f57b7.js.LICENSE.txt
│   │   │   └── main.539f57b7.js.map
│   │   └── media
│   │       ├── no-logo.34e88e2cdd689ae2a214.png
│   │       └── no_image.6afe5fe2bddf74aabf44.png
│   └── _redirects
├── build-all.bat
├── build-all.sh
├── dist
│   ├── esb-bundle.css
│   ├── esb-bundle.css.map
│   ├── esb-bundle.js
│   ├── esb-bundle.js.map
│   ├── favicon.ico
│   ├── images
│   │   ├── btn_visibility_off_24px.svg
│   │   ├── btn_visibility_on_24px.svg
│   │   ├── ic_search.png
│   │   ├── oauth-Google.png
│   │   ├── oauth-Kakao.png
│   │   └── site-logo.png
│   ├── index.html
│   ├── site-logo-TRDHGMH5.png
│   └── _redirects
├── docs
│   ├── 2기-View-My-Startup-1팀.html
│   ├── DATABASE setup of View My StartUp.html
│   ├── ERD v2.svg
│   ├── ERD.svg
│   ├── FSD
│   ├── View_My_StartUp_api.png
│   ├── View_My_StartUp_guide.png
│   └── View_My_StartUp_tables.png
├── esbuild.config.js
├── file-structs.js
├── package-lock.json
├── package.json
├── public
│   ├── favicon.ico
│   ├── images
│   │   ├── btn_visibility_off_24px.svg
│   │   ├── btn_visibility_on_24px.svg
│   │   ├── ic_search.png
│   │   ├── oauth-Google.png
│   │   ├── oauth-Kakao.png
│   │   └── site-logo.png
│   └── index.html
├── react-shim.js
├── README.md
└── src
    ├── apis
    ├── app
    │   ├── App.jsx
    │   ├── App.module.css
    │   └── Main.jsx
    ├── assets
    │   ├── codeit_logo.svg
    │   ├── ic_add.png
    │   ├── ic_check.png
    │   ├── ic_delete.png
    │   ├── ic_eye_off.png
    │   ├── ic_eye_on.png
    │   ├── ic_kebab.png
    │   ├── ic_minus.png
    │   ├── ic_restart.png
    │   ├── ic_search.png
    │   ├── logo_vms.png
    │   ├── no-logo.png
    │   └── no_image.png
    ├── components
    │   ├── CompanyList.jsx
    │   ├── CompanyList.module.css
    │   ├── GNB.jsx
    │   ├── GNB.module.css
    │   ├── InvestmentDeleteModal.jsx
    │   ├── InvestmentModals.module.css
    │   ├── InvestmentUpdateModal.jsx
    │   ├── Modal.jsx
    │   ├── Modal.module.css
    │   ├── Pagination.jsx
    │   ├── Pagination.module.css
    │   ├── PopUp.jsx
    │   ├── PopUp.module.css
    │   ├── SelectComparisonModal.jsx
    │   ├── SelectModals.module.css
    │   ├── SelectMyCompanyModal.jsx
    │   ├── TouchInvestment.jsx
    │   └── TouchInvestment.module.css
    ├── context
    │   └── UserProvider.jsx
    ├── hooks
    ├── index.jsx
    ├── pages
    │   ├── CompanyDetailPage.jsx
    │   ├── CompanyDetailPage.module.css
    │   ├── CompanyListPage.jsx
    │   ├── CompanyListPage.module.css
    │   ├── ComparisonResultPage.jsx
    │   ├── ComparisonResultPage.module.css
    │   ├── ComparisonStatusPage.jsx
    │   ├── InvestmentStatusPage.jsx
    │   ├── InvestmentStatusPage.module.css
    │   ├── LandingPage.jsx
    │   ├── LoginPage.jsx
    │   ├── LoginPage.module.css
    │   ├── MyComparisonPage.jsx
    │   ├── MyComparisonPage.module.css
    │   ├── NotFoundPage.jsx
    │   ├── Profile.jsx
    │   └── SignupPage.jsx
    ├── root.css
    └── shared
        ├── apis
        │   ├── companiesService.js
        │   ├── encrypt.js
        │   ├── instance.js
        │   ├── investmentApis.js
        │   └── loginSignupService.js
        ├── hooks
        │   └── useAsync.js
        ├── mock
        │   └── mock.js
        └── utils
            ├── axiosUtils.js
            ├── getScaledNumber.js
            ├── HttpStatus.js
            └── isEmpty.js
```



## 구현 홈페이지

FE: https://view-my-startup-by-team-1.netlify.app/

BE: https://view-my-startup-codeit-be.onrender.com/



## 프로젝트 회고록

