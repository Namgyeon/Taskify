import test, { expect } from "playwright/test";

test.describe("페이지 네비게이션 테스트", () => {
  test("로그인 후 대시보드 페이지 이동", async ({ page }) => {
    await page.goto("/signin");

    await page.getByPlaceholder("이메일을 입력하세요.").fill("test@test.com");
    await page.getByPlaceholder("비밀번호를 입력하세요.").fill("12341234");

    await page.getByRole("button", { name: "로그인" }).click();

    await expect(page).toHaveURL("/mydashboard");

    await expect(page.getByText("새로운 대시보드")).toBeVisible();
  });

  test("비로그인 유저가 보호된 페이지 접근 시 로그인 페이지로 리다이렉트", async ({
    page,
  }) => {
    await page.goto("/mydashboard");

    await expect(page).toHaveURL("/signin");

    await expect(page.getByText("회원이 아니신가요?")).toBeVisible();
  });

  test("마이페이지 접근 테스트", async ({ page }) => {
    await page.goto("/signin");

    await page.getByPlaceholder("이메일을 입력하세요.").fill("test@test.com");
    await page.getByPlaceholder("비밀번호를 입력하세요.").fill("12341234");

    await page.getByRole("button", { name: "로그인" }).click();

    await page.waitForTimeout(2000);

    await expect(page).toHaveURL("/mydashboard");

    await page.goto("/mypage");

    await page.waitForTimeout(2000);

    await expect(page).toHaveURL("/mypage");
  });

  test("로그아웃 시 로그인 페이지 리다이렉트 테스트", async ({ page }) => {
    await page.goto("/signin");

    await page.getByPlaceholder("이메일을 입력하세요.").fill("test@test.com");
    await page.getByPlaceholder("비밀번호를 입력하세요.").fill("12341234");

    await page.getByRole("button", { name: "로그인" }).click();

    await expect(page).toHaveURL("/mydashboard");

    await page.getByRole("button", { name: "테스트유저" }).click();

    const loginButton = page.locator("text=로그아웃");
    await loginButton.waitFor({ state: "visible" });
    await loginButton.click();

    await expect(page).toHaveURL("/signin");
  });
});
