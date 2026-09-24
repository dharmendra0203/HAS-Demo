const listEl = document.querySelector('#people-list');

async function renderPeople() {
  try {
    const { people } = await api.getPeople();
    listEl.innerHTML = people
      .map((person) => {
        const badgeClass = person.following ? 'following' : 'not-following';
        const label = person.following ? 'Following' : 'Not following';
        const actionText = person.following ? 'Following' : 'Follow';
        const actionClass = person.following ? 'secondary-btn' : 'primary-btn';
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
              <span class="badge ${badgeClass}">${label}</span>
            </div>
            <div class="person-actions">
              <span class="person-role">${person.role}</span>
              <button class="${actionClass}" data-person-id="${person.id}" data-following="${person.following}">
                ${actionText}
              </button>
            </div>
          </article>
        `;
      })
      .join('');

    listEl.querySelectorAll('button[data-person-id]').forEach(button => {
      button.addEventListener('click', async () => {
        const personId = button.dataset.personId;
        const shouldFollow = button.dataset.following !== 'true';
        try {
          await api.toggleFollow(personId, shouldFollow);
          await renderPeople();
        } catch (error) {
          alert('Could not update follow state.');
        }
      });
    });
  } catch (error) {
    listEl.innerHTML = '<div class="alert">Unable to load the people list.</div>';
  }
}

renderPeople();
