import React, { useEffect, useState } from "react"
import { SITE } from "@/lib/config"
import Head from "@/components/bases/head"
import Header from "@/components/shared/header"
import Footer from "@/components/shared/footer"
import { getMeta } from "@/lib/utils/getMeta"

/**
 * Base layout component
 * @param {Object} props
 * @param {import('@/lib/types').Entry} props.entry - Entry data
 * @param {React.ReactNode} props.children - Child components
 */
const BaseLayout = ({ entry, children }) => {
  const [meta, setMeta] = useState(null)

  useEffect(() => {
    const loadMeta = async () => {
      const metaData = await getMeta(entry)
      setMeta(metaData)
    }
    loadMeta()
  }, [entry])

  if (!meta) return <div>Loading...</div>

  return (
    <div
      className="flex flex-col min-h-screen"
      lang={SITE.locale}
      dir={SITE.dir}
    >
      <Head meta={meta} />
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  )
}

export default BaseLayout
