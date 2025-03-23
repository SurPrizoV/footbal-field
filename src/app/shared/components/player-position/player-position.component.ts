import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  DragDropModule,
  CdkDragDrop,
  moveItemInArray,
} from '@angular/cdk/drag-drop';

import { Player } from '../../interfaces';
import { Position } from '../../interfaces';

@Component({
  selector: 'app-player-position',
  standalone: true,
  imports: [CommonModule, DragDropModule],
  templateUrl: './player-position.component.html',
  styleUrls: ['./player-position.component.scss'],
})

/**
 * Компонент для управления расстановкой игроков на футбольном поле.
 * Позволяет методом drag-and-drop размещать игроков на определенных позициях
 * на футбольном поле, а также удалять их с поля.
 */
export class PlayerPositionComponent implements OnInit {
  /** Массив доступных игроков, которых можно разместить на поле. */
  protected players: Player[] = [];
  /** Массив позиций на футбольном поле. */
  protected fieldPositions: Position[] = [];
  /** Массив идентификаторов позиций на поле для удобного доступа. */
  protected fieldPositionsIds: string[] = [];
  /** Объект, хранящий сопоставление позиций и размещенных на них игроков. */
  private positionedPlayers: { [key: string]: Player } = {};

  ngOnInit() {
    this.initializePlayers();
    this.initializePositions();
    this.fieldPositionsIds = this.fieldPositions.map((pos) => pos.id);
  }

  /** Инициализирует список доступных игроков с их данными. */
  protected initializePlayers() {
    this.players = [
      {
        id: 1,
        number: 1,
        firstName: 'Игорь',
        lastName: 'Акинфеев',
        photoUrl: 'assets/players/player1.jpg',
      },
      {
        id: 2,
        number: 4,
        firstName: 'Сергей',
        lastName: 'Игнашевич',
        photoUrl: 'assets/players/player2.jpg',
      },
      {
        id: 3,
        number: 6,
        firstName: 'Денис',
        lastName: 'Черышев',
        photoUrl: 'assets/players/player3.jpg',
      },
      {
        id: 4,
        number: 9,
        firstName: 'Александр',
        lastName: 'Кокорин',
        photoUrl: 'assets/players/player4.jpg',
      },
      {
        id: 5,
        number: 10,
        firstName: 'Федор',
        lastName: 'Смолов',
        photoUrl: 'assets/players/player5.jpg',
      },
      {
        id: 6,
        number: 11,
        firstName: 'Роман',
        lastName: 'Зобнин',
        photoUrl: 'assets/players/player6.jpg',
      },
      {
        id: 7,
        number: 14,
        firstName: 'Владимир',
        lastName: 'Габулов',
        photoUrl: 'assets/players/player7.jpg',
      },
      {
        id: 8,
        number: 17,
        firstName: 'Александр',
        lastName: 'Головин',
        photoUrl: 'assets/players/player8.jpg',
      },
      {
        id: 9,
        number: 18,
        firstName: 'Юрий',
        lastName: 'Жирков',
        photoUrl: 'assets/players/player9.jpg',
      },
      {
        id: 10,
        number: 19,
        firstName: 'Артем',
        lastName: 'Дзюба',
        photoUrl: 'assets/players/player10.jpg',
      },
      {
        id: 11,
        number: 21,
        firstName: 'Александр',
        lastName: 'Ерохин',
        photoUrl: 'assets/players/player11.jpg',
      },
    ];
  }

  /**
   * Обрабатывает событие перетаскивания игрока на позицию.
   * Если игрок перемещается в пределах одного контейнера, изменяет порядок.
   * Если игрок перемещается на позицию на поле, обновляет данные о размещении.
   */
  protected onDrop(event: CdkDragDrop<any>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      const positionId = event.container.id;
      const playerId = event.item.data;

      const player = this.players.find((p) => p.id === playerId);

      if (player) {
        const position = this.fieldPositions.find(
          (pos) => pos.id === positionId
        );

        if (position) {
          if (position.occupied && position.playerId) {
            const currentPlayer = this.positionedPlayers[positionId];
            this.players.push(currentPlayer);
          }

          this.players = this.players.filter((p) => p.id !== playerId);

          position.occupied = true;
          position.playerId = playerId;
          this.positionedPlayers[positionId] = player;
        }
      }
    }
  }

  /** Удаляет игрока с указанной позиции на поле и возвращает его в список доступных игроков. */
  protected removeFromField(positionId: string) {
    const position = this.fieldPositions.find((pos) => pos.id === positionId);
    if (position && position.occupied && position.playerId) {
      const player = this.positionedPlayers[positionId];

      position.occupied = false;
      position.playerId = undefined;
      delete this.positionedPlayers[positionId];

      this.players.push(player);
    }
  }

  /** @description Возвращает игрока, находящегося на указанной позиции на поле. */
  protected getPlayerAtPosition(positionId: string): Player | null {
    return this.positionedPlayers[positionId] || null;
  }

  /** Инициализирует позиции на футбольном поле. */
  private initializePositions() {
    this.fieldPositions.push({ id: 'gk', x: 50, y: 90, occupied: false });

    this.fieldPositions.push({ id: 'lb', x: 20, y: 70, occupied: false });
    this.fieldPositions.push({ id: 'cb1', x: 40, y: 70, occupied: false });
    this.fieldPositions.push({ id: 'cb2', x: 60, y: 70, occupied: false });
    this.fieldPositions.push({ id: 'rb', x: 80, y: 70, occupied: false });

    this.fieldPositions.push({ id: 'lm', x: 20, y: 50, occupied: false });
    this.fieldPositions.push({ id: 'cm1', x: 40, y: 50, occupied: false });
    this.fieldPositions.push({ id: 'cm2', x: 60, y: 50, occupied: false });
    this.fieldPositions.push({ id: 'rm', x: 80, y: 50, occupied: false });

    this.fieldPositions.push({ id: 'st1', x: 40, y: 30, occupied: false });
    this.fieldPositions.push({ id: 'st2', x: 60, y: 30, occupied: false });
  }
}
