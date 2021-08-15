import styles from '../styles/Image.module.scss'

function Image({ path, width, height }) {
  const style = {
    width,
    height,
  }

  return (
    <div className={styles.imageContainer}>
      <img style={style} src={path} />
    </div>
  )
}

export default Image
