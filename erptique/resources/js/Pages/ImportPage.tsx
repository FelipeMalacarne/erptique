import {PageProps} from "@/types";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, router } from "@inertiajs/react";
import {useState} from "react";

export default function ImportPage ({ auth }: PageProps) {
    const [fileUpload, setFileUpload] = useState<File | null>(null);
    const [fileUploadError, setFileUploadError] = useState<string | null>(null);
    const [fileUploadLoading, setFileUploadLoading] = useState<boolean>(false);

    const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (files) {
            const file = files[0];
            // 'File must have the .ofx extension'
            if(!file.name.endsWith('.ofx')) {
                setFileUploadError('File must be of type .ofx');
                setFileUpload(null)
            } else {
                setFileUploadError(null);
                setFileUpload(file);
                console.log(file);
            }
        }
    }


    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Import File</h2>}
        >
            <Head title="Import File" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-3">
                        {/*<div className="p-6 text-gray-900">You're logged in!</div>*/}
                        <input type="file" onChange={(e) => handleFileUpload(e)} />
                    </div>
                    <div className={'bg-white overflow-hidden shadow-sm sm:rounded-lg'}>
                        { fileUploadError && <div className={'p-6 text-red-500'}>{fileUploadError}</div> }
                        { fileUpload && <div className={'p-6 text-gray-900'}>{fileUpload.name}</div> }
                    </div>
                    {/*submit*/}
                    <div className={'bg-white overflow-hidden shadow-sm sm:rounded-lg'}>
                        <button
                            className={'p-6 text-gray-900'}
                            onClick={() => {
                                setFileUploadLoading(true);
                                const formData = new FormData();
                                formData.append('file', fileUpload as File);
                                router.post('/import', formData, {
                                    headers: {
                                        'Content-Type': 'multipart/form-data'
                                    }
                                })

                            }
                            }
                        >


                            {fileUploadLoading ? 'Loading...' : 'Submit'}
                        </button>

                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
