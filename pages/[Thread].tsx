import { GetServerSideProps } from 'next';
import { Post } from '@prisma/client';
import prisma from '../utils/prisma';
import { useState } from 'react';
import Header from './Header';
import Thread from './Thread';
import Write from './Write';
import configValue from '../app/config';

type Props = {
    testes: Post | undefined
    res:Post[] | undefined
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    if (typeof ctx.params === "undefined"){
        return {
          props: {
            testes: undefined,
            res: undefined
          }
        }
    }
    const testes = await prisma.post.findFirst({
      where:{
        id:Number(ctx.params.Thread)
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
    const res = await prisma.post.findMany({
      where:{
        parentId:Number(ctx.params.Thread)
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
        testes,
        res
      },
    }
}

const sepThread = (props:Props) => {
  if (!props.testes){
    return(
      <div>
        <Header/>
        スレッドは存在しません
      </div>
    )
  }
  const [inputValue,setInputValue] = useState("");
  const [inputValue2,setInputValue2] = useState("");
  const [result,setResult] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      try {
        if(inputValue2 === configValue.deletePassword){
          const response = await fetch('./api/deletePost', {
            method: 'POST',
            body:JSON.stringify({
              "deleteNum":inputValue
            }),
            headers: { 'Content-Type': 'application/json' },
          });
          setInputValue(" ");
          setInputValue2(" ");
          setResult("成功");
          location.reload();
        }else{
          setResult("パスワードが違います");
        }
      } catch (err) {
        console.error(err);
      }
    };
  const handleChangeInput2 = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue2(e.target.value)
  }

  const handleChangeInput = (e:React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value)
  }
  if (typeof props.testes === "undefined"||typeof props.res ==="undefined"){
    return(
      <></>
    )
  }
  return (
    <div>
      <Header/>
      <div className='container mx-auto w-1/2'>
            <div className='p-3 m-3 my-5'>
              <div>
                <form onSubmit={handleSubmit}>
                  <span>パスワード</span><input value={inputValue2} onChange={handleChangeInput2}/>
                  <span>No.</span><input value={inputValue} onChange={handleChangeInput}/>
                  <button type='submit'>送信</button><span>{result}</span>
                </form>
              </div>
              <Thread
                thread = {props.testes}
                res = {props.res}
              />
              <Write 
                res = {props.testes.id}
                reload = {true}
              />
            </div>
      </div>
    </div>
  )
};

export default sepThread;