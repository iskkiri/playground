const OAUTH_INFO = 'OAUTH_INFO';

interface OauthInfo {
  socialId: string;
  provider: string;
}

const oauthStorage = {
  getOauthInfo() {
    try {
      const rawData = window.sessionStorage.getItem(OAUTH_INFO);
      if (!rawData) return null;

      return JSON.parse(rawData) as OauthInfo;
    } catch (err) {
      console.error(err);
      // 파싱 시 문제가 발생한 경우, 로컬 스토리지에서 삭제
      window.sessionStorage.removeItem(OAUTH_INFO);
      throw new Error('Oauth 정보 불러오기에 실패하였습니다.');
    }
  },

  setOauthInfo(oauthInfo: OauthInfo) {
    try {
      // 저장할 값이 undefined일 경우 직렬화 시 문제가 발생
      // => JSON.stringify(undefined)는 'undefined' 문자열이 아닌 undefined 값을 반환하기 때문
      if (oauthInfo === undefined) return;

      window.sessionStorage.setItem(OAUTH_INFO, JSON.stringify(oauthInfo));
    } catch (err) {
      console.error(err);
      throw new Error('Oauth 정보 저장에 실패하였습니다.');
    }
  },

  clear() {
    window.sessionStorage.removeItem(OAUTH_INFO);
  },
};

export default oauthStorage;
