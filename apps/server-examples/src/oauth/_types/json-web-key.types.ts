import jwkToPem from 'jwk-to-pem';

export function isRSAKey(key: unknown): key is jwkToPem.RSA {
  if (!key || typeof key !== 'object') return false;

  const jwk = key as Record<string, unknown>;

  return jwk.kty === 'RSA' && typeof jwk.e === 'string' && typeof jwk.n === 'string';
}
