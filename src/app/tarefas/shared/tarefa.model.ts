export class Tarefa {
	
	constructor(
		public id?: number,
		public nome?: string,
		public inicioPrevisto?: string,
		public dataInicio?: string,
		public conclusaoPrevista?: string,
		public dataConclusao?: string,
		public responsavel?: string,
		public concluida?: boolean) {}

	public getId(): number {
		return this.id;
	}

	public setId(id: number): void {
		this.id = id;
	}	

	public getNome(): string {
		return this.nome;
	}

	public setNome(nome: string): void {
		this.nome = nome;
	}

	public getInicioPrevisto(): string {
		return this.inicioPrevisto;
	}

	public setInicioPrevisto(inicioPrevisto: string): void {
		this.inicioPrevisto = inicioPrevisto;
	}

	public getConclusaoPrevista(): string {
		return this.conclusaoPrevista;
	}

	public setConclusaoPrevista(conclusaoPrevista: string): void {
		this.conclusaoPrevista = conclusaoPrevista;
	}

	public getDataInicio(): string {
		return this.dataInicio;
	}

	public setDataInicio(dataInicio: string): void {
		this.dataInicio = dataInicio;
	}
	
	public getDataConclusao(): string {
		return this.dataConclusao ;
	}

	public setDataConclusao(dataConclusao: string): void {
		this.dataConclusao = dataConclusao ;
	}

	public setResponsavel(responsavel: string): void {
		this.responsavel = responsavel ;
	}

	public getResponsavel(): string {
		return this.responsavel ;
	}

	
	public estaConcluida(): boolean {
		return this.concluida;
	}

	public setConcluida(concluida: boolean): void {
		this.concluida = concluida;
	}

	public getConcluida(): boolean {
		return this.concluida ;
	}
}