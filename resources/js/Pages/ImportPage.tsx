import {PageProps} from "@/types";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import {Head, useForm, usePage, } from "@inertiajs/react";
import {useState} from "react";
import PrimaryButton from "@/Components/PrimaryButton";
import axios from "axios";

export default function ImportPage ({ auth,  }: PageProps) {

    const { data, setData, post, errors, processing, reset }: any = useForm({
        fileUpload: null as File | null,
    })

    const [showSuccessMessage, setShowSuccessMessage] = useState(false)
    const [showErrorMessage, setShowErrorMessage] = useState(false)

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        if(e.target.files !== null && e.target.files.length > 0) {
            setData('fileUpload', e.target.files[0])
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
                        {/*<div className="p-6 text-gray-900">You're logged in!</div>*/}
                        <label id="file-input-label" htmlFor="file-input" className={'inline-flex items-center px-4 py-2 bg-blue-800 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-blue-700 focus:bg-blue-700 active:bg-blue-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition ease-in-out duration-150'}>
                            File Upload
                        </label>
                        <input type="file" onChange={handleFileUpload} id={'file-input'} className={'hidden'} required/>

                        <PrimaryButton
                            className={'p-6 text-gray-900'}
                            disabled={processing}
                        >
                            {processing ? 'Loading...' : 'Submit'}
                        </PrimaryButton>
                    </div>
                    {showErrorMessage && <div className={'bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative'} role={'alert'}>
                        <strong className={'font-bold'}>Error! </strong>
                        <span className={'block sm:inline'}>{`${errors[0]}`}. Please try again.</span>
                        <span className={'absolute top-0 bottom-0 right-0 px-4 py-3'}>
                            <svg className={'fill-current h-6 w-6 text-red-500'} role={'button'} xmlns={'http://www.w3.org/2000/svg'} viewBox={'0 0 20 20'} onClick={() => setShowErrorMessage(false)}>
                                <title>Close</title>
                                <path fillRule={'evenodd'} d={'M14.348 5.652a.5.5 0 010 .707L10.707 10l3.64 3.64a.5.5 0 11-.707.707L10 10.707l-3.64 3.64a.5.5 0 01-.707-.707L9.293 10 5.652 6.36a.5.5 0 01.707-.707L10 9.293l3.64-3.64a.5.5 0 01.708 0z'} clipRule={'evenodd'}/>
                            </svg>
                        </span>
                    </div>}
                    {showSuccessMessage && <div className={'bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative'} role={'alert'} >
                        <strong className={'font-bold'}>Success! </strong>
                        <span className={'block sm:inline'}>Your file was uploaded successfully.</span>
                        <span className={'absolute top-0 bottom-0 right-0 px-4 py-3'} >
                            <svg className={'fill-current h-6 w-6 text-green-500'} role={'button'} xmlns={'http://www.w3.org/2000/svg'} viewBox={'0 0 20 20'} onClick={() => setShowSuccessMessage(false)}>
                                <title>Close</title>
                                <path fillRule={'evenodd'} d={'M14.348 5.652a.5.5 0 010 .707L10.707 10l3.64 3.64a.5.5 0 11-.707.707L10 10.707l-3.64 3.64a.5.5 0 01-.707-.707L9.293 10 5.652 6.36a.5.5 0 01.707-.707L10 9.293l3.64-3.64a.5.5 0 01.708 0z'} clipRule={'evenodd'}/>
                            </svg>
                        </span>
                    </div>}
                    {data.fileUpload && <div className={'bg-white overflow-hidden shadow-sm sm:rounded-lg p-3 my-3'}>
                        <div className={'p-6 text-gray-900'}>{data.fileUpload.name}</div>
                    </div>}
                </form>
            </div>
        </AuthenticatedLayout>
    );
}
