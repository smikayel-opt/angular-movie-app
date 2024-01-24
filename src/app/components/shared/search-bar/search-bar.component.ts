import { Component, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.scss'
})
export class SearchBarComponent {
  searchKeyword: string = ''
  @Output() onSearch = new EventEmitter<string>();

  /**
   *  it will emit the search Keyword so in parrent we can make filter with the keyword 
   */
  search(): void {
    this.onSearch.emit(this.searchKeyword)
  }
}
