import React, { useEffect, useState } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { categoriselect, editcat } from '../../features/Categoryslice'
import Homeadmin from '../Homeadmin'

const Editcat = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [name, setname] = useState('')
    const [slug, setslug] = useState('')
    const [desc, setdesc] = useState('')
    const { id } = useParams();
    const data = useSelector(state => categoriselect.selectById(state, id))     
    const loading = useSelector(state => state.category)

    const addcatt = (e) => {
        e.preventDefault()     
        dispatch(editcat({ id,name, slug, desc}))
        navigate('/admin/view-category')
    } 

    useEffect(() => {
        setname(data.name)
        setslug(data.slug)
        setdesc(data.desc)  
    }, [])
 
  


  return (
    <div className="w-full flex flex-col items-center justify-center">
      <Link className="w-5/12 bg-slate-500 text-white font-bold text-center py-3" to="/">Back Home</Link>
      <div className=" w-full md:w-9/12 flex gap-3 mt-3">
        <Homeadmin />
        <div className="w-11/12 pb-20">
          <div className=" p-2 md:p-6">
            <h1 className="font-light">Edit Kategori Barang</h1>         
            <div className="grid  md:grid-cols-2 gap-3 mt-8">                        
            <div className="w-full">
                <input
                  className="border-b-2 w-full border-x-2 p-3 focus:outline-none"
                  type="text"
                  value={name}
                  onChange={(e) => setname(e.target.value)}
                  placeholder="Nama Kategori"
                />
                {/* {loading.categori.errors?.name && (<h6 className="text-[13px] text-red-500 my-3">*{loading.categori.errors.name}</h6>)} */}
              </div>
              <div className="">
                <input
                  className="border-b-2 w-full border-x-2 p-3 focus:outline-none"
                  type="text"
                  value={slug}
                  onChange={(e) => setslug(e.target.value)}
                  placeholder="Slug "
                />
                {/* {loading.categori.errors?.slug && (<h6 className="text-[13px] text-red-500 my-3">*{loading.categori.errors.slug}</h6>)} */}
              </div>
            </div>
            <div className="grid  md:grid-cols-1 mt-6 gap-3">              
                <textarea
                  className="border-b-2 border-x-2 p-3 w-full focus:outline-none"
                  type="text"
                  value={desc}
                  onChange={(e) => setdesc(e.target.value)}
                  placeholder="Deskripsi"
                />                   
            </div>
         
           
            {/* {name && slug && desc && ( */}
              <div className="w-full flex justify-center mt-3  ">
                <button
                  onClick={addcatt}
                  type="submit"
                  className="h-10 bg-slate-400 text-white font-semibold w-8/12 md:w-5/12 p-3 flex items-center justify-center "
                >
                  {loading.isLoading ? 'Mengupdate...' : 'Edit Kategori'}
                </button>
              </div>
            {/* )} */}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Editcat