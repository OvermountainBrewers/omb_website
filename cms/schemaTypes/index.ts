import {SchemaTypeDefinition} from 'sanity'
import {brewType} from './brew'
import {eventType} from './event'
import {memberType} from './member'
import {postType} from './post'
import {resourceType} from './resource'

export const groupKey = '_groupName'
export const activityGroup = 'activity'
export const resourceGroup = 'resource'

type GroupDefinition<T> = T & {
  [groupKey]?: string
}

// Used in the sanity.config.ts to create groups in the sidebar
function groupInto<T>(current: T, groupName: string): GroupDefinition<T> {
  return {
    ...current,
    [groupKey]: groupName,
  }
}

export const schemaTypes: GroupDefinition<SchemaTypeDefinition>[] = [
  groupInto(brewType, activityGroup),
  groupInto(eventType, activityGroup),
  groupInto(resourceType, resourceGroup),
  memberType,
  postType,
]
