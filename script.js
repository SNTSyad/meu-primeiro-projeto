const cards = [
  {
    key: 'magician',
    names: { pt: 'O Mago', en: 'The Magician' },
    meanings: { pt: 'Habilidade e iniciativa.', en: 'Skill and initiative.' }
  },
  {
    key: 'priestess',
    names: { pt: 'A Sacerdotisa', en: 'The High Priestess' },
    meanings: { pt: 'Intuição e sabedoria.', en: 'Intuition and wisdom.' }
  },
  {
    key: 'empress',
    names: { pt: 'A Imperatriz', en: 'The Empress' },
    meanings: { pt: 'Abundância e nutrição.', en: 'Abundance and nurturing.' }
  },
  {
    key: 'emperor',
    names: { pt: 'O Imperador', en: 'The Emperor' },
    meanings: { pt: 'Estrutura e liderança.', en: 'Structure and leadership.' }
  },
  {
    key: 'hierophant',
    names: { pt: 'O Hierofante', en: 'The Hierophant' },
    meanings: { pt: 'Tradição e espiritualidade.', en: 'Tradition and spirituality.' }
  },
  {
    key: 'lovers',
    names: { pt: 'Os Amantes', en: 'The Lovers' },
    meanings: { pt: 'Relações e escolhas.', en: 'Relationships and choices.' }
  },
  {
    key: 'chariot',
    names: { pt: 'O Carro', en: 'The Chariot' },
    meanings: { pt: 'Determinação e conquista.', en: 'Determination and victory.' }
  },
  {
    key: 'strength',
    names: { pt: 'A Força', en: 'Strength' },
    meanings: { pt: 'Coragem e compaixão.', en: 'Courage and compassion.' }
  },
  {
    key: 'hermit',
    names: { pt: 'O Eremita', en: 'The Hermit' },
    meanings: { pt: 'Busca interior.', en: 'Inner search.' }
  },
  {
    key: 'wheel',
    names: { pt: 'A Roda da Fortuna', en: 'Wheel of Fortune' },
    meanings: { pt: 'Ciclos e mudanças.', en: 'Cycles and changes.' }
  },
  {
    key: 'justice',
    names: { pt: 'A Justiça', en: 'Justice' },
    meanings: { pt: 'Causa e efeito.', en: 'Cause and effect.' }
  },
  {
    key: 'hanged',
    names: { pt: 'O Enforcado', en: 'The Hanged Man' },
    meanings: { pt: 'Nova perspectiva.', en: 'New perspective.' }
  },
  {
    key: 'death',
    names: { pt: 'A Morte', en: 'Death' },
    meanings: { pt: 'Transformação.', en: 'Transformation.' }
  },
  {
    key: 'temperance',
    names: { pt: 'A Temperança', en: 'Temperance' },
    meanings: { pt: 'Equilíbrio.', en: 'Balance.' }
  },
  {
    key: 'devil',
    names: { pt: 'O Diabo', en: 'The Devil' },
    meanings: { pt: 'Apego e ilusão.', en: 'Attachment and illusion.' }
  },
  {
    key: 'tower',
    names: { pt: 'A Torre', en: 'The Tower' },
    meanings: { pt: 'Ruptura repentina.', en: 'Sudden upheaval.' }
  },
  {
    key: 'star',
    names: { pt: 'A Estrela', en: 'The Star' },
    meanings: { pt: 'Esperança e inspiração.', en: 'Hope and inspiration.' }
  },
  {
    key: 'moon',
    names: { pt: 'A Lua', en: 'The Moon' },
    meanings: { pt: 'Mistério e emoção.', en: 'Mystery and emotion.' }
  },
  {
    key: 'sun',
    names: { pt: 'O Sol', en: 'The Sun' },
    meanings: { pt: 'Sucesso e alegria.', en: 'Success and joy.' }
  },
  {
    key: 'judgement',
    names: { pt: 'O Julgamento', en: 'Judgement' },
    meanings: { pt: 'Renovação.', en: 'Renewal.' }
  },
  {
    key: 'world',
    names: { pt: 'O Mundo', en: 'The World' },
    meanings: { pt: 'Realização.', en: 'Fulfillment.' }
  }
];

const HISTORY_KEY = 'tarotHistory';
const history = JSON.parse(localStorage.getItem(HISTORY_KEY) || '[]');
let currentCard = null;

function getLang() {
  const select = document.getElementById('language');
  return select ? select.value : 'pt';
}

function setUITexts() {
  const lang = getLang();
  const drawButton = document.getElementById('drawButton');
  const clearButton = document.getElementById('clearButton');
  const historyTitle = document.querySelector('#history h3');
  if (drawButton) {
    drawButton.textContent = lang === 'en' ? 'Draw Card' : 'Revelar Carta';
  }
  if (clearButton) {
    clearButton.textContent = lang === 'en' ? 'Clear History' : 'Limpar Histórico';
  }
  if (historyTitle) {
    historyTitle.textContent = lang === 'en' ? 'History' : 'Histórico';
  }
}

document.getElementById('language').addEventListener('change', () => {
  setUITexts();
  updateHistory();
  if (currentCard) {
    displayCard(currentCard);
  }
});

document.getElementById('drawButton').addEventListener('click', drawCard);
document.getElementById('clearButton').addEventListener('click', clearHistory);

function drawCard() {
  if (!cards.length) {
    alert('Sem cartas disponíveis.');
    return;
  }
  const index = Math.floor(Math.random() * cards.length);
  const card = cards[index];
  if (!card) {
    alert('Carta inválida.');
    return;
  }
  currentCard = card;
  displayCard(card);
  history.push(card);
  updateHistory();
}

function displayCard(card) {
  const lang = getLang();
  const section = document.getElementById('chosenCard');
  document.getElementById('cardName').textContent = card.names[lang] || card.names.pt;
  document.getElementById('cardMeaning').textContent = card.meanings[lang] || card.meanings.pt;
  section.classList.remove('hidden');
}

function updateHistory() {
  const lang = getLang();
  const list = document.getElementById('historyList');
  list.innerHTML = '';
  history.forEach(item => {
    const li = document.createElement('li');
    li.textContent = `${item.names[lang] || item.names.pt} - ${item.meanings[lang] || item.meanings.pt}`;
    list.appendChild(li);
  });
  localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
}

function clearHistory() {
  history.length = 0;
  updateHistory();
  localStorage.removeItem(HISTORY_KEY);
  currentCard = null;
  const section = document.getElementById('chosenCard');
  if (section) {
    section.classList.add('hidden');
  }
}

// Initialize texts and history display
setUITexts();
updateHistory();

