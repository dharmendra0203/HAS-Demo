const people = [
  { id: 'amara', name: 'Amara Okafor', handle: '@amara', role: 'Product designer' },
  { id: 'mateo', name: 'Mateo Ruiz', handle: '@mateo', role: 'API engineer' },
  { id: 'linh', name: 'Linh Tran', handle: '@linh', role: 'Research lead' },
  { id: 'jonah', name: 'Jonah Williams', handle: '@jonah', role: 'Technical writer' }
];

function getPeople() {
  return people.map(person => ({ ...person }));
}

module.exports = {
  getPeople
};
