import Alcohol from './Alcohol';
import Arena from './Arena';
import Arrow from './Arrow';
import ArrowLeft from './ArrowLeft';
import ArrowRight from './ArrowRight';
import Artist from './Artist';
import At from './At';
import Bell from './Bell';
import BellNotification from './BellNotification';
import Calendar from './Calendar';
import Checkmark from './Checkmark';
import Cheeseburger from './Cheeseburger';
import Clear from './Clear';
import Clipboard from './Clipboard';
import Club from './Club';
import Components from './Components';
import Contract from './Contract';
import CreateEvent from './CreateEvent';
import DM from './DM';
import Discover from './Discover';
import Dog from './Dog';
import EditImage from './EditImage';
import Event from './Event';
import EventManager from './EventManager';
import Experiment from './Experiment';
import Host from './Host';
import InfoOne from './InfoOne';
import InfoTwo from './InfoTwo';
import Link from './Link';
import Location from './Location';
import Lock from './Lock';
import Logo from './Logo';
import Meatballs from './Meatballs';
import Menu from './Menu';
import Mobile from './Mobile';
import Outdoors from './Outdoors';
import Pencil from './Pencil';
import Plus from './Plus';
import Profile from './Profile';
import Restaurant from './Restaurant';
import Search from './Search';
import SearchFilled from './SearchFilled';
import Security from './Security';
import Settings from './Settings';
import Share from './Share';
import Star from './Star';
import Tag from './Tag';
import TailedArrow from './TailedArrow';
import User from './User';
import X from './X';

export const SvgIcons = {
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
	'edit-image': EditImage
};

export type IconNames = keyof typeof SvgIcons;
