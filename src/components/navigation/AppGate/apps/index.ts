import { Persona } from '@types'
import ArtistApp from './ArtistApp'
import HostApp from './HostApp'
import UserApp from './UserApp'


export default {
  [Persona.artist]: ArtistApp,
  [Persona.host]: HostApp,
  [Persona.user]: UserApp
}