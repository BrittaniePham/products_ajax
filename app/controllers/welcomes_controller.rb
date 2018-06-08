class WelcomesController < ApplicationController
  def index
  end

  def form
    render partial: 'form'
  end
end
