-- @param {String} $1:tokenHash
-- @param {Int} $2:userId
SELECT
  rt.*,
  u.id as user_id,
  u.email as user_email,
  u.role as user_role
FROM "refresh_tokens" rt
JOIN "users" u ON rt."userId" = u.id
WHERE rt."tokenHash" = $1
  AND rt."userId" = $2
  AND rt."isRevoked" = false
  AND rt."expiresAt" > NOW()
FOR UPDATE OF rt  -- 핵심: refresh_tokens 테이블의 해당 row에 배타적 잠금 설정
LIMIT 1           -- 트랜잭션이 완료될 때까지 다른 요청은 이 row에 접근 불가