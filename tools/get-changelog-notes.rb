require_relative './utils'

def get_changelog_for_version(changelog, version)
    # Get the changelog notes for the specified version

    logs = []

    version_header_start = "## [#{version}]"
    sections = changelog.split("\n\n").select { |section| section.include?('## [') }

    sections.each do |section|
        if section.start_with?(version_header_start)
            lines = section.split("\n")
            full_version_header = lines.first  # Get the full header line with the date

            # Ensure that lines is an array and has more than one element
            if lines.is_a?(Array) && lines.length > 1
                log_entries = lines[1..-1].select { |line| !line.strip.empty? }  # Select non-empty lines
                logs << full_version_header  # Add the full header to logs
                logs.concat(log_entries)  # Add the log entries
                logs << ''  # Add a blank line to separate the sections
            end
        end
    end

    logs.empty? ? nil : logs.join("\n")
end  

def get_latest_changelog
    # Get the changelog notes for the latest version (from package.json)

    current_version = get_current_version_from_package_json
    changelog = read_changelog

    changelog_section = get_changelog_for_version(changelog, current_version)

    if changelog_section
        changelog_section
    else
        "No changelog found for version: #{current_version}"
    end
end
