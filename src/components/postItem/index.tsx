import { Post } from "../../pages";

import styles from './postItem.module.scss';

interface PostItemProps {
    post: Post
}

export const PostItem = ({ post }: PostItemProps) => {
    const { uid, first_publication_date, data } = post;

    return (
        <article className={styles.container}>
            <p className={styles.title}>{data.title}</p>
            <p>
                Lorey ipsolom
            </p>
        </article>
    )
}