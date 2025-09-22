import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Moneda } from './moneda';

describe('Moneda', () => {
  let component: Moneda;
  let fixture: ComponentFixture<Moneda>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Moneda]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Moneda);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
