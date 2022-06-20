# coding: utf-8

Gem::Specification.new do |spec|
  spec.name          = "dom-clobbering-wiki"
  spec.version       = "0.1"
  spec.authors       = ["Soheil Khodayari"]
  spec.email         = [""]

  spec.summary       = %q{DOM Clobbering Wiki}
  spec.homepage      = "https://soheilkhodayari.github.io/DOMClobbering/"
  spec.license       = "AGPL3"

  # spec.files         = `git ls-files -z`.split("\x0").select { |f| f.match(%r{^(assets|bin|_layouts|_includes|lib|Rakefile|_sass|LICENSE|README)}i) }
  spec.executables   << 'just-the-docs'

  spec.add_development_dependency "bundler", "~> 2.3.5"
  spec.add_runtime_dependency "jekyll", ">= 3.8.5"
  spec.add_runtime_dependency "just-the-docs"

end