import { usePathname } from "next/navigation"
import NavBar from "../NavBar"

export default function Layout({children}:any){
    const pathname = usePathname() 
    return(
    <div className="w-full h-full flex flex-col justify-center items-center flex-wrap bg-center bg-no-repeat bg-cover" style={{backgroundImage: pathname==='/'?'url(https://dthezntil550i.cloudfront.net/13/latest/131611011945454810000512756/1280_960/430feddc-dcca-4811-91b8-2f544d338569.png)':'url(https://wallpapercave.com/wp/wp4688525.jpg)'}}>
        {pathname!=='/'?<NavBar/>:null}
        {children}
    </div>
)

}