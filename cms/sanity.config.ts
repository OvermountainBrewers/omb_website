import pluralize from 'pluralize'
import {defineConfig, SchemaTypeDefinition} from 'sanity'
import {ActivityIcon as activityIcon, ShareIcon as resourceIcon} from '@sanity/icons'
import {ListItemBuilder, StructureBuilder, structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {activityGroup, groupKey, resourceGroup, schemaTypes} from './schemaTypes'

function toSentenceCase(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

export default defineConfig({
  basePath: '/cms',
  name: 'production',
  title: 'OvermountainBrewers',
  projectId: 'ilp5p0ny',
  dataset: 'production',
  plugins: [
    structureTool({
      structure: (S: StructureBuilder) => {
        const sortedItems = S.documentTypeListItems().sort()

        const groups = new Map<string, ListItemBuilder[]>()
        const nonGroupedItems: ListItemBuilder[] = []

        // Separate grouped from non-grouped items
        sortedItems.forEach((item) => {
          const hasSchemaType = item.serialize().schemaType

          if (!hasSchemaType) {
            nonGroupedItems.push(item)
            return
          }

          const groupType = item.serialize().schemaType[groupKey]

          if (groupType) {
            if (!groups.has(groupType)) groups.set(groupType, [])

            groups.get(groupType).push(item)
          } else nonGroupedItems.push(item)
        })

        const groupItems = Array.from(groups.entries()).map(([singularGroupName, groupItems]) => {
          const groupList = S.list().title(toSentenceCase(singularGroupName)).items(groupItems)
          const pluralizedGroupName = toSentenceCase(pluralize(singularGroupName))

          return S.listItem().title(pluralizedGroupName).child(groupList)
        })

        return S.list()
          .title('Schemas')
          .items(
            [...nonGroupedItems, ...groupItems].sort((a, b) =>
              a.serialize().title > b.serialize().title ? 1 : -1,
            ),
          )
      },
    }),
    visionTool(),
  ],
  schema: {types: schemaTypes},
})
