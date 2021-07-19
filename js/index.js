const handleOnLoad = () => {
  const url = new URL (window.location.href);
  const page = url.searchParams.get("page");

  if(!page){
    var ApiUrl = 'https://frontend-intern-challenge-api.iurykrieger.vercel.app/products?page=1';
  } else {
    var ApiUrl = `https://frontend-intern-challenge-api.iurykrieger.vercel.app/products?page=${page}`;
  }

  fetch(ApiUrl)
    .then(async(response) => {
      const { products, nextPage } = await response.json()
      const content = document.getElementById('content')

      products.forEach(product => {
        var article = document.createElement('article');
        article.className = 'product';

        var productInfo = document.createElement('div');
        productInfo.className = 'product-info';

        var image = document.createElement('img');
        image.src = product.image;
        image.alt = `Product number ${product.id}`;
        article.appendChild(image);

        var name = document.createElement('h4');
        name.textContent = product.name;
        productInfo.appendChild(name);

        var description = document.createElement('p');
        description.className = 'product-desc';
        description.textContent = product.description;
        productInfo.appendChild(description);

        var oldPrice = document.createElement('h5');
        oldPrice.textContent = `De: R$${product.oldPrice},00`;
        productInfo.appendChild(oldPrice);

        var price = document.createElement('h3');
        price.textContent = `Por: R$${product.price},00`;
        productInfo.appendChild(price);

        var installments = document.createElement('h5');
        installments.textContent = `ou ${product.installments.count}X de R$${product.installments.value}`
        productInfo.appendChild(installments);

        var button = document.createElement('button');
        button.textContent = 'Comprar';
        productInfo.appendChild(button);

        article.appendChild(productInfo);
        content.appendChild(article)
      })
    });
}

const handleNextPage = () => {  
  const url = new URL (window.location.href);
  var page = url.searchParams.get("page");

  if(!page){
    window.location.href = '?page=2';
  } else {
    window.location.href =`?page=${++page}`;
    ;
  }
}