import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

// Layouts
import {FullLayoutComponent} from './layouts/full-layout.component';
import {LoginComponent} from './login/login.component';
import {AuthGuardService as AuthGuard, AuthGuardAdminService as AuthAdmin } from './services/auth-guard.service';
import { KwitansiComponent } from './kwitansi/kwitansi.component';
import { TandaTerimaComponent } from './tandaterima/tandaterima.component';


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
        canActivate: [AuthGuard],
        children: [
            {
                path: 'master',
                loadChildren: './master/master.module#MasterModule',                
            },
            {
                path: 'report',
                loadChildren: './report/report.module#ReportModule',
                canActivate:[AuthAdmin]
            }
        ]
    },
    {
        path: 'kwitansi/:id',
        component: KwitansiComponent,
        pathMatch: 'full',
        canActivate: [AuthGuard]
    },
    {
        path: 'tandaterima/:id',
        component: TandaTerimaComponent,
        pathMatch: 'full',
        canActivate: [AuthGuard]
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes, {useHash: true})],
    exports: [RouterModule]
})
export class AppRoutingModule {}
