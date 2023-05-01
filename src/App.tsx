import logoDark from './assets/logotipo-dark.svg';
import styles from './App.module.css';
import './global.css';
import { CheckItem, CheckItemType } from './components/CheckItem';
import { Plus } from '@phosphor-icons/react';

import { format } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';
import React, { ChangeEvent, FormEvent, useState } from 'react';
import {v4 as uuidv4} from 'uuid';

export function App(){

  const [items, setItems] = useState<CheckItemType[]>([]);

  const dateNow = new Date();

  const dateFormated = {
    "dayToFormat": format(dateNow, "dd", {locale: ptBR}),
    "monthToFormat": format(dateNow, "MMM", {locale: ptBR}),
    "yearToFormat": format(dateNow, "yyyy", {locale: ptBR})
  };

  function checkItem(checked:boolean, id: string){
    const listAfterUpdatedCheck = items.map(e=>{
      if(e.id == id) e.isCompleted = checked;
      return e;
    });
    setItems(listAfterUpdatedCheck);
  }

  const totalCheckedItems = items.filter((e) => {
    if(e.isCompleted) return true;
    return false;
  }).length;

  const totalItems = items.length;

  const [newTask, setNewTask] = useState("");

  function handleNewTaskChange(event:ChangeEvent<HTMLInputElement>){
    setNewTask(event.target.value);
  }

  function handleCreateNewTask(event:FormEvent){

    event.preventDefault();

    const newItem = {
      id: uuidv4(),
      content: newTask,
      isCompleted: false
    }

    setItems([...items, newItem]);
    setNewTask('');
  }

  function deleteTask(id: string){
    const itemsWithoutDeletedOne = items.filter(e =>{
      return e.id !== id
    });
    setItems(itemsWithoutDeletedOne);
  }

  return (
    <div className={styles.wrapper}>
      <header>
        <div className={styles.header}><img src={logoDark} alt="Logotipo ToDoList" /></div>
      </header>
      <section>
        <div className={styles.actions}>
          <div className={styles.dateInfo}>
            <div className={styles.dateInfoDay}>{dateFormated.dayToFormat}</div>
            <div className={styles.dateInfoMonthAndYear}>
              <p className={styles.dateInfoMonth}>{dateFormated.monthToFormat}</p>
              <p className={styles.dateInfoYear}>{dateFormated.yearToFormat}</p>
            </div>
          </div>
          <div className={styles.formSend}>
            <form onSubmit={handleCreateNewTask}>
              <div className={styles.formGroup}>
                <input type="text" value={newTask} placeholder='Adicione uma nova tarefa' onChange={handleNewTaskChange}/>
              </div>
              <button className={styles.buttonSend} type='submit'>Adicionar novo item <Plus size={16}/></button>
            </form>
          </div>
          <div className={styles.tasksInfo}>
            <p>Minhas Tarefas</p>
            <span>{totalCheckedItems} de {totalItems} Concluídas!</span>
          </div>
        </div>
      </section>
      <main>

        {
          (items.length <= 0 ? 
            <div className={styles.nothingContent}>
              <p>
                <span>Você ainda não tem tarefas cadastradas</span> <br /> Crie Tarefas e organize seus itens a fazer!</p>
            </div>
         :  
          <div className={styles.contentList}>
            {
              items.map(e=>{
                return <CheckItem key={e.id} id={e.id} content={e.content} isCompleted={e.isCompleted} onCheckItem={checkItem} onDeleteItem={deleteTask}></CheckItem>
              })
            }
          </div>
         )
        }
      </main>
    </div>
  );
}