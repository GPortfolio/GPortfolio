import { DOMIsLoaded } from '../../../scripts/utils'
import '../../../scripts/main'
import Filter from './Filter'

DOMIsLoaded(() => {
  new Filter()
})
