import { test, expect } from "playwright/test";

test.describe("댓글 테스트", () => {
  // 로그인
  test.beforeEach(async ({ page }) => {
    await page.goto("/signin");
    await page.getByRole("textbox", { name: "이메일" }).fill("test@test.com");
    await page.getByRole("textbox", { name: "비밀번호" }).fill("12341234");
    await page.getByRole("button", { name: "로그인" }).click();

    await expect(page).toHaveURL("/mydashboard");

    await page.getByText("테스트 대시보드").nth(1).click();

    await expect(page.getByText("새로운 컬럼 추가하기")).toBeVisible();

    // 테스트 카드가 생성되어 있어야함.
    await page.getByText("테스트 카드").click();

    await expect(page.getByText("새로운 일정 관리 Taskify")).toBeVisible();
  });

  test("댓글 생성 테스트", async ({ page }) => {
    await page.getByPlaceholder("댓글 작성하기").fill("테스트 댓글");

    await page.getByRole("button", { name: "입력" }).click();

    await expect(page.getByText("테스트 댓글")).toBeVisible();
  });

  test("댓글 수정 테스트", async ({ page }) => {
    // 첫번째 댓글 수정
    await page.locator("button:has-text('수정')").first().click();

    await page.locator("textarea").last().fill("테스트 댓글 수정");

    await page.getByRole("button", { name: "수정" }).click();

    await expect(page.getByText("댓글이 수정되었습니다.")).toBeVisible();
  });

  test("댓글 삭제 테스트", async ({ page }) => {
    await page.locator("button:has-text('삭제')").first().click();

    await expect(page.getByText("댓글이 삭제되었습니다.")).toBeVisible();
  });
});
