import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PlayerPositionComponent } from './player-position.component';
import { CommonModule } from '@angular/common';
import { DragDropModule, CdkDragDrop } from '@angular/cdk/drag-drop';

describe('PlayerPositionComponent', () => {
  let component: PlayerPositionComponent;
  let fixture: ComponentFixture<PlayerPositionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommonModule, DragDropModule, PlayerPositionComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PlayerPositionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize players and positions', () => {
    // @ts-ignore
    expect(component.players.length).toBe(11);
    // @ts-ignore
    expect(component.fieldPositions.length).toBe(11);
    // @ts-ignore
    expect(component.fieldPositionsIds.length).toBe(11);
  });

  it('should handle dropping a player into a position', () => {
    // @ts-ignore
    const initialPlayersCount = component.players.length;

    const dropEvent = {
      previousContainer: { id: 'players-list', data: [] },
      container: { id: 'gk', data: [] },
      item: { data: 1 },
      previousIndex: 0,
      currentIndex: 0,
    } as CdkDragDrop<any>;

    // @ts-ignore
    component.onDrop(dropEvent);

    // @ts-ignore
    expect(component.players.length).toBe(initialPlayersCount - 1);

    // @ts-ignore
    const position = component.fieldPositions.find((pos) => pos.id === 'gk');
    expect(position?.occupied).toBe(true);
    expect(position?.playerId).toBe(1);

    // @ts-ignore
    const playerAtPosition = component.getPlayerAtPosition('gk');
    expect(playerAtPosition).not.toBeNull();
    expect(playerAtPosition?.id).toBe(1);
  });

  it('should handle replacing a player in a position', () => {
    const dropEvent1 = {
      previousContainer: { id: 'players-list', data: [] },
      container: { id: 'gk', data: [] },
      item: { data: 1 },
      previousIndex: 0,
      currentIndex: 0,
    } as CdkDragDrop<any>;

    // @ts-ignore
    component.onDrop(dropEvent1);

    // @ts-ignore
    const initialPlayersCount = component.players.length;

    const dropEvent2 = {
      previousContainer: { id: 'players-list', data: [] },
      container: { id: 'gk', data: [] },
      item: { data: 7 },
      previousIndex: 0,
      currentIndex: 0,
    } as CdkDragDrop<any>;

    // @ts-ignore
    component.onDrop(dropEvent2);

    // @ts-ignore
    expect(component.players.length).toBe(initialPlayersCount);

    // @ts-ignore
    const playerAtPosition = component.getPlayerAtPosition('gk');
    expect(playerAtPosition?.id).toBe(7);
  });

  it('should remove player from position', () => {
    const dropEvent = {
      previousContainer: { id: 'players-list', data: [] },
      container: { id: 'rb', data: [] },
      item: { data: 2 },
      previousIndex: 0,
      currentIndex: 0,
    } as CdkDragDrop<any>;

    // @ts-ignore
    component.onDrop(dropEvent);

    // @ts-ignore
    const playersCountAfterDrop = component.players.length;

    // @ts-ignore
    component.removeFromField('rb');

    // @ts-ignore
    expect(component.players.length).toBe(playersCountAfterDrop + 1);

    // @ts-ignore
    const position = component.fieldPositions.find((pos) => pos.id === 'rb');
    expect(position?.occupied).toBe(false);
    expect(position?.playerId).toBeUndefined();

    // @ts-ignore
    const playerAtPosition = component.getPlayerAtPosition('rb');
    expect(playerAtPosition).toBeNull();
  });

  it('should handle move within the same container', () => {
    // Имитируем событие перемещения в том же контейнере
    const moveEvent = {
      previousContainer: { id: 'players-list', data: [] },
      container: { id: 'players-list', data: [] },
      previousIndex: 0,
      currentIndex: 2,
      item: { data: null },
    } as CdkDragDrop<any>;

    // @ts-ignore
    const initialPlayers = [...component.players];
    // @ts-ignore
    component.onDrop(moveEvent);

    // @ts-ignore
    expect(component.players.length).toBe(initialPlayers.length);
  });

  it('should get null when position is empty', () => {
    // @ts-ignore
    const player = component.getPlayerAtPosition('cm1');
    expect(player).toBeNull();
  });

  it('should not remove player from empty position', () => {
    // @ts-ignore
    const initialPlayersCount = component.players.length;

    // @ts-ignore
    component.removeFromField('lm');

    // @ts-ignore
    expect(component.players.length).toBe(initialPlayersCount);
  });
});
