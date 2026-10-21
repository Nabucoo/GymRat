from urllib.parse import quote

if __package__:
    from .ApiClient import ApiError
else:
    from ApiClient import ApiError


class ExerciciosPage:
    CATEGORIAS = ("Costas", "Peito", "Biceps", "Triceps", "Ombros", "Pernas")

    def __init__(self, api):
        self.api = api

    @staticmethod
    def _mostrar_lista(exercicios):
        if not exercicios:
            print("Nenhum exercício encontrado.")
            return
        for exercicio in exercicios:
            print(
                f"ID: {exercicio['id_exercicio']} | {exercicio['nome']} | "
                f"Grupo: {exercicio.get('grupo_muscular', '')} | "
                f"Carga: {exercicio['carga']} | Séries: {exercicio['series']} | "
                f"Repetições: {exercicio['repeticoes']}"
            )

    def mostrar(self):
        while True:
            print("\n=== Exercícios ===")
            print("1. Listar exercícios")
            print("2. Listar por categoria")
            print("3. Adicionar exercício")
            print("4. Remover exercício")
            print("5. Editar exercício")
            print("6. Voltar")
            opcao = input("Escolha uma opção: ").strip()

            try:
                if opcao == "1":
                    self._mostrar_lista(self.api.listar_exercicios())
                elif opcao == "2":
                    self.listar_por_categoria()
                elif opcao == "3":
                    self.adicionar()
                elif opcao == "4":
                    self.remover()
                elif opcao == "5":
                    self.editar()
                elif opcao == "6":
                    return
                else:
                    print("Opção inválida.")
            except ApiError as erro:
                print(f"Erro: {erro}")

    def _escolher_categoria(self):
        for indice, categoria in enumerate(self.CATEGORIAS, start=1):
            print(f"{indice}. {categoria}")
        try:
            indice = int(input("Escolha a categoria: "))
            return self.CATEGORIAS[indice - 1]
        except (ValueError, IndexError):
            print("Categoria inválida.")
            return None

    def listar_por_categoria(self):
        categoria = self._escolher_categoria()
        if categoria:
            self._mostrar_lista(self.api.listar_exercicios_por_categoria(quote(categoria)))

    def adicionar(self):
        nome = input("Nome: ").strip()
        if not nome:
            print("O nome é obrigatório.")
            return
        grupo = self._escolher_categoria()
        if not grupo:
            return
        dados = {
            "nome": nome,
            "grupo_muscular": grupo,
            "carga": self._ler_numero("Carga", float),
            "series": self._ler_numero("Séries", int),
            "repeticoes": self._ler_numero("Repetições", int),
        }
        exercicio = self.api.criar_exercicio(dados)
        print(f"Exercício criado: {exercicio['nome']} (ID {exercicio['id_exercicio']}).")

    def _selecionar_exercicio(self):
        exercicios = self.api.listar_exercicios()
        self._mostrar_lista(exercicios)
        if not exercicios:
            return None
        id_exercicio = input("ID do exercício: ").strip()
        return next(
            (item for item in exercicios if str(item["id_exercicio"]) == id_exercicio),
            None,
        )

    def remover(self):
        exercicio = self._selecionar_exercicio()
        if not exercicio:
            print("Exercício não encontrado.")
            return
        if input(f"Remover {exercicio['nome']}? (s/N): ").strip().lower() != "s":
            print("Remoção cancelada.")
            return
        self.api.remover_exercicio(exercicio["id_exercicio"])
        print("Exercício removido.")

    def editar(self):
        exercicio = self._selecionar_exercicio()
        if not exercicio:
            print("Exercício não encontrado.")
            return
        nome = input(f"Nome [{exercicio['nome']}]: ").strip() or exercicio["nome"]
        grupo_atual = exercicio.get("grupo_muscular", "")
        grupo = input(f"Grupo muscular [{grupo_atual}]: ").strip() or grupo_atual
        dados = {
            "id_exercicio": exercicio["id_exercicio"],
            "nome": nome,
            "grupo_muscular": grupo,
            "carga": self._ler_numero("Carga", float, exercicio["carga"]),
            "series": self._ler_numero("Séries", int, exercicio["series"]),
            "repeticoes": self._ler_numero("Repetições", int, exercicio["repeticoes"]),
        }
        atualizado = self.api.editar_exercicio(dados)
        print(f"Exercício editado: {atualizado['nome']}.")

    @staticmethod
    def _ler_numero(rotulo, conversor, valor_atual=None):
        while True:
            sufixo = f" [{valor_atual}]" if valor_atual is not None else ""
            texto = input(f"{rotulo}{sufixo}: ").strip()
            if not texto and valor_atual is not None:
                return valor_atual
            try:
                return conversor(texto.replace(",", ".") if conversor is float else texto)
            except ValueError:
                print("Digite um valor numérico válido.")
