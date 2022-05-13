import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfiguracionServicio } from 'src/app/servicios/configuracion.servicio';
import { LoginServicio } from 'src/app/servicios/login.servicio';

@Component({
  selector: 'app-cabecero',
  templateUrl: './cabecero.component.html',
  styleUrls: ['./cabecero.component.css']
})
export class CabeceroComponent implements OnInit {

  isLoggedIn:boolean;
  loggedInUser: string;
  permitirRegistro:boolean;

  constructor(private loginServicio:LoginServicio,
              private router: Router,
              private configuracionServicio:ConfiguracionServicio) { }

  ngOnInit(): void {
    this.loginServicio.getAuth().subscribe(auth=>{
      if(auth){
        this.isLoggedIn=true;
        this.loggedInUser=auth.email;
      } 
      else{
        this.isLoggedIn=false;
      }
    });

    this.configuracionServicio.getConfiguracion().subscribe(configuracion=>{
      this.permitirRegistro=configuracion.permitirRegistro;
    }
    )
  }

  logout(){
    this.loginServicio.logout();
    this.isLoggedIn=false;
    this.router.navigate(["/login"]);
  }

}
