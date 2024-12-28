import { SchemaTypeDefinition } from 'sanity'
import { aboutType } from './about'
import { brewType } from './brew'
import { eventType } from './event'
import { galleryImageType } from './galleryImage'
import { linkType } from './link'
import { memberType } from './member'
import { postType } from './post'
import { resourceType } from './resource'

export const groupKey = '_groupName'
export const singletonKey = '_singletonName'
export const activityGroup = 'activity'
export const resourceGroup = 'resource'

export type GroupDefinition<T> = T & {
  [groupKey]?: string
}

// Used in the sanity.config.ts to create groups in the sidebar
function groupInto<T>(current: T, groupName: string): GroupDefinition<T> {
  return {
    ...current,
    [groupKey]: groupName,
  }
}

function singleton<T>(current: T, singletonName: string): GroupDefinition<T> {
  return {
    ...current,
    [singletonKey]: singletonName,
  }
}

export const schemaTypes: GroupDefinition<SchemaTypeDefinition>[] = [
  singleton(aboutType, 'about'),
  groupInto(brewType, activityGroup),
  groupInto(eventType, activityGroup),
  groupInto(linkType, resourceGroup),
  groupInto(resourceType, resourceGroup),
  galleryImageType,
  memberType,
  postType,
]
