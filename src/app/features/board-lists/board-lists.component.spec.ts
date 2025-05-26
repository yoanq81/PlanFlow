import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import BoardListsComponent from './board-lists.component';
import { provideHttpClient } from '@angular/common/http';

describe('BoardListsComponent', () => {
  let component: BoardListsComponent;
  let fixture: ComponentFixture<BoardListsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        BoardListsComponent,
        provideHttpClient(),
        provideHttpClientTesting(),
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
});
