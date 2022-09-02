import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ITask } from '../model/task';
@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {

  todoForm !: FormGroup;
  tasks : ITask[] = [];
  inprogress : ITask[] = [];
  done : ITask[] = [];
  updatedId !: any;
  editEnable : boolean = false;
  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.todoForm = this.fb.group({
      task: ['', Validators.required]
    })
  }
  addTask(){
    this.tasks.push({
      description:this.todoForm.value.task,
      done:false
    })
    localStorage.setItem('tasks',JSON.stringify(this.tasks))
    this.todoForm.reset();
  }
  deleteTask(i:number){
    this.tasks.splice(i,1)
  }
  deleteProgress(i:number){
    this.inprogress.splice(i,1)
  }
  deleteDone(i:number){
    this.done.splice(i,1)
  }
  updateTask(task:ITask, i:number){
    this.todoForm.controls['task'].setValue(task.description);
    this.updatedId = i;
    this.editEnable = true;
  }
  editTask(){
    this.tasks[this.updatedId].description = this.todoForm.value.task;
    this.tasks[this.updatedId].done = false;
    this.todoForm.reset();
    this.editEnable = false;
    
  }
  drop(event: CdkDragDrop<ITask[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }
}
