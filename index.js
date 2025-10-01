function twentytwopointthreerecurringthrice(){
    window.location.replace('page.html')
}

// Stories
fetch('/JSON/Stories.json')
  .then(response => response.json())
  .then(data => {
    const stories = data;

    const filter24h = stories.filter(s => {
      const now = new Date();
      const storyTime = new Date(s.timestamp);
      return (now - storyTime) <= 24 * 60 * 60 * 1000;
    });

    if (filter24h.length > 0) {
      document.getElementById('storyring').style.background = `
        conic-gradient(#feda75, #fa7e1e, #d62976, #962fbf, #4f5bd5, #feda75)
      `;
    }else{
        document.getElementById('storyring').style.background = `gray`;
    }

    function populateCarousel() {
      const inner = document.getElementById('carousel-inner');
      inner.innerHTML = ``;

      if (filter24h.length === 0) {
        return window.location.replace('storyhighlights.html')
      } else {
        filter24h.forEach((story, index) => {
          const div = document.createElement('div');
          div.className = 'carousel-item' + (index === 0 ? ' active' : '');
          div.innerHTML = `<iframe src="${story.url}" class="d-block w-100" alt="Story"></iframe>`;
          inner.appendChild(div);
        });
      }
    }

    document.getElementById('story').addEventListener('click', () => {
      populateCarousel();
      const storyModal = new bootstrap.Modal(document.getElementById('storyModal'));
      storyModal.show();
    });
  })
  .catch(err => console.error(err));

//Posts

fetch('/JSON/Posts.json')
  .then(response => response.json())
.then(posts => {
  const inner = document.getElementById('postshere');
  inner.innerHTML = ''; 


  posts.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));


  const recentPosts = posts.slice(0, 8);

  recentPosts.forEach(post => {
    const div = document.createElement('div');
    div.style.marginBottom = '20px';
    const date = new Date(post.timestamp);
    const ausDate = date.toLocaleDateString("en-AU"); 

    if (post.type === 'video' || post.type === 'vlog') {
      let textwrap;
      if(post.type === 'video'){
        textwrap=`<p class="badge bg-danger text-wrap">Video Post</p><br><p class="badge bg-secondary text-wrap">${ausDate}</p>`;
      } else {
        textwrap=`<p class="badge bg-primary text-wrap">${post.vlog}</p><br><p class="badge bg-secondary text-wrap">${ausDate}</p>`;
      }

      const videoWrapper = document.createElement('div');
      videoWrapper.style.position = 'relative';
      videoWrapper.style.width = '100%';
      videoWrapper.style.paddingBottom = '56.25%'; 
      videoWrapper.style.height = '0';
      videoWrapper.style.marginBottom = '10px';

      const iframe = document.createElement('iframe');
      iframe.src = post.url;
      iframe.title = 'YouTube video player';
      iframe.frameBorder = '0';
      iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';
      iframe.referrerPolicy = 'strict-origin-when-cross-origin';
      iframe.allowFullscreen = true;

      iframe.style.position = 'absolute';
      iframe.style.top = '0';
      iframe.style.left = '0';
      iframe.style.width = '100%';
      iframe.style.height = '100%';

      videoWrapper.appendChild(iframe);
      const wrap = document.createElement('div');
      wrap.innerHTML = textwrap;
      div.appendChild(wrap);
      div.appendChild(videoWrapper);

      const caption = document.createElement('p');
      caption.innerHTML = post.caption;
      div.appendChild(caption);
      div.appendChild(document.createElement('hr'));

      inner.appendChild(div);

    } else if (post.type === 'photo') {
      const carouselId = `carousel${post.id}`; 
      const carouselDiv = document.createElement('div');
      carouselDiv.id = carouselId;
      carouselDiv.className = 'carousel slide';
      carouselDiv.setAttribute('data-interval', 'false');

      const innerDiv = document.createElement('div');
      innerDiv.className = 'carousel-inner';

      for (let i = 1; i <= post.count; i++) {
        const photoKey = 'photo' + i;
        if (post[photoKey]) {
          const itemDiv = document.createElement('div');
          itemDiv.className = 'carousel-item' + (i === 1 ? ' active' : '');

          const img = document.createElement('img');
          img.src = post[photoKey];
          img.className = 'd-block w-100';
          img.style = 'width:70%; height:70%';
          img.alt = `Photo ${i}`;

          itemDiv.appendChild(img);
          innerDiv.appendChild(itemDiv);
        }
      }

      carouselDiv.appendChild(innerDiv);

      const prev = document.createElement('button');
      prev.className = 'carousel-control-prev';
      prev.type = 'button';
      prev.setAttribute('data-bs-target', `#${carouselId}`);
      prev.setAttribute('data-bs-slide', 'prev');
      prev.innerHTML = `<span class="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span class="visually-hidden">Previous</span>`;

      const next = document.createElement('button');
      next.className = 'carousel-control-next';
      next.type = 'button';
      next.setAttribute('data-bs-target', `#${carouselId}`);
      next.setAttribute('data-bs-slide', 'next');
      next.innerHTML = `<span class="carousel-control-next-icon" aria-hidden="true"></span>
                        <span class="visually-hidden">Next</span>`;

      carouselDiv.appendChild(prev);
      carouselDiv.appendChild(next);

      const wrap = document.createElement('div');
      wrap.innerHTML = `<p class="badge bg-success text-wrap">Photo Post</p><br><p class="badge bg-secondary text-wrap">${ausDate}</p>`;
      div.appendChild(wrap);
      div.appendChild(carouselDiv);

      const caption = document.createElement('p');
      caption.innerHTML = post.caption;
      div.appendChild(caption);
      div.appendChild(document.createElement('hr'));
      inner.appendChild(div);
    }
  });

  if (posts.length > 8) {
    const btnDiv = document.createElement('div');
    btnDiv.className = 'text-center my-3';
    const viewMoreBtn = document.createElement('a');
    viewMoreBtn.href = 'posts.html';
    viewMoreBtn.className = 'btn btn-primary';
    viewMoreBtn.textContent = 'View More';
    btnDiv.appendChild(viewMoreBtn);
    inner.appendChild(btnDiv);
  }
}).catch(err => console.error(err));

