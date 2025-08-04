import { test, expect } from "playwright/test";

test.describe("카드 테스트", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/signin");
    await page.getByRole("textbox", { name: "이메일" }).fill("test@test.com");
    await page.getByRole("textbox", { name: "비밀번호" }).fill("12341234");
    await page.getByRole("button", { name: "로그인" }).click();

    await expect(page).toHaveURL("/mydashboard");

    await page.getByText("테스트 대시보드").nth(1).click();

    await expect(page.getByText("새로운 컬럼 추가하기")).toBeVisible();
  });

  test("카드 생성 테스트 - 모든 필드", async ({ page }) => {
    await page.getByAltText("카드 추가하기 아이콘").nth(0).click();

    await expect(page.getByText("할 일 생성")).toBeVisible();
    // 담당자 선택
    await page.getByAltText("드롭다운 아이콘").click();

    await page.getByRole("menuitem", { name: "테스트유저" }).click();

    // 제목 입력
    await page.getByPlaceholder("제목을 입력해주세요").fill("테스트 카드");

    // 설명 입력
    await page.getByPlaceholder("설명을 입력해주세요").fill("테스트 카드 내용");

    //마감일 입력
    await page.getByText("마감일").click();
    await page.getByText("31").nth(1).click();
    await page.getByText("23:55").click();

    //태그 입력
    await page.getByPlaceholder("입력후 Enter").fill("테스트 태그");
    await page.getByPlaceholder("입력후 Enter").press("Enter");

    await page.getByRole("button", { name: "생성" }).click();

    await expect(page.getByText("카드가 생성되었습니다.")).toBeVisible();
  });

  // 카드 테스트 생성 후 생긴 카드를 수정 해야함.
  test("카드 수정 테스트", async ({ page }) => {
    await page.getByText("테스트 카드").click();

    await expect(page.getByText("새로운 일정 관리 Taskify")).toBeVisible();

    await page.getByAltText("드롭다운 아이콘").click();

    await expect(
      page.getByRole("menuitem", { name: "수정하기" })
    ).toBeVisible();

    await page.getByRole("menuitem", { name: "수정하기" }).click();

    await expect(page.getByText("할 일 수정")).toBeVisible();

    await page.getByRole("textbox", { name: "제목" }).fill("테스트 카드 수정");

    await page
      .getByRole("textbox", { name: "설명" })
      .fill("테스트 카드 내용 수정");

    await page.getByRole("button", { name: "수정" }).click();

    await expect(page.getByText("카드가 수정되었습니다.")).toBeVisible();
  });

  // 카드 테스트 생성 후 생긴 카드를 삭제 해야함.
  test("카드 삭제 테스트", async ({ page }) => {
    await page.getByText("테스트 카드").click();

    await expect(page.getByText("새로운 일정 관리 Taskify")).toBeVisible();

    await page.getByAltText("드롭다운 아이콘").click();

    await expect(
      page.getByRole("menuitem", { name: "삭제하기" })
    ).toBeVisible();

    await page.getByRole("menuitem", { name: "삭제하기" }).click();

    await expect(page.getByText("카드가 삭제되었습니다.")).toBeVisible();
  });
});
