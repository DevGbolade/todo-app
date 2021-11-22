import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {
  option: string
  @Output() filterEmitter = new EventEmitter();
  constructor() {
    this.option = 'default'

  }

  ngOnInit(): void {
  }

  onFilter(event: any): void {
    this.filterEmitter.emit(event);
  }

}
