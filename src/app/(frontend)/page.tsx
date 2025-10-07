import Image from 'next/image'
import { getPayload } from 'payload'
import React from 'react'
import { fileURLToPath } from 'url'

import config from '@/payload.config'
import './styles.css'

export default async function HomePage() {
  const fileURL = `vscode://file/${fileURLToPath(import.meta.url)}`

  async function createUpdate() {
    'use server'
    const payloadConfig = await config
    const payload = await getPayload({ config: payloadConfig })
    const transactionID = await payload.db.beginTransaction()

    const { id: oneId } = await payload.create({
      collection: 'ones',
      data: {
        title: 'Title',
      },
      req: {
        transactionID: transactionID!,
      },
    })

    const { id: twoId } = await payload.create({
      collection: 'twos',
      data: {
        title: 'Title',
      },
      req: {
        transactionID: transactionID!,
      },
    })

    const { id: threeId } = await payload.create({
      collection: 'threes',
      data: {
        title: 'Title',
      },
      req: {
        transactionID: transactionID!,
      },
    })

    const { id: fourId } = await payload.create({
      collection: 'fours',
      data: {
        title: 'Title',
        ones: [oneId],
        twos: [twoId],
        threes: [threeId],
      },
      req: {
        transactionID: transactionID!,
      },
    })

    await payload.db.commitTransaction(transactionID!)
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
