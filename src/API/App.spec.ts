import { Express } from 'express'

import { ApiErrorHandler } from './ApiErrorHandler'
import { App } from './App'
import { Routes } from './Routes'

describe('App', () => {
    let app: Express
    let routes: Routes
    let apiErrorHandler: ApiErrorHandler

    const createApp = () => new App(app, routes, apiErrorHandler)

    beforeEach(() => {
        app = {} as jest.Mocked<Express>
        app.use = jest.fn()

        apiErrorHandler = {} as jest.Mocked<ApiErrorHandler>
        apiErrorHandler.handle = jest.fn()

        routes = {} as jest.Mocked<Routes>
        routes.routes = jest.fn()
    })

    it('should expose the Express app', () => {
        const app = createApp()

        expect(typeof app.app).toBe('object')
        expect(routes.routes).toHaveBeenCalledWith(app.app)
    })
})
