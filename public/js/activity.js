const containerEl = document.querySelector('#activity-table');
const errorBannerEl = document.querySelector('#error-banner');

function buildTableRows(follows) {
  return follows
    .map((entry) => {
      const person = entry.personId ? entry.personId.charAt(0).toUpperCase() + entry.personId.slice(1) : 'Person';
      const statusText = entry.following ? 'Following' : 'Not following';
      const statusClass = entry.following ? 'following' : 'not-following';
      const actionText = entry.following ? 'Unfollow' : 'Follow';
      const changeText = entry.changedAt === 'never' ? 'Never' : new Date(entry.changedAt).toLocaleString();

      return `
        <tr>
          <td><strong>${person}</strong><br><span class="person-meta">@${entry.personId}</span></td>
          <td><span class="badge ${statusClass}">${statusText}</span></td>
          <td>${changeText}</td>
          <td><button class="${entry.following ? 'secondary-btn' : 'primary-btn'}" data-person-id="${entry.personId}" data-following="${entry.following}">${actionText}</button></td>
        </tr>
      `;
    })
    .join('');
}

async function renderActivity() {
  try {
    const { follows } = await api.getFollows();
    containerEl.innerHTML = `
      <table class="activity-table">
        <thead>
          <tr>
            <th>Person</th>
            <th>Relationship</th>
            <th>Last changed</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>${buildTableRows(follows)}</tbody>
      </table>
    `;
    errorBannerEl.classList.add('hidden');

    containerEl.querySelectorAll('button[data-person-id]').forEach(button => {
      button.addEventListener('click', async () => {
        const personId = button.dataset.personId;
        const shouldFollow = button.dataset.following !== 'true';
        try {
          await api.toggleFollow(personId, shouldFollow);
          await renderActivity();
        } catch (error) {
          errorBannerEl.textContent = 'The activity snapshot could not be refreshed.';
          errorBannerEl.classList.remove('hidden');
        }
      });
    });
  } catch (error) {
    errorBannerEl.textContent = 'The activity snapshot could not be refreshed.';
    errorBannerEl.classList.remove('hidden');
    containerEl.innerHTML = '';
  }
}

renderActivity();
