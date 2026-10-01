/*
 * GoogleDriveBridge
 * Aplicação web utilitária em Google Apps Script, desenvolvida de forma independente
 * por Pablo Phillipe Cândido dos Santos, destinada à cópia recursiva de arquivos e
 * pastas entre diretórios do Google Drive por meio de uma interface web.
 * O desenvolvimento contou com ferramentas de inteligência artificial generativa
 * como recurso auxiliar, sob responsabilidade do autor quanto à concepção,
 * implementação, integração e verificação do projeto.
 * Currículo Lattes: http://lattes.cnpq.br/9500873674712528
 */

// Função obrigatória para gerar a interface HTML
function doGet() {
  return HtmlService.createHtmlOutputFromFile('Index')
    .setTitle('Copiador de Pastas Inteligente')
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

// Função que o botão da interface vai chamar
function startCopyLoop(sourceFolderId, destFolderId) {
  var TEMPO_MAXIMO = 4.5 * 60 * 1000; // 4.5 minutos para evitar erro
  var INICIO = new Date().getTime();
  
  try {
    var source = DriveApp.getFolderById(sourceFolderId);
    var target = DriveApp.getFolderById(destFolderId);
    
    var finished = copyRecursive(source, target, INICIO, TEMPO_MAXIMO);
    
    return {
      status: finished ? 'concluido' : 'pausado',
      mensagem: finished ? '✅ Cópia totalmente concluída!' : '⚠️ Limite de tempo próximo. Retomando automaticamente...'
    };
  } catch (e) {
    return { status: 'erro', mensagem: '❌ Erro: ' + e.message };
  }
}

// Função de cópia com verificação de tamanho
function copyRecursive(source, target, startTime, maxTime) {
  var files = source.getFiles();
  while (files.hasNext()) {
    if (new Date().getTime() - startTime > maxTime) return false;
    
    var file = files.next();
    var fileName = file.getName();
    var originalSize = file.getSize();
    
    var existingFiles = target.getFilesByName(fileName);
    var shouldCopy = true;
    
    while (existingFiles.hasNext()) {
      var existingFile = existingFiles.next();
      if (existingFile.getSize() < originalSize) {
        existingFile.setTrashed(true);
        shouldCopy = true;
      } else {
        shouldCopy = false;
        break;
      }
    }
    
    if (shouldCopy) {
      file.makeCopy(fileName, target);
    }
  }
  
  var subfolders = source.getSubfolders();
  while (subfolders.hasNext()) {
    if (new Date().getTime() - startTime > maxTime) return false;
    
    var subfolder = subfolders.next();
    var subfolderName = subfolder.getName();
    
    var nextTargetFolder;
    var existingFolders = target.getFoldersByName(subfolderName);
    
    if (existingFolders.hasNext()) {
      nextTargetFolder = existingFolders.next();
    } else {
      nextTargetFolder = target.createFolder(subfolderName);
    }
    
    var finished = copyRecursive(subfolder, nextTargetFolder, startTime, maxTime);
    if (!finished) return false;
  }
  
  return true;
}