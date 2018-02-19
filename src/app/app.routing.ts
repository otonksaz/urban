import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

// Layouts
import {FullLayoutComponent} from './layouts/full-layout.component';
import {LoginComponent} from './login/login.component';
import {AuthGuardService as AuthGuard } from './services/auth-guard.service';
import { KwitansiComponent } from './kwitansi/kwitansi.component';


export const routes: Routes = [
    {
        path: 'login',
        component: LoginComponent,
        pathMatch: 'full'
    },
    {
        path: '',
        component: FullLayoutComponent,
        data: {
            title: 'Home'
        },
        children: [
            {
                path: 'master',
                loadChildren: './master/master.module#MasterModule'
            },
            {
                path: 'report',
                loadChildren: './report/report.module#ReportModule'
            }
        ]
    },
    {
        path: 'kwitansi/:id',
        component: KwitansiComponent,
        pathMatch: 'full',
        canActivate: [AuthGuard]
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes, {useHash: true})],
    exports: [RouterModule]
})
export class AppRoutingModule {}
