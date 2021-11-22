import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ITask } from 'src/app/interfaces/Task';
import { TasksService } from 'src/app/services/tasks.service';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./add-task.component.scss']
})
export class AddTaskComponent implements OnInit {

  @Input()
  editInput!: ITask;
  @Input() isEdit: boolean = false;
  addForm: FormGroup;

  constructor(private taskService: TasksService,
    private fb: FormBuilder) {
    this.addForm = this.fb.group({
      name: new FormControl('', [Validators.required, Validators.maxLength(100)])
    });
  }

  ngOnInit(): void {
  }

  ngOnChanges(): void {
    if (this.isEdit) {
      this.addForm.get('name')?.patchValue(this.editInput?.name);
    } else {
      this.addForm.get('name')?.patchValue('');
    }
  }

  addTask(): void {
    this.taskService.addTask(this.addForm.value).subscribe(
      () => {
        this.addForm.reset();
      }
    )

  }


  update() {
    const { id, completed } = this.editInput;
    const edited = {
      id,
      completed,
      ...this.addForm.value
    }
    this.taskService.updateTask(edited).subscribe(
      () => {
        this.addForm.reset();
      }
    )
    this.isEdit = !this.isEdit
  }

}
