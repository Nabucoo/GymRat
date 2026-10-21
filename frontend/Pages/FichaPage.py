if __package__:
    from .ApiClient import ApiError
else:
    from ApiClient import ApiError


class FichaPage:
    CATEGORIAS = ("Costas", "Peito", "Biceps", "Triceps", "Ombros", "Pernas")

    def __init__(self, api, ficha):
        self.api = api
        self.ficha = ficha

    def _atualizar(self):
        self.ficha = self.api.obter_ficha(self.ficha["id_ficha"])

    def _mostrar_exercicios(self):
        self._atualizar()
        exercicios = self.ficha.get("exercicios", [])
        print(f"\nFicha: {self.ficha['nome']} (ID {self.ficha['id_ficha']})")
        if not exercicios:
            print("Esta ficha ainda não tem exercícios.")
            return []
        for exercicio in exercicios:
            print(
                f"ID: {exercicio['id_exercicio']} | {exercicio['nome']} | "
                f"Grupo: {exercicio.get('grupo_muscular', '')} | "
                f"Carga: {exercicio['carga']} | Séries: {exercicio['series']} | "
                f"Repetições: {exercicio['repeticoes']}"
            )
        return exercicios

    def mostrar(self):
        while True:
            print(f"\n=== Ficha: {self.ficha['nome']} ===")
            print("1. Listar exercícios da ficha")
            print("2. Adicionar exercício")
            print("3. Remover exercício")
            print("4. Editar ficha")
            print("5. Editar exercício")
            print("6. Voltar")
            opcao = input("Escolha uma opção: ").strip()

            try:
                if opcao == "1":
                    self._mostrar_exercicios()
                elif opcao == "2":
                    self.adicionar_exercicio()
                elif opcao == "3":
                    self.remover_exercicio()
                elif opcao == "4":
                    self.editar_ficha()
                elif opcao == "5":
                    self.editar_exercicio()
                elif opcao == "6":
                    return
                else:
                    print("Opção inválida.")
            except ApiError as erro:
                print(f"Erro: {erro}")

    def adicionar_exercicio(self):
        print("\nGrupos musculares:")
        for indice, categoria in enumerate(self.CATEGORIAS, start=1):
            print(f"{indice}. {categoria}")
        try:
            indice = int(input("Escolha o grupo: "))
            categoria = self.CATEGORIAS[indice - 1]
        except (ValueError, IndexError):
            print("Grupo inválido.")
            return

        exercicios = self.api.listar_exercicios_por_categoria(categoria)
        if not exercicios:
            print(f"Nenhum exercício encontrado no grupo {categoria}.")
            return
        for exercicio in exercicios:
            print(
                f"ID: {exercicio['id_exercicio']} | {exercicio['nome']} | "
                f"Carga: {exercicio['carga']} | Séries: {exercicio['series']} | "
                f"Repetições: {exercicio['repeticoes']}"
            )
        id_exercicio = input("ID do exercício para adicionar: ").strip()
        self.ficha = self.api.adicionar_exercicio_a_ficha(
            self.ficha["id_ficha"], id_exercicio
        )
        print("Exercício adicionado à ficha.")

    def remover_exercicio(self):
        exercicios = self._mostrar_exercicios()
        if not exercicios:
            return
        id_exercicio = input("ID do exercício para remover da ficha: ").strip()
        self.ficha = self.api.remover_exercicio_da_ficha(
            self.ficha["id_ficha"], id_exercicio
        )
        print("Exercício removido da ficha.")

    def editar_ficha(self):
        nome_atual = self.ficha["nome"]
        descricao_atual = self.ficha.get("descricao") or ""
        nome = input(f"Novo nome [{nome_atual}]: ").strip() or nome_atual
        descricao = input(f"Nova descrição [{descricao_atual}]: ").strip() or descricao_atual
        self.api.editar_ficha(self.ficha["id_ficha"], nome, descricao)
        self._atualizar()
        print("Ficha editada.")

    def editar_exercicio(self):
        exercicios = self._mostrar_exercicios()
        if not exercicios:
            return
        id_exercicio = input("ID do exercício a editar: ").strip()
        exercicio = next(
            (item for item in exercicios if str(item["id_exercicio"]) == id_exercicio),
            None,
        )
        if exercicio is None:
            print("Esse exercício não está na ficha.")
            return

        nome = input(f"Nome [{exercicio['nome']}]: ").strip() or exercicio["nome"]
        grupo = input(
            f"Grupo muscular [{exercicio.get('grupo_muscular', '')}]: "
        ).strip() or exercicio.get("grupo_muscular", "")
        carga = self._ler_numero("Carga", exercicio["carga"], float)
        series = self._ler_numero("Séries", exercicio["series"], int)
        repeticoes = self._ler_numero("Repetições", exercicio["repeticoes"], int)
        self.api.editar_exercicio(
            {
                "id_exercicio": id_exercicio,
                "nome": nome,
                "grupo_muscular": grupo,
                "carga": carga,
                "series": series,
                "repeticoes": repeticoes,
            }
        )
        self._atualizar()
        print("Exercício editado.")

    @staticmethod
    def _ler_numero(rotulo, valor_atual, conversor):
        while True:
            texto = input(f"{rotulo} [{valor_atual}]: ").strip()
            if not texto:
                return valor_atual
            try:
                return conversor(texto.replace(",", ".") if conversor is float else texto)
            except ValueError:
                print("Digite um valor numérico válido.")
