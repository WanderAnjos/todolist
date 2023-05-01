import logoDark from './assets/logotipo-dark.svg';
import logoLight from './assets/logotipo-dark.svg';
import styles from './App.module.css';
import './global.css';
import { CheckItem } from './components/CheckItem';
import { Plus } from '@phosphor-icons/react';

export function App(){

  const mockupCheckItem = [
    {
      id: "A",
      text: "Integer urna interdum massa libero auctor neque turpis turpis semper. Duis vel sed fames integer.",
      isCompleted: false
    },
    {
      id: "B",
      text: "Integer urna interdum massa libero auctor neque turpis turpis semper. Duis vel sed fames integer. Integer urna interdum massa libero auctor neque",
      isCompleted: false
    },
    {
      id: "C",
      text: "Integer urna interdum massa libero  Duis vel sed fames integer.",
      isCompleted: true
    }
  ];

  return (
    <div className={styles.wrapper}>
      <header>
        <div className={styles.header}><img src={logoDark} alt="Logotipo ToDoList" /></div>
      </header>
      <section>
        <div className={styles.actions}>
          <div className={styles.dateInfo}>
            <div className={styles.dateInfoDay}>16</div>
            <div className={styles.dateInfoMonthAndYear}>
              <p className={styles.dateInfoMonth}>Fev</p>
              <p className={styles.dateInfoYear}>2023</p>
            </div>
          </div>
          <div className={styles.formSend}>
            <form>
              <div className={styles.formGroup}>
                <input type="text" placeholder='Adicione uma nova tarefa'/>
              </div>
              <button className={styles.buttonSend} type='submit'>Adicionar novo item <Plus size={16}/></button>
            </form>
          </div>
          <div className={styles.tasksInfo}>
            <p>Minhas Tarefas</p>
            <span>4 de 5 Concluídas</span>
          </div>
        </div>
      </section>
      <main>

        {
          (mockupCheckItem.length <= 0 ? 
            <div className={styles.nothingContent}>
              <p>
                <span>Você ainda não tem tarefas cadastradas</span> <br /> Crie Tarefas e organize seus itens a fazer!</p>
            </div>
         :  
          <div className={styles.contentList}>
            {
              mockupCheckItem.map(e=>{
                return <CheckItem key={e.id} content={e.text} checked={e.isCompleted}></CheckItem>
              })
            }
          </div>
         )
        }
      </main>
    </div>
  );
}