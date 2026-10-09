const api = {
  async getPeople() {
    const response = await fetch('/api/people');
    if (!response.ok) {
      throw new Error('Unable to load people');
    }
    return response.json();
  }
};
