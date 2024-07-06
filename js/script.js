// Script ini hanya placeholder jika Anda ingin menambahkan fungsionalitas interaktif
document.addEventListener('DOMContentLoaded', (event) => {
    // Contoh interaksi: menampilkan alert saat gambar diklik
    const productImage = document.querySelector('.product img');
    productImage.addEventListener('click', () => {
        alert('Anda mengklik gambar produk!');
    });
});
$(document).ready(function(){
    $('.product-slider').slick({
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    });
});



/* scripts.js */
document.addEventListener('DOMContentLoaded', function () {
    const productItems = document.querySelectorAll('.product-item');

    productItems.forEach(item => {
        item.addEventListener('click', function () {
            const link = item.getAttribute('data-link');
            window.location.href = link;
        });
    });
});


// scripts.js

document.getElementById('commentForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
    
    fetch('/comments', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, email, message })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.text();
    })
    .then(message => {
        alert(message); // Tampilkan pesan dari server
        loadComments();
        document.getElementById('commentForm').reset();
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Gagal menyimpan komentar');
    });
});

function loadComments() {
    fetch('/comments')
        .then(response => response.json())
        .then(data => {
            const commentsContainer = document.getElementById('comments');
            commentsContainer.innerHTML = '<h3>Komentar Pelanggan</h3>';
            data.forEach((comment, index) => {
                const commentElement = document.createElement('div');
                commentElement.classList.add('comment');
                commentElement.innerHTML = `
                    <h4>${comment.name}</h4>
                    <p>${comment.message}</p>
                `;
                if (index >= 4) {
                    commentElement.style.display = 'none';
                }
                commentsContainer.appendChild(commentElement);
            });
            if (data.length > 4) {
                document.getElementById('showAllComments').style.display = 'block';
            } else {
                document.getElementById('showAllComments').style.display = 'none';
            }
        });
}

document.addEventListener('DOMContentLoaded', loadComments);

document.getElementById('showAllComments').addEventListener('click', function() {
    const hiddenComments = document.querySelectorAll('#comments .comment');
    hiddenComments.forEach(comment => {
        comment.style.display = 'block';
    });
    this.style.display = 'none';
});