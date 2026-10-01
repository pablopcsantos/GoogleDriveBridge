# GoogleDriveBridge

## Copiador Inteligente de Pastas

Read this in other languages: [English](README.en.md)

Aplicação web utilitária construída com **Google Apps Script** para copiar recursivamente arquivos e subpastas entre duas pastas do Google Drive a partir de uma interface HTML simples.

## Funcionalidades

- recebe os IDs da pasta de origem e da pasta de destino;
- percorre recursivamente arquivos e subpastas da origem;
- cria no destino as subpastas ainda inexistentes;
- evita recópias quando já existe no destino um arquivo de mesmo nome com tamanho igual ou maior;
- substitui arquivos homônimos menores encontrados no destino;
- interrompe cada ciclo antes do limite configurado de execução e solicita automaticamente um novo ciclo pela interface web;
- informa na interface os estados de execução, conclusão e erro.

## Estrutura do projeto

- `Código.gs`: backend em Google Apps Script, responsável por servir a interface e executar a cópia recursiva no Google Drive.
- `Index.html`: interface web para informar as pastas, iniciar a cópia e acompanhar o estado da operação.

## Como usar no Google Apps Script

Este tutorial foi escrito pensando em usuários que nunca utilizaram o Google Apps Script.

### 1. O que você precisa antes de começar

Você precisará de:

- uma conta Google;
- acesso às pastas de origem e de destino no Google Drive;
- os arquivos `Código.gs` e `Index.html` deste repositório;
- um navegador conectado à mesma conta Google que possui acesso às pastas.

> **Importante:** o projeto atua com as permissões concedidas à implantação do Google Apps Script. Não use IDs de pastas às quais a conta responsável pela execução não tenha acesso.

### 2. Criar um novo projeto no Google Apps Script

1. Acesse [https://script.google.com/](https://script.google.com/) e faça login com sua conta Google.
2. Clique em **Novo projeto**.
3. No canto superior esquerdo, clique em **Projeto sem título** e altere o nome para algo como `GoogleDriveBridge`.
4. O Apps Script criará automaticamente um arquivo de script chamado, normalmente, `Código.gs` ou `Code.gs`, dependendo do idioma da interface.

### 3. Adicionar o código do backend

1. Abra o arquivo `Código.gs` deste repositório.
2. Copie todo o seu conteúdo.
3. No editor do Google Apps Script, selecione o arquivo de script criado automaticamente.
4. Apague o código de exemplo existente.
5. Cole o conteúdo do arquivo `Código.gs` do repositório.
6. Salve o projeto usando **Ctrl + S** ou o botão de salvar.

O nome do arquivo de script pode ser `Código.gs`, `Code.gs` ou outro nome. O funcionamento do projeto não depende do nome desse arquivo.

### 4. Criar o arquivo HTML da interface

O nome deste arquivo é importante, porque o backend procura especificamente um arquivo chamado `Index`.

1. Na barra lateral esquerda do Apps Script, clique no botão **+** ao lado de **Arquivos**.
2. Escolha **HTML**.
3. Digite exatamente:

   ```text
   Index
   ```

   O Apps Script adicionará a extensão `.html` automaticamente.
4. Abra o arquivo `Index.html` deste repositório.
5. Copie todo o seu conteúdo.
6. Apague o conteúdo do arquivo HTML recém-criado no Apps Script e cole o código do repositório.
7. Salve novamente o projeto.

Ao final, o projeto deverá conter pelo menos:

```text
Código.gs
Index.html
```

### 5. Implantar o projeto como aplicativo da web

O Google Apps Script precisa ser implantado como **Aplicativo da Web** para que a interface possa ser aberta no navegador.

1. No canto superior direito do editor, clique em **Implantar**.
2. Escolha **Nova implantação**.
3. Ao lado de **Selecionar tipo**, clique no ícone de engrenagem.
4. Selecione **Aplicativo da Web**.
5. Em **Descrição**, você pode escrever, por exemplo:

   ```text
   GoogleDriveBridge - primeira implantação
   ```

6. Em **Executar como**, para uso pessoal, escolha a opção que executa o aplicativo como **você**, ou seja, como o proprietário do projeto.
7. Em **Quem pode acessar**, escolha a opção mais restritiva compatível com seu uso. Para uso pessoal, prefira acesso apenas por você ou pela sua conta.
8. Clique em **Implantar**.

Para projetos que serão compartilhados com outras pessoas, revise cuidadosamente as opções de **Executar como** e **Quem pode acessar**, pois elas determinam quais permissões do Google Drive serão utilizadas durante a execução.

### 6. Autorizar o acesso ao Google Drive

Na primeira implantação ou primeira execução, o Google poderá solicitar autorização.

1. Clique em **Autorizar acesso** ou **Revisar permissões**, caso essa tela seja apresentada.
2. Selecione a conta Google que possui acesso às pastas que serão usadas.
3. Leia as permissões solicitadas.
4. Autorize somente se você estiver executando uma cópia do projeto que criou e cujo código tenha revisado.

Dependendo da configuração da conta e do projeto, o Google pode informar que o aplicativo não passou por um processo público de verificação. Isso pode acontecer em projetos pessoais do Apps Script. Só prossiga se você estiver utilizando sua própria cópia do código e compreender as permissões solicitadas.

Depois da autorização, o Apps Script exibirá a **URL do aplicativo da web**. Salve essa URL; ela será usada para abrir o GoogleDriveBridge.

### 7. Como obter o ID de uma pasta do Google Drive

O GoogleDriveBridge não utiliza o nome da pasta. Ele precisa do **ID da pasta**, que é um identificador único presente na URL do Google Drive.

#### Exemplo

Suponha que a URL da pasta seja:

```text
https://drive.google.com/drive/folders/1AbCDeFGhijkLMNopQRstuVWXyz123456?usp=drive_link
```

O ID é somente a parte localizada depois de `/folders/` e antes de um eventual `?`:

```text
1AbCDeFGhijkLMNopQRstuVWXyz123456
```

#### Para obter o ID da pasta de origem

1. Abra o [Google Drive](https://drive.google.com/).
2. Entre na pasta que contém os arquivos que você deseja copiar.
3. Clique na barra de endereços do navegador.
4. Localize a parte da URL que vem depois de:

   ```text
   /folders/
   ```

5. Copie somente o identificador da pasta.

#### Para obter o ID da pasta de destino

Repita exatamente o mesmo processo:

1. Entre na pasta onde os arquivos deverão ser copiados.
2. Copie o identificador existente depois de `/folders/`.
3. Se a URL terminar com parâmetros como `?usp=drive_link`, **não copie essa parte**.

> **Atenção:** use o ID de uma **pasta**, e não o ID de um arquivo individual. A conta que executa o aplicativo precisa possuir permissão suficiente para ler a origem e criar arquivos e pastas no destino.

### 8. Iniciar a cópia

1. Abra no navegador a URL do aplicativo da web fornecida pelo Apps Script.
2. No campo **ID da Pasta de Origem**, cole o ID da pasta que será copiada.
3. No campo **ID da Pasta de Destino**, cole o ID da pasta que receberá os arquivos.
4. Clique em **Iniciar Cópia**.

A interface exibirá mensagens informando o andamento da operação.

Quando a execução estiver próxima do limite interno configurado, o backend encerrará aquele ciclo e a própria interface iniciará outro automaticamente.

> **Não feche a aba do navegador enquanto a cópia estiver em andamento.** A retomada automática depende da página aberta para iniciar o ciclo seguinte.

### 9. O que acontece durante a retomada automática

Quando um novo ciclo começa, o projeto volta a percorrer a estrutura da pasta de origem.

Para reduzir cópias repetidas, ele verifica se já existe no destino um arquivo com:

- o mesmo nome; e
- tamanho igual ou maior.

Se encontrar um arquivo com o mesmo nome, mas menor, o arquivo menor é enviado para a lixeira e uma nova cópia é criada.

Essa estratégia permite que sucessivos ciclos continuem a operação sem exigir que o usuário acompanhe manualmente o ponto exato em que o ciclo anterior terminou.

> A comparação é feita por **nome e tamanho**, e não pelo conteúdo ou por hash. Portanto, dois arquivos diferentes que possuam exatamente o mesmo nome e tamanho podem ser considerados equivalentes pelo projeto.

### 10. Como atualizar o aplicativo depois de modificar o código

Uma implantação publicada do Apps Script utiliza uma versão específica do projeto. Depois de alterar o código, salve as modificações e atualize a implantação:

1. Clique em **Implantar**.
2. Escolha **Gerenciar implantações**.
3. Selecione a implantação do GoogleDriveBridge.
4. Clique no ícone de edição.
5. Em **Versão**, escolha **Nova versão**.
6. Clique em **Implantar** novamente.

Ao atualizar uma implantação existente dessa forma, normalmente é possível continuar usando a mesma URL do aplicativo.

### 11. Problemas comuns

#### “A pasta não foi encontrada” ou erro de acesso

Verifique se:

- o ID informado pertence realmente a uma pasta;
- não foi copiado `?usp=drive_link` ou outro parâmetro junto com o ID;
- a conta que executa o aplicativo possui acesso à pasta;
- você não copiou por engano o ID de um arquivo.

#### A página não abre ou informa que não existe `Index`

Confirme que o arquivo HTML foi criado com o nome exato:

```text
Index
```

O backend utiliza `HtmlService.createHtmlOutputFromFile('Index')`, portanto o nome deve corresponder exatamente.

#### O código foi alterado, mas o aplicativo continua mostrando a versão antiga

Salve o projeto e atualize a implantação em **Implantar > Gerenciar implantações**, selecionando uma **Nova versão**.

#### A cópia parou depois que a aba foi fechada

A retomada automática é controlada pela interface no navegador. Se a aba for fechada, um novo ciclo não será iniciado automaticamente. Abra novamente o aplicativo e inicie a operação outra vez; os arquivos considerados já copiados serão ignorados de acordo com a verificação por nome e tamanho.

#### Arquivos com o mesmo nome

O projeto trata arquivos homônimos com base no tamanho. Ele não compara o conteúdo real dos arquivos. Consulte a seção **O que acontece durante a retomada automática** antes de utilizar a ferramenta em pastas que possam conter arquivos diferentes com nomes e tamanhos idênticos.

### 12. Recomendações de segurança

- Implante sua própria cópia do projeto em sua própria conta Google.
- Revise o código antes de conceder acesso ao Google Drive.
- Para uso pessoal, mantenha **Quem pode acessar** na opção mais restritiva disponível.
- Não compartilhe a URL de uma implantação que execute com as permissões da sua conta sem compreender as consequências dessa configuração.
- Teste inicialmente com duas pastas pequenas e sem arquivos importantes.
- Confirme o resultado antes de utilizar a ferramenta em grandes volumes de dados.

## 👤 Autoria e desenvolvimento

Aplicação web utilitária desenvolvida de forma independente por **Pablo Phillipe Cândido dos Santos**, destinada à cópia recursiva de arquivos e subpastas entre diretórios do Google Drive. O projeto combina uma interface HTML com rotinas em Google Apps Script e divide operações prolongadas em ciclos sucessivos para reduzir o risco de interrupção por limite de tempo de execução.

O desenvolvimento contou com a utilização de ferramentas de inteligência artificial generativa como recurso auxiliar no processo de desenvolvimento, mantendo-se sob responsabilidade do autor a concepção, implementação, integração e verificação do projeto.

Currículo Lattes: [http://lattes.cnpq.br/9500873674712528](http://lattes.cnpq.br/9500873674712528)
