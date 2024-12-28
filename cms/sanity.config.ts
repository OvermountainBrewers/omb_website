import pluralize from 'pluralize'
import {defineConfig} from 'sanity'
import {ListItemBuilder, StructureBuilder, structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {groupKey, singletonKey, schemaTypes} from './schemaTypes'

function toSentenceCase(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

export function buildStructure(S: StructureBuilder) {
  const sortedItems = S.documentTypeListItems().sort()

  const groups = new Map<string, ListItemBuilder[]>()
  const singletons = new Map<string, ListItemBuilder[]>()
  const nonGroupedItems: ListItemBuilder[] = []

  // Separate grouped from non-grouped items
  sortedItems.forEach((item) => {
    const hasSchemaType = item.serialize().schemaType

    if (!hasSchemaType) {
      nonGroupedItems.push(item)
      return
    }

    const groupType = item.serialize().schemaType[groupKey]

    const sigletonType = item.serialize().schemaType[singletonKey]

    if (groupType) {
      if (!groups.has(groupType)) groups.set(groupType, [])

      groups.get(groupType).push(item)
    } else if (sigletonType) {
      if (!singletons.has(sigletonType)) singletons.set(sigletonType, [])

      singletons.get(sigletonType).push(item)
    } else nonGroupedItems.push(item)
  })

  const singletonItems = Array.from(singletons.entries()).map(([singularSingletonName]) => {
    const lowercaseSingletonName = singularSingletonName.toLowerCase()

    return S.listItem()
      .title(toSentenceCase(singularSingletonName))
      .id(lowercaseSingletonName)
      .child(
        // Instead of rendering a list of documents, we render a single
        // document, specifying the `documentId` manually to ensure
        // that we're editing the single instance of the document
        S.document().schemaType(lowercaseSingletonName).documentId(lowercaseSingletonName),
      )
  })

  const groupItems = Array.from(groups.entries()).map(([singularGroupName, groupItems]) => {
    const groupList = S.list().title(toSentenceCase(singularGroupName)).items(groupItems)
    const pluralizedGroupName = toSentenceCase(pluralize(singularGroupName))

    return S.listItem().title(pluralizedGroupName).child(groupList)
  })

  return S.list()
    .title('Schemas')
    .items(
      [...singletonItems, ...nonGroupedItems, ...groupItems].sort((a, b) =>
        a.serialize().title > b.serialize().title ? 1 : -1,
      ),
    )
}

export default defineConfig({
  name: 'production',
  title: 'OvermountainBrewers',
  projectId: 'ilp5p0ny',
  dataset: 'production',
  plugins: [
    structureTool({
      structure: buildStructure,
      defaultDocumentNode: (S) => S.document(),
    }),
    visionTool(),
  ],
  schema: {types: schemaTypes},
})
