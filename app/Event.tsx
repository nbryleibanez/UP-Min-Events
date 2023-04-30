import Link from 'next/link'
import styles from './page.module.css'

import { Box } from '@mui/material'

interface Props {
    id: string,
    name: string,
    date: string,
    time: string
}

export default function Event({ id, name, date, time } : Props){
    return (
        <Link className={styles.event} href={`/event/${id}`}>
            <Box
                sx={{
                    width: '100%',
                    height: 'auto',   
                    boxShadow: '0 0 10px 0 rgba(0,0,0,0.2)',
                    borderRadius: '0.5em',
                    my: '0.25em',
                    padding: '1em'
                }}
            >
                <h2>{name}</h2>
                <p>{date}</p>
                <p>{time}</p>
            </Box>
        </Link>
    )
}