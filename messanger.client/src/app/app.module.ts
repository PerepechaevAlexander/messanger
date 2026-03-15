import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainComponent } from './components/main/main.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { NotesComponent } from './components/notes/notes.component';
import { FormsModule } from '@angular/forms';
import { NoteModalComponent } from './components/note-modal/note-modal.component';
import { SidebarStateService } from './services/sidebar-state.service';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { NotesStateService } from './services/notes-state.service';
import { HomeComponent } from './components/home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    SidebarComponent,
    NotesComponent,
    NoteModalComponent,
    ToolbarComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [
    SidebarStateService,
    NotesStateService],
  bootstrap: [AppComponent]
})
export class AppModule { }
