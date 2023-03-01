import React,{ useState } from "react";
type Props ={
  res : number | undefined
  reload : boolean
}

function Write(props:Props){
    const [inputValue,setInputValue] = useState("");
    const [inputValue2,setInputValue2] = useState("");
    const [inputImage,setInputImage] = useState<File>();
    const [result,setResult] = useState("");

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
          const fd = new FormData;
          fd.append("name",inputValue2);
          fd.append("content",inputValue);
          if (typeof props.res !== "undefined"){
            fd.append("parentIdstr",props.res.toString());
          }else{
            fd.append("parentIDstr","0")
          }
          if (inputImage !== undefined){
            fd.append("image",inputImage);
          }else{
            fd.append("image","0");
          }
          const response = await fetch('./api/createPost', {
            method: 'POST',
            body:fd,
            // headers: { 'Content-Type': 'multipart/form-data' },
          });
          setInputValue(" ");
          setInputValue2(" ");
          setResult("成功");
          if (props){
            location.reload();
          }

        } catch (err) {
          console.error(err);
        }
      };
    const handleChangeInput2 = (e: React.ChangeEvent<HTMLInputElement>) => {
      setInputValue2(e.target.value)
    }

    const handleChangeInput = (e:React.ChangeEvent<HTMLTextAreaElement>) => {
      setInputValue(e.target.value)
    }

    const handleChangeInput3 = (e:React.ChangeEvent<HTMLInputElement>) => {
      if (!e.target.files){
        return 
      }
      setInputImage(e.target.files[0])
    }

    return(
      <div className="mt-8">
        <form onSubmit={handleSubmit}>
            <p className="m-2"><span className="bg-red-400 px-5 bg-opacity-50 font-bold">名前</span><input value={inputValue2} onChange={handleChangeInput2} className="input input-bordered w-1/3 ml-3"/>
            <input className="ml-2" type="file" onChange={handleChangeInput3}/></p>
            <div className="m-2 mt-5">
            <textarea value={inputValue} onChange={handleChangeInput} className="w-2/3 h-20"/>
            <button type="submit" className="sm:rounded-lg bg-blue-400 px-2 ml-3 text-white">送信</button>
            </div>
        </form>
        <div>{result}</div>
      </div>
    );
}

export default Write;