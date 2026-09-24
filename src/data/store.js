const people = [
  { id: 'amara', name: 'Amara Okafor', handle: '@amara', role: 'Product designer', following: true },
  { id: 'mateo', name: 'Mateo Ruiz', handle: '@mateo', role: 'API engineer', following: false },
  { id: 'linh', name: 'Linh Tran', handle: '@linh', role: 'Research lead', following: true },
  { id: 'jonah', name: 'Jonah Williams', handle: '@jonah', role: 'Technical writer', following: false }
];

const records = {
  amara: { personId: 'amara', following: true, changedAt: '2026-09-24T09:14:00.000Z' },
  mateo: { personId: 'mateo', following: false, changedAt: 'never' },
  linh: { personId: 'linh', following: true, changedAt: '2026-09-23T16:42:00.000Z' },
  jonah: { personId: 'jonah', following: false, changedAt: 'never' }
};

function getPeople() {
  return people.map(person => ({
    ...person,
    following: !!records[person.id]?.following
  }));
}

function getPersonById(personId) {
  return people.find(person => person.id === personId);
}

function getFollows() {
  return people.map(person => ({
    personId: person.id,
    following: !!records[person.id]?.following,
    changedAt: records[person.id]?.changedAt || 'never'
  }));
}

function setFollow(personId, following) {
  const person = getPersonById(personId);
  if (!person) {
    return null;
  }

  records[personId] = {
    personId,
    following,
    changedAt: new Date().toISOString()
  };

  const currentPerson = people.find(item => item.id === personId);
  if (currentPerson) {
    currentPerson.following = following;
  }

  return records[personId];
}

module.exports = {
  getPeople,
  getPersonById,
  getFollows,
  setFollow
};
