import { Request, Response } from 'express'

import { logger } from '../../logger'

import { CRUDLog } from './CRUDLog'

class TestController {
    @CRUDLog()
    testProperty: any

    @CRUDLog()
    testMethod (_request: Request, _response: Response) {
        throw new Error('The end of the world is near')
    }
}

describe('CRUDLog', () => {
    let controller: TestController
    let request: Request
    let response: Response

    beforeEach(() => {
        logger.error = jest.fn()

        controller = new TestController()

        response = {} as jest.Mocked<Response>
        response.json = jest.fn()
        response.status = jest.fn().mockReturnThis()
        response.send = jest.fn()

        request = {} as jest.Mocked<Request>
        request.body = {}
    })

    it('should send http response with error and log it', async () => {
        const envHolder = process.env.NODE_ENV
        process.env.NODE_ENV = 'develop'
        await controller.testMethod(request, response)
        process.env.NODE_ENV = envHolder

        expect(logger.error).toHaveBeenCalledWith('[TestController][testMethod]: ', new Error('The end of the world is near'))
        expect(response.status).toHaveBeenCalledWith(500)
        expect(response.send).toHaveBeenCalledWith('An error occurred during the request')
    })

    it('should not log errors in tests', async () => {
        await controller.testMethod(request, response)

        expect(logger.error).not.toHaveBeenCalled()
    })
})
