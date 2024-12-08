import Alcohol from './Alcohol';
import AppleMusic from './AppleMusic';
import Arena from './Arena';
import Arrow from './Arrow';
import ArrowDown from './ArrowDown';
import ArrowLeft from './ArrowLeft';
import ArrowRight from './ArrowRight';
import ArrowUp from './ArrowUp';
import Artist from './Artist';
import At from './At';
import Bandcamp from './Bandcamp';
import Beatport from './Beatport';
import Bell from './Bell';
import BellNotification from './BellNotification';
import BigCartel from './BigCartel';
import BuyMeACoffee from './BuyMeACoffee';
import Calendar from './Calendar';
import Chainlink from './Chainlink';
import Checkmark from './Checkmark';
import Cheeseburger from './Cheeseburger';
import Clear from './Clear';
import Clipboard from './Clipboard';
import Club from './Club';
import Components from './Components';
import Contract from './Contract';
import CreateEvent from './CreateEvent';
import DM from './DM';
import Deezer from './Deezer';
import Dice from './Dice';
import Discover from './Discover';
import Dog from './Dog';
import EditImage from './EditImage';
import Event from './Event';
import EventManager from './EventManager';
import Eventbrite from './Eventbrite';
import Experiment from './Experiment';
import Facebook from './Facebook';
import Filter from './Filter';
import Host from './Host';
import InfoOne from './InfoOne';
import InfoTwo from './InfoTwo';
import Instagram from './Instagram';
import Kofi from './Kofi';
import Link from './Link';
import Location from './Location';
import Lock from './Lock';
import Logo from './Logo';
import Meatballs from './Meatballs';
import Menu from './Menu';
import Mobile from './Mobile';
import OldPhone from './OldPhone';
import Outdoors from './Outdoors';
import Patreon from './Patreon';
import Pause from './Pause';
import Pencil from './Pencil';
import Phone from './Phone';
import Play from './Play';
import Plus from './Plus';
import Profile from './Profile';
import Rank from './Rank';
import Restaurant from './Restaurant';
import Search from './Search';
import SearchFilled from './SearchFilled';
import Security from './Security';
import Settings from './Settings';
import Share from './Share';
import ShareExternal from './ShareExternal';
import Shopify from './Shopify';
import Soundcloud from './Soundcloud';
import Spotify from './Spotify';
import Star from './Star';
import Tag from './Tag';
import TailedArrow from './TailedArrow';
import Threads from './Threads';
import Ticket from './Ticket';
import Tidal from './Tidal';
import TikTok from './TikTok';
import Trash from './Trash';
import TwitterX from './TwitterX';
import User from './User';
import Vimeo from './Vimeo';
import X from './X';
import Youtube from './Youtube';

export const SvgIcons = {
	// Social Media
	'apple-music': AppleMusic,
	bandcamp: Bandcamp,
	beatport: Beatport,
	'big-cartel': BigCartel,
	'buy-me-a-coffee': BuyMeACoffee,
	deezer: Deezer,
	dice: Dice,
	eventbrite: Eventbrite,
	facebook: Facebook,
	instagram: Instagram,
	kofi: Kofi,
	patreon: Patreon,
	shopify: Shopify,
	soundcloud: Soundcloud,
	threads: Threads,
	tidal: Tidal,
	tiktok: TikTok,
	'twitter-x': TwitterX,
	vimeo: Vimeo,
	youtube: Youtube,

	search: Search,
	'search-filled': SearchFilled,
	profile: Profile,
	logo: Logo,
	lock: Lock,
	arrow: Arrow,
	dm: DM,
	star: Star,
	tag: Tag,
	'tailed-arrow': TailedArrow,
	link: Link,
	share: Share,
	menu: Menu,
	bell: Bell,
	'bell-notification': BellNotification,
	contract: Contract,
	x: X,
	settings: Settings,
	'create-event': CreateEvent,
	'event-manager': EventManager,
	'arrow-left': ArrowLeft,
	experiment: Experiment,
	components: Components,
	'info-one': InfoOne,
	'info-two': InfoTwo,
	artist: Artist,
	location: Location,
	host: Host,
	'arrow-right': ArrowRight,
	clear: Clear,
	event: Event,
	user: User,
	checkmark: Checkmark,
	alcohol: Alcohol,
	restaurant: Restaurant,
	pencil: Pencil,
	clipboard: Clipboard,
	calendar: Calendar,
	mobile: Mobile,
	discover: Discover,
	meatballs: Meatballs,
	cheeseburger: Cheeseburger,
	security: Security,
	dog: Dog,
	outdoors: Outdoors,
	club: Club,
	arena: Arena,
	at: At,
	plus: Plus,
	'edit-image': EditImage,
	phone: Phone,
	ticket: Ticket,
	'arrow-up': ArrowUp,
	'arrow-down': ArrowDown,
	spotify: Spotify,
	filter: Filter,
	rank: Rank,
	play: Play,
	pause: Pause,
	trash: Trash,
	'share-external': ShareExternal,
	chainlink: Chainlink,
	'old-phone': OldPhone
};

export type IconNames = keyof typeof SvgIcons;
