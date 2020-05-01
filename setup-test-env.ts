import { loadFrom } from '@freighthub/typed-env'
import { parse } from 'dotenv'
import { readFileSync } from 'fs'

import { schema } from './src/envSchema'

const envConfig = parse(readFileSync('.env.test'))

export const env = loadFrom(envConfig, schema)
