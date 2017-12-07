import {Component} from '@angular/core';
import {AuthService} from '../services/auth.service';
import {User} from '../models/user';
import {Router, ActivatedRoute} from '@angular/router';

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
        this.auth.login(this.user)
            .then((res) => {
                console.log(res);
                console.log(JSON.parse(res._body).token);
                localStorage.removeItem('token');
                localStorage.setItem('token', JSON.parse(res._body).token);
                this.router.navigate(['']);
            }).catch((err) => {
                this.error = err._body || {};
            });
    }
}