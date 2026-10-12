import studio from '@sanity/eslint-config-studio'
import prettier from 'eslint-config-prettier'

export default [{ignores: ['dist/', '.sanity/', 'node_modules/']}, ...studio, prettier]
