$(document).ready(function() {
    const pageSize = 8; // Number of products per page
    let currentPage = 1;
    let products = [];

    // Fetch products from JSON
    $.getJSON('data.json', function(data) {
        products = data.products;
        renderProducts();
        setupPagination();
    });

    function renderProducts() {
        const start = (currentPage - 1) * pageSize;
        const end = start + pageSize;
        const paginatedProducts = products.slice(start, end);
        let productHTML = '';

        paginatedProducts.forEach(product => {
            productHTML += `
                <div class="col-md-3">
                    <div class="card h-100">
                        <img src="${product.image}" class="card-img-top" alt="${product.name}">
                        <div class="card-body">
                            <h5 class="card-title">${product.name}</h5>
                            <p class="card-text">${product.price}</p>
                            <a href="#order-form" class="btn btn-primary">Order Now</a>
                        </div>
                    </div>
                </div>
            `;
        });

        $('.products-section .row').html(productHTML);
    }

    function setupPagination() {
        const pageCount = Math.ceil(products.length / pageSize);
        let paginationHTML = '';

        for (let i = 1; i <= pageCount; i++) {
            paginationHTML += `<li class="page-item"><a class="page-link" href="#">${i}</a></li>`;
        }

        $('.pagination').html(paginationHTML);
        $('.pagination .page-link').click(function(e) {
            e.preventDefault();
            currentPage = parseInt($(this).text());
            renderProducts();
        });
    }
});
