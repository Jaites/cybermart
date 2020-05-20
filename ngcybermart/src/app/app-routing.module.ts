import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BookListComponent } from './conponents/book-list/book-list.component';
import { PageNotFoundComponent } from './conponents/page-not-found/page-not-found.component';


const routes: Routes = [
  { path: "", redirectTo:"/books", pathMatch:"full" },
  { path: "books", component: BookListComponent},
  { path: "category/:id", component: BookListComponent },
  { path: "**", component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [
  BookListComponent, PageNotFoundComponent
];
