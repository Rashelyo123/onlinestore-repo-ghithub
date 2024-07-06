document.querySelectorAll('.price-item').forEach(item => {
    item.addEventListener('click', function() {
        const packageName = this.getAttribute('data-name');
        const price = this.getAttribute('data-price');

        document.getElementById('package-name').value = packageName;
        document.getElementById('total-price').value = `Rp ${Number(price).toLocaleString('id-ID')}`;
        document.querySelector('.payment-form').scrollIntoView({ behavior: 'smooth' });
    });
});

document.getElementById('order-now').addEventListener('click', function() {
    const packageName = document.getElementById('package-name').value;
    const totalPrice = document.getElementById('total-price').value;

    const paymentMethodElements = document.querySelectorAll('.payment-method img.selected');
    const paymentMethod = paymentMethodElements.length ? paymentMethodElements[0].alt : '';

    if (packageName && totalPrice && paymentMethod) {
        const phoneNumber = '6283847114737'; 
        const message = `Order Details:\n\nPackage: ${packageName}\nTotal Price: ${totalPrice}\nPayment Method: ${paymentMethod}`;
        const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
        window.open(url, '_blank');
    } else if (!paymentMethod) {
        alert('Pilih metode pembayaran.');
    } else {
        alert('Please complete the form before ordering.');
    }
});

document.querySelectorAll('.payment-method img').forEach(img => {
    img.addEventListener('click', function() {
        document.querySelectorAll('.payment-method img').forEach(item => item.classList.remove('selected'));
        this.classList.add('selected');
        document.getElementById('order-now').disabled = false;
    });
});


// Data Produk
const products = [
    {
        name: 'Netflix All Plan',
        link: 'product1.html'
    },
    {
        name: 'Youtube Premium',
        link: 'product2.html'
    },
    {
        name: 'Spotify Premium',
        link: 'product3.html'
    },
    {
        name: 'Canva Pro',
        link: 'product4.html'
    },
    {
        name: 'Disney Hostar',
        link: 'product5.html'
    },
    {
        name: 'Bstation',
        link: 'product6.html'
    },
    {
        name: 'IQIYI',
        link: 'product7.html'
    },
    {
        name: 'Amazon Prime',
        link: 'product8.html'
    },
    {
        name: 'Vidio Platinum',
        link: 'product9.html'
    },
    {
        name: 'WeTV',
        link: 'product10.html'
    }
];


 // Fungsi untuk memfilter produk
 function filterProducts() {
    const searchInput = document.getElementById('search').value.toLowerCase();
    const resultsList = document.getElementById('results-list');
    const searchResults = document.getElementById('search-results');

    resultsList.innerHTML = '';
    let matches = 0;

    for (const product of products) {
        if (product.name.toLowerCase().includes(searchInput)) {
            matches++;
            const resultItem = document.createElement('li');
            resultItem.innerText = product.name;
            resultItem.addEventListener('click', function() {
                window.location.href = product.link;
            });
            resultsList.appendChild(resultItem);
        }
    }

    searchResults.style.display = matches > 0 ? 'block' : 'none';
}

// Tambahkan event listener pada dokumen untuk mendeteksi klik di luar elemen hasil pencarian
document.addEventListener('click', function(event) {
    const searchResults = document.getElementById('search-results');
    const searchInput = document.getElementById('search');
    
    // Jika klik terjadi di luar elemen hasil pencarian dan input pencarian, sembunyikan elemen hasil pencarian
    if (!searchResults.contains(event.target) && !searchInput.contains(event.target)) {
        searchResults.style.display = 'none';
    }
});