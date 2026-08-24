# ONT Table Order Kiosk

식당 테이블에 놓인 태블릿 키오스크를 **실제로 동작하는 것처럼** 재현한 프론트엔드 데모입니다.
정적 시안(HTML/CSS)만 남아 있던 프로젝트를 화면 전환·주문 흐름·결제까지 이어지는 하나의 앱으로 다시 구현했습니다.

👉 **Live demo:** https://yulstina.github.io/ont-table-order-kiosk/

---

## 특징

| 항목 | 내용 |
| --- | --- |
| 해상도 | **1920 × 1080 고정**. 어떤 기기·창 크기에서도 비율이 유지되도록 `transform: scale()`로 축소/확대 |
| 프레젠테이션 | 태블릿 베젤 목업 안에서 화면이 돌아가고, 남는 여백에는 세로 방향 `ONT TABLE ORDER KIOSK` 워터마크 |
| 화면 | 대기(Attract) → 메뉴 → 메뉴 상세 → 장바구니 → 주문 확인 → 결제 → 완료 |
| 모션 | 화면 크로스페이드, 카드 스태거 등장, 패널 슬라이드, 결제 파형, 체크 드로잉 (`prefers-reduced-motion` 존중) |
| 접근성 | 키보드 전체 조작, 모달 포커스 트랩, `role="tablist"` 방향키 이동, `aria-live` 안내, 4px 이상 대비 포커스 링, 큰 터치 타깃 |
| 다국어 | 한국어 / English 실시간 전환 |
| 의존성 | **없음.** 순수 HTML + CSS + Vanilla JS (jQuery·번들러 불필요) |

## 동작하는 기능

- 카테고리 6종 · 메뉴 29종 (품절 처리 포함)
- 메뉴 상세: 수량 조절, 필수/선택 옵션(라디오·체크박스), 요청사항 80자 제한, 품절 시 처리 선택
- 필수 옵션 미선택 시 담기 버튼 비활성화 + 안내
- 장바구니: 수량 증감, 옵션 수정(EDIT), 삭제 애니메이션, 소계/부가세/합계 자동 계산
- 주문 전송: 수량 확인 팝업 → 주방 전송 → 주문 내역에 `조리 중 → 서빙 완료` 상태 반영
- 결제: 전체 청구서 확인 → 카드 태그 애니메이션 → 승인 → 영수증 요약 → 카운트다운 후 초기 화면 복귀
- 직원 호출, 전체 메뉴 시트, 3분 무동작 시 대기 화면 복귀

## 폴더 구조

```
index.html              키오스크 앱 (전체 화면 + 모달 마크업)
assets/css/kiosk.css    토큰·디바이스 목업·배경·공통 컴포넌트
assets/css/views.css    화면별 스타일 (대기/메뉴/상세/장바구니/결제/완료)
assets/js/menu-data.js  메뉴 마스터 데이터 (POS API 응답으로 교체 가능)
assets/js/kiosk.js      앱 런타임 (상태, 라우팅, 렌더링, 접근성)
assets/images|fonts     원본 프로젝트에서 이어받은 에셋
tools/dev-server.js     로컬 미리보기용 정적 서버
legacy-index.html       인수받은 원본 정적 시안 (참고용 보존)
menu_detail.html        원본 상세 페이지 시안 (참고용 보존)
```

## 로컬 실행

```bash
node tools/dev-server.js 5510
```

브라우저에서 `http://localhost:5510` 접속. (파일을 직접 열어도 동작하지만, 폰트·이미지 로딩은 서버 실행을 권장합니다.)

## 배포

`main` 브랜치 루트를 GitHub Pages로 서빙합니다. 푸시하면 자동으로 반영됩니다.

## 데이터 교체

`assets/js/menu-data.js`의 `categories` / `items` 배열만 바꾸면 메뉴가 그대로 반영됩니다.
각 메뉴는 `groups`에 옵션 그룹을 가지며 `type: 'radio' | 'checkbox'`, `required`, `max`로 검증 규칙이 결정됩니다.
