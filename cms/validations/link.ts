import {UrlRule} from 'sanity'

export function link(rule: UrlRule): UrlRule {
  return rule.uri({allowRelative: false, scheme: ['https', 'http']})
}
