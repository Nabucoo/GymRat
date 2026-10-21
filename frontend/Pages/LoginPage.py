import requests

if __package__:
    from .ApiClient import ApiClient
    from .HomePage import HomePage
else:
    from ApiClient import ApiClient
    from HomePage import HomePage


class LoginPage:
    url = "http://localhost:3000/api/v1/usuario"

    def mostrar(self):
        while True:
            print("\n=== GymRat ===")
            print("1. Entrar")
            print("2. Cadastrar")
            print("3. Sair")
            opcao = input("Escolha uma opção: ").strip()

            if opcao == "1":
                if self.entrar():
                    return
            elif opcao == "2":
                self.cadastrar()
            elif opcao == "3":
                print("Até mais!")
                return
            else:
                print("Opção inválida.")

    def _post(self, caminho, dados):
        try:
            resposta = requests.post(
                f"{self.url}/{caminho}", json=dados, timeout=10
            )
        except requests.RequestException as erro:
            print(f"Não foi possível conectar ao servidor: {erro}")
            return None

        try:
            resultado = resposta.json()
        except ValueError:
            resultado = {}

        if not resposta.ok:
            print(resultado.get("mensagem", f"Erro HTTP {resposta.status_code}"))
            return None
        return resultado

    def entrar(self):
        email = input("Email: ").strip()
        senha = input("Senha: ")
        resultado = self._post("logar", {"email": email, "senha": senha})
        if not resultado:
            return False

        token = resultado.get("token")
        if not token:
            print("O servidor não retornou o token de autenticação.")
            return False

        print("Usuário logado!")
        HomePage(ApiClient(token)).mostrar()
        return True

    def cadastrar(self):
        nome = input("Nome: ").strip()
        email = input("Email: ").strip()
        senha = input("Senha: ")
        resultado = self._post(
            "cadastrar", {"nome": nome, "email": email, "senha": senha}
        )
        if resultado:
            print("Usuário criado! Faça login para continuar.")


if __name__ == "__main__":
    LoginPage().mostrar()
