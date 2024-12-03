"use client"

import React, { useState } from 'react'
import Navbar from './Components/Navbar'
import NoteCard from './Components/NoteCard'
import { MdAdd } from 'react-icons/md'
import Modal from 'react-modal'

const page = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [date, setDate] = useState(new Date());
  const [notesArr, setNotesArr] = useState([]);
  const [openAddEditModal, setOpenAddEditModal] = useState({
    isShown: false,
    type: "",
    idx: null
  });
  const [openNoteModal, setOpenNoteModal] = useState({
    isShown: false,
    note: null
  });

  const addHandler = () => {
    setNotesArr([...notesArr, { title, content }]);
    setTitle("");
    setContent("");
  };

  const editHandler = (i) => {
    const note = notesArr[i];
    setTitle(note.title);
    setContent(note.content);
    setOpenAddEditModal(() => ({
      isShown: true,
      type: "edit",
      idx: i
    }));
  };

  const updateNoteHandler = () => {
    const updatedArr = [...notesArr];
    updatedArr[openAddEditModal.idx] = { title, content };
    setNotesArr(updatedArr);
    setOpenAddEditModal({ isShown: false, type: "", selectedNoteIndex: null });
    setTitle("");
    setContent("");
  };

  const deleteHandler = (i) => {
    let arr = [...notesArr];
    arr.splice(i, 1);
    setNotesArr(arr);
  };

  const openNoteHandler = (i) => {
    setOpenNoteModal({
      isShown: true,
      note: notesArr[i]
    });

    console.log(openNoteModal.note);
  };

  let renderNote;
  if (notesArr.length <= 0) {
    renderNote =
      <h3 className='text-xl text-slate-400 flex'>No notes to display</h3>
  } else {
    renderNote = notesArr.map((ele, i) => {
      return (

        <NoteCard
          key={i}
          title={ele.title}
          content={ele.content}
          date={date.toDateString()}
          onEdit={() => {
            editHandler(i);
          }}
          onDelete={() => {
            deleteHandler(i);
          }}
          onOpen={() => {
            openNoteHandler(i);
          }}
        />

      )
    });
  }
  return (
    <>
      <Navbar />
      <div className='container mx-auto'>
        <div className='grid grid-cols-3 gap-4 mt-8'>
          {renderNote}
        </div>
      </div>
      <button className='w-16 h-16 flex items-center justify-center rounded-2xl bg-blue-500 hover:bg-blue-600 absolute right-10 bottom-10' onClick={() => {
        setOpenAddEditModal({ isShown: true, type: "add" });
      }}>
        <MdAdd className='text-[32px] text-white' />
      </button>

      <Modal isOpen={openAddEditModal.isShown}
        onRequestClose={() => { setOpenAddEditModal({ isShown: false, type: "", idx: null }); }}
        style={{
          overlay: {
            backgroundColor: "rgba(0,0,0,0.2)",
          },
        }}
        ariaHideApp={false}
        contentLabel=""
        className="w-[40%] max-h-3/4 bg-white rounded-md mx-auto mt-14 p-5 overflow-scroll"
      >
        <div>
          <div className='flex flex-col gap-2'>
            <label className='input-label'>Title</label>
            <input
              className='text-2xl text-slate-950 outline-none'
              placeholder='Title'
              value={title}
              onChange={(e) => {
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
              onChange={(e) => {
                setContent(e.target.value)
              }}
            />
          </div>

          <button className='btn-primary font-medium mt-5 p-3' onClick={() => {
            if (openAddEditModal.type === "add") {
              addHandler();
              setOpenAddEditModal({ isShown: false, type: "", selectedNoteIndex: null });
            } else if (openAddEditModal.type === "edit") {
              updateNoteHandler();
              setOpenAddEditModal({ isShown: false, type: "", selectedNoteIndex: null });
            }
          }}>{openAddEditModal.type === "add" ? "Add" : "Update"}</button>
        </div>
      </Modal>

      <Modal isOpen={openNoteModal.isShown}
        onRequestClose={() => { setOpenNoteModal({ isShown: false, note: null }); }}
        style={{
          overlay: {
            backgroundColor: "rgba(0,0,0,0.2)",
          },
        }}
        ariaHideApp={false}
        contentLabel=""
        className="w-[40%] max-h-3/4 bg-white rounded-md mx-auto mt-14 p-5 overflow-scroll"
      >
        {openNoteModal.note ? (
          <div>
            <h3 className="text-2xl font-semibold">{openNoteModal.note.title}</h3>
            <p className="text-sm text-slate-500 mt-4">{openNoteModal.note.content}</p>
          </div>
        ) : (
          <p>Loading note...</p>
        )}

      </Modal>
    </>
  )
}

export default page