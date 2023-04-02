import crypto from "crypto";

export function hashPassword(password: string): Promise<string> {
  return new Promise((resolve, reject) => {
    crypto.pbkdf2(
      password,
      process.env.PASS_SALT!,
      100,
      64,
      "sha512",
      (err, derivedKey) => {
        if (err) return reject(err);
        resolve(derivedKey.toString("hex"));
      }
    );
  });
}
