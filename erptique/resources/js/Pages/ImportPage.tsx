import {PageProps} from "@/types";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import {Head, useForm} from "@inertiajs/react";
import {useState} from "react";
import PrimaryButton from "@/Components/PrimaryButton";


export default function ImportPage ({ auth }: PageProps) {

    const { data, setData, post, errors, processing, reset } = useForm({
        fileUpload: null as File | null,
    })

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        if(e.target.files !== null && e.target.files.length > 0) {
            setData('fileUpload', e.target.files[0])
        }
    }

    const submit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        // @ts-ignore
        post('/api/import-ofx')
    }


    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Import File</h2>}
        >
            <Head title="Import File" />

            <div className="py-12">
                <form className="max-w-7xl mx-auto sm:px-6 lg:px-8"
                    onSubmit={submit}
                      encType={'multipart/form-data'}
                >
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-3">
                        {/*<div className="p-6 text-gray-900">You're logged in!</div>*/}
                        <input type="file" onChange={handleFileUpload} />
                    </div>
                    <div className={'bg-white overflow-hidden shadow-sm sm:rounded-lg'}>
                        { errors.fileUpload && <div className={'p-6 text-red-500'}>{errors.fileUpload}</div> }
                        { data.fileUpload && <div className={'p-6 text-gray-900'}>{data.fileUpload.name}</div> }
                    </div>
                    {/*submit*/}
                    <div className={'bg-white overflow-hidden shadow-sm sm:rounded-lg'}>
                        <PrimaryButton
                            className={'p-6 text-gray-900'}
                            onClick={() => {console.log(data.fileUpload)}}
                            disabled={processing}
                        >
                            {processing ? 'Loading...' : 'Submit'}
                        </PrimaryButton>

                    </div>
                </form>
            </div>
        </AuthenticatedLayout>
    );
}
