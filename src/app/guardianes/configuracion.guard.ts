import { Injectable } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { map, Observable } from "rxjs";
import { ConfiguracionServicio } from "../servicios/configuracion.servicio";

@Injectable()
export class ConfiguracionGuard implements CanActivate{
    constructor(private router:Router,
                private afAuth: AngularFireAuth,
                private configuracionServicio: ConfiguracionServicio){}
    canActivate():Observable<boolean>{
        return this.configuracionServicio.configuracion.pipe(
            map(configuracion=>{
                if(configuracion.permitirRegistro){
                    return true;
                }else{
                    this.router.navigate(['/login']);
                    return false;
                }
            })
        )
    }
}