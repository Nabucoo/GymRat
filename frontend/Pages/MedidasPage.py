from datetime import datetime

if __package__:
    from .ApiClient import ApiError
else:
    from ApiClient import ApiError


class MedidasPage:
    def __init__(self, api):
        self.api = api

    def mostrar(self):
        while True:
            print("\n=== Medidas ===")
            print("1. Adicionar medida")
            print("2. Editar medida")
            print("3. Remover medida")
            print("4. Ver medida")
            print("5. Voltar")
            opcao = input("Escolha uma opção: ").strip()

            try:
                if opcao == "1":
                    self.adicionar()
                elif opcao == "2":
                    self.editar()
                elif opcao == "3":
                    self.remover()
                elif opcao == "4":
                    self.ver()
                elif opcao == "5":
                    return
                else:
                    print("Opção inválida.")
            except ApiError as erro:
                print(f"Erro: {erro}")

    @staticmethod
    def _ler_data(data_atual=None):
        while True:
            sugestao = f" [{data_atual}]" if data_atual else ""
            data = input(f"Data (AAAA-MM-DD){sugestao}: ").strip()
            if not data and data_atual:
                return data_atual
            try:
                datetime.strptime(data, "%Y-%m-%d")
                return data
            except ValueError:
                print("Data inválida. Use o formato AAAA-MM-DD, por exemplo 2026-10-21.")

    @staticmethod
    def _ler_positivo(rotulo, valor_atual=None):
        while True:
            sugestao = f" [{valor_atual}]" if valor_atual is not None else ""
            texto = input(f"{rotulo}{sugestao}: ").strip()
            if not texto and valor_atual is not None:
                return valor_atual
            try:
                valor = float(texto.replace(",", "."))
                if valor > 0:
                    return valor
            except ValueError:
                pass
            print("Digite um número positivo válido.")

    def _id_medida(self):
        if self.api.medida_id is not None:
            return self.api.medida_id
        id_medida = input("ID da medida: ").strip()
        if not id_medida:
            print("O backend exige o ID para consultar, editar ou remover a medida.")
            return None
        return id_medida

    @staticmethod
    def _mostrar_medida(medida):
        print(
            f"ID: {medida['id_medida']} | Altura: {medida['altura']} | "
            f"Peso: {medida['peso']} | Data: {str(medida['data'])[:10]}"
        )

    def adicionar(self):
        altura = self._ler_positivo("Altura em metros")
        peso = self._ler_positivo("Peso em kg")
        data = self._ler_data()
        medida = self.api.criar_medida(altura, peso, data)
        print("Medida cadastrada:")
        self._mostrar_medida(medida)

    def ver(self):
        id_medida = self._id_medida()
        if id_medida is None:
            return
        self._mostrar_medida(self.api.obter_medida(id_medida))

    def editar(self):
        id_medida = self._id_medida()
        if id_medida is None:
            return
        medida = self.api.obter_medida(id_medida)
        altura = self._ler_positivo("Altura em metros", medida["altura"])
        peso = self._ler_positivo("Peso em kg", medida["peso"])
        data = self._ler_data(str(medida["data"])[:10])
        atualizada = self.api.editar_medida(id_medida, altura, peso, data)
        print("Medida atualizada:")
        self._mostrar_medida(atualizada)

    def remover(self):
        id_medida = self._id_medida()
        if id_medida is None:
            return
        medida = self.api.obter_medida(id_medida)
        self._mostrar_medida(medida)
        if input("Remover esta medida? (s/N): ").strip().lower() != "s":
            print("Remoção cancelada.")
            return
        removida = self.api.remover_medida(id_medida)
        print(f"Medida {removida['id_medida']} removida.")
