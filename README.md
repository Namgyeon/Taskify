<div align="center">

# 🎯 Taskify

![taskify](https://github.com/user-attachments/assets/e25457f1-40f1-4e8c-a06d-e2db3bcca16e)

### 팀 협업을 위한 Kanban 보드 스타일 일정 관리 웹 애플리케이션

</div>

---

## 📝 개요

**Taskify**는 직관적인 드래그 앤 드롭 인터페이스를 제공하는 **Kanban 보드 스타일의 협업 도구**입니다.

팀원들과 함께 프로젝트를 체계적으로 관리하고, 실시간으로 업무 진행 상황을 공유할 수 있습니다.
개인 프로젝트부터 팀 협업까지, 효율적인 일정 관리를 위한 모든 기능을 제공합니다.

<div align="center">
  <strong>🚀 <a href="https://taskify-namgyeon.vercel.app">서비스 링크</a></strong>
</div>

---

## 🚀 주요 기능

<div align="center">

### 📊 **Framer Motion 랜딩페이지**

Framer Motion 적용한 랜딩페이지

![랜딩페이지](https://github.com/user-attachments/assets/b700e44b-5fdc-4571-ac0c-32c626d9f72b)


### 📊 **대시보드 관리**

프로젝트별 대시보드 생성

![로그인-대시보드생성](https://github.com/user-attachments/assets/35b2d1ed-7a65-49b0-b526-4e178b319e92)
로그인 -> 대시보드 생성

### 🃏 **Kanban 보드**

드래그 앤 드롭으로 직관적인 업무 흐름 관리

![컬럼,카드 생성](https://github.com/user-attachments/assets/b07c5752-4122-4747-a474-359d87b66950)
컬럼, 카드 생성

![드래그앤드롭](https://github.com/user-attachments/assets/3207a4dd-177e-4227-af46-0ebfd895842f)
카드 드래그 앤 드롭

### 👥 **실시간 협업**

팀원 초대, 댓글 시스템, 실시간 업데이트

![대시보드 초대](https://github.com/user-attachments/assets/f285bfae-9dc6-480d-8e9d-46b3405fa412)
팀원 초대

![댓글시스템](https://github.com/user-attachments/assets/243b628d-6364-4da9-a286-bc4624ee136e)
댓글 시스템

### 📱 **반응형 디자인**

모바일, 태블릿, 데스크톱 완벽 지원
![반응형](https://github.com/user-attachments/assets/f8260c3d-70a8-4531-9b1f-bd1cb4b41127)
반응형

</div>

**세부 기능:**

- ✅ **카드 시스템**: 담당자, 마감일, 태그, 이미지, 상세 설명
- 🖱️ **드래그 앤 드롭**: 직관적인 카드 이동 및 상태 변경
- 💬 **댓글 시스템**: 카드별 실시간 소통
- 🔔 **초대 관리**: 대시보드 멤버 초대 및 권한 관리
- 📷 **이미지 업로드**: 카드별 첨부 파일 지원
- 🎨 **커스텀 테마**: 대시보드별 개성있는 색상 설정

---

## ⚙️ 기술 스택

<div align="center">

### 💎 주요 기술 스택

</div>

| 기술 이름                                                                                                                      | 선정 이유                                                                                                                               |
| ------------------------------------------------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------- |
| ![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)                     | 컴포넌트 기반 설계 방식인 리액트 라이브러리를 활용하여 SSR과 CSR를 혼합해서 사용하기 위해 선정한 프레임워크입니다.                      |
| ![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)              | Props 타입 지정으로 인한 런타임 오류 감소, VSCode 자동 완성 기능 등 타입 안정성을 통한 코드 품질 개선을 위해 선정했습니다.              |
| ![React Query](https://img.shields.io/badge/React_Query-FF4154?style=for-the-badge&logo=reactquery&logoColor=white)            | UI 상태와 서버 상태를 분리하고, API 데이터에 대한 Promise를 집약적으로 관리하기 위해 선정했습니다.                                      |
| ![Axios](https://img.shields.io/badge/Axios-5A29E4?style=for-the-badge&logo=axios&logoColor=white)                             | Axios instance의 interceptor 기능을 통한 중복 코드 최소화 등을 위해 선정했습니다.                                                       |
| ![React Hook Form](https://img.shields.io/badge/React_Hook_Form-EC5990?style=for-the-badge&logo=reacthookform&logoColor=white) | 폼의 상태를 집약적으로 관리하기 위해 선정했습니다.                                                                                      |
| ![Zod](https://img.shields.io/badge/Zod-8E44AD?style=for-the-badge&logoColor=white)                                            | 폼의 유효성 정의 및 타입 추출이 용이하고, API request 타입 정의 및 safeParse() 메소드를 통한 응답 데이터 타입 검증을 위해 선정했습니다. |
| ![Framer Motion](https://img.shields.io/badge/Framer_Motion-0055FF?style=for-the-badge&logo=framer&logoColor=white)            | 부드러운 애니메이션과 인터랙션을 통한 사용자 경험 향상을 위해 선정했습니다.                                                             |
| ![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)         | 유틸리티 클래스 사용으로 클래스 네이밍 고민 감소, 디자인 시스템이 미흡할 시 유연한 대응이 가능하기에 선정했습니다.                      |
| ![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)                          | Next.js와의 완벽한 통합 및 소규모 웹 애플리케이션에서 무료 플랜을 제공해주기 때문에 선정했습니다.                                       |

---

## 📁 폴더 구조

<div align="center">

### ��️ 프로젝트 구조

</div>
