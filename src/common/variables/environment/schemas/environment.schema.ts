import { z } from 'zod';

export const EnvironmentSchema = z
  .object(
    {
      NODE_ENV: z.enum(['PROD', 'DEV', 'TYPEORM']),
      DB_URL: z.string().min(1),
      PORT: z.coerce.number().positive().default(3000),
    },
    { required_error: '.env file is required' },
  );
