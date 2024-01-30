import { usePokemonStore } from "@/store"
import { useEffect } from "react"
type PagerProps = {

}

export default function Pager() {
    const { page, changePage, Pokemons } = usePokemonStore()

    const totalButtons = Math.ceil(Pokemons.length / 12)

    useEffect(() => {

    }, [page, Pokemons])
    const numButtons = []
    for (let i = 1; i <= totalButtons; i++) {
        numButtons.push(i)
    }
    let pagesBefore = numButtons.filter(element => element < page)
    let pagesAfter = numButtons.filter(element => element > page)

    return (
        <div className='mb-5'>
            {page !== numButtons[0] ? <button className='text-lg px-5 py-2.5 bg-[#6141a6] border-none rounded-full cursor-pointer mx-0.5 text-white' onClick={() => changePage(page - 1)}>Prev</button> : null}
            {pagesBefore.length > 3 ? <button className='text-lg px-5 py-2.5 bg-[#6141a6] border-none rounded-full cursor-pointer mx-0.5 text-white' value={pagesBefore[0]} onClick={(e) => changePage(pagesBefore[0])}>{pagesBefore[0]}</button> : null}
            {pagesBefore.length > 4 ? <button className='text-lg px-5 py-2.5 bg-[#6141a6] border-none rounded-full cursor-pointer mx-0.5 text-white'>...</button> : null}

            {pagesBefore.slice(-3).map((element, index) => <button key={index} className='text-lg px-5 py-2.5 bg-[#6141a6] border-none rounded-full cursor-pointer mx-0.5 text-white' onClick={() => changePage(element)} value={element}>{element}</button>)}
            <button className='bg-[#CC6B3E] text-lg px-5 py-2.5 border-none rounded-full cursor-pointer mx-0.5'>{page}</button>
            {pagesAfter.slice(0, 3).map((element, index) => <button key={index} className='text-lg px-5 py-2.5 bg-[#6141a6] border-none rounded-full cursor-pointer mx-0.5 text-white' onClick={() => changePage(element)} value={element}>{element}</button>)}
            {pagesAfter.length > 4 ? <button className='text-lg px-5 py-2.5 bg-[#6141a6] border-none rounded-full cursor-pointer mx-0.5 text-white'>...</button> : null}
            {pagesAfter.length > 3 ? <button className='text-lg px-5 py-2.5 bg-[#6141a6] border-none rounded-full cursor-pointer mx-0.5 text-white' value={Number(pagesAfter.slice(-1))} onClick={() => changePage(totalButtons)}>{pagesAfter.slice(-1)}</button> : null}
            {page !== numButtons.slice(-1)[0] ? <button className='text-lg px-5 py-2.5 bg-[#6141a6] border-none rounded-full cursor-pointer mx-0.5 text-white' onClick={() => changePage(page + 1)}>Next</button> : null}
        </div>
    )
}