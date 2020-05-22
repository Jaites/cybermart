import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule, routingComponents } from './app-routing.module';
import { AppComponent } from './app.component';
import { BookService } from './services/book.service';
import { BookCategoryComponent } from './conponents/book-category/book-category.component';
import { SearchComponent } from './conponents/search/search.component';
import { JwPaginationComponent } from 'jw-angular-pagination';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';




@NgModule({
  declarations: [
    AppComponent,
    routingComponents,
    BookCategoryComponent,
    SearchComponent,
    JwPaginationComponent
         
    
  ],
    
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule
    
  ],
  providers: [BookService],
  bootstrap: [AppComponent]
})
export class AppModule { }
