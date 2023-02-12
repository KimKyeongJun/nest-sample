import * as Crypto from 'crypto';

export default class CryptoUtil {
  static encryptWithAes256(plainText: string): string {
    if (plainText === undefined) {
      return undefined;
    }
    const secretKey = process.env.AES_SECRET_KEY;
    const secretKeyToByteArray: Buffer = Buffer.from(secretKey, 'utf8');
    const ivParameter: Buffer = Buffer.from(secretKey.slice(0, 16));
    const cipher: Crypto.Cipher = Crypto.createCipheriv(
      'aes-256-cbc',
      secretKeyToByteArray,
      ivParameter,
    );
    let encrypted: string = cipher.update(plainText, 'utf8', 'base64');
    encrypted += cipher.final('base64');
    return encrypted;
  }

  static decryptWithAes256(encryptedText: string): string {
    const secretKey = process.env.AES_SECRET_KEY;
    const secretKeyToBufferArray: Buffer = Buffer.from(secretKey, 'utf8');
    const ivParameter: Buffer = Buffer.from(secretKey.slice(0, 16));
    const cipher: Crypto.Decipher = Crypto.createDecipheriv(
      'aes-256-cbc',
      secretKeyToBufferArray,
      ivParameter,
    );
    let decrypted: string = cipher.update(encryptedText, 'base64', 'utf8');
    decrypted += cipher.final('utf8');
    return decrypted;
  }
}
