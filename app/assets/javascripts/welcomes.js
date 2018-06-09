function getProduct(id) {
  $.ajax({
    url: 'http://json-server.devpointlabs.com/api/v1/products/' + id,
    type: 'GET'
  }).done( (product) => {
      $('product-list').append(product)
  })
}

$(document).ready(() => {
  //List all products from the server (GET) --- GET products to display by appending to list
  $.ajax({
    url: 'http://json-server.devpointlabs.com/api/v1/products', 
    type: 'GET',
    dataType: 'JSON'
  }).done((products) => {
    products.forEach((prod) => {
      let productItem = '<li class="product-item" data-id="' + prod.id + '" data-name="' + prod.name + '">' + prod.name + '<button id="edit">Edit</button>' + '<button id="delete">Delete</button>' +'</li>'
      $('#product-list').append(productItem)
    })
  }).fail(function(err) {
    alert(err.responseJSON.errors)
  });

  //Create an html form that you submit with ajax to create a new product (POST)
  $('#form').on('submit', function(e) {
    e.preventDefault()
    let data = $(this).serializeArray()
    $.ajax({
      url: 'http://json-server.devpointlabs.com/api/v1/products',
      type: 'POST',
      datatype: 'JSON',
      data: data
    }).done( (newProduct) => {
      newProduct = '<li class="product-item" data-id="' + newProduct.id + '" data-name="' + newProduct.name + '">' + newProduct.name + '</li>'
      $('#product-list').append(newProduct)
      $('#form').find("input[type=text], textarea").val("")
    })
  })

  //list all info about a single product
  $(document).on('click', '.product-item', function() {
    let currentProduct = {}
    currentProduct.id = this.dataset.id
    currentProduct.name = this.dataset.name
    currentProduct.base_price = this.dataset.base_price
    currentProduct.description = this.dataset.description
    currentProduct.quantity_on_hand = this.dataset.quantity_on_hand
    currentProduct.color = this.dataset.color
    currentProduct.weight = this.dataset.weight
    currentProduct.other_attributes = this.dataset.other_attributes
    $.ajax({
      url: 'http://json-server.devpointlabs.com/api/v1/products/' + currentProduct.id,
      type: 'GET',
      datatype: 'JSON'
    }).done( (product) => {
      $('#title').text('Product Info: ' + currentProduct.name)
      let list = $('#product-info')
      list.empty()
      let li = '<li data-product-id="' + product.id + '">' + 'Name: ' + product.name + '<br /> Price: $' + product.base_price + '<br />Description: ' + product.description + '<br />Color: ' + product.color + '<br /> Quantity: ' + product.quantity_on_hand + '<br /> Weight: ' + product.weight + '<br /> Other attributes: ' + product.other_attributes +'</li>'
      list.append(li)
    })
  })
  
  $(document).on('click', '#delete', function() {
    let id = $(this).parent('li').data().id
    $.ajax({
      url: 'http://json-server.devpointlabs.com/api/v1/products/' + id,
      type: 'DELETE',
      datatype: 'JSON'
    }).done(() => {
      $(this).parent('li').remove()
    }).fail((err) => {
      alert('Could not delete')
    })
  })
})

  //Ability to update a product (PUT)
  //Ability to delete a product (DELETE)
