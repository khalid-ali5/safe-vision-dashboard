import Head from 'next/head'
import SafeVisionDashboard from '../components/SafeVisionDashboard'

export default function Home() {
  return (
    <>
      <Head>
        <title>Safe Vision Dashboard</title>
      </Head>
      <main style={{padding: 16}}>
        <SafeVisionDashboard />
      </main>
    </>
  )
}
