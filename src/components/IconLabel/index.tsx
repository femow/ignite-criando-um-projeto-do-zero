import styles from './iconLabel.module.scss'

interface IconLabelProps {
    src: string;
    alt: string;
    content: string;
}

export const IconLabel = ({ src, alt, content } : IconLabelProps) => {
    return (
        <div className={styles.container}>
            <img src={src} alt={alt} />
            {content}
        </div>
    )
}