import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { IonSlides, NavController } from '@ionic/angular';
import { UsuarioService } from '../../services/usuario.service';
import { UIserviceService } from '../../services/uiservice.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

   //@ViewChild('slidePrincipal') slides: IonSlides;
   @ViewChild('slidePrincipal', { static: false }) slides: IonSlides;
  avatars = [
    {
      img: 'av-1.png',
      seleccionado: true
    },
    {
      img: 'av-2.png',
      seleccionado: false
    },
    {
      img: 'av-3.png',
      seleccionado: false
    },
    {
      img: 'av-4.png',
      seleccionado: false
    },
    {
      img: 'av-5.png',
      seleccionado: false
    },
    {
      img: 'av-6.png',
      seleccionado: false
    },
    {
      img: 'av-7.png',
      seleccionado: false
    },
    {
      img: 'av-8.png',
      seleccionado: false
    },
];
avatarSlide = {
  slidesPerView:3.5
}
loginUser = {
  xalias:'',
  xpass:''
}


  constructor(public usuarioService: UsuarioService,
            private navPage: NavController,
            private uiService: UIserviceService,
   ) { }

  ngOnInit() {


  }
  async ngAfterViewInit(){
    this.slides.lockSwipes( true );
   this.usuarioService.getUltimoUsuario().then( x=> {
    if (x!= undefined) {this.loginUser = x

    }
  
   }).catch(y=>{
     console.log(y);
     this.uiService.alertInformacion("Error al obter usuario logueado");


   })
 }
  

  async login(fLogin: NgForm){

      if (fLogin.invalid) {
        this.uiService.alertInformacion("Ingrese usuario y clave");
        return; }
      var mensaje = '';

      this.usuarioService.login(this.loginUser.xalias,this.loginUser.xpass).then( x=>{
        if (x) {
          document.body.setAttribute('color-theme','dark')
          this.navPage.navigateRoot('/main/tabs/tab1',{animated:true});       
        }
        else {
          this.uiService.alertInformacion("<b>Error de Ingreso <b></br> Usuario o clave incorrecto");
        }
      }).catch(err=>{
       
        document.body.setAttribute('color-theme','light');
        this.uiService.alertInformacion(this.usuarioService.mensaje);
        
      });


  }

  registro(fRegistro: NgForm) {
    console.log(fRegistro.valid);
  }

  seleccionarAvatar(avatar) {
    this.avatars.forEach(av => av.seleccionado = false);
    avatar.seleccionado = true;
  }

   mostrarRegistro(){
    this.slides.lockSwipes(false);
    this.slides.slideTo(0);
    this.slides.lockSwipes(true);
  }

  mostrarLogin(){
    this.slides.lockSwipes(false);
    this.slides.slideTo(1);
    this.slides.lockSwipes(true);

  }

}
