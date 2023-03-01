import Thread from './Thread'
import Write from './Write'
import Header from './Header';
import prisma from '../utils/prisma';
import { GetServerSideProps } from 'next';
import { Post, Prisma } from '@prisma/client'

type PostChildren = Prisma.PostGetPayload<{
  include: {children: true },
}>

type Props = {
  testes: PostChildren[]
  threadNumResult: number
}

export const getServerSideProps: GetServerSideProps = async ({query}) => {
  let page:number;
  if (typeof query.page === "undefined"){
    page = 1;
  }else{
    page = Number(query.page);
  }
  const testes:(Omit<Post, "updatedAt"> & {children: Omit<Post, "updatedAt">[];})[] = await prisma.post.findMany({
    take:3,
    skip:3*(page-1),
    orderBy:{updatedAt:"desc"},
    where:{
      parentId:null
    },
    select:{
      id:true,
      name:true,
      date:true,
      content:true,
      parentId:true,
      image:true,
      children:{
        orderBy:{id:"desc"},
        take:5,
        select:{
          id:true,
          name:true,
          date:true,
          content:true,
          parentId:true,
          image:true
        }
      }
    }
  });
  const threadNum:number = await prisma.post.count({
    where:{
      parentId:null
    }
  });
  const threadNumResult:number =Number(threadNum / 3)
  return {
    props : {
      testes,
      threadNumResult
    },
  }
}

export default function Home(props:Props) {
  const resList:PostChildren[] = props.testes;
  const threadIndex:number[] = [];
  for(let i:number = 0;i<props.threadNumResult;i++){
    threadIndex.push(i+1);
  }
  return (
    <div>
      <Header/>
      <div className='container mx-auto w-3/5'>
        {resList.map((resItem:PostChildren, index:number) => {
          const resItemChildren = resItem.children.reverse()
          return (
            <div className='shadow sm:rounded-lg bg-gray-300 bg-opacity-30 p-3 m-3 my-5' key={index}>
              <Thread
                thread = {resItem}
                res = {resItemChildren}
              />
              <Write 
                res = {resItem.id}
                reload = {true}
              />
              <a href={"./" + resItem.id}><span className='border-l border-r border-gray-400 px-2'>このスレを見る</span></a>
            </div>
          )
        })}
        <div className='mb-5'>
        {
          threadIndex.map((value,index)=>{
            return(
              <span key={index}>[<a className='p-1' href={"./?page="+value}>{value}</a>]</span>
            )
          })
        }
        </div>
      </div>
    </div>
  )
}
