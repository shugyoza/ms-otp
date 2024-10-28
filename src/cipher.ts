import crypto from 'crypto';

export type CipherAlgorithm = "aes-128-gcm" | "aes-128-ccm" | "aes-192-gcm" | "aes-192-ccm" | "aes-256-gcm" | "aes-256-ccm";

export function createKeyForCipher(algorithm: CipherAlgorithm, numBytes: number): string {
  switch (algorithm) {
    case "aes-128-gcm": numBytes = 128 / 8;

    break;
    default:
      throw new Error('TODO: support cipher algorithm ' + algorithm);
  }

  return crypto.randomBytes(numBytes).toString("base64");
}

export class Cipher {
  constructor(
    private _key: string, 
    private _algorithm: CipherAlgorithm,
    private _numAuthTagBytes = 16,
    private _numIvBytes = 12,
    private _stringBase: "base64" = 'base64'
  ) {}

  private _options: any = {
    authTagLength: this._numAuthTagBytes
  }

  public encrypt(message: string, key = this._key, algorithm = this._algorithm, numIvBytes = this._numIvBytes, stringBase = this._stringBase, options = this._options): string {
    const iv = crypto.randomBytes(numIvBytes);
    const cipher = crypto.createCipheriv(
      algorithm,
      Buffer.from(key, stringBase),
      iv,
      options
    );

    return [
      iv.toString(stringBase),
      cipher.update(message, 'utf-8', stringBase),
      cipher.final(stringBase),
      (cipher as any).getAuthTag().toString(stringBase)
    ].join('');
  };

  public decrypt(cipherText: string, key = this._key, algorithm = this._algorithm, stringBase = this._stringBase, options = this._options) {
    const length = {
      authTagChar: 24, // TODO: compute from numAuthTagBytes and stringBase
      ivChar: 16 // TODO: compute from numIvBytes and stringBase
    }
    const authTag = Buffer.from(cipherText.slice(-(length.authTagChar)), stringBase);
    const iv = Buffer.from(cipherText.slice(0, length.ivChar), stringBase);
    const encryptedMessage = Buffer.from(cipherText.slice(length.ivChar, -(length.authTagChar)), stringBase).join('');

    const decipher = crypto.createDecipheriv(
      algorithm,
      Buffer.from(key, stringBase),
      iv,
      options
    );
    (decipher as any).setAuthTag(authTag);

    return [
      decipher.update(encryptedMessage, stringBase, 'utf8'),
      decipher.final()
    ].join('');
  }

  /* Usage
  const keyIn = createKeyForCipher('aes-128-gcm');
  const cipher = new Cipher(keyIn, { type: 'aes-128-gcm' });
  const encrypted = cipher.encrypt('something');
  console.log(
    encrypted + '',
    cipher.decrypt(encrypted)
  );
  */
}