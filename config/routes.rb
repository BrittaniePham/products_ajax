Rails.application.routes.draw do
  root 'welcomes#index'
  get 'product_form', to: 'welcomes#form'
end
