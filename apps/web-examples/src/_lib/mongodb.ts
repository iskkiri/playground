import mongoose from 'mongoose';
import { appEnv } from '@/_schemas/env.schema';

// MongoDB 연결 문자열을 환경 변수에서 가져옵니다
const MONGODB_URI = appEnv.MONGODB_URI;

// 전역 객체에 캐시된 연결이 있으면 사용, 없으면 초기화
let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = {
    conn: null,
    promise: null,
  };
}

/**
 * MongoDB 데이터베이스 연결을 관리하는 함수
 * 싱글톤 패턴을 사용하여 연결을 재사용합니다.
 *
 * 1. 이미 연결이 존재하면 기존 연결 반환
 * 2. 연결 시도 중이면 해당 Promise 재사용
 * 3. 새로운 연결이 필요하면 새로 연결 시도
 */
async function connectToDatabase(): Promise<typeof mongoose> {
  // 이미 연결된 인스턴스가 있으면 재사용
  if (cached.conn) {
    return cached.conn;
  }

  // 연결 시도가 없을 경우에만 새로운 연결 시도
  if (!cached.promise) {
    const opts = {
      bufferCommands: false, // 연결 전 명령어 버퍼링 비활성화
    };

    // MongoDB 연결 시도 및 Promise 캐싱
    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
      return mongoose;
    });
  }

  try {
    // Promise가 완료될 때까지 대기하고 연결 결과 저장
    cached.conn = await cached.promise;
  } catch (e) {
    // 연결 실패 시 Promise 초기화하고 에러 전파
    cached.promise = null;
    throw e;
  }

  return cached.conn;
}

export default connectToDatabase;
