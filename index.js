import {Navigation} from "react-native-navigation";
import App from './App';
import Results from './window/Results';
import Tests from './window/Tests';
import Drawer from './window/Drawer';
import { Dimensions } from 'react-native'


Navigation.registerComponent('App', () => App);
Navigation.registerComponent('Results', () => Results);
Navigation.registerComponent('Tests', () => Tests);
Navigation.registerComponent('Drawer', () => Drawer);


const { width } = Dimensions.get('window');
Navigation.events().registerAppLaunchedListener(() => {
    Navigation.setDefaultOptions({
        layout: {
            orientation: ['portrait']
        },
        topBar: {
            elevation: 0,
            //visible: false,
            drawBehind: true,
            animate: false,
            buttonColor: 'white',
            title: {
                color: 'white',
                alignment: 'center',
                text: 'Quiz'
            },
            background: {
                color: 'transparent'
            }
        }
    });
Navigation.setRoot({
root: {
    sideMenu: {
        left: {
            component: {
                id: 'drawerId',
                name: 'Drawer',
                fixedWidth: width
            }
        },
        center: {
            stack: {
                id: 'MAIN_STACK',
                children: [
                    {
                    component: {
                        id: 'appId',
                      name: 'App',

                      options: {
                        topBar: {

                        }
                      }
                    }
},
]
}
}
},

}

});
});