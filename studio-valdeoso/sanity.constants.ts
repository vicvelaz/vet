export const SANITY_CONFIG = {
  projectId: process.env.SANITY_PROJECT_ID || '4e4zozm9',
  dataset: process.env.SANITY_DATASET || 'production',
} as const;
