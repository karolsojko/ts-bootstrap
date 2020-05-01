import { Request, Response } from 'express'

import { CRUDLog } from '../Decorator/CRUDLog'

export class HealthCheckController {
    @CRUDLog()
    async healthcheck (_request: Request, response: Response) {
        response.status(200).send('OK')
    }
}
