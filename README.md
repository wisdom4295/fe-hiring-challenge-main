# CLO-SET CONNECT Store — Frontend Challenge

## 실행 방법

```bash
npm install
npm run dev        # 개발 서버
npm run build      # 빌드
npm run test       # 테스트
```

## 기술 스택

| 기술 | 선택 이유                               |
|------|-------------------------------------|
| React 19 + TypeScript + Vite | 유지                                  |
| Zustand | 클라이언트 필터 상태 관리                      |
| TanStack Query | 1회 fetch 후 캐싱, 불필요한 네트워크 비용 최소화     |
| react-router-dom | URL query param 기반 상태 유지            |
| Emotion | 레거시 유지, 스타일/로직 파일 분리 |
| Vitest + Testing Library | Vite 환경 통합, 순수 함수 단위 테스트            |

## API 설계 결정

과제 API는 단일 엔드포인트(`GET /api/data`)로 전체 데이터를 반환하며, 필터 파라미터와 페이지네이션은 현재 스펙에 포함되지 않습니다.
이 스펙을 고려하여 아래와 같이 설계했습니다.

- **1회 fetch + 클라이언트 필터링** — 필터 변경마다 재호출해도 동일한 응답이 반환되므로 불필요한 네트워크 비용 최소화
- **TanStack Query `staleTime: Infinity`** — 동일 데이터 중복 요청 차단, 세션 내 캐싱 유지
- **Infinite Scroll** — API 페이지네이션 미지원으로 프론트엔드 클라이언트 단 페이지네이션으로 구현
- **실제 서비스 전환 시** — API가 필터 파라미터/페이지네이션을 지원한다면 서버사이드 필터링으로 전환하고 `staleTime`을 비즈니스 요구사항에 맞게 조정 필요

## 레거시 개선 내역

### 요구사항 위반 수정
| 항목 | 기존 | 개선 |
|------|------|------|
| 상태 유지 | sessionStorage | URL query param |
| PricingSlider | store 미연결, 필터링 미반영 | Zustand store 연결 |
| resetFilters | keyword, sort, priceRange 초기화 누락 | 전체 초기화 |

### 버그 수정
| 항목 | 기존 | 개선 |
|------|------|------|
| 가격 정렬 | 문자열 비교 | 숫자 비교 |
| IntersectionObserver | cleanup 누락 | `disconnect()` 명시적 추가 |
| resize 이벤트 | 익명함수로 실제 제거 안 됨 | CSS 미디어쿼리로 교체 |
| 카드 key | index 사용 | `item.id` 사용 |
| 이미지 로딩 | `eager` | `lazy` |

### 추가 개선
- **정렬 UX** — FREE/VIEW_ONLY의 `price: 0` 특성을 고려해 단순 숫자 정렬 대신 구매 가능 여부 기준으로 우선순위 부여
  - Higher Price: `PAID(높은가격순)` → `FREE` → `VIEW_ONLY`
  - Lower Price: `FREE` → `PAID(낮은가격순)` → `VIEW_ONLY`
- **에러 상태 UI** — API 실패 시 에러 화면 및 재시도 버튼
- **접근성** — aria 속성 추가 (role, aria-label, aria-valuemin/max/now)

## 구현 기능

- **Keyword Search** — title + creator 기준, 대소문자 무시
- **Pricing Option Filter** — Paid / Free / View Only 다중 선택
- **Pricing Slider** — Paid 선택 시 활성화, 핸들 교차 불가
- **복합 필터** — 모든 조건 항상 함께 동작, 한 조건 변경이 다른 조건 해제하지 않음
- **Reset** — 검색어, 옵션, 슬라이더, 정렬, 리스트 전체 초기화
- **URL 상태 유지** — 새로고침 후에도 필터 상태 복원 (browser storage 미사용)
- **Sorting** — Item Name / Higher Price / Lower Price
- **반응형 그리드** — 4 → 3 → 2 → 1 컬럼 (1200 / 768 / 480px)
- **Infinite Scroll** — IntersectionObserver 직접 구현
- **Skeleton UI** — 로딩 중 pulse 애니메이션
- **No Result / Error** — 필터 결과 없음 및 API 실패 상태 UI

## 테스트

```bash
npm run test
```

- `filterUtils.test.ts` — 순수 필터/정렬 함수 23개
- `useFilteredContents.test.ts` — 훅 5개
- 총 28개 테스트 통과

## AI 활용 기록

### 사용 도구
- Claude Sonnet (claude.ai)

### 직접 주도한 부분

- **레거시 분석** — 코드를 직접 읽고 요구사항 위반 및 버그 10개 이상 식별
- **기술 스택 결정** — nuqs는 파라미터 구조가 단순하여 불필요하다고 판단해 제외, Zustand vs Jotai 트레이드오프 직접 판단
- **URL 동기화 설계** — `useEffect` 깜빡임 이슈를 인지하고 스토어 생성 시점에 `parseUrlParams()` 실행하는 방식으로 직접 설계
- **API 설계 결정** — 과제 스펙을 분석하여 1회 fetch + 클라이언트 필터링 방식이 적합하다고 직접 판단
- **정렬 UX 결정** — `price: 0` 이슈를 발견하고 이커머스 UX 관점에서 우선순위 기준 직접 결정
- **코드 리뷰** — AI가 생성한 코드의 비즈니스 로직 오류 및 설계 의도와 맞지 않는 구현 방식을 직접 판단하고 수정 방향 지시
- **커밋/브랜치 전략** — 기능 단위 커밋, feat → develop → main 브랜치 전략 

### AI를 활용한 부분

- 레거시 CSS → emotion styled 변환, 스타일 파일 분리
- 테스트 케이스 초안 작성 (mock 데이터 오류는 직접 발견 후 수정)
- 접근성 aria 속성 코드 생성