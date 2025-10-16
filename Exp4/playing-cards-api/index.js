const express = require('express');
const app = express();

app.use(express.json());

// Root route
app.get('/', (req, res) => {
  res.send('Playing Cards API is running');
});

// In-memory array to store cards
let cards = [
  { id: 1, suit: 'Hearts', value: 'A' },
  { id: 2, suit: 'Spades', value: '10' },
  { id: 3, suit: 'Diamonds', value: 'K' }
];

// Helper function to validate card input
function isValidCard(card) {
  const validSuits = ['Hearts', 'Diamonds', 'Clubs', 'Spades'];
  const validValues = ['A','2','3','4','5','6','7','8','9','10','J','Q','K'];
  return validSuits.includes(card.suit) && validValues.includes(card.value);
}

// Get all cards
app.get('/cards', (req, res) => {
  res.json(cards);
});

// Get a specific card by ID
app.get('/cards/:id', (req, res) => {
  const card = cards.find(c => c.id === parseInt(req.params.id));
  if (!card) return res.status(404).send('Card not found');
  res.json(card);
});

// Add a new card
app.post('/cards', (req, res) => {
  const { suit, value } = req.body;

  // Validate input
  if (!isValidCard({ suit, value })) {
    return res.status(400).send('Invalid suit or value');
  }

  const newCard = { id: cards.length ? cards[cards.length - 1].id + 1 : 1, suit, value };
  cards.push(newCard);
  res.status(201).json(newCard);
});

// Update an existing card
app.put('/cards/:id', (req, res) => {
  const card = cards.find(c => c.id === parseInt(req.params.id));
  if (!card) return res.status(404).send('Card not found');

  const { suit, value } = req.body;

  // Validate input
  if (!isValidCard({ suit, value })) {
    return res.status(400).send('Invalid suit or value');
  }

  card.suit = suit;
  card.value = value;
  res.json(card);
});

// Delete a card
app.delete('/cards/:id', (req, res) => {
  const index = cards.findIndex(c => c.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).send('Card not found');

  const deletedCard = cards.splice(index, 1);
  res.json(deletedCard[0]);
});

// Start the server
app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
