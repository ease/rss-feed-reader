import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { PostComponent } from './post/post.component';
import { FeedsComponent } from './feeds/feeds.component';
import { HomeComponent } from './home/home.component';
import { HttpClientModule } from '@angular/common/http';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    PostComponent,
    FeedsComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ScrollingModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
