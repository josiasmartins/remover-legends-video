function removerLegenda() {
  const videoInput = document.getElementById('videoInput');
  const videoOutput = document.getElementById('videoOutput');

  // Verificar se um arquivo de vídeo foi selecionado
  if (videoInput.files.length === 0) {
    alert('Por favor, selecione um arquivo de vídeo.');
    return;
  }

  const file = videoInput.files[0];

  // Verificar se o arquivo selecionado é um vídeo
  if (!file.type.startsWith('video/')) {
    alert('Por favor, selecione um arquivo de vídeo válido.');
    return;
  }

  const videoURL = URL.createObjectURL(file);

  // Atualizar o elemento de vídeo para exibir o vídeo selecionado
  videoOutput.src = videoURL;

  // Remover a legenda do vídeo
  removerLegendaDoVideo(videoURL);
}

function removerLegendaDoVideo(videoURL) {
  const videoSemLegendaURL = 'video_sem_legenda.mp4';
  const ffmpegPath = 'C:\Users\josias.m.caitano\Downloads\ffmpeg-master-latest-win64-gpl.zip\ffmpeg-master-latest-win64-gpl\binffmpeg'; // Defina o caminho correto para o executável do ffmpeg

  // Comando para remover a legenda usando o ffmpeg
  const comando = `${ffmpegPath} -i ${videoURL} -c copy -map 0 -map -0:s ${videoSemLegendaURL}`;

  // Executar o comando ffmpeg usando fetch API
  fetch('/executar-ffmpeg', {
    method: 'POST',
    body: JSON.stringify({ comando }),
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then(response => response.json())
    .then(data => {
      if (data.success) {
        console.log('Legenda removida com sucesso!');
        exibirVideoSemLegenda(videoSemLegendaURL);
      } else {
        console.error('Erro ao remover a legenda:', data.error);
      }
    })
    .catch(error => {
      console.error('Erro ao remover a legenda:', error);
    });
}

function exibirVideoSemLegenda(videoURL) {
  const videoOutput = document.getElementById('videoOutput');
  videoOutput.src = videoURL;
}
