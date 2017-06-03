import { injectReducer } from '../../store/reducers'

export default (store) => ({
  /*  Async getComponent is only invoked when route matches   */
  getComponent (nextState, cb) {
    /*  Webpack - use 'require.ensure' to create a split point
        and embed an async module loader (jsonp) when bundling   */
    require.ensure([], (require) => {
      /*  Webpack - use require callback to define
          dependencies for bundling   */
      const Ask = require('./containers/AskContainer').default
      const reducer = require('./modules/AskModule').default

      /*  Add the reducer to the store on key 'counter'  */
      injectReducer(store, { key: 'ask', reducer })

      /*  Return getComponent   */
      cb(null, Ask)

    /* Webpack named bundle   */
    }, 'ask')
  }
})
