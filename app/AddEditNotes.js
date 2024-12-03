import React, { useState } from 'react'

const AddEditNotes = () => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [date, setDate] = useState(new Date());
  return (
    <div>
        <div className='flex flex-col gap-2'>
            <label className='input-label'>Title</label>
            <input
                className='text-2xl text-slate-950 outline-none'
                placeholder='Go to gym at 6'
                value={title}
                onChange={(e)=>{
                    setTitle(e.target.value)
                }}
            />
        </div>

        <div className='flex flex-col gap-2 mt-4'>
            <label className='input-label'>Content</label>
            <textarea
                type='text' 
                className='text-sm text-slate-950 outline-none bg-slate-50 p-2 rounded'
                placeholder='Content'
                rows={10}
                value={content}
                onChange={(e)=>{
                    setContent(e.target.value)
                }}
            />
        </div>

        <button className='btn-primary font-medium mt-5 p-3' onClick={()=>{
                
        }}>Add</button>
    </div>
  )
}

export default AddEditNotes