import { usePokemonStore } from "@/store"
import { ReactEventHandler, useState } from "react"
export default function Filters() {
    const { filters, changeFilters,changePage, PokemonTypes } = usePokemonStore()
    
    const handleChange = (e:any)=>{
        if(e.target.vale!== 'order'){
            changePage(1)
        }
        if(e.target.value === 'All'){
            changeFilters({...filters,[e.target.name]:[]})
        }else{
            changeFilters({...filters,[e.target.name]:[e.target.value]})
        }
    }


    return (
        <div className='mt-12 flex items-center justify-center'>
            <select name='order' value ={filters.order|| 'asc'}onChange={handleChange} className='border-none bg-violet-700 text-white  text-lg py-2 px-5 cursor-pointer rounded-2xl' >
                <option value="asc">Ascendente</option>
                <option value="desc">Descendente</option>
            </select>
            <select name='source' value ={filters.source|| 'All'} onChange={handleChange} className='border-none bg-violet-700 text-white text-lg py-2 px-5 cursor-pointer rounded-2xl'>
                <option value="All">All</option>
                <option value="api">API</option>
                <option value="created">Created</option>
            </select>
            <select name='types' value ={filters.types|| 'All'}onChange={handleChange} className='border-none bg-violet-700 text-white text-lg py-2 px-5 cursor-pointer rounded-2xl'>
                <option value="All">All</option>
                {PokemonTypes.map((element, index) => <option key={index} value={element.name}>{element.name}</option>)}
            </select>
        </div>
    )
}