# Social Media App

React·Node/Express·MongoDB 기반으로 구현한, 회원가입·로그인·팔로우·피드·댓글·검색 기능을 갖춘 풀스택 소셜 미디어 애플리케이션입니다.

---

## 주요 기능

- **유저 인증**
  - 회원가입, 로그인, 로그아웃
  - JWT 기반 인증 및 보호된 라우트(`AuthRequired`)
  - `AuthContext`를 통한 전역 사용자 상태 관리

- **피드 & 게시물**
  - 전체 게시물 목록 보기 (`ArticleList`)
  - 팔로우한 유저의 게시물만 보는 피드 (`Feed`)
  - 게시물 작성, 상세 보기 (`ArticleCreate`, `ArticleView`)
  - 이미지가 포함된 게시물 템플릿 및 캐러셀(`ArticleTemplate`, `Carousel`)

- **댓글**
  - 게시물별 댓글 작성 및 조회 (`Comments`)

- **프로필 & 팔로우**
  - 프로필 페이지 (`Profile`)
  - 팔로워 / 팔로잉 목록 (`FollowersList`, `FollowingList`)
  - 계정 정보 수정 (`Accounts`)

- **검색**
  - 게시물 또는 유저 검색 기능 (`Search`)

- **기타**
  - 레이아웃 컴포넌트로 헤더/네비게이션/푸터 공통 영역 관리 (`Layout`)
  - 404 페이지 (`NotFound`)
  - 모달, 아바타 등 재사용 가능한 UI 컴포넌트 (`Modal`, `Avatar`)

---

## 기술 스택

- **Frontend**
  - React 18
  - React Router DOM 6
  - CRA(react-scripts) 기반
  - Tailwind CSS (PostCSS, Autoprefixer)

- **Backend**
  - Node.js
  - Express
  - MongoDB + Mongoose
  - JWT + Passport-JWT
  - CORS, cookie-parser, formidable 등 미들웨어

- **배포 (예시)**
  - 클라이언트: GitHub Pages
  - 서버: Railway
  - 데이터베이스: MongoDB Atlas

---

## 프로젝트 구조

social-media-app/
  client/   # React SPA 클라이언트
  server/   # Express + MongoDB API 서버- **client**
  - `src/App.js`: 라우팅 및 전체 앱 구조
  - `src/components/`: 인증, 게시물, 프로필, 검색, 레이아웃 등 컴포넌트
  - `src/utils/fetchData.js`: 공통 데이터 요청 유틸리티

- **server**
  - `index.js`: Express 서버 엔트리 포인트, 미들웨어 및 DB 연결 설정
  - `routes/`: 엔드포인트 정의
  - `controllers/`: 계정, 게시물, 댓글, 프로필, 검색 등 비즈니스 로직
  - `models/`: Mongoose 모델 정의
  - `auth/`: JWT 기반 인증 설정 (`passportJwt.js`)
  - `data/`: 프로필/게시물 이미지 등 정적 파일
  - `seeds/`: 초기 데이터용 이미지 리소스

---

## 환경 변수 설정

`server` 디렉터리 내 `.env` 파일에 다음 값을 설정합니다.

MONGODB_URI=<MongoDB Atlas 연결 문자열>
JWT_SECRET=<JWT 서명용 비밀키>
# 필요 시 기타 설정 값 추가(실제 키 값은 버전 관리에 커밋하지 않도록 주의합니다.)

---

## 설치 및 실행

### 1. 저장소 클론

git clone <this-repo-url>
cd social-media-app### 2. 클라이언트 설치 및 실행

cd client
npm install
npm start- 기본적으로 `http://localhost:3000`에서 클라이언트가 실행됩니다.

### 3. 서버 설치 및 실행

cd server
npm install
npm run devstart  # 또는 npm start- 기본 포트: `http://localhost:3000` (환경 변수 `PORT`로 변경 가능)
- 프론트엔드와 포트가 겹치는 경우, 클라이언트 또는 서버 포트를 분리해서 사용하도록 설정합니다.

---

## 스크립트

### client

npm start    # 개발 서버 실행
npm run build  # 프로덕션 번들 빌드
npm test     # 테스트 실행### server

npm start      # 서버 실행
npm run devstart  # nodemon으로 개발 모드 실행---

## 기타

- 학습용/포트폴리오용으로 MERN 스택의 기본 구조(인증, CRUD, 관계, 검색 등)를 한 번에 경험할 수 있도록 설계한 프로젝트입니다.
- 코드 구조나 기능은 필요에 따라 자유롭게 수정 및 확장할 수 있습니다.
