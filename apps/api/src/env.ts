import z from "zod";

const env = z
  .object({
    DATABASE_URL: z.url(),
    PORT: z.coerce.number().default(4000),
    GOOGLE_CLIENT_ID: z.string(),
    GOOGLE_CLIENT_SECRET: z.string(),
  })
  .parse(process.env);

export default env;
