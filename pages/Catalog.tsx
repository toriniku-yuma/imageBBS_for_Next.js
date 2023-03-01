import Header from "./Header"
import { Post } from "@prisma/client";
import { GetServerSideProps } from "next";
import prisma from "../utils/prisma";
import Image from "next/image";

type Props = {
    testes: Post[];
}

export const getServerSideProps: GetServerSideProps = async ({query}) => {
    let page:number;
    if (typeof query.page === "undefined"){
      page = 1;
    }else{
      page = Number(query.page);
    }
    const testes:(Omit<Post, "updatedAt">)[] = await prisma.post.findMany({
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
        image:true
      }
    });
    return {
      props : {
        testes
      },
    }
  }

export default function catalog(props:Props) {
    return(
        <div>
            <Header />
            <div className='container mx-auto w-3/5'>
                <div className="grid grid-cols-5 gap-3">
                    {props.testes.map((value,index)=>{
                            return(
                                <a href={"./"+value.id} key={index} className="col-span-1 bg-slate-400 bg-opacity-30 h-28 shadow sm:rounded-lg flex flex-col justify-between">
                                    {value.image &&(
                                      <div>
                                        <Image className="ml-2 mt-2" src={"/uploadImage/"+value.image} alt ="Cat" width={50} height={50}/>
                                      </div>
                                    )}
                                    <div className="mt-auto">{value.content.slice(0,4)}</div>
                                </a>
                            )
                    })}
                </div>
            </div>
        </div>
    )
}