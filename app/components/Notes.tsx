'ue client'
import { BrainCircuit, File, FileText, Plus, Trash } from 'lucide-react'
import React, { useState } from 'react'

const Notes = () => {

    const noteList = ['Data Structures', 'Operating System']
    const [noteSelected, setNoteSelected] = useState(false)

    return (
        <div className='h-full flex flex-col px-35 py-5 pb-12 selection:bg-[#8e86ff]'>
            <div className='flex items-center justify-between'>
                <div className='font-semibold text-2xl'>Notes Generator</div>
                <button className='flex items-center gap-3 border-2 border-[#4941DA] bg-[#5046E5] hover:bg-[#4941DA] px-4 py-2 rounded-lg text-white cursor-pointer select-none'>
                    <Plus size={20} />
                    <span>New Note</span>
                </button>
            </div>
            <div className='flex flex-col justify-center gap-3 px-4 py-5 rounded-lg bg-white mt-5 drop-shadow-lg drop-shadow-gray-300'>
                <div className='text-lg font-medium'>
                    Generate Study Notes
                </div>
                <div className='flex gap-3 items-center w-full'>
                    <input className='w-1/2 outline-none border-1 border-[#D1D5DA] rounded-lg px-5 py-3 text-md' type="text" placeholder='Enter a topic (Eg. Neural Networks, Quantum Computing)' />
                    <div className='flex items-center justify-between gap-2 px-4 py-3 bg-[#5046E5] hover:bg-[#4941DA] rounded-lg text-white text-md font-medium cursor-pointer'>
                        <BrainCircuit size={24} />
                        <div className='leading-tight text-center'>Generate Notes</div>
                    </div>
                </div>
            </div>
            <div className='w-full flex-grow flex gap-5 mt-5'>
                <div className='h-full rounded-lg w-1/4 bg-white drop-shadow-lg drop-shadow-gray-300'>
                    <div className='font-medium text-lg p-4'>Your Notes</div>
                    <div className='flex flex-col overflow-x-hidden'>
                        {
                            noteList.map((note, idx) => (
                                <div key={idx} className='border-t border-t-gray-400 cursor-pointer' >
                                    <div className={`flex items-center p-5 justify-between hover:bg-neutral-100 hover:translate-x-2 transition-translate duration-200`}>
                                        <div className='flex items-center gap-4'>
                                            <FileText size={20} color='grey' />
                                            {note}
                                        </div>
                                        <Trash size={25} className='hover:text-red-500 text-neutral-400 hover:bg-neutral-200 p-1 rounded-md cursor-pointer' />
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div>
                <div className='h-full w-3/4 rounded-lg bg-white p-4 drop-shadow-lg drop-shadow-gray-300'>
                    {
                        !noteSelected ?
                            (
                                <div className='h-full w-full flex flex-col gap-3 items-center justify-center'>
                                    <File size={50} color='grey' />
                                    <div className='text-lg font-semibold'>
                                        No note selected
                                    </div>
                                    <div className='text-center mb-3'>
                                        Select a note from the sidebar or create a new one<br />to get started.
                                    </div>
                                    <div className='flex gap-2 p-3 cursor-pointer rounded-lg text-white bg-[#5046E5] hover:bg-[#4941DA]'>
                                        <Plus />
                                        <button className='cursor-pointer'>Create New Note</button>
                                    </div>
                                </div>
                            )
                            :
                            (
                                ""
                            )
                    }
                </div>
            </div>
        </div >
    )
}

export default Notes
