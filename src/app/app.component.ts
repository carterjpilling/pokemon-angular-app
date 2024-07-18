import { Component } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterOutlet } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,
    CommonModule,
    MatButtonModule,
    MatCardModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'pokemon-angular-project';
  public pokemon: any[] = [];
  private currentAudio: HTMLAudioElement | null = null;


  constructor() {
    this.fetchPokemon();
  }

  public playCry(id: number): void {
    if (this.currentAudio) {
      this.currentAudio.pause();
      this.currentAudio.currentTime = 0;
    }
    this.currentAudio = new Audio(`https://raw.githubusercontent.com/PokeAPI/cries/main/cries/pokemon/legacy/${ id }.ogg`);
    this.currentAudio.play();
  }


  public fetchPokemon(): void {
    fetch('https://pokeapi.co/api/v2/pokemon?limit=151')
      .then(response => response.json())
      .then(data => {
        const fetches = data.results.map((pokemon: any) =>
          fetch(pokemon.url)
            .then(response => response.json())
            .then(pokemonData => this.pokemon.push(pokemonData))
        );

        Promise.all(fetches).then(() => {
          this.pokemon.sort((a, b) => a.id - b.id);
        });
      });
  }
}
