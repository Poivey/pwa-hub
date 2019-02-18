import { Topic } from '@pulumi/cloud-aws'

export const userUpdateTopic = new Topic<{ id: string }>('userUpdateTopic')
