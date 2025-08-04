import { test, expect } from "playwright/test";

test.describe("대시보드 테스트", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/signin");

    await page.getByPlaceholder("이메일을 입력하세요.").fill("test@test.com");
    await page.getByPlaceholder("비밀번호를 입력하세요.").fill("12341234");

    await page.getByRole("button", { name: "로그인" }).click();
  });

  test("새로운 대시보드 생성", async ({ page }) => {
    await page.getByText("새로운 대시보드").click();

    const createDashboardModal = page.locator("text=대시보드 이름");
    await createDashboardModal.waitFor({ state: "visible" });
    await expect(page.getByText("대시보드 이름")).toBeVisible();

    await page
      .getByPlaceholder("대시보드 이름을 입력하세요")
      .fill("테스트 대시보드");
    await page.locator(".flex.gap-2 button").nth(1).click();
    await page.getByRole("button", { name: "생성" }).click();

    await expect(page.getByText("대시보드가 생성되었습니다")).toBeVisible();
  });
});
