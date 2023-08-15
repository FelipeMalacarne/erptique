import {PageProps} from "@/types";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import {Head, useForm, usePage, } from "@inertiajs/react";
import {useState} from "react";
import PrimaryButton from "@/Components/PrimaryButton";
import axios from "axios";
import { Message } from "@/Components/Message";

export default function ImportPage ({ auth,  }: PageProps) {

    const { data, setData, post, errors, processing, reset }: any = useForm({
        fileUpload: null as FileList | null,
    })

    const [showSuccessMessage, setShowSuccessMessage] = useState(false)
    const [showErrorMessage, setShowErrorMessage] = useState(false)

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files
        if (files) {
            setData('fileUpload', files)
        }
    }

    const submit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        // @ts-ignore
        post(route('import'), {
            onSuccess: () => {
                reset('fileUpload')
                setShowSuccessMessage(true)
                setShowErrorMessage(false)
            },
            onError: () => {
                setShowErrorMessage(true)
                setShowSuccessMessage(false)
                console.log(errors.fileUpload)
            }
        })
    }

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Import ofx file</h2>}
        >
            <Head title="Import ofx"/>

            <div className="py-6">
                <form className="max-w-7xl mx-auto sm:px-6 lg:px-8"
                    onSubmit={submit}
                      encType={'multipart/form-data'}
                >
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-3 my-3 flex gap-4">
                        <label id="file-input-label" htmlFor="file-input" className={'inline-flex items-center px-4 py-2 bg-blue-500 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-blue-600 focus:bg-blue-600 active:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition ease-in-out duration-150'}>
                            File Upload
                        </label>
                        <input type="file" onChange={handleFileUpload} id={'file-input'} className={'hidden'} required multiple/>

                        <PrimaryButton
                            className={'p-6 text-gray-900'}
                            disabled={processing}
                        >
                            {processing ? 'Loading...' : 'Submit'}
                        </PrimaryButton>
                    </div>

                    {showErrorMessage && <Message type={'Error'} txt={errors[0]} onClose={() => setShowErrorMessage(false)}/>}

                    {showSuccessMessage && <Message type={'Success'} txt="Transactions Imported." onClose={() => setShowSuccessMessage(false)}/>}

                    {data.fileUpload && <div className={'bg-white overflow-hidden shadow-sm sm:rounded-lg p-3 my-3'}>
                        <div className={'p-6 text-gray-900'}>{data.fileUpload.length} files selected</div>
                    </div>}

                </form>
            </div>
        </AuthenticatedLayout>
    );
}
