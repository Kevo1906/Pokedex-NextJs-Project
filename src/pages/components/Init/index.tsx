import Image from "next/image"
import style from "./Form.module.css"
import { useRouter } from "next/navigation"
export default function InitComponent(){
    const router = useRouter()
    const onClick = (e:any)=>{
        router.push('/home')
    }
    return(
        <>
            <Image className={style.img} width={250} height={250} src='/img/icon.png' alt="pikachu"/>
            <button className={style.login_button} onClick={onClick}>START</button>
        </>
    )
}