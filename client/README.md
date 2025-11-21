# 컴포넌트
- 유저 인증
AuthContext.js
AuthProvider.js (user state 관리)
AuthRequired.js         

- 계정
Login.js
Register.js (회원가입)
Accounts.js (정보수정)

- 게시물
ArticleCreate.js    (게시물 작성_>form)
ArticleList.js  (게시물 전체 보기)
ArticleView.js  (게시물 한개 보기)
Feed.js (팔로우 하는 유저의 게시물만 보기)

- 댓글
Comments.js

- 검색
Search.js

- 프로필
Profile.js
FollowersList.js    (팔로워 리스트)
FollowingList.js    (팔로잉 리스트)

- 404 페이지
NotFound.js

- 기타  (합성용 컴포넌트)
Layout.js   (레이아웃_>nav, footer 등_>>컴포넌트를 감싸는 용도)
Avatar.js   (아바타)
ArticleTemplate.js  (게시물 템플릿)
Carousel.js (캐러셀_>버튼을 클릭하면 이미지가 넘어간다)
Modal.js    (모달)

# 유틸리티 함수
- 데이터 가져오기
fetchData.js    

# production enviroment 구축하기

클라이언트 : Github pages (https://pages.github.com)
서버 : Railway (railway.app)
데이터베이스 : MongoDB Atlas