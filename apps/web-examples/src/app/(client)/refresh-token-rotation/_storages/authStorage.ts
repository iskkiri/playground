const ACCESS_TOKEN = 'ACCESS_TOKEN';
const REFRESH_TOKEN = 'REFRESH_TOKEN';

const authStorage = {
  getAccessToken() {
    try {
      const rawData = window.localStorage.getItem(ACCESS_TOKEN);
      if (!rawData) return null;

      return JSON.parse(rawData) as string;
    } catch (_err) {
      console.error('Access Token 불러오기에 실패하였습니다.');
      // 파싱 시 문제가 발생한 경우, 로컬 스토리지에서 삭제
      window.localStorage.removeItem(ACCESS_TOKEN);
      throw new Error('Access Token 불러오기에 실패하였습니다.');
    }
  },

  setAccessToken(accessToken: string) {
    try {
      // 저장할 값이 undefined일 경우 직렬화 시 문제가 발생
      // => JSON.stringify(undefined)는 'undefined' 문자열이 아닌 undefined 값을 반환하기 때문
      if (accessToken === undefined) return;

      window.localStorage.setItem(ACCESS_TOKEN, JSON.stringify(accessToken));
    } catch (_err) {
      throw new Error('Access Token 저장에 실패하였습니다.');
    }
  },

  getRefreshToken() {
    try {
      const rawData = window.localStorage.getItem(REFRESH_TOKEN);
      if (!rawData) return null;

      return JSON.parse(rawData) as string;
    } catch (_err) {
      console.error('Refresh Token 불러오기에 실패하였습니다.');
      // 파싱 시 문제가 발생한 경우, 로컬 스토리지에서 삭제
      window.localStorage.removeItem(REFRESH_TOKEN);
      throw new Error('Refresh Token 불러오기에 실패하였습니다.');
    }
  },

  setRefreshToken(refreshToken: string) {
    try {
      // 저장할 값이 undefined일 경우 직렬화 시 문제가 발생
      // => JSON.stringify(undefined)는 'undefined' 문자열이 아닌 undefined 값을 반환하기 때문
      if (refreshToken === undefined) return;

      window.localStorage.setItem(REFRESH_TOKEN, JSON.stringify(refreshToken));
    } catch (_err) {
      throw new Error('Refresh Token 저장에 실패하였습니다.');
    }
  },

  clear() {
    window.localStorage.removeItem(ACCESS_TOKEN);
    window.localStorage.removeItem(REFRESH_TOKEN);
  },
};

export default authStorage;
