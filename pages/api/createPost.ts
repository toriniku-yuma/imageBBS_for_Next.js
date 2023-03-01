import prisma from "../../utils/prisma";
import { NextApiRequest, NextApiResponse } from "next";
import configValue from "../config";
import fs from "node:fs/promises";
import formidable from "formidable";

type Body ={
    name :string
    content :string
    parentId :number|undefined
    image:File
}

export const config = {
    api: {
        bodyParser: false,
    },
};

const isBody = (item:any):item is Body =>{
    if (typeof item.name !== "string")return false;
    if (typeof item.content !== "string")return false;
    if (typeof item.parentId !== "number"&&typeof item.parentId !== "undefined")return false;
    return true;
}

export default async function createPost(req:NextApiRequest,res:NextApiResponse) {
    const form = new formidable.IncomingForm({uploadDir:"./public/uploadImage",keepExtensions:true});
    form.parse(req,async function(err,fields,files) {
        if(err){
            console.log(err)
            res.send("error")
            return
        }else{
            let {name,content,parentIdstr} = fields;
            let parentId:number|undefined = Number(parentIdstr);
            let image:string|null;
            if (Number.isNaN(parentId)){
                parentId = undefined;
            }
            if(!fields.image){
                const imagedata:formidable.File|formidable.File[] = files.image;
                if(!("newFilename" in imagedata)){
                    return
                } 
                image = imagedata.newFilename;
            }else{
                image = null;
            }
            if (typeof name !== "string"|| typeof content !== "string"||(typeof parentId !=="undefined"&&typeof parentId !== "number")){
                return res.status(403).send("openis");
            }
            const date:string = new Date().toLocaleString('sv').replace(/\D/g, '');
            if (typeof parentId !== "undefined"){
                const threadCount = await prisma.post.count({
                    where:{
                        parentId:parentId
                    }
                })
                if(threadCount >= configValue.maxRes){
                    return res.status(403).send("レス数が上限に達しました");
                }
            }
            if (name === ""){
                name = configValue.name;
            }
            const result = await prisma.post.create({
                data: {
                    date: date,
                    name: name,
                    content: content,
                    parentId : parentId,
                    image: image
                },
            })
            if (typeof parentId !== "undefined"){
                await prisma.post.update({
                    where:{
                        id:parentId
                    },
                    data:{
                        parentId:null
                    }
                })
            }
            const nowResNum = await prisma.post.count();
            if (nowResNum>=configValue.thresholdRes){
                const deleteFirst = await prisma.post.findFirst({
                    where:{
                        parentId:null
                    },
                    orderBy:{
                        id:"asc"
                    }
                })
                const deleteThreadRes = await prisma.post.findMany({
                    where:{
                        parentId:deleteFirst?.id
                    }
                })
                if(deleteFirst?.image){
                    fs.unlink("./public/uploadImage/"+deleteFirst.image)
                }
                deleteThreadRes.map((value)=>{
                    if (value.image){
                        fs.unlink("./public/uploadImage/"+value.image);
                    }
                })
                await prisma.post.delete({
                    where:{
                        id:deleteFirst?.id
                    }
                })
            }
            res.json({
                result:true
            })
        }
    })
/*     if(!isBody(files)) {
        return res.status(403).send("")
    } */
}