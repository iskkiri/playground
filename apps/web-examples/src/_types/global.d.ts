declare global {
  /**
   * MongoDB 연결 상태를 캐싱하기 위한 인터페이스 정의
   * This must be a `var` and not a `let / const`
   * https://github.com/vercel/next.js/blob/canary/examples/with-mongodb-mongoose/lib/dbConnect.ts
   */
  var mongoose: {
    conn: typeof import('mongoose') | null; // 현재 데이터베이스 연결 인스턴스
    promise: Promise<typeof import('mongoose')> | null; // 연결 시도중인 Promise
  };
}

export {};
