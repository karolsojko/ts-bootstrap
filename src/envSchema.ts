import { envGroup, envSchema, TypeOf, types } from '@freighthub/typed-env'

const infra = envGroup({
    LOG_LEVEL: types.UnionOf(['error', 'warn', 'info', 'verbose', 'debug']),
    NODE_ENV: types.UnionOf(['production', 'development', 'sandbox', 'test']),
})

const api = envGroup({
    PORT: types.PortNumber,
}, 'API')

export const schema = envSchema({
    infra,
    api,
})

export type Env = TypeOf<typeof schema>
