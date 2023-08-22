import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HomeRoutingModule} from './home-routing.module';
import {HomePageComponent} from './pages/home-page/home-page.component';
import {TableComponent} from './components/table/table.component';
import {ReactiveFormsModule} from '@angular/forms';


@NgModule({
  declarations: [
    HomePageComponent,
    TableComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    ReactiveFormsModule
  ]
})
export class HomeModule {
}
