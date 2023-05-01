import styles from './CheckItem.module.css';
import { Trash } from '@phosphor-icons/react';

interface CheckItemProps{
  content: string,
  checked: boolean
}

export function CheckItem({content, checked}:CheckItemProps){
  return (
    <div className={ (checked === false ? styles.checkWrapper : `${styles.checkWrapper} ${styles.checkedItem}`) }>
      <input className={styles.buttonCheckItem} type="checkbox" checked={checked}/>
      <p className={styles.contentCheckItem}>{content}</p>
      <button className={styles.buttonDelete}><Trash size={16}/></button>
    </div>
  )
}