if __package__:
    from .FichaPage import FichaPage
    from .ApiClient import ApiError
else:
    from FichaPage import FichaPage
    from ApiClient import ApiError


class FichasPage:
    def __init__(self, api):
        self.api = api

    def _listar(self):
        fichas = self.api.listar_fichas()
        if not fichas:
            print("Você ainda não tem fichas cadastradas.")
            return []
        for ficha in fichas:
            print(f"ID: {ficha['id_ficha']} | {ficha['nome']} — {ficha.get('descricao') or ''}")
        return fichas

    def mostrar(self):
        while True:
            print("\n=== Fichas ===")
            print("1. Listar fichas")
            print("2. Adicionar ficha")
            print("3. Remover ficha")
            print("4. Editar ficha")
            print("5. Entrar em uma ficha")
            print("6. Voltar")
            opcao = input("Escolha uma opção: ").strip()

            try:
                if opcao == "1":
                    self._listar()
                elif opcao == "2":
                    self.adicionar()
                elif opcao == "3":
                    self.remover()
                elif opcao == "4":
                    self.editar()
                elif opcao == "5":
                    self.entrar()
                elif opcao == "6":
                    return
                else:
                    print("Opção inválida.")
            except ApiError as erro:
                print(f"Erro: {erro}")

    def adicionar(self):
        nome = input("Nome da ficha: ").strip()
        if not nome:
            print("O nome é obrigatório.")
            return
        descricao = input("Descrição: ").strip()
        ficha = self.api.criar_ficha(nome, descricao)
        print(f"Ficha criada: {ficha['nome']} (ID {ficha['id_ficha']}).")

    def remover(self):
        if not self._listar():
            return
        id_ficha = input("ID da ficha a remover: ").strip()
        confirmacao = input(f"Remover a ficha {id_ficha}? (s/N): ").strip().lower()
        if confirmacao != "s":
            print("Remoção cancelada.")
            return
        ficha = self.api.remover_ficha(id_ficha)
        print(f"Ficha removida: {ficha['nome']}.")

    def editar(self):
        if not self._listar():
            return
        id_ficha = input("ID da ficha a editar: ").strip()
        ficha_atual = self.api.obter_ficha(id_ficha)
        nome = input(f"Novo nome [{ficha_atual['nome']}]: ").strip() or ficha_atual["nome"]
        descricao_atual = ficha_atual.get("descricao") or ""
        descricao = input(f"Nova descrição [{descricao_atual}]: ").strip() or descricao_atual
        ficha = self.api.editar_ficha(id_ficha, nome, descricao)
        print(f"Ficha editada: {ficha['nome']}.")

    def entrar(self):
        if not self._listar():
            return
        id_ficha = input("ID da ficha: ").strip()
        ficha = self.api.obter_ficha(id_ficha)
        FichaPage(self.api, ficha).mostrar()
