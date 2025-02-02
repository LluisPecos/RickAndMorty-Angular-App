import { Component, ElementRef, inject, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CharacterComponent } from '../character/character.component';
import { Character } from '../../interfaces/character';
import { CharacterService } from '../../services/character.service';
import { CharactersPagesComponent } from "../characters-pages/characters-pages.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule, CharacterComponent, CharactersPagesComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  
  title: string = "LluisSuauAngularRickAndMortyApi";
  apiTotalPages!: Number;
  
  characterList: Character[] | undefined;

  @ViewChild("inputNumber") inputNumber!: ElementRef;
  @ViewChildren(CharactersPagesComponent) charactersPagesComponents!: QueryList<CharactersPagesComponent>;

  constructor(private characterService: CharacterService) {
    this.setApiTotalPages();
    this.setCharactersListByPage(1);
  }

  async ngAfterViewInit() {}

  setCharactersListByPage(pageNumber: number) {
    this.characterService.getCharactersPage(pageNumber).subscribe({
      next: (page) => this.characterList = page.results,
      error: (err) => console.error('Error fetching characters:', err)
    });
  }

  setCharactersListByInputEvent(event: Event) {
    let input = event.target as HTMLInputElement;

    if(!input.value) return; // empty input value

    let pageNumber = Number(input.value);

    if(pageNumber < 1) {
      input.value = String(1);
      pageNumber = 1;
      
    } else if(pageNumber > Number(this.apiTotalPages)) {
      input.value = String(this.apiTotalPages);
      pageNumber = Number(this.apiTotalPages);
    }
 
    this.setCharactersListByPage(pageNumber);
    this.updateAllCharactersPagesComponents(pageNumber);
  }

  setApiTotalPages() {
    this.characterService.getApiTotalPages().subscribe({
      next: (totalPages) => this.apiTotalPages = totalPages,
      error: (err) => console.error('Error fetching total pages:', err)
    });
  }

  updateAllCharactersPagesComponents(pageNumber: number) {
    this.inputNumber.nativeElement.value = pageNumber;

    // update characters pages components
    this.charactersPagesComponents.forEach(charactersPagesComponent => {
      charactersPagesComponent.setCurrentApiPage(pageNumber);
    });
  }
}
