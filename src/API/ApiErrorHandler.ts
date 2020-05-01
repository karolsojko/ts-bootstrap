import { NextFunction, Request, Response } from 'express'
import { Logger } from 'winston'

export class ApiErrorHandler {
    constructor (
        private logger: Logger,
        private appEnvironment: string,
    ) {
    }

    handle (error: Error, _request: Request, response: Response, _next: NextFunction) {
        if (this.appEnvironment === 'development') {
            response.status(500).json({ error: error.message, stack: error.stack })

            return
        }

        this.logger.error('There was a problem while handling request!', error)

        response.status(500).json({ error: 'Internal Server Error' })
    }
}
