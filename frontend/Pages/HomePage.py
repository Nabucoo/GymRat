if __package__:
    from .FichasPage import FichasPage
    from .ExerciciosPage import ExerciciosPage
    from .MedidasPage import MedidasPage
    from .ApiClient import ApiError
else:
    from FichasPage import FichasPage
    from ExerciciosPage import ExerciciosPage
    from MedidasPage import MedidasPage
    from ApiClient import ApiError


class HomePage:
    def __init__(self, api):
        self.api = api

    def mostrar(self):
        while True:
            print("\n=== GymRat ===")
            print("1. Fichas")
            print("2. Exercícios")
            print("3. Medidas")
            print("4. Deletar conta")
            print("5. Sair")
            opcao = input("Escolha uma opção: ").strip()

            try:
                if opcao == "1":
                    FichasPage(self.api).mostrar()
                elif opcao == "2":
                    ExerciciosPage(self.api).mostrar()
                elif opcao == "3":
                    MedidasPage(self.api).mostrar()
                elif opcao == "4":
                    print("A exclusão da conta é permanente.")
                    confirmacao = input("Digite EXCLUIR para confirmar: ").strip()
                    if confirmacao != "EXCLUIR":
                        print("Exclusão cancelada.")
                        continue

                    resultado = self.api.remover_usuario()
                    print(resultado.get("mensagem", "Conta removida com sucesso."))
                    return
                elif opcao == "5":
                    print("Até mais!")
                    return
                else:
                    print("Opção inválida.")
            except ApiError as erro:
                print(f"Erro: {erro}")
