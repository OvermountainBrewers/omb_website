import pluralize from "pluralize";
import { SchemaType } from "sanity";
import { ListItemBuilder, StructureBuilder } from "sanity/structure";
function toSentenceCase(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function buildStructure(S: StructureBuilder) {
  const sortedItems = S.documentTypeListItems().sort();

  const groups = new Map<string, ListItemBuilder[]>();
  const nonGroupedItems: ListItemBuilder[] = [];

  // Separate grouped from non-grouped items
  sortedItems.forEach((item) => {
    const hasSchemaType = item.serialize().schemaType;

    if (!hasSchemaType) {
      nonGroupedItems.push(item);
      return;
    }

    const maybeGroupDefinition = item.serialize().schemaType! as SchemaType & {
      _groupName?: string;
    };

    const groupType: string | undefined = maybeGroupDefinition["_groupName"];

    if (groupType) {
      if (!groups.has(groupType)) groups.set(groupType, []);

      groups.get(groupType)!.push(item);
    } else nonGroupedItems.push(item);
  });

  const groupItems = Array.from(groups.entries()).map(
    ([singularGroupName, groupItems]) => {
      const groupList = S.list()
        .title(toSentenceCase(singularGroupName))
        .items(groupItems);
      const pluralizedGroupName = toSentenceCase(pluralize(singularGroupName));

      return S.listItem().title(pluralizedGroupName).child(groupList);
    }
  );

  return S.list()
    .title("Schemas")
    .items(
      [...nonGroupedItems, ...groupItems].sort((a, b) => {
        const aSerialized = a.serialize();
        const bSerialized = b.serialize();

        if (aSerialized.title && bSerialized.title) {
          return aSerialized.title > bSerialized.title ? 1 : -1;
        }

        return 0;
      })
    );
}
