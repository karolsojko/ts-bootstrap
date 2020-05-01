import * as program from 'commander'

import { App } from '../src/API/App'
import { APITypes, boot } from '../src/kernel'
import { logger } from '../src/logger'

const heartbeat = (minutes: number) => {
    setInterval(function () {
        logger.info('Worker is still running.')
    }, minutes * 60 * 1000)
}

async function startApi () {
    const { env } = require('../src/env')

    const container = await boot(env)

    const api: App = container.get(APITypes.App.toString())

    api.app.listen(env.api.PORT, () => {
        logger.info(`Express server listening on port ${env.api.PORT}`)
    })
}

program
    .command('worker')
    .description('Starts worker')
    .action(async function () {
        // tslint:disable-next-line:no-commented-code
        // const { env } = require('../src/env')
        // const container = await boot(env)

        // put your code here

        heartbeat(20)
    })

program
    .command('api')
    .description('Run the API')
    .action(startApi)

program
    .command('*')
    .action(function (args: any) {
        logger.warn('Not sure what you wanted to do: "%s"', args)
    })

program.parse(process.argv)
