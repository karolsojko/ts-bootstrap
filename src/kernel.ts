import { ContainerBuilder } from 'node-dependency-injection'

import { boot as bootApi } from './API/DependencyInjection'
import { Env } from './envSchema'
import { boot as bootInfra } from './Infra/DependencyInjection'
import { logger } from './logger'

export { types as InfraTypes } from './Infra/Types'
export { types as APITypes } from './API/Types'

export interface Bootloaders {
    [key: string]: (container: ContainerBuilder, env: Env) => Promise<ContainerBuilder>
}

const containerBootloaders: Bootloaders = {
    bootInfra,
    bootApi,
}

export async function boot (env: Env): Promise<ContainerBuilder> {
    let container = new ContainerBuilder()

    for (const containerName in containerBootloaders) {
        logger.info(`Loading ${containerName} container...`)
        container = await containerBootloaders[containerName](container, env)
    }

    container.compile()

    return container
}
