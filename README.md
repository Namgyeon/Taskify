## 🖐️ 프로젝트 소개
----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

## 📝 개요



## 🚀 주요 기능

- ✅ 사용자 프로필 페이지
- 📷 이미지 업로드 및 최적화
- 📱 반응형 웹 지원 (모바일, 태블릿, PC)
- 🌐 다국어 지원 (i18n)
- 🔒 JWT 기반 인증 시스템

## ⚙️ 기술 스택

## 💎 주요 기술 스택

| 기술 이름 | 선정 이유 |
|-----------|-----------|
| ![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white) | 컴포넌트 기반 설계 방식인 리액트 라이브러리를 활용하여 SSR과 CSR를 혼합해서 사용하기 위해 선정한 프레임워크입니다. |
| ![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white) | Props 타입 지정으로 인한 런타임 오류 감소, VSCode 자동 완성 기능 등 타입 안정성을 통한 코드 품질 개선을 위해 선정했습니다. |
| ![React Query](https://img.shields.io/badge/React_Query-FF4154?style=for-the-badge&logo=reactquery&logoColor=white) | UI 상태와 서버 상태를 분리하고, API 데이터에 대한 Promise를 집약적으로 관리하기 위해 선정했습니다. |
| ![Axios](https://img.shields.io/badge/Axios-5A29E4?style=for-the-badge&logo=axios&logoColor=white) | Axios instance의 interceptor 기능을 통한 중복 코드 최소화 등을 위해 선정했습니다. |
| ![React Hook Form](https://img.shields.io/badge/React_Hook_Form-EC5990?style=for-the-badge&logo=reacthookform&logoColor=white) | 폼의 상태를 집약적으로 관리하기 위해 선정했습니다. |
| ![Zod](https://img.shields.io/badge/Zod-8E44AD?style=for-the-badge&logoColor=white) | 폼의 유효성 정의 및 타입 추출이 용이하고, API request 타입 정의 및 safeParse() 메소드를 통한 응답 데이터 타입 검증을 위해 선정했습니다. |
| ![Lodash](https://img.shields.io/badge/Lodash-3492FF?style=for-the-badge&logo=lodash&logoColor=white) | 유틸리티 기능을 선언형으로 작성함으로써 코드 가독성을 향상시키기 위해 선정했습니다. |
| ![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white) | 유틸리티 클래스 사용으로 클래스 네이밍 고민 감소, 디자인 시스템이 미흡할 시 유연한 대응이 가능하기에 선정했습니다. |
| ![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white) | Next.js와의 완벽한 통합 및 소규모 웹 애플리케이션에서 무료 플랜을 제공해주기 때문에 선정했습니다. |


## 📁 폴더 구조

📂src
 ┣ 📜middleware.ts
 ┣ 📂apis
 ┃ ┣ 📂auth
 ┃ ┃ ┣ 📜index.ts
 ┃ ┃ ┣ 📜queries.ts
 ┃ ┃ ┗ 📜types.ts
 ┃ ┗ ...
 ┣ 📂app
 ┃ ┣ 📜globals.css
 ┃ ┣ 📜layout.tsx
 ┃ ┣ 📂(after-login)
 ┃ ┃ ┣ 📂mydashboard
 ┃ ┃ ┗ ...
 ┃ ┗ 📂(before-login)
 ┃   ┣ 📂(auth)
 ┃   ┃ ┗ 📂login
 ┃   ┗ ...
 ┣ 📂assets
 ┣ 📂components
 ┃ ┣ 📂auth
 ┃ ┣ 📂ui
 ┃ ┗ ... 
 ┣ 📂types
 ┃ ┗ 📜common.ts
 ┗ 📂utils
   ┗📂hooks
