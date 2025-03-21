const photos = document.querySelectorAll('.photo');

function dist(a, b) {
    const d = diff(a, b);
    return Math.sqrt(d.x*d.x + d.y*d.y);
}

function diff(a, b) {
    return { x: a.x - b.x, y: a.y - b.y };
}

function clamp(number, min, max) {
      return Math.max(min, Math.min(number, max));
}

photos.forEach(photo => {
    photo.addEventListener('mousemove', e => {
        const img = e.target.querySelector('img');

        const rect = e.target.getBoundingClientRect();

        const cursor = { x: e.clientX - rect.left, y: e.clientY - rect.top };
        const center = { x: rect.width/2, y: rect.height/2 };

        const distToCenter = dist(cursor, center);
        let scaleFactor = rect.height/1.5/distToCenter;
        scaleFactor = clamp(scaleFactor, 1, 1.2);
        img.style.scale = `${scaleFactor}`;

        const offset = diff(center, cursor);
        offset.x / scaleFactor;
        offset.y / scaleFactor;
        img.style.translate = `${offset.x/10}px ${offset.y/10}px`;
    });

    photo.addEventListener('mouseleave', e => {
        const img = e.target.querySelector('img');

        img.style.scale = '1';
        img.style.translate = '0 0';
    });
});
