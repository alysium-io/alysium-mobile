import { EventStatus } from '@types'
import day from 'dayjs'

const artistImages = {
    'firebeatz': 'https://cdn.discordapp.com/attachments/1182734839934369933/1183808831583682672/firebeatz.png?ex=6589aee3&is=657739e3&hm=d5c21f3d7708704137a022ae8b3d35c3fb49251827cfdaf3e70572eb5d43853a&',
    'julian jordan': 'https://cdn.discordapp.com/attachments/1182734839934369933/1183808831902470214/julian_jordan.png?ex=6589aee3&is=657739e3&hm=6f7c3b1fa5953ee5cc577d6e9c31090e96d1effc3375eecbf07a208e15d756f6&',
    'seth hills': 'https://cdn.discordapp.com/attachments/1182734839934369933/1183542222319267880/seth_hills.png?ex=6588b696&is=65764196&hm=3435f57a32143001710ae518388dcb023b73d16cfbd5a45ed6c0f8982be1872a&',
    'mesto': 'https://i.scdn.co/image/ab6761610000e5ebda9a10f67a550b3b3e7d71b7'
}

const sampleImages = {
    'event': 'https://www.lostlandsfestival.com/wp-content/uploads/2019/10/2_Lost_Lands_2022_slider.jpg',
    'host': 'https://www.billboard.com/wp-content/uploads/media/Ibiza-Paradise-hero-billboard-1548.jpg',
    'artist': 'https://i.scdn.co/image/ab6761610000e5ebda9a10f67a550b3b3e7d71b7',
    'user': 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8dXNlcnxlbnwwfHwwfHx8MA%3D%3D'
}

const venueImages = [
    'https://cdn.discordapp.com/attachments/1182734839934369933/1185322796335771728/nightclub_1.png?ex=658f30e0&is=657cbbe0&hm=b87a6a0f4bdbb464bb3bb326f9ae4cec1666cf85997bfec3d603199137978a6b&',
    'https://cdn.discordapp.com/attachments/1182734839934369933/1185322796641960017/live_venue_1.png?ex=658f30e0&is=657cbbe0&hm=6527ea44e0d910cf43201eed7406dacece271b7095fcf45b72f0e132f606ada3&',
    'https://cdn.discordapp.com/attachments/1182734839934369933/1185322796964925482/backyard_1.png?ex=658f30e1&is=657cbbe1&hm=6d70715aecc083dd4d75f3a29344c054fc511b1ea7d398306ddb205ddfdf75cb&'
]

const sampleEvents = [
    {
        id: 1,
        name: 'Sub Sessions',
        status: EventStatus.live,
        image: venueImages[0]
    },
    {
        id: 2,
        name: 'Tomorrowland',
        status: EventStatus.completed,
        image: venueImages[1]
    },
    {
        id: 3,
        name: 'Ultra Miami',
        status: EventStatus.draft,
        image: venueImages[2]
    },
    {
        id: 4,
        name: 'Backyard Bangerz',
        status: EventStatus.cancelled,
        image: venueImages[3]
    }
]

const listOfArtists = [
    {
        name: 'Seth Hills',
        image: artistImages['seth hills'],
        location: 'Amsterdam, NE',
    },
    {
        name: 'Julian Jordan',
        image: artistImages['julian jordan'],
        location: 'Amstooval, NE',
    },
    {
        name: 'Firebeatz',
        image: artistImages['firebeatz'],
        location: 'Los Angeles, CA',
    },
    {
        name: 'Mesto',
        image: artistImages['mesto'],
        location: 'New York, NY'
    }
]

const sampleTags = [
    'house',
    'electronic',
    'dance',
    'pop',
    'edm',
    'electro',
    'electro house'
]

const sampleData = {
    sampleTags,
    images: sampleImages,
    artistImages,
    venueImages,
    listOfArtists,
    sampleEvents,
    artist: {
        name: 'Seth Hills',
        about: "Mesto is a Dutch DJ and record producer. He is best known for his collaboration with Martin Garrix, Bouncybob, which was released on 18 December 2015. He has released songs on Spinnin' Records, Musical Freedom, and Revealed Recordings. He has performed at festivals including Tomorrowland, Creamfields, and Mysteryland.",
        image: 'https://cdn.discordapp.com/attachments/1182734839934369933/1183542222319267880/seth_hills.png?ex=6588b696&is=65764196&hm=3435f57a32143001710ae518388dcb023b73d16cfbd5a45ed6c0f8982be1872a&',
        tags: [
            {
                name: 'Progressive House'
            },
            {
                name: 'Electro House'
            },
            {
                name: 'Big Room'
            }
        ],
        followers: 153205,
        shows: 42,
        links: [
            {
                title: 'Spotify',
                url: 'https://open.spotify.com/artist/1Xyo4u8uXC1ZmMpatF05PJ'
            },
            {
                title: 'Youtube',
                url: 'https://www.youtube.com/channel/UC_aEa8K-EOJ3D6gOs7HcyNg'
            },
            {
                title: 'Instagram',
                url: 'https://www.instagram.com/mestomusic/'
            },
            {
                title: 'Tiktok',
                url: 'https://www.tiktok.com/@mestomusic'
            }
        ],
        images: [
            'https://www.tomorrowland.com/src/Frontend/Themes/tomorrowland/Core/Layout/images/timeline/2023-1.jpg',
            'https://www.houseoffrankie.com/wportal/wp-content/uploads/2019/07/20181021_LiekevandenOord_ADE_ProjectOne_Lowres_LVDO6096.jpg',
            'https://i.ytimg.com/vi/OpN9ycCWtec/maxresdefault.jpg',
            'https://beijingbirdsnest.files.wordpress.com/2010/09/birds_nest_stadium_beijing_china-hd.jpg',
            'https://www.lostlandsfestival.com/wp-content/uploads/2019/10/2_Lost_Lands_2022_slider.jpg'
        ],
        pinnedEvents: [
            {
                id: 1,
                name: 'Tomorrowland',
                image: 'https://www.tomorrowland.com/src/Frontend/Themes/tomorrowland/Core/Layout/images/timeline/2023-1.jpg',
                ticketsSold: 552172
            },
            {
                id: 2,
                name: 'ADE',
                image: 'https://www.houseoffrankie.com/wportal/wp-content/uploads/2019/07/20181021_LiekevandenOord_ADE_ProjectOne_Lowres_LVDO6096.jpg',
                ticketsSold: 425820
            },
            {
                id: 3,
                name: 'Ultra Miami 2023',
                image: 'https://i.ytimg.com/vi/OpN9ycCWtec/maxresdefault.jpg',
                ticketsSold: 325253
            },
            {
                id: 4,
                name: 'Crows Nest',
                image: 'https://beijingbirdsnest.files.wordpress.com/2010/09/birds_nest_stadium_beijing_china-hd.jpg',
                ticketsSold: 102425
            },
            {
                id: 5,
                name: 'Lost Lands',
                image: 'https://www.lostlandsfestival.com/wp-content/uploads/2019/10/2_Lost_Lands_2022_slider.jpg',
                ticketsSold: 99240
            }
        ],  
        upcomingEvents: [
            {
                id: 1,
                name: 'Tomorrowland',
                image: 'https://www.tomorrowland.com/src/Frontend/Themes/tomorrowland/Core/Layout/images/timeline/2023-1.jpg',
                date: 'Thurs. Jan 21'
            },
            {
                id: 2,
                name: 'ADE',
                image: 'https://www.houseoffrankie.com/wportal/wp-content/uploads/2019/07/20181021_LiekevandenOord_ADE_ProjectOne_Lowres_LVDO6096.jpg',
                date: 'Fri. Feb 21'
            },
            {
                id: 3,
                name: 'Ultra Miami 2023',
                image: 'https://i.ytimg.com/vi/OpN9ycCWtec/maxresdefault.jpg',
                date: 'Sat. Mar 21'
            },
            {
                id: 4,
                name: 'Crows Nest',
                image: 'https://beijingbirdsnest.files.wordpress.com/2010/09/birds_nest_stadium_beijing_china-hd.jpg',
                date: 'Sun. Apr 21'
            },
            {
                id: 5,
                name: 'Lost Lands',
                image: 'https://www.lostlandsfestival.com/wp-content/uploads/2019/10/2_Lost_Lands_2022_slider.jpg',
                date: 'Tue. May 21'
            }
        ],
        relatedArtists: [
            {
                itemId: 1,
                image: 'https://i.scdn.co/image/ab6761610000e5ebda9a10f67a550b3b3e7d71b7',
                title: 'Julian Jordan',
                subtitle: 'Heat-maker'
            },
            {
                itemId: 2,
                title: 'Martin Garrix',
                image: 'https://i.scdn.co/image/ab6761610000e5ebda9a10f67a550b3b3e7d71b7',
                subtitle: 'Banger city'
            },
            {
                itemId: 3,
                title: 'Seth Hills',
                image: 'https://i.scdn.co/image/ab6761610000e5ebda9a10f67a550b3b3e7d71b7',
                subtitle: 'ohmahgawd'
            },
            {
                itemId: 4,
                title: 'Curbi',
                image: 'https://i.scdn.co/image/ab6761610000e5ebda9a10f67a550b3b3e7d71b7',
                subtitle: 'WOW'
            },
            {
                itemId: 5,
                title: 'Dyro',
                image: 'https://i.scdn.co/image/ab6761610000e5ebda9a10f67a550b3b3e7d71b7',
                subtitle: 'Sick asfuq'
            }
        ]
    },
    host: {
        name: 'EDX',
        image: 'https://www.billboard.com/wp-content/uploads/media/Ibiza-Paradise-hero-billboard-1548.jpg',
        about: "Nestled in the heart of downtown Los Angeles, Echelon Nightclub stands as a beacon for music aficionados and night owls alike. Synonymous with electrifying beats, cutting-edge light shows, and an ambiance that screams pure Hollywood allure, Echelon isn't just a club—it's an experience.",
        relatedVenues: [
            {
                itemId: 1,
                image: 'https://i.scdn.co/image/ab6761610000e5ebda9a10f67a550b3b3e7d71b7',
                title: 'EDX Nightclub',
                subtitle: 'Party Vibes'
            },
            {
                itemId: 2,
                image: 'https://i.scdn.co/image/ab6761610000e5ebda9a10f67a550b3b3e7d71b7',
                title: 'Backyard Bangerz',
                subtitle: 'drinks n chill'
            },
            {
                itemId: 3,
                image: 'https://i.scdn.co/image/ab6761610000e5ebda9a10f67a550b3b3e7d71b7',
                title: 'Museum of Art',
                subtitle: 'History & Culture'
            },
            {
                itemId: 4,
                image: 'https://i.scdn.co/image/ab6761610000e5ebda9a10f67a550b3b3e7d71b7',
                title: 'iDance',
                subtitle: 'Dance Studio'
            },
            {
                itemId: 5,
                image: 'https://i.scdn.co/image/ab6761610000e5ebda9a10f67a550b3b3e7d71b7',
                title: 'SubSessions',
                subtitle: 'subwoofers & bass'
            },
        ],
        images: [
            'https://www.tomorrowland.com/src/Frontend/Themes/tomorrowland/Core/Layout/images/timeline/2023-1.jpg',
            'https://www.houseoffrankie.com/wportal/wp-content/uploads/2019/07/20181021_LiekevandenOord_ADE_ProjectOne_Lowres_LVDO6096.jpg',
            'https://i.ytimg.com/vi/OpN9ycCWtec/maxresdefault.jpg',
            'https://beijingbirdsnest.files.wordpress.com/2010/09/birds_nest_stadium_beijing_china-hd.jpg',
            'https://www.lostlandsfestival.com/wp-content/uploads/2019/10/2_Lost_Lands_2022_slider.jpg'
        ],
        links: [
            {
                title: 'Spotify',
                url: 'https://open.spotify.com/artist/1Xyo4u8uXC1ZmMpatF05PJ'
            },
            {
                title: 'Youtube',
                url: 'https://www.youtube.com/channel/UC_aEa8K-EOJ3D6gOs7HcyNg'
            },
            {
                title: 'Instagram',
                url: 'https://www.instagram.com/mestomusic/'
            },
            {
                title: 'Tiktok',
                url: 'https://www.tiktok.com/@mestomusic'
            }
        ],
        pinnedEvents: [
            {
                id: 1,
                name: 'Tomorrowland',
                image: 'https://www.tomorrowland.com/src/Frontend/Themes/tomorrowland/Core/Layout/images/timeline/2023-1.jpg',
                ticketsSold: 552172
            },
            {
                id: 2,
                name: 'ADE',
                image: 'https://www.houseoffrankie.com/wportal/wp-content/uploads/2019/07/20181021_LiekevandenOord_ADE_ProjectOne_Lowres_LVDO6096.jpg',
                ticketsSold: 425820
            },
            {
                id: 3,
                name: 'Ultra Miami 2023',
                image: 'https://i.ytimg.com/vi/OpN9ycCWtec/maxresdefault.jpg',
                ticketsSold: 325253
            },
            {
                id: 4,
                name: 'Crows Nest',
                image: 'https://beijingbirdsnest.files.wordpress.com/2010/09/birds_nest_stadium_beijing_china-hd.jpg',
                ticketsSold: 102425
            },
            {
                id: 5,
                name: 'Lost Lands',
                image: 'https://www.lostlandsfestival.com/wp-content/uploads/2019/10/2_Lost_Lands_2022_slider.jpg',
                ticketsSold: 99240
            }
        ],
        upcomingEvents: [
            {
                id: 1,
                name: 'Tomorrowland',
                image: 'https://www.tomorrowland.com/src/Frontend/Themes/tomorrowland/Core/Layout/images/timeline/2023-1.jpg',
                date: 'Thurs. Jan 21'
            },
            {
                id: 2,
                name: 'ADE',
                image: 'https://www.houseoffrankie.com/wportal/wp-content/uploads/2019/07/20181021_LiekevandenOord_ADE_ProjectOne_Lowres_LVDO6096.jpg',
                date: 'Fri. Feb 21'
            },
            {
                id: 3,
                name: 'Ultra Miami 2023',
                image: 'https://i.ytimg.com/vi/OpN9ycCWtec/maxresdefault.jpg',
                date: 'Sat. Mar 21'
            },
            {
                id: 4,
                name: 'Crows Nest',
                image: 'https://beijingbirdsnest.files.wordpress.com/2010/09/birds_nest_stadium_beijing_china-hd.jpg',
                date: 'Sun. Apr 21'
            },
            {
                id: 5,
                name: 'Lost Lands',
                image: 'https://www.lostlandsfestival.com/wp-content/uploads/2019/10/2_Lost_Lands_2022_slider.jpg',
                date: 'Tue. May 21'
            }
        ]
    },
    event: {
        name: 'EDX Tuesdays',
        image: 'https://cdn.discordapp.com/attachments/1182734839934369933/1183803050037628928/nightclub.png?ex=6589a981&is=65773481&hm=d5bb6c89ab9b0459a2d6b38ebc4234aa2d1b9c371a8b531422f9a30b1db18a37&',
        date: 'Thurs. Oct. 28th',
        time: '10:00 PM',
        city: 'Amsterdam, NE',
        address: '10083 N. Condor Street',
        lineup: [
            {
                name: 'Seth Hills',
                image: artistImages['seth hills'],
                startTime: day().add(1, 'hour'),
                endTime: day().add(2, 'hour')
            },
            {
                name: 'Julian Jordan',
                image: artistImages['julian jordan'],
                startTime: day().add(2, 'hour'),
                endTime: day().add(3, 'hour')
            },
            {
                name: 'Firebeatz',
                image: artistImages['firebeatz'],
                startTime: day().add(3, 'hour'),
                endTime: day().add(4, 'hour')
            },
            {
                name: 'Mesto',
                image: artistImages['mesto'],
                startTime: day().add(4, 'hour'),
                endTime: day().add(5, 'hour')
            }
        ]
    }
}

const sampleApiResponses = {
    artist: {
        name: sampleData.artist.name,
        about: sampleData.artist.about,
        image: sampleData.artist.image,
        tags: sampleData.artist.tags,
        followers: sampleData.artist.followers,
        shows: sampleData.artist.shows,
        links: sampleData.artist.links,
        images: sampleData.artist.images,
        pinnedEvents: sampleData.artist.pinnedEvents,
        upcomingEvents: sampleData.artist.upcomingEvents,
        relatedArtists: sampleData.artist.relatedArtists
    },
    host: {
        name: sampleData.host.name,
        image: sampleData.host.image,
        about: sampleData.host.about,
        relatedVenues: sampleData.host.relatedVenues,
        images: sampleData.host.images,
        links: sampleData.host.links,
        pinnedEvents: sampleData.host.pinnedEvents,
        upcomingEvents: sampleData.host.upcomingEvents
    },
    event: {
        name: sampleData.event.name,
        image: sampleData.event.image,
        date: sampleData.event.date,
        time: sampleData.event.time,
        city: sampleData.event.city,
        address: sampleData.event.address
    }
}

export default {
    artistImages,
    sampleData,
    sampleApiResponses
}