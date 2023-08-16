import PrimaryButton from '@/Components/PrimaryButton'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { Application, BankAccount, PageProps } from '@/types'
import { Head, useForm } from '@inertiajs/react'
import React, { useState } from 'react'
import { ApplicationsTable } from './ApplicationsTable'
import { Message } from '@/Components/Message'

interface ApplicationsPageProps extends PageProps {
    applications: Application[]
    bankAccounts: BankAccount[]
    success?: string
}

export default function ApplicationsPage(props: ApplicationsPageProps) {
    const { data, setData, post, errors, processing, reset }: any = useForm<{
        account_id: string;
        amount: number | '';
        date: string;
    }>({
        account_id: '',
        amount: '',
        date: '',
    });

    const [showErrorMessage, setShowErrorMessage] = useState(false)
    const [showSuccessMessage, setShowSuccessMessage] = useState(false)

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        post('/applications', {
            onSuccess: () => {
                reset();
                setShowSuccessMessage(true);
                setShowErrorMessage(false); 
            },
            onError: () => {
                setShowErrorMessage(true);
                setShowSuccessMessage(false);
            },
        })
    }

    return (
        <AuthenticatedLayout
            user={props.auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Applications</h2>
            }
        >
            <Head title="Applications" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <h2 className="font-semibold text-xl text-gray-800 leading-tight">New Application</h2>
                            <hr className="my-4" />
                            <form

                                onSubmit={handleSubmit}
                            >
                                <div className="mt-4">
                                    <label htmlFor="account_id" className="block font-medium text-sm text-gray-700">Account</label>
                                    <select
                                        id="account_id"
                                        className="form-input rounded-md shadow-sm mt-1 block w-full"
                                        value={data.account_id}
                                        onChange={e => setData('account_id', e.target.value)}
                                        required
                                        autoFocus
                                    >
                                        <option value="">Select Account</option>
                                        {props.bankAccounts.map((account: BankAccount) => (
                                            <option key={account.account_id} value={account.account_id}>{account.name ? account.name : account.account_id}</option>
                                        ))}
                                    </select>
                                    {errors.account_id && <p className="mt-2 text-sm text-red-600" id="email-error">{errors.account_id}</p>}
                                </div>

                                <div className="mt-4">
                                    <label htmlFor="amount" className="block font-medium text-sm text-gray-700">Amount</label>
                                    <input
                                        id="amount"
                                        type="number"
                                        className="form-input rounded-md shadow-sm mt-1 block w-full"
                                        value={data.amount}
                                        onChange={e => setData('amount', e.target.value)}
                                        required
                                    />
                                    {errors.amount && <p className="mt-2 text-sm text-red-600" id="email-error">{errors.amount}</p>}
                                </div>

                                <div className="mt-4">
                                    <label htmlFor="date" className="block font-medium text-sm text-gray-700">Date</label>
                                    <input
                                        id="date"
                                        type="date"
                                        className="form-input rounded-md shadow-sm mt-1 block w-full"
                                        value={data.date}
                                        onChange={e => setData('date', e.target.value)}
                                        required
                        
                                    />
                                    {errors.date && <p className="mt-2 text-sm text-red-600" id="email-error">{errors.date}</p>}
                                </div>

                                <div className="flex items-center justify-end mt-4">
                                    <PrimaryButton
                                        type="submit"
                                        className="ml-4 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                        disabled={processing}
                                    >
                                        {processing ? 'Processing' : 'Submit'}
                                    </PrimaryButton>
                                </div>
                            </form>
                            <div className='mt-4'>  
                                {showErrorMessage && <Message type={'Error'} txt={errors[0]} onClose={() => setShowErrorMessage(false)} />}
                                {showSuccessMessage && <Message type={'Success'} txt='Application created' onClose={() => setShowSuccessMessage(false)} />}
                            </div>
                        </div>

                        <div className="p-6 text-gray-900">
                            <h2 className="font-semibold text-xl text-gray-800 leading-tight">Lastest Applications</h2>
                            <hr className="my-4" />

                            <ApplicationsTable applications={props.applications} bankAccounts={props.bankAccounts} />

                        </div>

                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    )
}
