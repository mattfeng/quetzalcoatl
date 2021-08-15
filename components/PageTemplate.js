import styles from '../styles/PageTemplate.module.scss'

function PageTemplate({ children }) {
  return (
    <div className={styles.container}>
      <div className={styles.content}>{children}</div>
    </div>
  )
}

export default PageTemplate
