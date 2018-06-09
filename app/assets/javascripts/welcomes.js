function getProduct(id) {
  $.ajax({
    url: 'http://json-server.devpointlabs.com/api/v1/products/' + id,
    type: 'GET'
  }).done( function(product) {
      $('product-list').append(product)
  })
}

$(document).ready( function() {
  //List all products from the server (GET) --- GET products to display by appending to list
  $.ajax({
    url: 'http://json-server.devpointlabs.com/api/v1/products', 
    type: 'GET',
    dataType: 'JSON'
  }).done(function(products) {
    products.forEach( function(prod) {
      var productItem = '<li class="product-item" data-id="' + prod.id + '" data-name="' + prod.name + '">' + prod.name + '</li>';
      $('#product-list').append(productItem)
    })
  }).fail(function(err) {
    alert(err.responseJSON.errors)
  });

  //Create an html form that you submit with ajax to create a new product (POST)
  $('#form').on('submit', function(e) {
    e.preventDefault()
    var data = $(this).serializeArray();
    $.ajax({
      url: 'http://json-server.devpointlabs.com/api/v1/products',
      type: 'POST',
      datatype: 'JSON',
      data: data
    }).done( function(newProduct) {
      newProduct = '<li class="product-item" data-id="' + newProduct.id + '" data-name="' + newProduct.name + '">' + newProduct.name + '</li>';
      $('#product-list').append(newProduct)
    })
  })

  //list all info about a single product
  $(document).on('click', '.product-item', function() {
    var currentProduct = {}
    currentProduct.id = this.dataset.id
    currentProduct.name = this.dataset.name
    currentProduct.base_price = this.dataset.base_price
    currentProduct.description = this.dataset.description
    currentProduct.quantity_on_hand = this.dataset.quantity_on_hand
    currentProduct.color = this.dataset.color
    currentProduct.weight = this.dataset.weight
    currentProduct.other_attributes = this.dataset.name
    debugger
    $.ajax({
      url: 'http://json-server.devpointlabs.com/api/v1/products/' + currentProduct.id,
      method: 'GET',
      datatype: 'JSON'
    }).done( function(product) {
      $('#title').text('Product Info: ' + currentProduct.name)
      var list = $('#product-info');
      list.empty();
      var li = '<li data-product-id="' + product.id + '">' + 'Name: ' + product.name + '<br /> Price: $' + product.base_price + '<br />Description: ' + product.description + '<br />Color: ' + product.color + '</li>';
      list.append(li)
    })
  })

  $(document).on('click', '.delete', function() {
    var id = $(this).closest('li').data().id;
    $.ajax({
      url: 'http://json-server.devpointlabs.com/api/v1/products/id',
      type: 'DELETE'
    }).done(function() {
      getProduct();
    }).fail(function(err) {
      alert('Could not delete');
    });
  })
})

  //Ability to update a product (PUT)
  //Ability to delete a product (DELETE)
