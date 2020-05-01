import { ContainerBuilder } from 'node-dependency-injection'

import { logger } from '../logger'

import { types } from './Types'

export async function boot (container = new ContainerBuilder()) {
    const loggerDefinition = container.register(types.Logger.toString())
    loggerDefinition.synthetic = true
    container.set(types.Logger.toString(), logger)

    return container
}
