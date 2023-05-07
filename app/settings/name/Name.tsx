'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'

import { auth, db } from '../../../firebaseConfig'
import { doc, getDoc, updateDoc } from 'firebase/firestore'
import { useAuthState } from 'react-firebase-hooks/auth'

interface Name {
    firstName : string,
    lastName : string
}

export default function Name() {

    const [user] = useAuthState(auth)
    const id = user?.uid

    const [toggleFirst, setToggleFirst] = useState(false)
    const [toggleLast, setToggleLast] = useState(false)
    const [input, setInput] = useState<Name>({ firstName: '', lastName: '' })

    const getDetail = async () => {
        const docSnap = await getDoc(doc(db, 'attendees', `${id}`))

        if (docSnap.exists()) {
            setInput(docSnap.data() as Name)
        }

    }

    const updateDetail = async () => {
        const docRef = doc(db, 'attendees', `${id}`)
        await updateDoc(docRef, {
            firstName: input.firstName,
            lastName: input.lastName
        })
    }

    useEffect(() => {
        getDetail()
    }, [])

    return (
        <div>
            <div>
                <Link href='/settings'>Back</Link>
                <h1>Name</h1>
            </div>
            <div>
                { toggleFirst ?
                    <div>
                        <input value={input.firstName} onChange={e => setInput({ ...input, firstName: e.target.value })} placeholder={input.firstName} />
                        <button onClick={() => {
                            updateDetail()
                            setToggleFirst(false)
                        }}>Save</button>
                    </div>
                    :
                    <p onClick={() => setToggleFirst(true)}>{input.firstName}</p>
                }
                { toggleLast ?
                    <div>
                        <input value={input.lastName} onChange={e => setInput({ ...input, lastName: e.target.value })} placeholder={input.lastName} />
                        <button onClick={() => {
                            updateDetail()
                            setToggleLast(false)
                        }}>Save</button>
                    </div>
                    :
                    <p onClick={() => setToggleLast(true)}>{input.lastName}</p>
                }
            </div>
        </div>
    )
}