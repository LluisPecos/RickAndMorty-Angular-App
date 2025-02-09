import { Component, ElementRef, inject, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CharacterComponent } from '../character/character.component';
import { Character } from '../../interfaces/character';
import { CharacterService } from '../../services/character.service';
import { CharactersPagesComponent } from "../characters-pages/characters-pages.component";

@Component({
  selector: 'app-root',
  imports: [CommonModule, CharacterComponent, CharactersPagesComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  
  title: string = "LluisSuauAngularRickAndMortyApi";
  apiTotalPages!: Number;
  
  originalCharactersList: Character[] | undefined;
  characterList: Character[] | undefined;

  @ViewChild("iptApiPage") iptApiPage!: ElementRef;
  @ViewChild("selectFilter") selectFilter!: ElementRef;
  @ViewChild("iptSearch") iptSearch!: ElementRef;
  @ViewChildren(CharactersPagesComponent) charactersPagesComponents!: QueryList<CharactersPagesComponent>;

  constructor(private characterService: CharacterService) {
    this.setApiTotalPages();
    this.setCharactersListByPage(1);
  }

  setCharactersListByPage(pageNumber: number) {
    this.characterService.getCharactersPage(pageNumber).subscribe({
      next: (page) => {
        this.characterList = page.results;
        this.originalCharactersList = page.results;
        this.iptSearch.nativeElement.value = "";
      },
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
    this.iptApiPage.nativeElement.value = pageNumber;

    // update characters pages components
    this.charactersPagesComponents.forEach(charactersPagesComponent => {
      charactersPagesComponent.setCurrentApiPage(pageNumber);
    });
  }

  filterCharacters() {
    this.characterList = [];

    this.originalCharactersList?.forEach(character => {
      if(this.characterMeetsFilters(character) || !this.iptSearch.nativeElement.value) {
        this.characterList?.push(character);
      };
    });
  }

  characterMeetsFilters(character: Character) : Boolean {
    let iptSearchValue = this.iptSearch.nativeElement.value.toLowerCase();
    let selectFilterValue = this.selectFilter.nativeElement.value;
    let characterFieldValue = "";

    switch(selectFilterValue) {
      case "id":
        characterFieldValue = character.id.toString().toLowerCase();
        break;

      case "name":
        characterFieldValue = character.name.toLowerCase();
        break;

      case "status":
        characterFieldValue = character.status.toLowerCase();
        break;

      case "specie":
        characterFieldValue = character.species.toLowerCase();
        break;

      case "type":
        characterFieldValue = character.type.toLowerCase();
        break;

      case "gender":
        characterFieldValue = character.gender.toLowerCase();
        break;
    }

    if(characterFieldValue.includes(iptSearchValue)) {
      return true;
    }

    return false;
  }
}
