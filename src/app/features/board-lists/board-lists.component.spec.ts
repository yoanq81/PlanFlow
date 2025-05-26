import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import BoardListsComponent from './board-lists.component';
import { provideHttpClient } from '@angular/common/http';
import { BoardsService } from '../../core/services/boards.service';
import { of } from 'rxjs';
import { ComplexBoard } from '../../core/models/board.type';

const dataForTest: ComplexBoard = {
  id: '683382af1de64c72fd90209a',
  name: 'Prueba de tablero',
  lists: [
    {
      id: '683382af1de64c72fd9020e8',
      name: 'Lista de tareas',
      closed: false,
      pos: 16384,
      cards: [
        {
          id: '68346fa2402d4c21be593d16',
          name: 'Planificar tareas',
          description: '',
          idList: '683382af1de64c72fd9020e8',
          closed: false,
          pinned: false,
          dueComplete: false,
          url: 'https://trello.com/c/lp1Vr4fD/1-planificar-tareas',
          dateCompleted: null,
          dateClosed: null,
          pos: 16384,
        },
        {
          id: '68346fadba33a1797667bcd6',
          name: 'Escribir pruebas',
          description: '',
          idList: '683382af1de64c72fd9020e8',
          closed: false,
          pinned: false,
          dueComplete: false,
          url: 'https://trello.com/c/6iMIUgXU/2-escribir-pruebas',
          dateCompleted: null,
          dateClosed: null,
          pos: 32768,
        },
      ],
    },
    {
      id: '683382af1de64c72fd9020e9',
      name: 'En proceso',
      closed: false,
      pos: 32768,
      cards: [],
    },
    {
      id: '683382af1de64c72fd9020ea',
      name: 'Hecho',
      closed: false,
      pos: 49152,
      cards: [],
    },
  ],
};

describe('BoardListsComponent', () => {
  let component: BoardListsComponent;
  let fixture: ComponentFixture<BoardListsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        BoardListsComponent,
        provideHttpClient(),
        provideHttpClientTesting(),
        {
          provide: BoardsService,

          useValue: {
            // pass dummy data to TodoService getTasks method

            getBoardList: () => of(dataForTest),
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(BoardListsComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('boardId', 'test-board-id');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have board list from service in component', () => {
    expect(component.boardListsRes.value()).toEqual(dataForTest);
  });
});
