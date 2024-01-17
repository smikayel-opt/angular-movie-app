import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.css'
})
export class SearchBarComponent {
  searchKeyword: string = ''
  @Output() onSearch = new EventEmitter<string>();

  search() {
    this.onSearch.emit(this.searchKeyword)
  }
}
