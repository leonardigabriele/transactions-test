import type { CollectionConfig } from 'payload'

export const Fours: CollectionConfig = {
  slug: 'fours',
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
    {
      label: 'Ones',
      name: 'ones',
      type: 'relationship',
      relationTo: 'ones',
      hasMany: true,
    },
    {
      label: 'Twos',
      name: 'twos',
      type: 'relationship',
      relationTo: 'twos',
      hasMany: true,
    },
    {
      label: 'Threes',
      name: 'threes',
      type: 'relationship',
      relationTo: 'threes',
      hasMany: true,
    },
  ],
}
