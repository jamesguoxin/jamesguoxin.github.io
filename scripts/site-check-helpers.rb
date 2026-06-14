# frozen_string_literal: true

require "nokogiri"
require "yaml"

module SiteCheckHelpers
  ROOT = File.expand_path("..", __dir__)

  module_function

  def page(path)
    full_path = File.join(ROOT, "_site", path)
    abort("Missing generated page: #{full_path}") unless File.file?(full_path)

    Nokogiri::HTML5.parse(File.read(full_path))
  end

  def baseurl
    config_path = File.join(ROOT, "_config.yml")
    configured = YAML.safe_load(File.read(config_path)).fetch("baseurl", "")
    value = ENV.fetch("JEKYLL_BASEURL", configured).to_s
    return "" if value.empty? || value == "/"

    "/#{value.gsub(%r{\A/+|/+\z}, "")}"
  end

  def internal_path(path)
    "#{baseurl}#{path}"
  end

  def normalized_text(node)
    node.text.gsub(/\s+/, " ").strip
  end
end
