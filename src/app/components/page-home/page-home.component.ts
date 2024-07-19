import { Component, OnInit, OnDestroy } from '@angular/core';
import { CharacterService } from '../../character.service';
import { Character } from '../../Models/character';

@Component({
  selector: 'app-page-home',
  templateUrl: './page-home.component.html',
  styleUrls: ['./page-home.component.css']
})
export class PageHomeComponent implements OnInit, OnDestroy {
  character: Character | null = null;
  canClickButton: boolean = true;
  countdown: number = 0;
  countdownInterval: any;
  readonly FIVE_SECONDS = 5 * 1000;

  constructor(private characterService: CharacterService) {}

  ngOnInit(): void {
    const lastClickTime = localStorage.getItem('lastClickTime');
    if (lastClickTime) {
      const timeElapsed = Date.now() - parseInt(lastClickTime, 10);
      if (timeElapsed < this.FIVE_SECONDS) {
        this.canClickButton = false;
        this.countdown = Math.floor((this.FIVE_SECONDS - timeElapsed) / 1000);
        this.startCountdown();
      }
    }
  }

  ngOnDestroy(): void {
    if (this.countdownInterval) {
      clearInterval(this.countdownInterval);
    }
  }

  getRandomCharacter() {
    if (!this.canClickButton) {
      alert('Vous devez attendre 5 secondes avant de cliquer à nouveau.');
      return;
    }

    this.characterService.getAllCharacters().subscribe((character: Character) => {
      this.character = character;
      localStorage.setItem('lastClickTime', Date.now().toString());

      // Enregistrer le personnage dans l'historique
      this.saveCharacterToLocalStorage(character);

      this.canClickButton = false;
      this.countdown = this.FIVE_SECONDS / 1000;
      this.startCountdown();
    });
  }

  startCountdown() {
    this.countdownInterval = setInterval(() => {
      if (this.countdown > 0) {
        this.countdown--;
      } else {
        this.canClickButton = true;
        clearInterval(this.countdownInterval);
      }
    }, 1000);
  }

  formatTime(seconds: number): string {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}m ${s}s`;
  }

  saveCharacterToLocalStorage(character: Character): void {
    // Récupérer l'historique existant depuis le localStorage
    let history = JSON.parse(localStorage.getItem('characterHistory') || '[]') as Character[];

    // Ajouter le nouveau personnage à l'historique
    history.unshift(character); // Insère au début de l'array pour afficher le dernier en premier

    // Limiter l'historique à une certaine taille si nécessaire
    const MAX_HISTORY_LENGTH = 10;
    history = history.slice(0, MAX_HISTORY_LENGTH);

    // Enregistrer l'historique mis à jour dans le localStorage
    localStorage.setItem('characterHistory', JSON.stringify(history));
  }

  getCharacterHistory(): Character[] {
    // Récupérer et retourner l'historique depuis le localStorage
    return JSON.parse(localStorage.getItem('characterHistory') || '[]') as Character[];
  }
}
