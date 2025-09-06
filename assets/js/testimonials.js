(function () {
  const WRAPPER_SEL = '#testimonials-wrapper';
  const JSON_URL = 'assets/data/testimonials.json';

  const starIcon = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" aria-hidden="true" focusable="false">
      <path d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 
               51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 
               113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 
               128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 
               542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z"/>
    </svg>`;

  function slideTemplate(item) {
    const rating = typeof item.rating === 'number' ? item.rating.toFixed(1) : '5.0';
    const quote = item.quote ? String(item.quote) : '';
    const name  = item.name ? String(item.name) : 'Client';
    const role  = item.role ? String(item.role) : '';
    const avatar = item.avatar || 'assets/img/team/placeholder.jpg';

    return `
      <div class="swiper-slide testimonal-item background-section has-border-radius d-flex flex-column align-items-center">
        <div class="content">
          <div class="rating">
            <h3 class="heading">${rating}${starIcon}</h3>
            <p class="text-upper">out of 5 stars</p>
          </div>
          <p class="title-block mt-50">“${quote.replace(/"/g, '&quot;')}”</p>
          <div class="quote mt-30" aria-hidden="true">
            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="30" viewBox="0 0 40 30" fill="none">
              <path d="M0 0V30L15.0025 15V0H0Z" fill="#030104"></path>
              <path d="M24.9961 0V30L39.9986 15V0H24.9961Z" fill="#030104"></path>
            </svg>
          </div>
        </div>

        <div class="box-authoer w-100 v-light background-main p-20">
          <div class="authoer d-flex">
            <div class="img">
              <img class="cover-bg-img" src="${avatar}" alt="${name} photo" loading="lazy">
            </div>
            <svg width="26" height="19" viewBox="0 0 26 19" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <path d="M0 0C10.6801 7.41878 16.3937 7.34643 26 0V19C15.594 10.5293 9.86673 10.5632 0 19V0Z" fill="#E0E0E0"></path>
            </svg>
            <div class="text background-section">
              <h5>${name}</h5>
              <span>${role}</span>
            </div>
          </div>
        </div>
      </div>`;
  }

  async function buildTestimonials() {
    const wrapper = document.querySelector(WRAPPER_SEL);
    if (!wrapper) return;

    try {
      const res = await fetch(JSON_URL, { cache: 'no-store' });
      if (!res.ok) throw new Error('Failed to load testimonials.json');
      const data = await res.json();

      if (!Array.isArray(data) || data.length === 0) {
        wrapper.innerHTML = '<div class="swiper-slide"><p>No testimonials yet.</p></div>';
      } else {
        wrapper.innerHTML = data.map(slideTemplate).join('');
      }

      // Init Swiper: prefer your theme’s auto-init, otherwise init directly.
      if (window.dsnGrid && typeof window.dsnGrid.InitSwiper === 'function') {
        window.dsnGrid.InitSwiper();
      } else if (window.Swiper) {
        const container = wrapper.closest('.swiper-container');
        // eslint-disable-next-line no-unused-vars
        const swiper = new Swiper(container, {
          spaceBetween: 30,
          centeredSlides: false,
          direction: 'horizontal',
          autoHeight: false,
          slideToClickedSlide: false,
          grabCursor: true,
          mousewheel: false,
          loop: true,
          parallax: false,
          slidesPerGroup: 1,
          slidesPerView: 1,
          speed: 1000,
          effect: 'card'
        });
      }
    } catch (e) {
      console.error(e);
      wrapper.innerHTML = '<div class="swiper-slide"><p>Unable to load testimonials at the moment.</p></div>';
    }
  }

  document.addEventListener('DOMContentLoaded', buildTestimonials);
})();
