import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CharacterService } from '../../services/character.service';
import { Character } from '../../interfaces/character';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-character-details',
  imports: [CommonModule, RouterLink],
  templateUrl: './character-details.component.html',
  styleUrl: './character-details.component.css'
})
export class CharacterDetailsComponent {
  activatedRoute: ActivatedRoute = inject(ActivatedRoute);
  characterId: number;
  character: Character = {} as Character;
  viewRawJson: boolean = false;
  @ViewChild("btnToggleView") btnToggleView!: ElementRef;

  constructor(private characterService: CharacterService) {
    this.characterId = this.activatedRoute.snapshot.params['id'];
    
    this.characterService.getCharacterById(this.characterId).subscribe({
      next: (pageJson) => this.character = pageJson,
      error: (error) => console.error("Character not found", error)
    });
  }

  toggleView() {
    this.viewRawJson = !this.viewRawJson;
    if(this.viewRawJson){
      this.btnToggleView.nativeElement.innerText = "View Formatted JSON";
    } else {
      this.btnToggleView.nativeElement.innerText = "View Raw JSON";
    }
  }
}
