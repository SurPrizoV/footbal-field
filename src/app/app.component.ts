import { Component } from '@angular/core';
import { PlayerPositionComponent } from './shared/components/player-position/player-position.component';

@Component({
  selector: 'app-root',
  standalone: true,
  template: `
    <div class="app-container">
      <header>
        <h1>Расстановка футбольной команды</h1>
      </header>

      <main>
        <app-player-position></app-player-position>
      </main>
    </div>
  `,
  styles: [
    `
      .app-container {
        max-width: 1200px;
        margin: 0 auto;
        padding: 20px;
      }

      header {
        text-align: center;
        margin-bottom: 20px;
      }

      h1 {
        color: #2e7d32;
      }
    `,
  ],
  imports: [PlayerPositionComponent],
})
export class AppComponent {}
