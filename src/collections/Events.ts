import type { CollectionConfig } from 'payload'

export const Events: CollectionConfig = {
  slug: 'events',
  admin: {
    useAsTitle: 'title',
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
