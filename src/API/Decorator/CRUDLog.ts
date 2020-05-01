import { Response } from 'express'

import { logger } from '../../logger'

export function CRUDLog () {
    return (target: any, name: any, descriptor: any) => {
        if (descriptor) {
            const original = descriptor.value
            descriptor.value = async function (...args: any[]) {
                const response: Response = args[1]
                try {
                    await original.apply(this, args)
                } catch (error) {
                    if (process.env.NODE_ENV !== 'test') {
                        logger.error(`[${target.constructor.name}][${name}]: `, error)
                    }

                    response.status(500).send('An error occurred during the request')
                }
            }
        }

        return descriptor
    }
}
