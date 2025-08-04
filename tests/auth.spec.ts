import { test, expect } from "@playwright/test";

// test.describe : 관련된 테스트들을 그룹화 하는 함수
test.describe("회원가입 테스트", () => {
  // test.beforeEach : 각 테스트 실행 전에 공통으로 실행할 작업
  test.beforeEach(async ({ page }) => {
    await page.goto("/signup");
  });

  // test(): 개별 테스트 케이스 정의
  test("회원가입 페이지가 올바르게 렌더링된다", async ({ page }) => {
    // expect(): 검증문 - 예상결과와 실제 결과물 비교
    // page.getByText(): 텍스트로 요소찾기
    await expect(page.getByText("이미 회원이신가요?")).toBeVisible();

    // page.getByRole(): 역할로 요소찾기
    await expect(page.getByRole("button", { name: "회원가입" })).toBeVisible();

    // page.getByPlaceholder(): 플레이스홀더 텍스트로 입력 필드 찾기
    await expect(page.getByPlaceholder("이메일을 입력하세요.")).toBeVisible();
    await expect(page.getByPlaceholder("닉네임을 입력하세요.")).toBeVisible();
  });

  test("유효한 정보로 회원가입할 수 있다.", async ({ page }) => {
    const timestamp = Date.now();
    const dynamicEmail = `test${timestamp}@test.com`;
    // Locator - 페이지의 요소를 찾는 객체
    const emailInput = page.getByPlaceholder("이메일을 입력하세요.");
    const nicknameInput = page.getByPlaceholder("닉네임을 입력하세요.");
    const passwordInputs = page.getByPlaceholder("비밀번호를 입력하세요.");
    const signupButton = page.getByRole("button", { name: "회원가입" });

    // fill(): 입력필드에 값 입력하기
    await emailInput.fill(dynamicEmail);
    await nicknameInput.fill("테스트유저");

    // .nth() : 같은 선택자로 찾은 여러 요소 중 n번째 선택
    await passwordInputs.nth(0).fill("12341234");
    await passwordInputs.nth(1).fill("12341234");

    // click(): 버튼 클릭하기
    await signupButton.click();

    // 페이지 이동 확인
    await expect(page).toHaveURL("/signin");

    // 토스트 메시지 확인
    await expect(
      page.getByText("회원가입 성공했습니다.\n 로그인페이지로 이동합니다.")
    ).toBeVisible();
  });

  test("잘못된 이메일 형식으로 회원가입 시도 시 에러 메시지가 표시된다", async ({
    page,
  }) => {
    await page.getByPlaceholder("이메일을 입력하세요.").fill("잘못된이메일");
    await page.getByPlaceholder("닉네임을 입력하세요.").fill("테스트");

    await page.getByPlaceholder("닉네임을 입력하세요.").click();

    await expect(
      page.getByText("유효한 이메일 주소를 입력해주세요.")
    ).toBeVisible();
  });

  test("비밀번호가 일치하지 않을 때 에러 메시지가 표시된다", async ({
    page,
  }) => {
    const passwordInputs = page.getByPlaceholder("비밀번호를 입력하세요.");

    await passwordInputs.nth(0).fill("12341234");
    await passwordInputs.nth(1).fill("123412345");

    await page.getByPlaceholder("닉네임을 입력하세요.").click();

    await expect(page.getByText("비밀번호가 일치하지 않습니다.")).toBeVisible();
  });
});

test.describe("로그인 테스트", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/signin");
  });

  test("로그인 페이지가 올바르게 렌더링된다", async ({ page }) => {
    await expect(page.getByText("회원이 아니신가요?")).toBeVisible();
    await expect(page.getByRole("button", { name: "로그인" })).toBeVisible();
    await expect(page.getByText("이메일")).toBeVisible();
    await expect(page.getByText("비밀번호")).toBeVisible();
  });

  test("유효한 계정으로 로그인할 수 있다.", async ({ page }) => {
    const emailInput = page.getByPlaceholder("이메일을 입력하세요.");
    const passwordInput = page.getByPlaceholder("비밀번호를 입력하세요.");

    await emailInput.fill("test@test.com");
    await passwordInput.fill("12341234");

    await page.getByRole("button", { name: "로그인" }).click();

    await expect(page).toHaveURL("/mydashboard");
  });

  test("로그인 실패 시나리오들", async ({ page }) => {
    const failureCases = [
      {
        description: "비밀번호가 틀린 경우",
        email: "test@test.com",
        password: "123412345",
        errorMessage: "비밀번호가 일치하지 않습니다.",
      },
      {
        description: "가입하지 않은 이메일",
        email: "wrong@test.com",
        password: "12341234",
        errorMessage: "존재하지 않는 유저입니다.",
      },
    ];

    for (const testCase of failureCases) {
      await page.goto("/signin");

      await page.getByPlaceholder("이메일을 입력하세요.").fill(testCase.email);
      await page
        .getByPlaceholder("비밀번호를 입력하세요.")
        .fill(testCase.password);
      await page.getByRole("button", { name: "로그인" }).click();

      await expect(page.getByText(testCase.errorMessage)).toBeVisible();
    }
  });
});
