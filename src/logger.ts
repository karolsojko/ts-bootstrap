import * as winston from 'winston'

import { env } from './env'
import { LoggerInterface } from './Infra/LoggerInterface'

const logLevel = env.infra.LOG_LEVEL || 'info'

const logger: LoggerInterface = winston.createLogger({
    level: logLevel,
    format: winston.format.combine(
        winston.format.splat(),
        winston.format.json(),
    ),
    transports: [
        new winston.transports.Console({ level: logLevel }),
    ],
})

export { logger }
