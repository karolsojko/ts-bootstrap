import { Request, Response } from 'express'
import { Logger } from 'winston'

import { ApiErrorHandler } from './ApiErrorHandler'

describe('ApiErrorHandler', () => {
    let errorHandler: ApiErrorHandler
    let logger: Logger
    let envType: string
    let response: Response
    let request: Request

    const nextFunction = jest.fn()
    const error = new Error('test')

    const createHandler = () => new ApiErrorHandler(logger, envType)

    beforeEach(() => {
        logger = {} as jest.Mocked<Logger>
        logger.error = jest.fn()

        request = {} as jest.Mocked<Request>

        response = {} as jest.Mocked<Response>
        const jsonResponse = jest.fn().mockReturnValue({})
        response.json = jsonResponse
        response.status = jest.fn().mockReturnValue({
            json: jsonResponse,
        })
    })

    describe('when in env other than development', () => {
        beforeEach(() => {
            envType = 'production'
            errorHandler = createHandler()
        })

        it('should return error response without details', () => {
            errorHandler.handle(error, request, response, nextFunction)

            expect(logger.error).toHaveBeenCalledWith(
                'There was a problem while handling request!',
                error,
            )
            expect(response.status).toHaveBeenCalledWith(500)
            expect(response.json).toHaveBeenCalledWith({ error: 'Internal Server Error' })
        })
    })

    describe('when in development env', () => {
        beforeEach(() => {
            envType = 'development'
            errorHandler = createHandler()
        })

        it('should return detailed error response', () => {
            errorHandler.handle(error, request, response, nextFunction)

            expect(logger.error).not.toHaveBeenCalled()
            expect(response.status).toHaveBeenCalledWith(500)
            expect(response.json).toHaveBeenCalledWith({ error: error.message, stack: error.stack })
        })
    })
})
