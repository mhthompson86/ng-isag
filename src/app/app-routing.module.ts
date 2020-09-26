import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules, ExtraOptions } from '@angular/router';

import { HomeComponent } from './_core/components/home/home.component';
import { LoginComponent } from './_core/components/login/login.component';
import { PreloadStrategyService } from './preload-strategy.service';
import { Role } from './_shared/models/role.enum';
import { AuthGuard } from './_core/guards/auth.guard';
import { SignupComponent } from './_core/components/signup/signup.component';


const routes: Routes = [
  {
    path: '', component: HomeComponent,
    children: [
      { path: '', loadChildren: () => import('./results/results.module').then(m => m.ResultsModule) },
      { path: 'login', component: LoginComponent, data: { title: 'Login' } },
      { path: 'signup', component: SignupComponent, data: { title: 'Signup' } },
      { path: 'players', loadChildren: () => import('./players/players.module').then(m => m.PlayersModule)  },
      { path: 'calcutta', loadChildren: () => import('./calcutta/calcutta.module').then(m => m.CalcuttaModule)  },
      { path: 'rules', loadChildren: () => import('./rules/rules.module').then(m => m.RulesModule)  },
      { path: 'settings', loadChildren: () => import('./settings/settings.module').then(m => m.SettingsModule),
        data: { checkMinRole: Role.admin}, canLoad: [AuthGuard] },
    ]
  },
  { path: '**', redirectTo: '' }
];

const routeConfig = {
  preloadingStrategy: PreloadStrategyService,
  enableTracing: false,
} as ExtraOptions;

@NgModule({
  imports: [RouterModule.forRoot(routes, routeConfig)],
  exports: [RouterModule]
})
export class AppRoutingModule {


}