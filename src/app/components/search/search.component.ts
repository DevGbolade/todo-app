import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  search = "";
  @Output() searchEmitter = new EventEmitter();
  constructor() { }

  ngOnInit(): void {
  }

  onSearch(): void {
    this.searchEmitter.emit(this.search);
  }



}
