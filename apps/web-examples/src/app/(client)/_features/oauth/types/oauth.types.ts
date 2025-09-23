interface RegistrationRequiredMessage {
  type: 'REGISTRATION_REQUIRED';
  payload: {
    socialId: string;
    provider: string;
  };
}

interface LoginSuccessMessage {
  type: 'LOGIN_SUCCESS';
  payload: {
    tokens: {
      accessToken: string;
      refreshToken: string;
    };
    socialId: string;
    provider: string;
  };
}

export type SocialLoginMessage = RegistrationRequiredMessage | LoginSuccessMessage;
