import { Application } from 'express'
import * as asyncHandler from 'express-async-handler'

import { HealthCheckController } from './Controller/HealthCheckController'

export class Routes {
    constructor (
        private healthCheckController: HealthCheckController,
    ) {
    }

    routes (app: Application): void {
        app.route('/healthcheck')
            .get(asyncHandler(this.healthCheckController.healthcheck.bind(this.healthCheckController)))
    }
}
