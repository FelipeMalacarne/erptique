import Modal from '@/Components/Modal'
import PrimaryButton from '@/Components/PrimaryButton'
import { router } from '@inertiajs/react'
import React from 'react'

interface DeleteConfirmationModalProps {
    showModal: boolean
    setShowModal: React.Dispatch<React.SetStateAction<boolean>>
    selectedApplicationId: number | null

}

export const DeleteConfirmationModal: React.FC<DeleteConfirmationModalProps> = (props) => {
    return (
        <Modal show={props.showModal} onClose={() => props.setShowModal(false)} closeable maxWidth='sm'>
            <div className="flex flex-col items-center justify-center p-3">
                <h1 className="text-2xl font-bold">Are you sure?</h1>
                <hr/>
                <p className="text-gray-600 mt-4 mb-4">This action cannot be undone.</p>
                <div className="flex justify-center gap-2 mt-4">
                    <PrimaryButton
                        onClick={() => {
                            props.setShowModal(false)
                        }}
                    >
                        Cancel
                    </PrimaryButton>
                    <PrimaryButton
                        onClick={() => {
                            router.visit(`/applications/${props.selectedApplicationId}`, { method: 'delete' })
                            props.setShowModal(false);
                        }}
                        className='bg-rose-700 hover:bg-rose-800'
                    >
                        Delete
                    </PrimaryButton>
                </div>
            </div>
        </Modal>
    )
}
