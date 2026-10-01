# GoogleDriveBridge

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

1. Crie um projeto no [Google Apps Script](https://script.google.com/).
2. Adicione um arquivo de script e copie para ele o conteúdo de `Código.gs`.
3. Adicione um arquivo HTML chamado `Index` e copie para ele o conteúdo de `Index.html`.
4. Implante o projeto como **Aplicativo da Web**.
5. Autorize as permissões solicitadas para acesso ao Google Drive.
6. Abra a URL da implantação, informe os IDs das pastas de origem e destino e selecione **Iniciar Cópia**.

> O usuário que executa a implantação precisa ter acesso às pastas de origem e de destino. A lógica de identificação de arquivos já copiados usa nome e tamanho; portanto, arquivos diferentes com o mesmo nome e tamanho não são distinguidos pelo conteúdo.

## 👤 Autoria e desenvolvimento

Aplicação web utilitária desenvolvida de forma independente por **Pablo Phillipe Cândido dos Santos**, destinada à cópia recursiva de arquivos e subpastas entre diretórios do Google Drive. O projeto combina uma interface HTML com rotinas em Google Apps Script e divide operações prolongadas em ciclos sucessivos para reduzir o risco de interrupção por limite de tempo de execução.

O desenvolvimento contou com a utilização de ferramentas de inteligência artificial generativa como recurso auxiliar no processo de desenvolvimento, mantendo-se sob responsabilidade do autor a concepção, implementação, integração e verificação do projeto.

Currículo Lattes: [http://lattes.cnpq.br/9500873674712528](http://lattes.cnpq.br/9500873674712528)
