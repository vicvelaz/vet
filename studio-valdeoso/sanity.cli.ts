import { defineCliConfig } from 'sanity/cli'
import { SANITY_CONFIG } from './sanity.constants'

export default defineCliConfig({
  api: {
    projectId: SANITY_CONFIG.projectId,
    dataset: SANITY_CONFIG.dataset
  },
  deployment: {
    /**
     * Enable auto-updates for studios.
     * Learn more at https://www.sanity.io/docs/studio/latest-version-of-sanity#k47faf43faf56
     */
    appId: process.env.SANITY_APP_ID || 'gjtihqu55i5spns0p4vs4cuk',
    autoUpdates: true,
  }
})
