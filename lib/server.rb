require 'sinatra'

set :root, File.dirname(__FILE__) + "/../"

get "/" do
  File.readlines("public/index.html")
end

get "/favicon.ico" do
  ""
end
