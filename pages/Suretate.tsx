import Header from "./Header";
import Write from "./Write";

export default function suretate() {
    return(
        <div>
            <Header/>
            <div className="container mx-auto w-1/2 mt-16">
                <div className=" bg-red-400 py-5"><div className="text-center text-2xl">スレッド作成フォーム</div></div>
                <div className="my-5">
                    <Write 
                      res={undefined}
                      reload = {false}
                    />
                </div>
            </div>
        </div>
    )
}