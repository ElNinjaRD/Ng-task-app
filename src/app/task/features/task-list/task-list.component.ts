import { Component, inject } from '@angular/core';
import { TableComponent } from '../../UI/table/table.component';
import { RouterLink } from '@angular/router';
import { TaskService } from '../../data-access/task.service';

@Component({
  selector: 'app-task-list',
  imports: [TableComponent, RouterLink],
  templateUrl: './task-list.component.html'
})
export default class TaskListComponent {
  TaskService = inject(TaskService);
}
