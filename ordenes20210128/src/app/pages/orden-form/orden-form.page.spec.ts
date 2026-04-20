import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { OrdenFormPage } from './orden-form.page';

describe('OrdenFormPage', () => {
  let component: OrdenFormPage;
  let fixture: ComponentFixture<OrdenFormPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrdenFormPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(OrdenFormPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
