import { defineCliConfig } from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: '4e4zozm9',
    dataset: 'production'
  },
  deployment: {
    /**
     * Enable auto-updates for studios.
     * Learn more at https://www.sanity.io/docs/studio/latest-version-of-sanity#k47faf43faf56
     */
    appId: 'gjtihqu55i5spns0p4vs4cuk',
    autoUpdates: true,
  }
})
