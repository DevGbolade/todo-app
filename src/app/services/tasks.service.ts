import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { ITask } from '../interfaces/Task';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};

@Injectable({
  providedIn: 'root',
})
export class TasksService {
  private apiUrl: string = environment.apiUrl;
  private subject = new BehaviorSubject<ITask[]>([]);
  private getReloadedNeeded = new Subject<void>();

  public tasks: Observable<ITask[]> = this.subject.asObservable();


  constructor(private http: HttpClient) {
  }

  get ReloadNeeded() {
    return this.getReloadedNeeded;
  }

  loadTasks(tasks: ITask[]) {
    this.subject.next(tasks);
  }

  getTasks(search?: string): Observable<ITask[]> {
    if (search) {
      return this.http.get<ITask[]>(`${this.apiUrl}?search=${search}`);

    }
    return this.http.get<ITask[]>(this.apiUrl);
  }

  filterTasks(type: string): Observable<ITask[]> {
    return this.http.get<ITask[]>(`${this.apiUrl}/filter?type=${type}`);
  }

  deleteTask(task: ITask): Observable<ITask> {
    const url = `${this.apiUrl}/${task.id}`;
    return this.http.delete<ITask>(url);
  }

  updateTask(task: ITask): Observable<ITask> {
    console.log('called!');

    const { completed, name, isActive } = task;
    const url = `${this.apiUrl}/${task.id}`;
    return this.http.put<ITask>(url, { name, completed, isActive }, httpOptions)
    // .pipe(
    //   tap(() => {
    //     this.getReloadedNeeded.next();
    //   })
    // );
  }

  addTask(task: ITask): Observable<ITask> {
    return this.http.post<ITask>(this.apiUrl, task, httpOptions).pipe(
      tap(() => {
        this.getReloadedNeeded.next();
      })
    );
  }
}
