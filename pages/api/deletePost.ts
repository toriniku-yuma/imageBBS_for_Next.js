import prisma from "../../utils/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async function deletePost(req:NextApiRequest,res:NextApiResponse) {
    const {deleteNum} = req.body
    await prisma.post.delete({
        where:{
            id:Number(deleteNum)
        }
    })
    res.json({
        "result":true
    })
}