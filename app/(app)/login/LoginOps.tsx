'use client'

import styles from './page.module.css'
import { Inter } from 'next/font/google'
import { useUserTypeContext } from '../providers/UserTypeProvider'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

import upLogo from '@/public/uplogo.png'
import Image from 'next/image'
import { Skeleton } from '@mui/material'

import { auth, db } from '../../../firebaseConfig'
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { useAuthState } from 'react-firebase-hooks/auth'
import { collection, getDocs, doc, setDoc } from 'firebase/firestore'
import { CollectionReference } from 'firebase/firestore'

const inter = Inter({ subsets: ['latin']})

export default function LoginOps(){
    
    const [user] = useAuthState(auth)
    const router = useRouter()
    const { userType, updateUserType } = useUserTypeContext()
    const [isLoading, setIsLoading] = useState(false)

    const getAttendees = async (attendeesdb : CollectionReference) => {
        setIsLoading(true) // Show skeleton while loading
        const attendees = await getDocs(attendeesdb)
        const userExists = attendees.docs.some(doc => doc.id === user?.uid)
        if (!attendees.docs || attendees.docs.length === 0 || !userExists) {
            const docRef = doc(db, 'attendees', `${user?.uid}`)
            await setDoc(docRef, { events: [] })
            router.push('/user-onboarding')
        } else {
            router.push('/')
        } 
    }
    
    const getOrganizers = async (organizersdb : CollectionReference) => {
        setIsLoading(true) // Show skeleton while loading
        const organizers = await getDocs(organizersdb)
        const userExists = organizers.docs.some(doc => doc.id === user?.uid)
        if (!organizers.docs || organizers.docs.length === 0 || !userExists) {
            const docRef = doc(db, 'organizers', `${user?.uid}`)
            await setDoc(docRef, { events: [] })
            router.push('/user-onboarding')
        } else {
            router.push('/')
        }
    }

    const SignIn = () => {
        const provider = new GoogleAuthProvider();
        provider.setCustomParameters({ hd: "up.edu.ph" });
        
        signInWithPopup(auth, provider)
    }

    useEffect(() => {
        if(user) {
            setIsLoading(true) // Show skeleton while loading
            if (userType === 'attendee') {

                const attendeesdb = collection(db, 'attendees')
                getAttendees(attendeesdb)
                
            } else if (userType === 'organizer') {

                const organizersdb = collection(db, 'organizers')
                getOrganizers(organizersdb)

            } else {
                router.push('/') 
            }
        }
    }, [user])
    
    return (
        <div>

            <div className={`${styles['login-header']} ${inter.className}`}>
                { isLoading ?
                    <>
                        <Skeleton animation='wave' width={175} height={142} />
                        <Skeleton animation='wave' width={70} />
                        <Skeleton animation='wave' width={110} />
                    </> 
                 : 
                    <>
                        <Image className={styles.logo} src={upLogo} alt="UPMin Logo" width={175} height={142} priority/>
                        <h1>Events</h1>
                        <p>Know what&apos;s happening.</p>
                    </>
                }
            </div>

            <div className={`${styles['login-body']} ${inter.className}`}>
                <p>Log in as:</p>
                <button className={`${inter.className} ${styles['login-button']}`} onClick={() => {
                    updateUserType('attendee')
                    SignIn()
                }}> 
                    Attendee
                </button>
                <button className={`${inter.className} ${styles['login-button']}`} onClick={() => {
                    updateUserType('organizer')
                    SignIn()
                }}> 
                    Organizer
                </button>
            </div>
        </div>           
    )
}