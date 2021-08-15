import styles from '../styles/Figure.module.scss'

function Figure({ children }) {
  return <figure className={styles.figureContainer}>{children}</figure>
}

export default Figure
