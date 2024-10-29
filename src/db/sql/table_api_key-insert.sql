INSERT INTO
  api_key (user_id, updated, created)
VALUES
  (1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP) RETURNING api_key_uuid;