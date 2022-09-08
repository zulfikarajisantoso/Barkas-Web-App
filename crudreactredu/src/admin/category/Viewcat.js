
import React, { useEffect, useState } from 'react'
import { FaTimesCircle } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { categoriselect, deletecat, getcat } from '../../features/Categoryslice'
import Homeadmin from '../Homeadmin'

const Viewcat = () => {

    const dispatch = useDispatch()
    const cat = useSelector(categoriselect.selectAll)
    const loading = useSelector(state => state.category)

    useEffect(() => {        
        dispatch(getcat())
    }, [dispatch])

   


  return (
    <div className="w-full flex flex-col items-center justify-center">
      <Link className="w-5/12 bg-slate-500 text-white font-bold text-center py-3" to="/">Back Home</Link>

      <div className=" w-full md:w-9/12 flex gap-3 mt-3">
        <Homeadmin />
        <div className="overflow-x-auto md:overflow-hidden w-full">
          <table>
            <thead>
              <tr>
                <th>Nama Kategori</th>
                <th>Slug</th>
                <th>Deskripsi</th>
                <th>Aksi</th>
               
              </tr>
            </thead>
            <tbody>
              {cat.map((haha) => (
                <tr key={haha.id} className='mb-4'>
                  <td className="text-center">{haha.name}</td>
                  <td className="text-center">{haha.slug}</td>
                  <td className="text-center">{haha.desc}</td>
                  
                  <td className="flex items-center gap-3 justify-center mt-3 ml-3 ">
                    <Link to={`/admin/edit-category/${haha.id}`} className="bg-yellow-600 text-[13px] text-center font-semibold  text-white px-4 py-2 ">
                      Edit
                    </Link>
                    <button onClick={() =>  dispatch(deletecat(haha.id)) } >
                      <FaTimesCircle />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>

          </table>
          {loading.isLoading && <h1 className="text-center font-bold py-10">Loading..</h1>}
        </div>
      </div>
    </div>

  )
}

export default Viewcat