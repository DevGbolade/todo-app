import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ITask } from 'src/app/interfaces/Task';
import { TasksService } from 'src/app/services/tasks.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {
  @Input('tasks') tasks: any;
  @Output() onDeleteTask: EventEmitter<ITask> = new EventEmitter();
  @Output() onEditTask = new EventEmitter();
  constructor(private tasksService: TasksService) {
    this.isChecked = false
  }
  isChecked: boolean;
  ngOnInit(): void {
  }

  onDelete(task: ITask): void {
    this.tasksService.deleteTask(task).subscribe(
      () => {
        const filteredTasks = this.tasks.filter((el: any) => {
          return el.id !== task.id;
        });
        this.tasksService.loadTasks(filteredTasks)
      }
    )
  }

  onEdit(task: ITask) {
    this.onEditTask.emit(task);
  }
  onComplete(completed: any, id: any) {
    const task = {
      completed,
      id,
      isActive: false
    }
    this.tasksService.updateTask(task)

  }
}
