import PrimaryButton from '@/Components/PrimaryButton'
import { TrashIcon } from '@/svg/TrashIcon'
import { Application, BankAccount } from '@/types'
import React from 'react'

interface ApplicationsTableProps {
    applications: Application[]
    bankAccounts: BankAccount[]
}

export const ApplicationsTable: React.FC<ApplicationsTableProps> = (props) => {
    return (
        <>
            <div className="flex flex-col">
                <div className="overflow-x-auto">
                    <div className="p-1.5 w-full inline-block align-middle">
                        <div className="overflow-hidden rounded-lg"></div>
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className='bg-gray-50'>
                                <tr>
                                    <th scope='col' className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase">ID</th>
                                    <th scope='col' className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase">Account</th>
                                    <th scope='col' className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase">Amount</th>
                                    <th scope='col' className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase">Date</th>
                                    <th scope='col' className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase">Created at</th>
                                    <th scope='col' className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase">Actions</th>
                                </tr>
                            </thead>
                            <tbody>

                                {props.applications.map((application) => (
                                    <tr key={application.id}>
                                        <td className="border px-4 py-2">{application.id}</td>
                                        {/* show account name if name is not null */}
                                        <td className="border px-4 py-2">{props.bankAccounts.find((account) => account.account_id === application.account_id)?.name || application.account_id}</td>
                                        <td className="border px-4 py-2">{application.amount}</td>
                                        <td className="border px-4 py-2">{new Date(application.date).toLocaleDateString()}</td>
                                        <td className="border px-4 py-2">{new Date(application.created_at).toLocaleString()}</td>
                                        <td className="border px-4 py-2 flex justify-center al">
                                            <PrimaryButton
                                                onClick={() => {
                                                    console.log('clicked')
                                                }}
                                            >
                                                <TrashIcon width={'15'} height={'15'} color={'#fff'} />
                                            </PrimaryButton>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    )
}
