const textInput = document.getElementById('textInput');
const voiceSelect = document.getElementById('voiceSelect');
const speakBtn = document.getElementById('speakBtn');

let voices = [];

function loadVoices() {
  voices = window.speechSynthesis.getVoices();

  // если голоса ещё не загрузились
  if (!voices.length) {
    setTimeout(loadVoices, 200);
    return;
  }

  voiceSelect.innerHTML = '';
  voices.forEach(voice => {
    const option = document.createElement('option');
    option.value = voice.name;
    option.textContent = `${voice.name} (${voice.lang})`;
    voiceSelect.appendChild(option);
  });
}

window.speechSynthesis.onvoiceschanged = loadVoices;

speakBtn.addEventListener('click', () => {
  const text = textInput.value.trim();
  if (!text) {
    alert('Please enter some text!');
    return;
  }

  const utterance = new SpeechSynthesisUtterance(text);
  const selectedVoice = voices.find(v => v.name === voiceSelect.value);
  if (selectedVoice) utterance.voice = selectedVoice;

  utterance.rate = 1;
  utterance.pitch = 1;
  utterance.volume = 1;

  window.speechSynthesis.speak(utterance);
});
