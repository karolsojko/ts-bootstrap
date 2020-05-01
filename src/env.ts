import { loadFromEnv } from '@freighthub/typed-env'
import * as dotenv from 'dotenv'

import { schema } from './envSchema'

dotenv.config()

export const env = loadFromEnv(schema)
