UPDATE otp
SET
  code = '654321',
  pass_key = '_another_p4ssk3y',
  updated = CURRENT_TIMESTAMP
WHERE
  user_id = 1 RETURNING otp_id;