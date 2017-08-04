import '../sass/styles.scss';
import angular from 'angular';
import rootReducer from './root.reducer'
import createLogger from 'redux-logger';
import thunk from 'redux-thunk';
import RootComponent from './root.component';
import ChatModule from './chat/chat.module';
import ngRedux from 'ng-redux';
import { default as DevTools, runDevTools} from './devTools';
import { createSampleData } from '../../config/sampleData';
import ngReduxUiRouter from 'redux-ui-router';

/**
 * @ngdoc module
 * @name root
 *
 * @description
 *
 * This is the root module
 *
 **/
const RootModule = angular
  .module('root', [
    ngRedux,
    ChatModule.name,
    ngReduxUiRouter
    ])
  .component('root', RootComponent);

if (process.env.NODE_ENV === 'development') {
  RootModule
    .config(/*@ngInject*/ ($ngReduxProvider) => {
      $ngReduxProvider.createStoreWith(rootReducer, [ thunk, 'ngUiRouterMiddleware',createLogger() ], [ DevTools.instrument() ]);
    })
    .run(runDevTools)
} else {
  RootModule
    .config(/*@ngInject*/ ($ngReduxProvider) => {
      $ngReduxProvider.createStoreWith(rootReducer, [thunk, 'ngUiRouterMiddleware']);
    })
}