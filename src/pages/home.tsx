import Cards from "./components/Cards";
import Pager from "./components/Pager";
import Filters from "./components/Filters";

export default function Home(){
    return(
        <div >
            <Filters/>
            <Cards/>
            <Pager/>
        </div>
    )
}