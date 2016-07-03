use Rack::Static,
  urls: ["/js", "/css"],
  root: File.dirname(__FILE__)

run lambda { |env|
  [
    200,
    {
      'Content-Type' => 'text/html',
      'Cache-Control' => 'public, max-age=86400'
    },
    File.open('index.html', File::RDONLY)
  ]
}
