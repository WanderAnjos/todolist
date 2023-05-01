import React, { ChangeEvent, ChangeEventHandler, FormEvent, useState } from 'react';
import styles from './CheckItem.module.css';
import { Trash } from '@phosphor-icons/react';


export interface CheckItemType{
  id: string,
  content: string,
  isCompleted: boolean
}

interface CheckItemProps{
  id: string,
  content: string,
  isCompleted: boolean,
  onCheckItem: (checked:boolean, id: string) => void,
  onDeleteItem: (id: string) => void
}

export function CheckItem({id, content, isCompleted, onCheckItem, onDeleteItem}:CheckItemProps){

  const [completedItem, setCompletedItem] = useState(isCompleted);

  function handleCheckItem(event: ChangeEvent<HTMLInputElement>){
    setCompletedItem(event.target.checked);
    onCheckItem(!completedItem, id);
  }

  function handleDeleteItem(){
    onDeleteItem(id);
  }

  return (
    <div className={ (completedItem === false ? styles.checkWrapper : `${styles.checkWrapper} ${styles.checkedItem}`) }>
      <input className={styles.buttonCheckItem} type="checkbox" checked={completedItem} onChange={handleCheckItem} />
      <p className={styles.contentCheckItem}>{content}</p>
      <button className={styles.buttonDelete} onClick={handleDeleteItem}><Trash size={16}/></button>
    </div>
  )
}