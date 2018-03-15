import {Component} from '@angular/core';
import {AuthService} from '../services/auth.service';
import {User} from '../models/user';
import {Router, ActivatedRoute} from '@angular/router';
import { forEach } from '@angular/router/src/utils/collection';

@Component({
    selector: 'login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent {
    user: User = new User();
    error: string = "";
    constructor(
        private auth: AuthService,
        private router: Router,
    ) {}
    onLogin(): void {
        this.error = "";
        this.auth.login(this.user)
            .then((res) => {
                let dataUser = JSON.parse(res._body);                
                let roles:string[]=[];
                dataUser.user.userGroups.forEach(obj => {
                    roles.push(obj.name.toLowerCase());
                });

                localStorage.removeItem('token');
                localStorage.removeItem('urban_user');
                localStorage.removeItem('urban_roles');
                localStorage.setItem('token', dataUser.token);
                localStorage.setItem('urban_user', dataUser.user.username);
                localStorage.setItem('urban_userid', dataUser.user.id);
                localStorage.setItem('urban_roles', JSON.stringify(roles));
                this.router.navigate(['']);
            }).catch((err) => {
                this.error = err._body || {};
            });
    }
}