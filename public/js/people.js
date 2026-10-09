const listEl = document.querySelector('#people-list');

async function renderPeople() {
  try {
    const { people } = await api.getPeople();
    listEl.innerHTML = people
      .map((person) => {
        const initials = person.name
          .split(' ')
          .map(part => part[0])
          .slice(0, 2)
          .join('')
          .toUpperCase();

        return `
          <article class="person-card">
            <div class="person-header">
              <div class="person-identity">
                <div class="avatar">${initials}</div>
                <div>
                  <div class="person-name">${person.name}</div>
                  <div class="person-meta">${person.handle} · ${person.role}</div>
                </div>
              </div>
            </div>
          </article>
        `;
      })
      .join('');

  } catch (error) {
    listEl.innerHTML = '<div class="alert">Unable to load the people list.</div>';
  }
}

renderPeople();
