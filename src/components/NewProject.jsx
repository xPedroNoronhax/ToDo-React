import React, { useRef } from 'react'
import Input from './Input'
import Modal from './Modal';


//This component will be renderer when the user click the +Add Project button.
const NewProject = ({onAdd,onCancel}) => {
    const modal = useRef();
    // the UseRef are used bellow because with this hook, we can manipulate the dom in this case, manipulate the input value.
    const title = useRef();
    const description = useRef();
    const dueDate = useRef();

const handleSave = () => {
    //when the button 'Save' was clicked will activeted this function, that will save the content that was typed in the input.
    const enteredTitle = title.current.value;
    const enteredDescription = description.current.value;
    const enteredDueDate = dueDate.current.value;

    //validation
    if(
        enteredTitle.trim() === '' ||
        enteredDescription.trim() === '' ||
        enteredDueDate.trim() === ''
        ){
            modal.current.open()
            return;
        }
    
    

    onAdd({
        title: enteredTitle,
        description: enteredDescription,
        dueDate: enteredDueDate
    })
}
  return (
    <>
    <Modal ref={modal} buttonCaption= "Okay">
        <h2 className='text-xl font-bold text-stone-700 my-4 '>Invalid Input</h2>
        <p className='text-stone-600 mb-4'>Oops... looks like you forgot to enter a value.</p>
        <p className='text-stone-600 mb-4'>Please make sure you provide a valid value for every input field</p>

    </Modal>
    <div className='w-[35rem] mt-16'>
        <menu className='flex items-center justify-end gap-4 my-4'>
            <li>
                <button className='text-stone-800 hover:text-stone-950  ' onClick={onCancel}>Cancel</button>
            </li>
            <li>
                <button className='px-6 py-2 rounded-md bg-stone-800 text-stone-50 hover:bg-stone-950 '
                onClick={handleSave}>
                Save
                </button>
            </li>
        </menu>
        <div>
            <Input type='text' ref={title} label='Title'/>
            <Input ref={description} label='Description' textarea/>
            <Input type='date' ref={dueDate} label='Due Date'/>
        </div>
    </div>
    </>
  )
}

export default NewProject