import Ember from 'ember'
import _ from 'lodash/lodash'

const {Component, on, run} = Ember

const scrollYEndContext = {
  name: 'on-scroll-y-end'
}
const debouncePeriod = 150

export default Component.extend({
  classNames: ['frost-scroll'],

  initializeScroll: on('didInsertElement', function () {
    run.scheduleOnce('afterRender', this, () => {
      window.Ps.initialize(this.$()[0])
    })

    if (_.isFunction(this.attrs['on-scroll-y-end'])) {
      this.$().on('ps-y-reach-end', () => {
        run.debounce(scrollYEndContext, this.attrs['on-scroll-y-end'], debouncePeriod, true)
      })
    }
  })
})
