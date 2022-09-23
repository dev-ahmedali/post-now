import Head from 'next/head'
import Feed from '../components/Feed'
import Sidebar from '../components/Sidebar'
import Widgets from '../components/Widgets'

export default function Home({newsResults}) {
  return (
    <div>
      <Head>
        <title>Post now!</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <main className='flex min-h-screen mx-auto'>
          {/* sidebar */}
        <Sidebar />

      {/* feed section */}
      <Feed />

      {/* widget */}
      <Widgets newsResults={newsResults.articles}/>

      {/* modal */}
      </main>
      
    </div>
  )
}


// https://saurav.tech/NewsAPI/top-headlines/category/business/us.json

export async function getServerSideProps(){
  const newsResults = await fetch('https://saurav.tech/NewsAPI/top-headlines/category/business/us.json').then((res) => res.json());
  return {
    props:{
      newsResults,
    }
  }
}