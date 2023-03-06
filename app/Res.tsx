import { Post } from "@prisma/client";
import Image from 'next/image';

type Props ={
    resItemsProps:Post
    index:number
}

function Res(props:Props) {
    const resItems = props.resItemsProps
    const date = resItems.date
    const weekChars = [ "日", "月", "火", "水", "木", "金", "土" ];
    const week = new Date(Number(date.substring(0,4)),Number(date.substring(4,6))-1,Number(date.substring(6,8)))
    const resArray = resItems.content.split("\n")
    return(
    <div>
        <span>名前:{resItems.name}</span>
        <span className="ml-5" id={"resNo>"+resItems.id}>
            {Number(date.substring(2,4))}/
            {Number(date.substring(4,6))}/
            {Number(date.substring(6,8))}({weekChars[week.getDay()]})
            {Number(date.substring(8,10))}:
            {date.substring(10,12)}:
            {date.substring(12)}
        </span>
        <span className="ml-5">No.{resItems.id}</span>
        {resItems.image &&(
            <div>
                <a href={"https://zbgqkixnzmwctzflctkn.supabase.co/storage/v1/object/public/photo/"+resItems.image} className="w-fit flex">
                    <Image src={"https://zbgqkixnzmwctzflctkn.supabase.co/storage/v1/object/public/photo/"+resItems.image} alt="レス画像" width={100} height={100}/>
                </a>
            </div>
        )}
        <div className="my-5 ml-5 pb-2 whitespace-pre-wrap break-words" data-text={resItems.content}>
            {resArray.map((value,index)=>{
                if(/^>[0-9]*/.test(value)){
                    return(
                        <div key={index}><a href={"#resNo"+value}>{value}</a></div>
                    )
                }else{
                    return(
                        <div key={index}>{value}</div>
                    )
                }
            })}
        </div>
    </div>
    )
}

export default Res;