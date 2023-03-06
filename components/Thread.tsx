import { Post } from "@prisma/client";
import Res from "./Res";
import configValue from "./config";

type Props = {
    thread : Post;
    res:Post[]
}

function Thread(props:Props) {
    let maxRes =""
    if (props.res.length >= configValue.maxRes){
        maxRes = "レスが上限に達しました"
    }
    return(
        <div className="m-2">
            <Res
                resItemsProps={props.thread}
                index = {0}
            />
            {props.res.map((resItems:Post,index:number)=>{
                return(
                    <div key={index} className="m-2 ml-2 bg-red-300 bg-opacity-50">
                        <Res
                            resItemsProps={resItems}
                            index={index}
                        />
                    </div>
                )
            })}
            <p className="text-red-600 font-bold">{maxRes}</p>
        </div>
    );
}

export default Thread;