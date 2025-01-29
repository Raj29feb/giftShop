import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-pagination',
  imports: [CommonModule],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.css',
})
export class PaginationComponent implements OnChanges {
  @Input() productArr = [];
  pageIterator: number = 1;
  totalNumberOfPages = 0;
  pages: Array<number | string> = [];
  ngOnChanges(changes: SimpleChanges) {
    if (changes['productArr']) {
      console.log('Product array has changed:', this.productArr.length);
      //calculate the number of pages
    }
  }
  handlePagination(currentPage: number | string) {
    if (currentPage !== '...') {
      this.pageIterator = currentPage as number;
    }
  }
  pageIncrement() {
    console.log(this.pageIterator);
    this.pageIterator = this.pageIterator + 1;
  }
  pageDecrement() {
    console.log(this.pageIterator);
    this.pageIterator = this.pageIterator - 1;
  }
}
