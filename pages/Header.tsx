function Header(){
    const menuList:string[][] = [["","スレ一覧"],["Suretate","スレ立て"],["Catalog","カタログ"]];
    return (
        <div className='bg-yellow-600'>
            <div className='w-fit ml-auto mr-0 pr-5'>
            {menuList.map((menuItem:string[],index:number)=> {
            const [url,name] = menuItem;
            return(
                <span key={index} className="px-2 border-l border-r border-gray-500 border-opacity-60">
                <a href={"./"+url}>{name}</a>
                </span>
            )
            })}
            </div>
        </div>
    )
}

export default Header;