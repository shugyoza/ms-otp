CREATE TABLE
  IF NOT EXISTS api_key (
    api_key_uuid uuid DEFAULT gen_random_uuid (),
    user_id INT UNIQUE NOT NULL,
    updated TIMESTAMP NOT NULL,
    created TIMESTAMP NOT NULL,
    PRIMARY KEY (api_key_uuid)
  );