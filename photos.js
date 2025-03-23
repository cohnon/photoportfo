const modal = document.getElementById("modal");
const photos = document.querySelectorAll('.photo');

addEventListener('load', () => {
    photos.forEach(photo => {
        const rect = photo.getBoundingClientRect();

        const offset = rect.top/2 + rect.left/6;
        setTimeout(() => {
            photo.style.opacity = '1';
        }, offset);
    });
});

photos.forEach(photo => {
    photo.addEventListener('mousemove', e => {
        const img = e.target.querySelector('img');

        const rect = e.target.getBoundingClientRect();

        const cursor = { x: e.clientX - rect.left, y: e.clientY - rect.top };
        const center = { x: rect.width/2, y: rect.height/2 };

        const distToCenter = dist(cursor, center);
        let scale = 1.1 + (0.25 - (distToCenter/rect.height)/2);
        scale = Math.max(scale, 1);
        img.style.scale = `${scale}`;

        const offset = diff(center, cursor);
        offset.x *= (scale - 1);
        offset.y *= (scale - 1);
        img.style.translate = `${offset.x}px ${offset.y}px`;
    });

    photo.addEventListener('mouseleave', e => {
        const img = e.target.querySelector('img');

        img.style.scale = '1';
        img.style.translate = '0 0';
    });

    photo.addEventListener('click', e => {
        if (e.target.parentNode.nodeName == 'A') {
            return;
        }
        const img = e.target.querySelector('img');
        const modalImg = modal.querySelector('img');

        modalImg.src = img.src;
        modalImg.alt = img.alt;

        modal.style.opacity = '1';
        modal.style.visibility = 'visible';
    });
});

modal.querySelector('button').addEventListener('click', () => {
    modal.style.opacity = '0';
    modal.style.visibility = 'hidden';
});


// helper
function dist(a, b) {
    const d = diff(a, b);
    return Math.sqrt(d.x*d.x + d.y*d.y);
}

function diff(a, b) {
    return { x: a.x - b.x, y: a.y - b.y };
}

