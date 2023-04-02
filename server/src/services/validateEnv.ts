export default function validateEnv(): void {
  if (
    !process.env.DATABASE_URL ||
    !process.env.JWT_SECRET ||
    !process.env.PASS_SALT ||
    !process.env.PORT
  ) {
    console.error(`Missing ENV`);
    process.exit(1);
  }
  console.log("loaaded env");
}
