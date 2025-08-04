import { test, expect } from "@playwright/test";

test.describe("컬럼 테스트", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/signin");

    await page.getByPlaceholder("이메일을 입력하세요.").fill("test@test.com");
    await page.getByPlaceholder("비밀번호를 입력하세요.").fill("12341234");

    await page.getByRole("button", { name: "로그인" }).click();

    await page.getByText("테스트 대시보드").nth(1).click();
  });

  test("컬럼 생성 테스트", async ({ page }) => {
    await page.getByText("새로운 컬럼 추가하기").click();

    const createColumnModal = page.locator("text=새 컬럼 생성");
    await createColumnModal.waitFor({ state: "visible" });

    await page.getByPlaceholder("새 컬럼 이름").fill("테스트 컬럼");

    await page.getByRole("button", { name: "생성" }).click();

    await expect(page.getByText("컬럼이 생성되었습니다.")).toBeVisible();
  });

  test("컬럼 이름 변경 테스트", async ({ page }) => {
    await page.getByAltText("설정 아이콘").first().click();

    await expect(page.getByText("컬럼 관리")).toBeVisible();

    const columnNameInput = page.locator('input[id="title"]');
    await columnNameInput.clear();
    await columnNameInput.fill("컬럼 이름 수정");

    await page.getByRole("button", { name: "변경" }).click();

    await expect(page.getByText("컬럼 이름이 변경되었습니다.")).toBeVisible();
  });

  test("컬럼 삭제 테스트", async ({ page }) => {
    await page.getByAltText("설정 아이콘").first().click();

    await expect(page.getByText("컬럼 관리")).toBeVisible();

    await page.getByRole("button", { name: "삭제" }).first().click();

    await expect(
      page.getByText("컬럼의 모든 카드가 삭제됩니다.")
    ).toBeVisible();

    await page.getByRole("button", { name: "삭제" }).last().click();

    await expect(page.getByText("컬럼이 삭제되었습니다.")).toBeVisible();
  });
});
