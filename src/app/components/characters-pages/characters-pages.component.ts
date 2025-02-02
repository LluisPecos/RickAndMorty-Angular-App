import { Component, ElementRef, Input, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppComponent } from '../app/app.component';

@Component({
  selector: 'app-characters-pages',
  imports: [CommonModule],
  templateUrl: './characters-pages.component.html',
  styleUrl: './characters-pages.component.css'
})
export class CharactersPagesComponent {
  @Input() appComponent!: AppComponent;

  @ViewChild('previousPage') previousPage!: ElementRef;
  @ViewChild('currentPage') currentPage!: ElementRef;
  @ViewChild('nextPage') nextPage!: ElementRef;

  updateAllCharactersPagesComponents(event: Event) {
    let span = event.target as HTMLElement;

    if(!span.dataset["page"]) return; // empty data-page string

    let pageNumber = Number(span.dataset["page"]);

    this.appComponent.setCharactersListByPage(pageNumber);
    this.appComponent.updateAllCharactersPagesComponents(pageNumber);
  }

  setCurrentApiPage(pageNumber: number) {
    let previousPage = this.previousPage.nativeElement;
    let currentPage = this.currentPage.nativeElement;
    let nextPage = this.nextPage.nativeElement;

    // Previous page
    if((pageNumber - 1) < 1) {
      previousPage.dataset.page = "";
      previousPage.innerText = "<";
    } else {
      previousPage.dataset.page = pageNumber - 1;
      previousPage.innerText = pageNumber - 1;
    }
    
    // Current page
    currentPage.dataset["page"] = pageNumber;
    currentPage.innerText = pageNumber;
    
    // Next apge
    if((pageNumber + 1) > Number(this.appComponent.apiTotalPages)) {
      nextPage.dataset.page = "";
      nextPage.innerText = ">";
    } else {
      nextPage.dataset["page"] = pageNumber + 1;
      nextPage.innerText = pageNumber + 1;
    }
  }
}
