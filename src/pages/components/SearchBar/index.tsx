import { usePokemonStore } from "@/store"
import { usePathname, useRouter } from "next/navigation"
import { useState } from "react"
export default function SearchBar() {
    const[name, setName] = useState('')
    const{changeFilters,changePage} = usePokemonStore()
    const router = useRouter()
    const pathname = usePathname()

    const handleChange =(e:any)=>{
        setName(e.target.value)
    }
    const onSearch = ()=>{
        changeFilters({name:name})
        changePage(1)
        if(pathname!=='/home'){
            router.push('/home')
        }        
    }
    return (
        <div className='absolute left-10 h-16 flex items-center justify-center p-5 text-base '>
            <div className='flex justify-center items-center h-10 m-2.5 '>

                <input className='h-full max-w-48 text-sm font-normal border-none bg-violet-700 text-white py-2 px-3 rounded-tl-3xl rounded-bl-3xl placeholder:text-white hover:border-slate-500 focus:border-slate-500 focus:bg-[#151515]' placeholder="Insert pokemon name " type="search" onChange={handleChange}/>

                <button className='border-none cursor-pointer bg-[#151515] rounded-tr-3xl rounded-br-3xl flex items-center justify-center h-full w-10' onClick={onSearch}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="22" height="22">
                        <path d="M18.031 16.6168L22.3137 20.8995L20.8995 22.3137L16.6168 18.031C15.0769 19.263 13.124 20 11 20C6.032 20 2 15.968 2 11C2 6.032 6.032 2 11 2C15.968 2 20 6.032 20 11C20 13.124 19.263 15.0769 18.031 16.6168ZM16.0247 15.8748C17.2475 14.6146 18 12.8956 18 11C18 7.1325 14.8675 4 11 4C7.1325 4 4 7.1325 4 11C4 14.8675 7.1325 18 11 18C12.8956 18 14.6146 17.2475 15.8748 16.0247L16.0247 15.8748Z" fill="#efeff1"></path>
                    </svg>
                </button>



            </div>
        </div>
    )
}