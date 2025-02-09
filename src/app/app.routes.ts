import { Routes } from '@angular/router';
import { AppComponent } from './components/app/app.component';
import { CharacterDetailsComponent } from './components/character-details/character-details.component';

export const routes: Routes = [
    {
        path: '',
        component: AppComponent,
        title: "Rick and Morty - Characters"
    },
    {
        path: 'character/:id',
        component: CharacterDetailsComponent,
        title: 'Character Details'
    }
];
