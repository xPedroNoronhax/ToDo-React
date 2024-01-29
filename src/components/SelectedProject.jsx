import React from 'react'
import Tasks from './Tasks'
// this component will appear when we select a project in sidebar component
const SelectedProject = ({
    project, 
    onDelete,
    onAddTask,
    onDeleteTask,
    tasks    
}) => {
    const formattedDate = new Date(project.dueDate).toLocaleDateString('en-US',{
        year:'2-digit',
        month:'short',
        day:'numeric'
    })

  return (
    <div className='w-[35rem] mt-16'>
        <header className='pb-4 mb-4 border-b-2 border-stone-300'>
            <div className='flex items-center justify-between'>
                <h1 className='text-3xl font-bold text-stone-600 mb-2'>{project.title}</h1>
                <button className='text-stone-600 hover:text-stone-950' onClick={onDelete}>Delete</button>
            </div>
            <p className='mb-4 text-stone-400'>{formattedDate}</p>
            <p className='text-stone-600 whitespace-pre-wrap'>{project.description}</p>
        </header>
        <Tasks onAdd={onAddTask} onDelete={onDeleteTask} tasks={tasks}/>
    </div>
  )
}

export default SelectedProject