import Link from 'next/link'

import styles from './page.module.css'
import { Inter } from 'next/font/google'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'

const inter = Inter({ subsets: ['latin']})

export default function UserDetails(){

    return (
        <div className={`${inter.className} ${styles['info-container']}`}>
            <div className={styles.infoBox}>
                <div className={styles.item}>
                    Name
                    <Link href="/settings/name">
                        <ArrowForwardIosIcon sx={{ color: '#a70000', scale: '0.75' }}/>
                    </Link>
                </div>
                <div className={styles.item}>
                    Student Number
                    <Link href="/settings/student-number">
                        <ArrowForwardIosIcon sx={{ color: '#a70000', scale: '0.75' }}/>
                    </Link>
                </div>
                <div className={styles.item}>
                    Year Level
                    <Link href="/settings/year-level">
                        <ArrowForwardIosIcon sx={{ color: '#a70000', scale: '0.75' }}/>
                    </Link>
                </div>
                <div className={styles.item}>
                    Degree Program
                    <Link href="/settings/degree-program">
                        <ArrowForwardIosIcon sx={{ color: '#a70000', scale: '0.75' }}/>
                    </Link>
                </div>
                <div className={styles['item-bottom']}>
                    College
                    <Link href="/settings/college">
                        <ArrowForwardIosIcon sx={{ color: '#a70000', scale: '0.75' }}/>
                    </Link>
                </div>
            </div>
            <div className={styles.infoBox}>
                <div className={styles.item}>
                    About
                    <Link href="/settings/about">
                        <ArrowForwardIosIcon sx={{ color: '#a70000', scale: '0.75' }}/>
                    </Link>
                </div>
                {/* <div className={styles.item}>
                    Account
                    <Link href="/settings/account-setting">
                        <ArrowForwardIosIcon sx={{ color: '#a70000', scale: '0.75' }}/>
                    </Link>
                </div> */}
                <div className={styles.item}>
                    Notifications
                    <Link href="/settings/notifications">
                        <ArrowForwardIosIcon sx={{ color: '#a70000', scale: '0.75' }}/>
                    </Link>
                </div>
                <div className={styles['item-bottom']}>
                    Privacy and Safety
                    <Link href="/settings/privacy-safety">
                        <ArrowForwardIosIcon sx={{ color: '#a70000', scale: '0.75' }}/>
                    </Link>
                </div>
            </div>
        </div>
    )
}