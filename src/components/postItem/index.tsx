import { Post } from "../../pages";
import { IconLabel } from "../IconLabel";
import Link from 'next/link'

import styles from './postItem.module.scss';

interface PostItemProps {
    post: Post
}

export const PostItem = ({ post }: PostItemProps) => {
    const { uid, first_publication_date, data } = post;

    return (
        <Link href={`/post/${uid}`}>
            <article className={styles.container}>
                <p className={styles.title}>{data.title}</p>
                <p className={styles.subtitle}>{data.subtitle}</p>
                <div className={styles.dateinfo}>
                    <IconLabel src="/static/images/calendar.png" alt="calendar" content={first_publication_date} />
                    <IconLabel src="/static/images/user.png" alt="user" content={data.author} />
                </div>
            </article>
        </Link>
    )
}