import { Application } from 'express'

import { HealthCheckController } from './Controller/HealthCheckController'
import { Routes } from './Routes'

describe('Routes', () => {
    let healthCheckController: HealthCheckController
    let app: Application

    const createRoutes = () => new Routes(
        healthCheckController,
    )

    beforeEach(() => {
        app = {} as jest.Mocked<Application>
        app.route = jest.fn().mockReturnThis()
        app.post = jest.fn()
        app.get = jest.fn()
        app.use = jest.fn()

        healthCheckController = {} as jest.Mocked<HealthCheckController>
        healthCheckController.healthcheck = jest.fn()
    })

    it('should initialize routes', () => {
        createRoutes().routes(app)

        expect(app.route).toHaveBeenCalledWith('/healthcheck')
    })
})
