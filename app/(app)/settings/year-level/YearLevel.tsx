'use client'

import styles from '../page.module.css'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'

import Link from 'next/link'
import { useState, useEffect } from 'react'

import { auth, db } from '@/firebaseConfig'
import { doc, getDoc, updateDoc } from 'firebase/firestore'
import { useAuthState } from 'react-firebase-hooks/auth'

export default function YearLevel(){

    const [user] = useAuthState(auth)
    const id = user?.uid

    const [toggle, setToggle] = useState(false)
    const [input, setInput] = useState<string>('')

    const getDetail = async () => {
        const docRef = doc(db, 'attendees', `${id}`)
        const docSnap = await getDoc(docRef)

        if (docSnap.exists()) {
            setInput(docSnap.data()?.yearLevel)
        }
    }

    const updateDetail = async () => {
        const docRef = doc(db, 'attendees', `${id}`)
        await updateDoc(docRef, {
            yearLevel: input
        })
    }

    useEffect(() => {
        getDetail()
    }, [])

    return (
        <div>
            <div className={styles.nav}>
                    <Link href="/settings"> 
                        <ArrowBackIcon sx={{ scale: '125%', color: '#a70000', p: '0' }} /> 
                    </Link> 
                    <button className={styles['save-setting']} onClick={() => { updateDetail() }}> Save </button>
            </div>

            <div className={styles['form-body']}>
                <div className={styles['form-item']}>
                    <p className={styles['input-label']}> Student Number </p>
                        { toggle ?
                            <div>
                                <select className={styles['input-element']} value={input} onChange={e => setInput(e.target.value)} placeholder={input}>
                                    <option value='1'>1st Year</option>
                                    <option value='2'>2nd Year</option>
                                    <option value='3'>3rd Year</option>
                                    <option value='4'>4th Year</option>
                                </select>
                            </div>
                            :
                            <p className={styles['input-element']} onClick={() => setToggle(true)}>
                                {
                                    input === '1' ? '1st Year' :
                                    input === '2' ? '2nd Year' :
                                    input === '3' ? '3rd Year' :
                                    input === '4' ? '4th Year' : 'No Data on Year Level'
                                }
                            </p>
                        }
                </div>
            </div>

        </div>
    )
}