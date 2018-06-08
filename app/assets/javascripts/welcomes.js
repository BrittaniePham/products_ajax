function getProduct(id) {
  $.ajax({
    url: '/products/' + id,
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


  // $('.product-item').on('click', function() {
  // })

  //Ability to update a product (PUT)
  //Ability to delete a product (DELETE)
})
