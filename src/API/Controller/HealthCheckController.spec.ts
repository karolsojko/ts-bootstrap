import { Request, Response } from 'express'

import { HealthCheckController } from './HealthCheckController'

describe('HealthCheckController', () => {
    let request: Request
    let response: Response

    const createController = () => new HealthCheckController()

    beforeEach(() => {
        request = {} as jest.Mocked<Request>

        response = {} as jest.Mocked<Response>
        response.send = jest.fn()
        response.status = jest.fn().mockReturnThis()
    })

    it('should respond with ok on health check', async (done) => {
        await createController().healthcheck(request, response)

        setImmediate(() => {
            expect(response.status).toHaveBeenCalledWith(200)
            expect(response.send).toHaveBeenCalledWith('OK')
            done()
        })
    })
})
