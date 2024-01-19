require 'fileutils'
require_relative './get-changelog-notes'
require_relative './utils'

def create_android_changelog_directory(version_code, locale='en-US')
    # Create the changelog directory if it doesn't exist
    changelog_dir = File.join(__dir__, '..', 'fastlane', 'metadata', 'android', locale, 'changelogs')
    FileUtils.mkdir_p(changelog_dir)
    return File.join(changelog_dir, "#{version_code}.txt")
end

def prepare_android_changelog(locale='en-US')
    # Prepare the changelog for Android by writing the latest changelog notes to the proper directory
    version_code = get_current_build_number_from_package_json
    changelog_notes = get_latest_changelog
    changelog_file_path = create_android_changelog_directory(version_code, locale)
    File.write(changelog_file_path, changelog_notes)
end