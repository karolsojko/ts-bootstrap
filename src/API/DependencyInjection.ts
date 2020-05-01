import * as express from 'express'
import { ContainerBuilder, Reference } from 'node-dependency-injection'

import { Env } from '../envSchema'
import { types as InfraTypes } from '../Infra/Types'

import { ApiErrorHandler } from './ApiErrorHandler'
import { App } from './App'
import { HealthCheckController } from './Controller/HealthCheckController'
import { Routes } from './Routes'
import { types } from './Types'

export async function boot (container = new ContainerBuilder(), env: Env) {
    const app = express()
    const appDefinition = container.register(types.Express.toString())
    appDefinition.synthetic = true
    container.set(types.Express.toString(), app)

    container
        .register(types.App.toString(), App)
        .addArgument(new Reference(types.Express.toString()))
        .addArgument(new Reference(types.Routes.toString()))
        .addArgument(new Reference(types.ApiErrorHandler.toString()))

    container
        .register(types.Routes.toString(), Routes)
        .addArgument(new Reference(types.HealthCheckController.toString()))

    container
        .register(types.ApiErrorHandler.toString(), ApiErrorHandler)
        .addArgument(new Reference(InfraTypes.Logger.toString()))
        .addArgument(env.infra.NODE_ENV)

    container
        .register(types.HealthCheckController.toString(), HealthCheckController)

    return container
}
