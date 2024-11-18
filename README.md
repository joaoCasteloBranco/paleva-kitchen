# Kitchen - PaLeva

Este é um sistema de gerenciamento de pedidos para restaurantes, desenvolvido utilizando **Vue.js** e **TailwindCSS**. Ele permite visualizar, pesquisar, e alterar o status de pedidos de um restaurante, além de trocar dinamicamente o restaurante monitorado.

---

## 📋 Funcionalidades

1. **Visualização de Pedidos**  
   - Lista de pedidos exibidos com código, nome do cliente e status (traduzido).
   - Pedidos ordenados cronologicamente, do mais antigo para o mais recente.

2. **Detalhamento do Pedido**  
   - Exibe informações detalhadas do pedido selecionado:
     - Código do pedido.
     - Nome do cliente.
     - Data de criação.
     - Informações de contato (telefone e e-mail).
     - Itens e observações do pedido.

3. **Pesquisa de Pedidos**  
   - Campo para pesquisar pedidos pelo nome do cliente, código ou status.

4. **Alteração de Status**  
   - Botão para iniciar o preparo de pedidos aguardando confirmação.
   - Botão para finalizar pedidos em preparo.

5. **Troca de Restaurante**  
   - Campo de entrada para alterar o restaurante monitorado, permitindo recarregar os pedidos dinamicamente.

6. **Tradução de Status**  
   - Tradução automática de status do pedido para português.

---

## 🛠️ Tecnologias Utilizadas

- **Vue.js 3**: Framework JavaScript reativo para construção da interface.  
- **Axios**: Biblioteca para requisições HTTP à API.  
- **TailwindCSS**: Framework de estilos CSS para um design responsivo e moderno.  

---

## 🚀 Como Usar

### Pré-requisitos
- **Node.js** e **npm** instalados.
- Servidor da API rodando localmente (endereço padrão: `http://127.0.0.1:3000`).

### Passo a Passo

1. Clone o repositório:
   ```bash
   git clone https://github.com/seu-usuario/kitchen-paleva.git
   cd kitchen-paleva
2. Abra o arquivo index.html diretamente no navegador ou utilize uma ferramenta para servir arquivos estáticos (como Live Server no VSCode).

3. Certifique-se de que o servidor da API está ativo e acessível.

4. Acesse a aplicação no navegador e insira o código do restaurante no campo "Código do Restaurante" para carregar os pedidos.

## 🔧  Configurações e Personalizações

### Alterar Endereço da API
```javascript
const url = `http://seu-servidor/api/v1/restaurants/${this.restaurantCode}/${endpoint}`;
```

## 📜 Estrutura do Projeto

```bash
kitchen-paleva/
├── index.html       # Interface principal
├── style.css        # Arquivo de estilos personalizados
├── main.js          # Lógica da aplicação em Vue.js
├── README.md        # Documentação do projeto

```

## 📖 Implementações Detalhadas
### Exibição de Pedidos

1. Pedidos são buscados da API e armazenados no estado orders.
  A lista é filtrada com base na pesquisa do usuário e exibida ordenada por data de criação.

2. Alteração de Status. Os métodos <code> start_preparation </code> e <code>set_order_ready</code> alteram o status diretamente no estado, sem a necessidade de uma nova consulta à API.

3. Pesquisa de Pedidos. Campo de busca que filtra dinamicamente a lista de pedidos.

4.Troca de Restaurante. Campo de entrada permite alterar o código do restaurante monitorado e recarrega os pedidos automaticamente.

5. Tradução de Status. Os status são traduzidos para melhorar a experiência do usuário. Exemplo:
<code>awaiting_confirmation</code> → Aguardando Confirmação.
<code>in_preparation</code> → Em Preparo.
