import type { CollectionConfig } from 'payload'

export const Events: CollectionConfig = {
  slug: 'events',
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
    },
  ],
}
