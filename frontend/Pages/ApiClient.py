import requests


class ApiError(Exception):
    def __init__(self, mensagem, status_code=None):
        super().__init__(mensagem)
        self.status_code = status_code


class ApiClient:
    def __init__(self, token, base_url="http://localhost:3000/api/v1"):
        self.token = token
        self.base_url = base_url.rstrip("/")
        self.medida_id = None

    def requisitar(self, metodo, caminho, **kwargs):
        headers = kwargs.pop("headers", {})
        headers["Authorization"] = f"Bearer {self.token}"
        try:
            resposta = requests.request(
                metodo,
                f"{self.base_url}{caminho}",
                headers=headers,
                timeout=10,
                **kwargs,
            )
        except requests.RequestException as erro:
            raise ApiError(f"Não foi possível conectar ao servidor: {erro}") from erro

        try:
            dados = resposta.json() if resposta.content else {}
        except ValueError:
            dados = {}

        if not resposta.ok:
            mensagem = dados.get("mensagem", f"Erro HTTP {resposta.status_code}")
            raise ApiError(mensagem, resposta.status_code)
        return dados

    # Fichas
    def listar_fichas(self):
        return self.requisitar("GET", "/fichas/listar").get("fichas", [])

    def obter_ficha(self, id_ficha):
        return self.requisitar("GET", f"/fichas/{id_ficha}")["ficha"]

    def criar_ficha(self, nome, descricao):
        return self.requisitar(
            "POST", "/fichas/cadastrar", json={"nome": nome, "descricao": descricao}
        )["ficha"]

    def editar_ficha(self, id_ficha, nome, descricao):
        return self.requisitar(
            "PATCH",
            "/fichas/editar",
            json={"id_ficha": id_ficha, "nome": nome, "descricao": descricao},
        )["ficha"]

    def remover_ficha(self, id_ficha):
        return self.requisitar("DELETE", f"/fichas/{id_ficha}")["ficha"]

    # Exercícios
    def listar_exercicios(self):
        return self.requisitar("GET", "/exercicio/listar").get("exercicios", [])

    def listar_exercicios_por_categoria(self, categoria):
        return self.requisitar(
            "GET", f"/exercicio/categoria/{categoria}"
        ).get("exercicios", [])

    def criar_exercicio(self, dados):
        return self.requisitar("POST", "/exercicio/cadastrar", json=dados)["exercicio"]

    def editar_exercicio(self, dados):
        return self.requisitar("PATCH", "/exercicio/editar", json=dados)["exercicio"]

    def remover_exercicio(self, id_exercicio):
        return self.requisitar("DELETE", f"/exercicio/{id_exercicio}")["exercicio"]

    # Relação ficha-exercício
    def adicionar_exercicio_a_ficha(self, id_ficha, id_exercicio):
        return self.requisitar(
            "POST", f"/ficha_exercicio/{id_ficha}/{id_exercicio}"
        )["ficha"]

    def remover_exercicio_da_ficha(self, id_ficha, id_exercicio):
        return self.requisitar(
            "DELETE", f"/ficha_exercicio/{id_ficha}/{id_exercicio}"
        )["ficha"]

    # Medidas
    def criar_medida(self, altura, peso, data):
        resultado = self.requisitar(
            "POST",
            "/medidas/cadastrar",
            json={"altura": altura, "peso": peso, "data": data},
        )["medida"]
        self.medida_id = resultado["id_medida"]
        return resultado

    def obter_medida(self, id_medida):
        resultado = self.requisitar("GET", f"/medidas/{id_medida}")["medida"]
        self.medida_id = resultado["id_medida"]
        return resultado

    def editar_medida(self, id_medida, altura, peso, data):
        resultado = self.requisitar(
            "PATCH",
            "/medidas/editar",
            json={
                "id_medida": id_medida,
                "altura": altura,
                "peso": peso,
                "data": data,
            },
        )["medida"]
        self.medida_id = resultado["id_medida"]
        return resultado

    def remover_medida(self, id_medida):
        resultado = self.requisitar("DELETE", f"/medidas/{id_medida}")["medida"]
        if str(self.medida_id) == str(id_medida):
            self.medida_id = None
        return resultado
