import { type } from 'os'
import React from 'react'

interface MessageProps {
    type: 'Success' | 'Error'
    txt?: string
    onClose: () => void
}

export const Message: React.FC<MessageProps> = (props) => {

    return (
        <div className={
            props.type == 'Success' ? 'bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative':
                'bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative'} role={'alert'}
            >
            <strong className={'font-bold'}>
                {props.type + '! '}
            </strong>
            <span className={'block sm:inline'}>
            {props.txt || (' ' + (props.type == 'Error') ? 'Please try again.' : 'Your file was uploaded successfully.')}
            </span>
            <span className={'absolute top-0 bottom-0 right-0 px-4 py-3'}>
                <svg className={ 
                    props.type == 'Success' ? 'fill-current h-6 w-6 text-green-500' :
                    'fill-current h-6 w-6 text-red-500'} role={'button'} xmlns={'http://www.w3.org/2000/svg'} viewBox={'0 0 20 20'} onClick={props.onClose}>
                    <title>Close</title>
                    <path fillRule={'evenodd'} d={'M14.348 5.652a.5.5 0 010 .707L10.707 10l3.64 3.64a.5.5 0 11-.707.707L10 10.707l-3.64 3.64a.5.5 0 01-.707-.707L9.293 10 5.652 6.36a.5.5 0 01.707-.707L10 9.293l3.64-3.64a.5.5 0 01.708 0z'} clipRule={'evenodd'} />
                </svg>
            </span>
        </div>
    )
}
