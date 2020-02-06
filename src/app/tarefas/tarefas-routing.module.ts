import { Routes } from '@angular/router';

import { ListarComponent } from '../../environments';
import { CadastrarComponent } from './cadastrar';
import { EditarComponent } from './editar';

export const TarefaRoutes: Routes = [
	{ 
		path: 'tarefas', 
		redirectTo: 'tarefas/listar' 
	},
	{ 
		path: 'tarefas/listar', 
		component: ListarComponent 
	},
	{ 
		path: 'tarefas/cadastrar', 
		component: CadastrarComponent 
	},
	{ 
		path: 'tarefas/editar/:id', 
		component: EditarComponent 
	}
];