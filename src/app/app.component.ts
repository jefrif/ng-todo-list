import {Component, inject, OnInit, signal, WritableSignal} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {RouterOutlet} from '@angular/router';
import {InputTextModule} from 'primeng/inputtext';
import {ButtonModule} from 'primeng/button';
import {MessageModule} from 'primeng/message';
import {CommonModule} from '@angular/common';
import {DataView} from 'primeng/dataview';
import {PanelModule} from "primeng/panel";
import {MenuModule} from "primeng/menu";
import {AvatarModule} from "primeng/avatar";
import {Dialog} from "primeng/dialog";
import {Checkbox, CheckboxModule} from 'primeng/checkbox';
import {ProgressSpinnerModule} from 'primeng/progressspinner';
import {TaskService} from "./service/task.service";
import {Task} from "./domain/task";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule, RouterOutlet, InputTextModule, ButtonModule, MessageModule, FormsModule,
    PanelModule, MenuModule, AvatarModule, DataView, Dialog, ProgressSpinnerModule,
    Checkbox
  ],
  providers: [TaskService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'todo-list';
  text = '';

  msg = '';
  items: { label?: string; icon?: string; separator?: boolean }[] = [];
  tasks = signal<any>([]);
  taskService = inject(TaskService);
  visible: boolean | WritableSignal<boolean> = false;

  ngOnInit() {
    this.items = [
      {
        label: 'Refresh',
        icon: 'pi pi-refresh'
      },
      {
        label: 'Search',
        icon: 'pi pi-search'
      },
      {
        separator: true
      },
      {
        label: 'Delete',
        icon: 'pi pi-times'
      }
    ];

    this.taskService.fetchData().then((data) => {
      // const d = data;
      // @ts-ignore
      this.tasks.set([...data])
    }).catch((error) => {
      // This block runs if the Promise is rejected (failed)
      console.error("Error:", error);
    }).finally(() => {
      // This block always runs, regardless of success or failure
      console.log("Operation complete.");
    });
  }

  onClick() {
    this.msg = 'Welcome ' + this.text;
    this.showDialog();
  }

  onClickRemoveTask(id: number) {
    const tasks: Task[] = this.tasks();
    const newTasks = tasks.filter(task => task.id !== id);
    this.tasks.set([...newTasks]);
  }

  showDialog() {
    this.visible = true;
  }

  closeDialog(todo: string | undefined = undefined) {
    this.visible = false;
    if (todo && todo.trim().length > 0) {
      const tasks: Task[] = this.tasks();
      let maxId = 0;
      tasks.forEach(task => {
        if (task.id > maxId) {
          maxId = task.id;
        }
      })
      tasks.push(new Task(todo, false, maxId + 1));
      this.tasks.set([...tasks]);
    }
  }
}
