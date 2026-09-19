/* Home page "Latest writing": reads the blog's own post list at runtime,
   so a new blog release shows up here without touching this repo.
   If the list can't be read, the static links in the page stay as they are.
   TODO: switch to the blog feed once the publisher emits one. */
(() => {
  const section = document.querySelector('[data-latest-posts]');
  if (!section || !window.fetch || !window.DOMParser) return;

  const lang = (navigator.language || '').toLowerCase().startsWith('ko') ? 'ko' : 'en';
  const index = `/blog/${lang}/`;
  const LIMIT = 3;

  fetch(index, {cache: 'no-cache'})
    .then(res => (res.ok ? res.text() : Promise.reject(res.status)))
    .then(html => {
      const doc = new DOMParser().parseFromString(html, 'text/html');
      const posts = [...doc.querySelectorAll('ul.posts > li')].map(li => {
        const link = li.querySelector('h2 a, h3 a');
        const href = link && link.getAttribute('href');
        if (!href || !href.startsWith('/blog/')) return null;
        return {
          href,
          title: link.textContent.trim(),
          date: (li.querySelector('time') || {}).textContent || '',
          summary: (li.querySelector('p') || {}).textContent || '',
        };
      }).filter(Boolean).slice(0, LIMIT);
      if (!posts.length) return;

      const list = document.createElement('ul');
      list.className = 'posts';
      list.lang = lang;
      for (const post of posts) {
        const item = document.createElement('li');
        if (post.date) {
          const time = document.createElement('time');
          time.textContent = post.date.trim();
          item.append(time);
        }
        const heading = document.createElement('h3');
        const anchor = document.createElement('a');
        anchor.href = post.href;
        anchor.textContent = post.title;
        heading.append(anchor);
        item.append(heading);
        if (post.summary.trim()) {
          const summary = document.createElement('p');
          summary.textContent = post.summary.trim();
          item.append(summary);
        }
        list.append(item);
      }
      section.querySelector('[data-fallback]').replaceWith(list);
      section.querySelector('[data-all-posts]').href = index;
    })
    .catch(() => {});
})();
