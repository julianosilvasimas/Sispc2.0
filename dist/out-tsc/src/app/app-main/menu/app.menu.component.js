import * as tslib_1 from "tslib";
import { Component, Input } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { AppMainComponent } from '../app.main.component';
import { PerformanceService } from './../../performance/performance.service';
let AppMenuComponent = class AppMenuComponent {
    constructor(app, performanceService) {
        this.app = app;
        this.performanceService = performanceService;
    }
    ngOnInit() {
        this.performanceService.classindicadores(6)
            .subscribe(response => {
            this.indicadores = response;
            //console.log(response)
        });
        this.performanceService.gerencias()
            .subscribe(response => {
            this.gerencias = response.splice(2, Number.MAX_VALUE);
            this.model = [
                {
                    label: 'Performance', icon: 'timeline',
                    items: [
                        {
                            label: 'Acompanhamento', icon: 'subject',
                            items: this.gerencias
                        },
                        {
                            label: 'Fechamento', icon: 'subject',
                            items: [
                                { label: 'Relatórios por área', icon: 'subject' },
                                { label: 'Arquivamento', icon: 'subject' }
                            ]
                        }
                    ],
                },
                { label: 'Planejamento', icon: 'equalizer',
                    items: [
                        { label: 'Capex', icon: 'subject' },
                        { label: 'Opex', icon: 'subject' },
                        { label: 'DRE', icon: 'subject' },
                        { label: 'GPP', icon: 'view_list',
                            items: [
                                { label: 'Dashboard', icon: 'subject' },
                                { label: 'Projetos', icon: 'subject', routerLink: '/projetos' },
                                { label: 'Processos', icon: 'call_split' }
                            ]
                        },
                    ]
                },
                { label: 'Diretoria', icon: 'business_center',
                    items: [
                        { label: 'Indicadores', icon: 'subject' },
                        { label: 'Projetos', icon: 'subject' }
                    ]
                },
                { label: 'Comercial', icon: 'monetization_on',
                    items: [
                        {
                            label: 'Comissão de Fraudes', icon: 'subject',
                            items: [
                                { label: 'Gestão de deliberações', icon: 'subject' },
                                { label: 'Controle de fraudes', icon: 'subject' }
                            ]
                        },
                        { label: 'Receita', icon: 'subject' },
                        { label: 'Cobrança', icon: 'subject' },
                        { label: 'Atendimento', icon: 'subject' },
                        { label: 'Cadastro', icon: 'subject' }
                    ]
                },
                { label: 'Operacional', icon: 'invert_colors',
                    items: [
                        { label: 'Operação Água', icon: 'subject' },
                        { label: 'Operação Esgoto', icon: 'subject' },
                        { label: 'Eletromecânica', icon: 'settings_input_component',
                            items: [
                                { label: 'Preventivas/Corretivas', icon: 'subject' },
                                { label: 'Inventário', icon: 'subject' }
                            ]
                        },
                    ]
                },
                { label: 'Administrativo', icon: 'domain',
                    items: [
                        { label: 'Contratos', icon: 'subject' },
                        { label: 'Facilities', icon: 'subject' },
                        { label: 'Compras', icon: 'subject' }
                    ]
                },
                { label: 'Serviços', icon: 'build',
                    items: []
                },
                { label: 'Comunicação', icon: 'videocam',
                    items: []
                },
                { label: 'Jurídico', icon: 'gavel',
                    items: [
                        { label: 'Processos', icon: 'subject' },
                        { label: 'Regulatório', icon: 'subject' }
                    ]
                },
                { label: 'Recursos Humanos', icon: 'people',
                    items: []
                },
                { label: 'EHS', icon: 'local_florist',
                    items: [
                        { label: 'Planejamento', icon: 'subject' },
                        { label: 'Gestão', icon: 'subject' }
                    ]
                },
            ];
        });
    }
};
AppMenuComponent = tslib_1.__decorate([
    Component({
        selector: 'app-menu',
        template: `
            <div class="menu-scroll-content">
            <ul app-submenu [item]="model" root="true" class="navigation-menu" visible="true" parentActive="true"></ul>
            </div>
            `
    }),
    tslib_1.__metadata("design:paramtypes", [AppMainComponent, PerformanceService])
], AppMenuComponent);
export { AppMenuComponent };
let AppSubMenuComponent = class AppSubMenuComponent {
    constructor(app, router, location) {
        this.app = app;
        this.router = router;
        this.location = location;
    }
    itemClick(event, item, index) {
        // avoid processing disabled items
        if (item.disabled) {
            event.preventDefault();
            return true;
        }
        // activate current item and deactivate active sibling if any
        this.activeIndex = (this.activeIndex === index) ? null : index;
        // execute command
        if (item.command) {
            item.command({ originalEvent: event, item });
        }
        // prevent hash change
        if (item.items || (!item.url && !item.routerLink)) {
            event.preventDefault();
        }
        // hide menu
        if (!item.items && this.app.overlay) {
            this.app.sidebarActive = false;
        }
    }
    isActive(index) {
        return this.activeIndex === index;
    }
    unsubscribe(item) {
        if (item.eventEmitter) {
            item.eventEmitter.unsubscribe();
        }
        if (item.items) {
            for (const childItem of item.items) {
                this.unsubscribe(childItem);
            }
        }
    }
    get parentActive() {
        return this._parentActive;
    }
    set parentActive(val) {
        this._parentActive = val;
        if (!this._parentActive) {
            this.activeIndex = null;
        }
    }
};
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Object)
], AppSubMenuComponent.prototype, "item", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Boolean)
], AppSubMenuComponent.prototype, "root", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Boolean)
], AppSubMenuComponent.prototype, "visible", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Boolean),
    tslib_1.__metadata("design:paramtypes", [Boolean])
], AppSubMenuComponent.prototype, "parentActive", null);
AppSubMenuComponent = tslib_1.__decorate([
    Component({
        /* tslint:disable:component-selector */
        selector: '[app-submenu]',
        /* tslint:enable:component-selector */
        template: `
        <ng-template ngFor let-child let-i="index" [ngForOf]="(root ? item : item.items)">
            <li [ngClass]="{'active-menuitem': isActive(i)}" [class]="child.badgeStyleClass" *ngIf="child.visible === false ? false : true">
                <a [href]="child.url||'#'" (click)="itemClick($event,child,i)" class="ripplelink"
                   *ngIf="!child.routerLink" [attr.tabindex]="!visible ? '-1' : null" [attr.target]="child.target"
                    (mouseenter)="hover=true" (mouseleave)="hover=false">
                    <i class="material-icons">{{child.icon}}</i>
                    <span>{{child.label}}</span>
                    <span class="ink" *ngIf="hover"></span>
                    <span class="menuitem-badge" *ngIf="child.badge">{{child.badge}}</span>
                    <i class="material-icons" *ngIf="child.items">keyboard_arrow_down</i>
                </a>

                <a (click)="itemClick($event,child,i)" class="ripplelink" *ngIf="child.routerLink"
                    [routerLink]="child.routerLink" routerLinkActive="active-menuitem-routerlink"
                   [routerLinkActiveOptions]="{exact: true}" [attr.tabindex]="!visible ? '-1' : null" [attr.target]="child.target"
                    (mouseenter)="hover=true" (mouseleave)="hover=false">
                    <i class="material-icons">{{child.icon}}</i>
                    <span>{{child.label}}</span>
                    <span class="ink" *ngIf="hover"></span>
                    <span class="menuitem-badge" *ngIf="child.badge">{{child.badge}}</span>
                    <i class="material-icons" *ngIf="child.items">keyboard_arrow_down</i>
                </a>
                <ul app-submenu [item]="child" *ngIf="child.items" [parentActive]="isActive(i)" [@children]="isActive(i) ?
                'visible' : 'hidden'" [visible]="isActive(i)"></ul>
            </li>
        </ng-template>
    `,
        animations: [
            trigger('children', [
                state('hidden', style({
                    height: '0px'
                })),
                state('visible', style({
                    height: '*'
                })),
                transition('visible => hidden', animate('400ms cubic-bezier(0.86, 0, 0.07, 1)')),
                transition('hidden => visible', animate('400ms cubic-bezier(0.86, 0, 0.07, 1)'))
            ])
        ]
    }),
    tslib_1.__metadata("design:paramtypes", [AppMainComponent, Router, Location])
], AppSubMenuComponent);
export { AppSubMenuComponent };
//# sourceMappingURL=app.menu.component.js.map