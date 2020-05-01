import { json as bodyParserJson, urlencoded as bodyParserUrlEncoded } from 'body-parser'
import * as cors from 'cors'
import { Express } from 'express'
import * as expressWinston from 'express-winston'
import * as winston from 'winston'

import { ApiErrorHandler } from './ApiErrorHandler'
import { Routes } from './Routes'

export class App {
    constructor (
        private _app: Express,
        private routes: Routes,
        private errorHandler: ApiErrorHandler,
    ) {
        this.config()
        this.routes.routes(this._app)
        this.initializeErrorHandler()
    }

    get app () {
        return this._app
    }

    private config (): void {
        /* istanbul ignore next */
        this._app.use(expressWinston.logger({
            transports: [
                new winston.transports.Console({
                    format: winston.format.json(),
                }),
            ],
            ignoreRoute: function (req, _res) { return ['/healthcheck', '/favicon.ico'].indexOf(req.path.replace(/\/$/, '')) >= 0 },
        }))
        this._app.use(cors())
        this._app.use(bodyParserJson())
        this._app.use(bodyParserUrlEncoded({ extended: false }))
    }

    private initializeErrorHandler (): void {
        this._app.use(this.errorHandler.handle.bind(this.errorHandler))
    }
}
