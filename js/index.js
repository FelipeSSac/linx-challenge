const handleOnLoad = () => {
 const ApiUrl = 'https://frontend-intern-challenge-api.iurykrieger.vercel.app/products?page=1';

  fetch(ApiUrl)
    .then(async(response) => {
      const { products } = await response.json();
      const content = document.getElementById('content');

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
        oldPrice.textContent = `De: R$${floatToString(product.oldPrice)}`;
        productInfo.appendChild(oldPrice);

        var price = document.createElement('h3');
        price.textContent = `Por: R$${floatToString(product.price)}`;
        productInfo.appendChild(price);

        var installments = document.createElement('h5');
        installments.textContent = `ou ${product.installments.count}X de R$${floatToString(product.installments.value)}`
        productInfo.appendChild(installments);

        var button = document.createElement('button');
        button.textContent = 'Comprar';
        productInfo.appendChild(button);

        article.appendChild(productInfo);
        content.appendChild(article)
      })

      var buttonShowMore = document.createElement('button');
      buttonShowMore.id = 'show-more';
      buttonShowMore.onclick = handleShowMore;

      var buttonText = document.createElement('h4');
      buttonText.textContent = 'Ainda mais produtos aqui!';
      buttonShowMore.appendChild(buttonText);

      const section = document.getElementById('section-product');
      section.appendChild(buttonShowMore);
    });
}

const handleShowMore = async () => {
  const contentItems = document.getElementById('content').childElementCount;
  const page = 1+(contentItems/8);

  fetch(`https://frontend-intern-challenge-api.iurykrieger.vercel.app/products?page=${page}`)
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

const handleShowAbout = () => {
  const button = document.getElementById('about-alg-button');
  const text = document.getElementById('about-alg-text');

  const isSelected = document.querySelector('.selected-button')

  if(isSelected){
    text.style.height = '228px';
    return button.className = 'other-button';
  }
  
  text.style.height = '0px';
  return button.className = 'other-button selected-button';
}

window.addEventListener('resize', function(event) {  
  if(event.target.innerWidth >= 1215){
    const text = document.getElementById('about-alg-text');

    if(text.style.height!='228px') {
      const button = document.getElementById('about-alg-button');
      
      button.className = 'other-button';
      return text.style.height = '228px';
    }
  }
}, true);

const floatToString = (value) => {
  var strValue = value.toString();
  strValue = strValue.split('.');

  if(!strValue[1]) return strValue+=',00';
  if(strValue[1].length <= 1) strValue[1]+= '0';

  return strValue.join(',');
}
