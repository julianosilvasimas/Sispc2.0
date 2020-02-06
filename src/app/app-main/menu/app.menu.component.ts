import {Component, Input, OnInit} from '@angular/core';
import {trigger, state, style, transition, animate} from '@angular/animations';
import {Location} from '@angular/common';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/primeng';
import {AppMainComponent} from '../app.main.component';
import { PerformanceService } from './../../performance/performance.service';

@Component({
    selector: 'app-menu',
    template: `
            <div class="menu-scroll-content">
            <ul app-submenu [item]="model" root="true" class="navigation-menu" visible="true" parentActive="true"></ul>
            </div>
            `
})
export class AppMenuComponent implements OnInit {

    public model: any[];

    constructor(public app: AppMainComponent, private performanceService: PerformanceService) {
        
    }

    indicadores: any[];
    gerencias: any[];

    ngOnInit() {
        this.performanceService.classindicadores(6)
        .subscribe(response => {this.indicadores = response
            //console.log(response)
        });

        this.performanceService.gerencias()
        .subscribe(response => {this.gerencias = response.splice(2, Number.MAX_VALUE)
           
        this.model = [
            {
                label: 'Performance', icon: 'timeline',
                items: [
                    {
                        label: 'Acompanhamento', icon: 'subject',
                        items: this.gerencias
                        
                    }/*,
                    {
                        label: 'Fechamento', icon: 'subject',
                        items: [
                            {label: 'Relatórios por área', icon: 'subject'},
                            {label: 'Arquivamento', icon: 'subject'}
                        ]
                    }*/
                ],
            },
            {label: 'Planejamento', icon: 'equalizer',
             items: [
                /*{label: 'Capex', icon: 'subject'},
                {label: 'Opex', icon: 'subject'},
                {label: 'DRE', icon: 'subject'},*/
                {label: 'GPP', icon: 'view_list',
                    items: [
                        {label: 'Dashboard', icon: 'subject'},
                        {label: 'Projetos', icon: 'subject', routerLink: '/projetos'},
                        {label: 'Processos', icon: 'call_split'}
                    ]
                },
                // {label: 'RPA', icon: 'pi-android',
                //     items: [
                //         {label: 'Robos', icon: 'pi-android', routerLink: '/rpa'}
                //     ]
                // },
             ]
            },/*
            {label: 'Diretoria', icon: 'business_center',
             items: [
                {label: 'Indicadores', icon: 'subject'},
                {label: 'Projetos', icon: 'subject'}
             ]
            },*/
            {label: 'Comercial', icon: 'monetization_on',
             items: [
                 {
                    label: 'Comissão de Fraudes', icon: 'subject',
                    items: [
                        {label: 'Gestão de deliberações', icon: 'subject' , routerLink: '/painelprocess'}/*,
                        {label: 'Controle de fraudes', icon: 'subject'}   */
                    ]
                 }/*,
                {label: 'Receita', icon: 'subject'},
                {label: 'Cobrança', icon: 'subject'},
                {label: 'Atendimento', icon: 'subject'},
                {label: 'Cadastro', icon: 'subject'}*/
                ]
            },
            // {label: 'Transporte', icon: 'directions_car',
            //  items: [
            //      {label: 'Gestão de Frotas', icon: 'subject' , routerLink: '/transporte'},
            //      {label: 'Agendamento', icon: 'subject' , routerLink: '#'}
            //     ]
            // }
            
            
            
            
            
            
            
            /*,{label: 'Operacional', icon: 'invert_colors',
             items: [
                {label: 'Operação Água', icon: 'subject'},
                {label: 'Operação Esgoto', icon: 'subject'},
                {label: 'Eletromecânica', icon: 'settings_input_component',
                    items: [
                        {label: 'Preventivas/Corretivas', icon: 'subject'},
                        {label: 'Inventário', icon: 'subject'}
                    ]
                },
             ]
            },
            {label: 'Administrativo', icon: 'domain',
             items: [
                 {label: 'Contratos', icon: 'subject'},
                 {label: 'Facilities', icon: 'subject'},
                 {label: 'Compras', icon: 'subject'}
                ]
            },
            {label: 'Serviços', icon: 'build',
             items: [

             ]
            },
            {label: 'Comunicação', icon: 'videocam',
             items: [

             ]
            },
            {label: 'Jurídico', icon: 'gavel',
             items: [
                {label: 'Processos', icon: 'subject'},
                {label: 'Regulatório', icon: 'subject'}
             ]
            },
            {label: 'Recursos Humanos', icon: 'people',
             items: [

             ]
            },
            {label: 'EHS', icon: 'local_florist',
             items: [
                {label: 'Planejamento', icon: 'subject'},
                {label: 'Gestão', icon: 'subject'}
             ]
            },*/
        ];
    }
);}
}

@Component({
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
})
export class AppSubMenuComponent {

    @Input() item: MenuItem;

    @Input() root: boolean;

    @Input() visible: boolean;

    _parentActive: boolean;

    activeIndex: number;

    hover: boolean;

    constructor(public app: AppMainComponent, public router: Router, public location: Location) {}

    itemClick(event: Event, item: MenuItem, index: number) {
        // avoid processing disabled items
        if (item.disabled) {
            event.preventDefault();
            return true;
        }

        // activate current item and deactivate active sibling if any
        this.activeIndex = (this.activeIndex === index) ? null : index;

        // execute command
        if (item.command) {
            item.command({originalEvent: event, item});
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

    isActive(index: number): boolean {
        return this.activeIndex === index;
    }

    unsubscribe(item: any) {
        if (item.eventEmitter) {
            item.eventEmitter.unsubscribe();
        }

        if (item.items) {
            for (const childItem of item.items) {
                this.unsubscribe(childItem);
            }
        }
    }

    @Input() get parentActive(): boolean {
        return this._parentActive;
    }

    set parentActive(val: boolean) {
        this._parentActive = val;

        if (!this._parentActive) {
            this.activeIndex = null;
        }
    }
}
