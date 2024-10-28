INSERT INTO
  otp (code, pass_key, user_id, updated, created)
VALUES
  (
    '123456',
    'passK3y-whatever',
    1,
    CURRENT_TIMESTAMP,
    CURRENT_TIMESTAMP
  ) RETURNING otp_id;