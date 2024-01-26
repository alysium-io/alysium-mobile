require 'json'

def get_current_build_number_from_package_json
    package_json_path = File.join(__dir__, '..', 'package.json')
    package_json = File.read(package_json_path)
    package_obj = JSON.parse(package_json)
    package_obj['build_number']
end

def get_current_version_from_package_json
    package_json_path = File.join(__dir__, '..', 'package.json')
    package_json = File.read(package_json_path)
    package_obj = JSON.parse(package_json)
    package_obj['version']
end

def read_changelog
    changelog_path = File.join(__dir__, '..', 'CHANGELOG.md')
    File.read(changelog_path)
end