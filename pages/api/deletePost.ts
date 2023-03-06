import prisma from "../../utils/prisma";
import { NextApiRequest, NextApiResponse } from "next";
import { createClient } from "@supabase/supabase-js";
import { env } from "process";

export default async function deletePost(req:NextApiRequest,res:NextApiResponse) {
    const supabase = createClient(env.NEXT_PUBLIC_SUPABASE_URL,env.NEXT_PUBLIC_SUPABASE_ANON_KEY)
    const {deleteNum} = req.body
    const deletePost = await prisma.post.findFirst({
        where:{
            id:Number(deleteNum)
        }
    })
    if (deletePost?.image){
        const {error} = await supabase
        .storage
        .from("photo")
        .remove([deletePost.image])
        if(error){
            console.log(error)
        }
    }
    await prisma.post.delete({
        where:{
            id:Number(deleteNum)
        }
    })
    res.json({
        "result":true
    })
}