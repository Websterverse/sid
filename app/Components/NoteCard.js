import React from 'react'
import { MdCreate, MdDelete } from "react-icons/md";
import { RiExpandDiagonal2Line } from "react-icons/ri";

const NoteCard = ({ title, date, content, onEdit, onDelete, onOpen }) => {
    return (
        <>
            <div className='border rounded p-4 bg-white hover:shadow-xl transition-all ease-in-out'>
                <div className='flex items-center justify-between'>
                    <div>
                        <h6 className='text-sm font-medium'>{title}</h6>
                        <span className='text-xs text-slate-500'>{date}</span>
                    </div>
                    <RiExpandDiagonal2Line className='icon-btn hover:text-black' onClick={onOpen} />
                </div>

                <p className='text-xs text-slate-600 mt-2'>{content?.slice(0, 60)}</p>

                <div className='flex items-center justify-between mt-2'>
                    <div className='flex items-center gap-2'>
                        <MdCreate className='icon-btn hover:text-green-600' onClick={onEdit} />
                        <MdDelete className='icon-btn hover:text-red-500' onClick={onDelete} />
                    </div>
                </div>

            </div>
        </>
    )
}

export default NoteCard