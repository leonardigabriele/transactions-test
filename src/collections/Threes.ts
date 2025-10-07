import type { CollectionConfig } from 'payload'

export const Threes: CollectionConfig = {
  slug: 'threes',
  admin: {
    useAsTitle: 'title',
  },
  versions: {
    drafts: true,
    maxPerDoc: 10,
  },
  fields: [
    {
      label: 'Title',
      name: 'title',
      type: 'text',
      required: true,
      localized: true,
    },
  ],
}
