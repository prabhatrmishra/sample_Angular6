import { RouterModule, Routes } from '@angular/router';
import { ErrorComponent } from "src/app/pages/error/error.component";
import { LoginComponent } from 'src/app/pages/login/login.component';
import { DashboardComponent } from 'src/app/pages/dashboard/dashboard.component';
import { ReportsComponent } from 'src/app/pages/reports/reports.component';
import { TrainComponent } from 'src/app/pages/train/train.component';
import { TrainProfileComponent } from 'src/app/pages/train-profile/train-profile.component';
import { TrainEntityComponent } from 'src/app/pages/train-entity/train-entity.component';
import { ExtractComponent } from 'src/app/pages/extract/extract.component';
import { InspectComponent } from 'src/app/pages/inspect/inspect.component';
import { InspectLandingComponent } from 'src/app/pages/inspect-landing/inspect-landing.component';
import { InspectTagsComponent } from 'src/app/pages/inspect-tags/inspect-tags.component';

const ce_base_routes: Routes = [
    {
        path: 'error',
        component: ErrorComponent,
        data: {
            title: 'Error',
        }
    },
    {
        path: '',
        redirectTo: '/login',
        pathMatch: 'full'
    },
    {
        path: 'login',
        component: LoginComponent,
        pathMatch: 'full',
        data: {
            title: 'Login',
            hideHeader: true
        }
    },
    {
        path: 'dashboard',
        component: DashboardComponent,
        data: {
            title: 'Organisation Setup',
        }
    },
    {
        path: 'reports',
        component: ReportsComponent,
        pathMatch: 'full',
        data: {
            title: 'Reports'
        }
    },
    {
        path: 'train',
        component: TrainComponent,
        data: {
            title: 'Configuration Category'
        },
        children: [
            {
                path: '',
                redirectTo: 'profile',
                pathMatch: 'full'
            },
            {
                path: 'profile',
                component: TrainProfileComponent,
                pathMatch: 'full',
                data: {
                    title: 'Configuration Category'
                },
            },
            {
                path: 'extract/:profile',
                component: TrainEntityComponent,
                pathMatch: 'full',
                data: {
                    title: 'Define Data Attributes'
                },
            }
        ]
    },
    {
        path: 'extraction',
        component: ExtractComponent,
        pathMatch: 'full',
        data: {
            title: 'Extraction Job'
        }
    },
    {
        path: 'inspect',
        component: InspectComponent,
        data: {
            title: 'Inspect'
        },
        children: [
            {
                path: '',
                redirectTo: 'land/0',
                pathMatch: 'full'
            },
            {
                path: 'land/:id',
                component: InspectLandingComponent,
                pathMatch: 'full',
                data: {
                    title: 'Verify Extracted Data'
                },
            },
            {
                path: 'tags/:id',
                component: InspectTagsComponent,
                pathMatch: 'full',
                data: {
                    title: 'Verify Extracted Data'
                },
            }
        ]
    },
    {
        path: '**',
        redirectTo: '/error'
    }
];

export const ce_base_routes_config = RouterModule.forRoot(ce_base_routes);
