class Podcastly < Sinatra::Base
  get '/' do
    File.readlines 'public/index.html'
  end

  get '/favicon.ico' do
    ''
  end
end
