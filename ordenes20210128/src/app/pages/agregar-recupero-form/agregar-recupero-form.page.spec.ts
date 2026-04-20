import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AgregarRecuperoFormPage } from './agregar-recupero-form.page';

describe('AgregarRecuperoFormPage', () => {
  let component: AgregarRecuperoFormPage;
  let fixture: ComponentFixture<AgregarRecuperoFormPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgregarRecuperoFormPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AgregarRecuperoFormPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
