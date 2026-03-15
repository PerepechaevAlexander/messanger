import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './components/main/main.component';
import { NotesComponent } from './components/notes/notes.component';
import { HomeComponent } from './components/home/home.component';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      { path: '', component: HomeComponent },
      { path: 'notes', component: NotesComponent },
      { path: '**', redirectTo: '' } // Перенаправление на главную для неизвестных путей
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    onSameUrlNavigation: 'ignore' // Важно: игнорировать навигацию на тот же URL
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
