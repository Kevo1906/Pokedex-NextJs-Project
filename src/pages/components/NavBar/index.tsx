import { FaSignOutAlt } from 'react-icons/fa'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import SearchBar from '../SearchBar'
export default function NavBar() {
    const pathname = usePathname()
    const router = useRouter()
    console.log(pathname)
    return (
        <div className='top-0 relative flex bg-orange-500 items-center justify-center h-20 w-screen shadow-xl'>
            <SearchBar/>
            <Link className={`text-white py-2 px-5 text-lg border-none rounded-3xl cursor-pointer inline-block hover:bg-violet-700 ${pathname === '/about' ? 'bg-violet-700 scale-75 shadow-xl' : 'bg-[#151515]'}`} href='/about'>About</Link>
            <Link className={`text-white py-2 px-5 text-lg border-none rounded-3xl cursor-pointer inline-block hover:bg-violet-700 ${pathname === '/home' ? 'bg-violet-700 scale-75 shadow-xl' : 'bg-[#151515]'}`} href='/home'>Home</Link>
            <Link className={`text-white py-2 px-5 text-lg border-none rounded-3xl cursor-pointer inline-block hover:bg-violet-700 ${pathname === '/createPokemon' ? 'bg-violet-700 scale-75 shadow-xl' : 'bg-[#151515]'}`} href='/createPokemon'>Create Pokemon</Link>

            <button onClick={()=>router.push('/')} className='absolute right-10 flex justify-start items-center w-11 h-11 rounded-full cursor-pointer overflow-hidden bg-[#151515]'>
                <div className='w-full flex items-center justify-center'>
                    <FaSignOutAlt className='w-20 text-white'/>
                </div>
            </button>

        </div>
    )
}