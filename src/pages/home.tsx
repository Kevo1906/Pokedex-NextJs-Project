import Cards from "./components/Cards";
import Pager from "./components/Pager";

export default function Home(){
    return(
        <div className="w-full h-fit flex flex-col justify-center items-center flex-wrap bg-center bg-no-repeat bg-cover" style={{backgroundImage: 'url(https://wallpapercave.com/wp/wp4688525.jpg)'}}>
            <Cards/>
            <Pager/>
        </div>
    )
}