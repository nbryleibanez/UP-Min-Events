'use client'

import styles from './page.module.css'
import { Inter } from 'next/font/google'
import { useUserTypeContext } from '../UserTypeProvider'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

import { auth, db } from '../../firebaseConfig'
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { useAuthState } from 'react-firebase-hooks/auth'
import { collection, getDocs, doc, setDoc } from 'firebase/firestore'
import { CollectionReference } from 'firebase/firestore'

import upLogo from '../../public/uplogo.png'

const inter = Inter({ subsets: ['latin']})

export default function LoginOps(){
    
    const [user] = useAuthState(auth)
    const router = useRouter()
    const { userType, updateUserType } = useUserTypeContext()

    const getAttendees = async (attendeesdb : CollectionReference) => {
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
        const organizers = await getDocs(organizersdb)
        if (!organizers || organizers.docs.length === 0 || !organizers.docs) {
            const docRef = doc(db, 'organizers', `${user?.uid}`)
            await setDoc(docRef, { events: [] })
            //router.push('/user-onboarding')
        }

        router.push('/')
    }

    const SignIn = () => {
        const provider = new GoogleAuthProvider();
        provider.setCustomParameters({ hd: "up.edu.ph" });
        
        signInWithPopup(auth, provider)
    }

    useEffect(() => {

        if(user) {
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
        <div className={styles.container}>

            <div className={`${styles.loginHeader} ${inter.className}`}>
                <Image className={styles.logo} src={upLogo} alt="UPMin Logo" width={175} height={142.5} />
                    <h1>Events</h1>
                    <p>Know what&apos;s happening.</p>
            </div>

            <div className={`${inter.className} ${styles.loginBody}`}>
                <p> Log in as: </p>
                <button className={`${inter.className} ${styles.buttonM}`} onClick={() => {
                    updateUserType('attendee')
                    SignIn()
                }}> 
                    Attendee
                </button>
                <button className={`${inter.className} ${styles.buttonM}`} onClick={() => {
                    updateUserType('organizer')
                    SignIn()
                }}> 
                    Organizer
                </button>
            </div>

        </div>
    )
}