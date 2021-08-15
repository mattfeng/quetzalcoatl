import styles from '../styles/Caption.module.scss'

function Caption({ children }) {
  return <caption className={styles.captionContainer}>{children}</caption>
}

export default Caption
