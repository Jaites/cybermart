import { Component, OnInit } from '@angular/core';
import { Book } from 'src/app/common/book';
import { BookService } from 'src/app/services/book.service';
import { ActivatedRoute } from '@angular/router';
import { NgbPaginationConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit {

  books: Book[] = [];
  currentCategoryId: number = 1;
  searchMode: Boolean = false;
  previousCategoryId = 1;
  //pageOfItems: Array<Book>;
  //pageSize: number = 6;

  // New properties for server side paging
  currentPage: number = 1;
  pageSize: number = 5;
  totalRecords: number = 0;

  constructor(private bookService: BookService, 
              private activatedRoute: ActivatedRoute,
              private _config: NgbPaginationConfig) { 
                _config.maxSize = 3;
                _config.boundaryLinks = true;
              }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(() => {
      this.listBooks();
    })

  }

  // pageClick(pageOfItems:Array<Book>){
  //   //update the current page of items
  //   this.pageOfItems = pageOfItems;
  // }

  updatePageSize(pageSize: number) {
    this.pageSize = pageSize;
    this.currentPage = 1;
    this.listBooks();
  }

  listBooks() {
    this.searchMode = this.activatedRoute.snapshot.paramMap.has("keyword");

    if (this.searchMode) {
      // Do search !
      this.handleSearchBooks()
    } else {
      //Display books based on Catgory
      this.handleListBooks();


    }
  }

  handleListBooks() {
    const hasCategoryId: boolean = this.activatedRoute.snapshot.paramMap.has("id");

    if (hasCategoryId) {
      this.currentCategoryId = +this.activatedRoute.snapshot.paramMap.get("id");
    } else {
      this.currentCategoryId = 1;
    }

    // user navigate to a diff hasCategoryId, set categoryId to one
    if (this.previousCategoryId != this.currentCategoryId) {
      this.currentPage = 1;
    }

    this.previousCategoryId = this.currentCategoryId;

    this.bookService.getBooks(this.currentCategoryId, this.currentPage - 1, this.pageSize)
      .subscribe(this.processPaginate());

    // this.bookService.getBooks(this.currentCategoryId).subscribe(
    //   data => this.books = data
    //  )
  }

  handleSearchBooks() {
    const keyword: string = this.activatedRoute.snapshot.paramMap.get("keyword");

    this.bookService.searchBooks(keyword, this.currentPage - 1, this.pageSize).subscribe(
        this.processPaginate());
        //this.books = data;
        //console.log(data);     
  }

  processPaginate() {
    return data => {
      this.books = data._embedded.books;
      // page number starts from index 1
      this.currentPage = data.page.number + 1;
      this.totalRecords = data.page.totalElements;
      this.pageSize = data.page.size;
    }
  }
  /*
  listBooks(){
    this.bookService.getBooks().subscribe(
     data => this.books = data
    )
  } */

  /*listBooks() {
    this.bookService.getBooks().subscribe(
      data => {
        console.log(data)
      })
  }*/
}
