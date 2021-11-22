import { Component, OnInit, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { TasksService } from '../../services/tasks.service';
import { ITask } from '../../interfaces/Task';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./tasks.component.scss'],
})
export class TasksComponent implements OnInit {
  show: boolean = false;
  @Output() editEmitter = new EventEmitter()
  editInput!: ITask;
  isEdit: boolean = false;

  constructor(public tasksService: TasksService) { }

  ngOnInit(): void {
    this.tasksService.ReloadNeeded.subscribe(() => {
      this.getTask();
    });
    this.getTask();
  }


  getTask(): void {
    this.tasksService.getTasks().subscribe((tasks) => {
      this.tasksService.loadTasks(tasks)
    })
  }

  onSearch(event: string) {
    this.tasksService.getTasks(event).subscribe(
      data => {
        this.tasksService.loadTasks(data)
      }
    )
  }

  onFilter(event: string) {
    this.tasksService.filterTasks(event).subscribe(
      data => {
        this.tasksService.loadTasks(data)
      }
    )
  }

  onToggle() {
    this.show = !this.show
    this.isEdit = false
  }

  addTask(task: ITask) {
    this.tasksService.addTask(task)

  }

  onEdit(event: any) {
    this.editInput = event;
    this.isEdit = true
    this.show = true;

  }

}
