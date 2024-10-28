CREATE TABLE
  IF NOT EXISTS otp (
    otp_id SERIAL PRIMARY KEY,
    code VARCHAR(6),
    pass_key VARCHAR(255),
    user_id INT REFERENCES account (user_id),
    updated TIMESTAMP NOT NULL,
    created TIMESTAMP NOT NULL
  );