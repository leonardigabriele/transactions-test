import Image from 'next/image'
import { getPayload } from 'payload'
import React from 'react'
import { fileURLToPath } from 'url'

import config from '@/payload.config'
import './styles.css'

export default async function HomePage() {
  const fileURL = `vscode://file/${fileURLToPath(import.meta.url)}`

  async function createUpdate(formData: FormData) {
    'use server'
    const payloadConfig = await config
    const payload = await getPayload({ config: payloadConfig })
    const transactionID = await payload.db.beginTransaction()

    const { id } = await payload.create({
      collection: 'events',
      data: {
        title: 'Old title',
      },
      req: {
        transactionID: transactionID!,
      },
    })
    console.log(`Created document with ID: ${id}`)

    const newDoc = await payload.update({
      collection: 'events',
      id,
      data: {
        title: 'New title',
      },
      req: {
        transactionID: transactionID!,
      },
    })

    console.log(`Updated document with ID: ${id}`)

    await payload.db.commitTransaction(transactionID!)
    console.log(newDoc)
  }

  return (
    <div className="home">
      <div className="content">
        <picture>
          <source srcSet="https://raw.githubusercontent.com/payloadcms/payload/main/packages/ui/src/assets/payload-favicon.svg" />
          <Image
            alt="Payload Logo"
            height={65}
            src="https://raw.githubusercontent.com/payloadcms/payload/main/packages/ui/src/assets/payload-favicon.svg"
            width={65}
          />
        </picture>
        <form action={createUpdate}>
          <button type="submit">Start transaction</button>
        </form>
      </div>
      <div className="footer">
        <p>Update this page by editing</p>
        <a className="codeLink" href={fileURL}>
          <code>app/(frontend)/page.tsx</code>
        </a>
      </div>
    </div>
  )
}
