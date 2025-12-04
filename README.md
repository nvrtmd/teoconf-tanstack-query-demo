# TeoConf <혼자서도 잘해요? 주니어 개발자의 TanStack Query 디버깅 여정> 데모 프로젝트

> 이 프로젝트는 TanStack Query의 캐시 갱신 문제를 해결하는 과정을 실제로 체험할 수 있도록 제작된 데모 애플리케이션입니다.

**🌐 데모 사이트**: [Link](https://teoconf-demo.vercel.app/)

## 📚 프로젝트 개요

이 프로젝트는 **유저 정보 관리 기능**을 통해 TanStack Query의 캐시 갱신 문제와 해결 과정을 보여줍니다.
발표에서 다룬 실제 버그 상황을 재현하고, 그 해결 방법을 단계별로 확인할 수 있습니다.

### 핵심 포인트

- TanStack Query의 `useSuspenseQuery`와 `gcTime`의 동작 원리
- resetQueries`의 동작 방식과 적용
- TanStack Query의 핵심 철학, **Stale-While-Revalidate** 전략 이해
- `invalidateQueries`의 비동기 동작과 `await` 사용 시 동작 차이
- tRPC의 `abortOnUnmount` 옵션이 캐시 갱신에 미치는 영향

## 🏗️ 기술 스택

- **Frontend Framework**: Next.js 16.0.0 (Pages Router)
- **React**: React 19.2.0
- **UI Library**: Material-UI (MUI) 5.18.0
- **데이터 페칭**: TanStack Query 5.90.5 + tRPC 11.1.0
- **폼 관리**: React Hook Form 7.65.0 + Zod 3.25.76
- **언어**: TypeScript 5.x

## 🚀 시작하기

### 설치

```bash
npm install
```

### 개발 서버 실행

```bash
npm run dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000)을 열어주세요.

## 📂 프로젝트 구조

```
src/
├── components/
│   └── LoadingSpinner.tsx        # 로딩 UI 컴포넌트
├── pages/
│   ├── index.tsx                 # 메인 페이지
│   ├── before/                   # 문제 상황 (Before)
│   │   ├── index.tsx            # 유저 목록 페이지
│   │   └── [id].tsx             # 유저 정보 수정 페이지
│   ├── after/                    # 해결 후 (After)
│   │   ├── index.tsx            # 유저 목록 페이지
│   │   └── [id].tsx             # 유저 정보 수정 페이지
│   └── api/
│       └── trpc/[trpc].ts       # tRPC API 엔드포인트
├── providers/
│   └── index.tsx                 # TanStack Query Provider 설정
├── queries/
│   ├── trpc.ts                   # tRPC 클라이언트 설정
│   └── user.ts                   # 유저 관련 쿼리/뮤테이션 훅
└── server/
    ├── fixtures.ts               # 더미 데이터
    ├── trpc.ts                   # tRPC 서버 설정
    └── routers/
        ├── _app.ts              # tRPC 라우터 통합
        └── user.ts              # 유저 API 라우터
```

## 🔍 핵심 기능 설명

### 1. Before 버전 (`/before`)

**문제 상황을 재현한 버전입니다.**

#### 발생하는 문제

1. 유저 정보를 수정 후 목록 페이지로 이동
2. 다시 해당 유저 정보 페이지에 접근
3. **로딩 UI가 노출되지 않고, 수정 전 데이터가 0.5초간 노출됨**
4. 이후 수정 후 데이터로 자동 갱신

#### 문제의 원인

```typescript
// src/queries/user.ts - useUpdateUserBefore
export function useUpdateUserBefore() {
  const queryClient = useQueryClient();
  const detailKey = getQueryKey(trpc.user.detail);

  return trpc.user.update.useMutation({
    onSuccess: () => {
      // 🚨 문제: invalidateQueries가 비동기적으로 실행됨
      queryClient.invalidateQueries({ queryKey: detailKey });
      // mutate의 onSuccess 내부에서 실행되는 router.push()가 invalidateQueries 완료를 기다리지 않음
    },
  });
}
```

**왜 문제가 발생하는가?**

1. `invalidateQueries`는 Promise를 반환하지만 `await` 없이 실행
2. `invalidateQueries`가 완료되기 전에 `router.push()`가 실행됨
3. 페이지 이동으로 컴포넌트가 언마운트되면서 tRPC의 **`abortOnUnmount`** 옵션이 진행 중이던 refetch를 취소
4. 캐시 갱신이 완료되지 않은 상태로 페이지 이동
5. 다시 해당 페이지 방문 시 오래된 캐시가 먼저 노출됨 (Stale-While-Revalidate)

### 2. After 버전 (`/after`)

**문제를 해결한 버전입니다.**

#### 해결 방법

```typescript
// src/queries/user.ts - useUpdateUserAfter
export function useUpdateUserAfter() {
  const queryClient = useQueryClient();
  const detailKey = getQueryKey(trpc.user.detail);

  return trpc.user.update.useMutation({
    onSuccess: async () => {
      // ✅ 해결: await로 invalidateQueries 완료를 보장
      await queryClient.invalidateQueries({ queryKey: detailKey });
      // 캐시 갱신 완료 후 router.push() 실행
    },
  });
}
```

**어떻게 해결되었는가?**

1. `async/await`를 사용하여 `invalidateQueries`의 완료를 보장
2. 캐시 갱신이 완료된 후에 `router.push()` 실행
3. 페이지 이동 전에 이미 최신 데이터가 캐시에 저장됨
4. 다시 페이지 방문 시 로딩 UI 없이 최신 데이터 즉시 표시

## 🔬 실습 가이드

### Step 1: Before 버전 체험하기

1. 메인 페이지에서 "Before (문제 상황)" 버튼 클릭
2. 임의의 유저 타일 클릭 (예: Alice)
3. 유저 정보 수정 페이지에서:
   - **이름**: 읽기 전용으로 표시됨 (수정 불가)
   - **닉네임**: 수정 가능 (예: "alice_01" → "alice_updated")
   - **역할**: 수정 가능 (예: "뷰어" → "편집자")
4. 닉네임과 역할을 수정한 후 "수정" 버튼 클릭
5. 목록 페이지로 자동 이동됨
6. 다시 같은 유저 타일을 클릭
7. **수정 전 데이터(닉네임, 역할)가 잠깐 보이다가 수정 후 데이터로 변경되는 현상 관찰**

### Step 2: 개발자 도구로 문제 분석하기

1. Chrome DevTools의 Network 탭 열기
2. Step 1의 과정 반복
3. **user.detail API 호출이 취소(Cancelled)되는 것 확인**
4. 이것이 `abortOnUnmount` 옵션과 비동기 `invalidateQueries`의 조합으로 인한 문제임을 확인

### Step 3: After 버전 체험하기

1. 메인 페이지에서 "After (해결 후)" 버튼 클릭
2. Step 1과 동일한 과정 진행 (유저 선택 → 닉네임/역할 수정 → 저장 → 재방문)
3. **로딩 UI 없이 최신 데이터(수정된 닉네임, 역할)가 즉시 표시되는 것 확인**
4. Network 탭에서 API 호출이 정상적으로 완료되는 것 확인

## 🎯 핵심 개념 이해하기

### 1. Stale-While-Revalidate (SWR)

TanStack Query의 핵심 전략입니다:

1. 캐시에 데이터가 있으면 **일단 그 데이터를 먼저 보여줌** (오래되었더라도)
2. 동시에 백그라운드에서 최신 데이터를 **가져옴** (Revalidate)
3. 새 데이터가 도착하면 **자동으로 UI 업데이트**

**장점**: 로딩 UI를 최소화하여 UX 개선
**주의점**: 오래된 데이터가 잠깐 노출될 수 있음

### 2. useSuspenseQuery와 gcTime

```typescript
// useSuspenseQuery는 최소 1000ms의 gcTime을 가짐
useSuspenseQuery(queryOptions); // gcTime: 최소 1000ms
```

**이유**: gcTime이 0일 때 동기 쿼리 함수에서 발생하는 무한 루프 방지

### 3. invalidateQueries의 비동기 동작

```typescript
// await 사용 X
queryClient.invalidateQueries({ queryKey: ["user"] });
router.push("/list"); // invalidateQueries 완료 전 실행

// await 사용
await queryClient.invalidateQueries({ queryKey: ["user"] });
router.push("/list"); // invalidateQueries 완료 후 실행
```

### 4. tRPC의 abortOnUnmount 옵션

```typescript
// src/queries/trpc.ts
export const trpc = createTRPCReact<AppRouter>({
  abortOnUnmount: true, // 컴포넌트 언마운트 시 진행 중인 요청 취소
});
```

이 옵션은 성능 최적화를 위해 사용되지만, `invalidateQueries`와 함께 사용 시 주의가 필요합니다.

## 💡 배운 점

이 프로젝트를 통해 다음을 배울 수 있습니다:

1. **TanStack Query의 철학 이해**

   - Stale-While-Revalidate 전략의 의도와 장점
   - 오래된 캐시를 보여주는 것이 버그가 아닌 의도된 동작임을 이해

2. **비동기 처리의 중요성**

   - `invalidateQueries`가 Promise를 반환함을 인지
   - 적절한 시점에 `await` 사용의 중요성

3. **라이브러리 옵션의 상호작용 이해**

   - `abortOnUnmount`와 `invalidateQueries`의 조합이 미치는 영향
   - 성능 최적화 옵션이 예상치 못한 부작용을 일으킬 수 있음

## 📚 참고 자료

- [TanStack Query 공식 문서](https://tanstack.com/query/latest)
- [tRPC 공식 문서](https://trpc.io/)

## 📝 라이선스

MIT

---

**발표자**: 재빙 (Jaebing)
**행사**: TeoConf
**주제**: 혼자서도 잘해요? 주니어 개발자의 TanStack Query 디버깅 여정
