import { Dayjs } from 'dayjs'

var dayjs = require('dayjs')
var duration = require('dayjs/plugin/duration')
var relativeTime = require('dayjs/plugin/relativeTime')

dayjs.extend(duration)
dayjs.extend(relativeTime)

class Time {

    static getDuration(startTime: Dayjs, endTime: Dayjs) {

        const diffDuration = dayjs.duration(endTime.diff(startTime))

        // Format the duration as requested
        let formattedDuration = ''
        if (diffDuration.hours() > 0) {
            formattedDuration += `${diffDuration.hours()}hr `
        }
        if (diffDuration.minutes() > 0) {
            formattedDuration += `${diffDuration.minutes()}min`
        }

        // Trim any extra space at the end
        formattedDuration = formattedDuration.trim()

        return formattedDuration

    }

}

export default Time