import React from 'react'
import styles from '../styles/Help.module.css'
const Help = () => {
  return (
    
    <>
      <iframe 
        className={styles.iframeContainer}
        width={400}
        height={390}
        
        src="/docs/guide.pdf"/>
      <p></p>
    </>
  )
}

export default Help