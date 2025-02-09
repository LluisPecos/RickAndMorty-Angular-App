import { Component, ElementRef, Inject, Input, Renderer2, ViewChild } from '@angular/core';
import { Character } from '../../interfaces/character';
import { CommonModule, DOCUMENT } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-character',
  imports: [CommonModule, RouterLink],
  templateUrl: './character.component.html',
  styleUrl: './character.component.css'
})
export class CharacterComponent {
  @Input() character: Character | undefined;

  @ViewChild("characterContainer") characterContainer!: ElementRef;
  @ViewChild("modal") modal!: ElementRef;

  serverUrl!: string;

  constructor(@Inject(DOCUMENT) private document: Document, private renderer: Renderer2) {
    this.serverUrl = window.location.origin;
  }

  applyPerspective(mouseEvent: MouseEvent) {
    let divElement = mouseEvent.target as HTMLElement;

    let middleX = divElement.getBoundingClientRect().width / 2;
    let middleY = divElement.getBoundingClientRect().height / 2;

    let mouseX = mouseEvent.x - divElement.getBoundingClientRect().x;
    let mouseY = mouseEvent.y - divElement.getBoundingClientRect().y;

    let distanceX = mouseX - middleX;
    let distanceY = mouseY - middleY;

    let maxDeg = 20;

    let rotateY = (distanceX / middleX) * maxDeg;
    let rotateX = (distanceY / middleY) * maxDeg;

    let characterContainerElement = this.characterContainer.nativeElement;
    characterContainerElement.style.setProperty("--rotate-x", -rotateX + "deg");
    characterContainerElement.style.setProperty("--rotate-y", rotateY + "deg");
  }

  showCharacterData() {
    //this.document.body.classList.add("modal-open");
    this.renderer.addClass(this.document.body, "modal-open");
    this.modal.nativeElement.classList.add("show");
  }

  hideCharacterData() {
    this.renderer.removeClass(this.document.body, "modal-open");
    this.modal.nativeElement.classList.remove("show");
  }
}
