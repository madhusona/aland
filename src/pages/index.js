import Head from 'next/head';
import { getLandList } from '../libs/sheets';
import Pagination from "../component/pagination";
import { useState } from "react";
import dynamic from "next/dynamic";
import { useSession, signIn, signOut } from 'next-auth/react';


export default function IndexPage({land}) {
  console.log("in index")
  const { data, status } = useSession({required: true});
  const [currentPage, setCurrentPage] = useState(1);
 const pageSize = 100;

 const onPageChange = (page) => {
   setCurrentPage(page);
 };
 const MapWithNoSSR = dynamic(() => import("../component/Map"), {
  ssr: false
})
 const paginatedPosts = paginate(land, currentPage, pageSize);
 if (status === 'loading') return <h1> loading... please wait</h1>;
 if (status === 'authenticated') {
  return (
    <>
    <Head>
      <title>Auroville - Land Details</title>
      <meta name="viewport" content="initial-scale=1.0, width=device-width"/>
    </Head>
    <div>
    <div className="container mx-auto px-4">
      
      <MapWithNoSSR land={land} />
    </div>
    </div>
   
  
   

{/*  {paginatedPosts.map((item) => {
     return <p key={item.id}>{item.name}</p>;
   })}

<Pagination
     items={land.length} // 100
     currentPage={currentPage} // 1
     pageSize={pageSize} // 10
     onPageChange={onPageChange}
  />  */}
  
  </>
  );
}
  return (
    <div>
    <button onClick={() => signIn('google')}>sign in with gooogle</button>
  </div>
  );
}

export async function getStaticProps(context) {
  const e = await getLandList();
  const land=JSON.parse(JSON.stringify(e));
  
  return {
    props: {
      land: land.slice(1, land.length), // remove sheet header
    },
  };
}

export const paginate = (items, pageNumber, pageSize) => {
  const startIndex = (pageNumber - 1) * pageSize;
  return items.slice(startIndex, startIndex + pageSize);
 };