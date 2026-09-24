const api = {
  async getPeople() {
    const response = await fetch('/api/people');
    if (!response.ok) {
      throw new Error('Unable to load people');
    }
    return response.json();
  },

  async getFollows() {
    const response = await fetch('/api/follows');
    if (!response.ok) {
      throw new Error('Unable to load activity');
    }
    return response.json();
  },

  async toggleFollow(personId, shouldFollow) {
    const response = shouldFollow
      ? await fetch(`/api/follows/${personId}`, { method: 'POST' })
      : await fetch(`/api/follows/${personId}`, { method: 'DELETE' });

    if (!response.ok) {
      throw new Error('Unable to update follow status');
    }

    return response.json();
  }
};
