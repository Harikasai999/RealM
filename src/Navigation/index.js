/*Example of RealM Database in React Native*/
import React from "react";

import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { createDrawerNavigator } from "react-navigation-drawer";
import HomeScreen from "@HomeScreen";
import RegisterUser from "@RegisterUser";
import UpdateUser from "@UpdateUser";
import ViewUser from "@ViewUser";
import ViewAllUser from "@ViewAllUser";
import DeleteUser from "@DeleteUser";
import SideBar from "@SideBar";
import Login from "@Login";
import Signature from "@Signature";
import Sample from "@Sample";
import Form from "@Form";
import FormDup from "@FormDup";
import PhotoPreview from "@PhotoPreview";

import UI from "@UI";
const Navigation = createStackNavigator({
  Form: {
    screen: Form,
    navigationOptions: {
      title: "Form",
      headerStyle: { backgroundColor: "#3a59b7" },
      headerTintColor: "#ffffff"
    }
  },
  FormDup: {
    screen: FormDup,
    navigationOptions: {
      title: "Form 1",
      headerStyle: { backgroundColor: "#3a59b7" },
      headerTintColor: "#ffffff"
    }
  },
  Login: {
    screen: Login,
    navigationOptions: {
      title: "Login",
      headerStyle: { backgroundColor: "#3a59b7" },
      headerTintColor: "#ffffff"
    }
  },
  Sample: {
    screen: Sample,
    navigationOptions: {
      title: "Sample",
      headerStyle: { backgroundColor: "#3a59b7" },
      headerTintColor: "#ffffff"
    }
  },
  UI: {
    screen: UI,
    navigationOptions: {
      title: "UI",
      headerStyle: { backgroundColor: "#3a59b7" },
      headerTintColor: "#ffffff"
    }
  },
  HomeScreen: {
    screen: HomeScreen,
    navigationOptions: {
      title: "HomeScreen",
      headerStyle: { backgroundColor: "#3a59b7" },
      headerTintColor: "#ffffff"
    }
  },
  View: {
    screen: ViewUser,
    navigationOptions: {
      title: "View User",
      headerStyle: { backgroundColor: "#3a59b7" },
      headerTintColor: "#ffffff"
    }
  },
  ViewAll: {
    screen: ViewAllUser,
    navigationOptions: {
      title: "View All User",
      headerStyle: { backgroundColor: "#3a59b7" },
      headerTintColor: "#ffffff"
    }
  },
  Update: {
    screen: UpdateUser,
    navigationOptions: {
      title: "Update User",
      headerStyle: { backgroundColor: "#3a59b7" },
      headerTintColor: "#ffffff"
    }
  },
  Register: {
    screen: RegisterUser,
    navigationOptions: {
      title: "Register User",
      headerStyle: { backgroundColor: "#3a59b7" },
      headerTintColor: "#ffffff"
    }
  },
  Delete: {
    screen: DeleteUser,
    navigationOptions: {
      title: "Delete User",
      headerStyle: { backgroundColor: "#3a59b7" },
      headerTintColor: "#ffffff"
    }
  },

  Signature: {
    screen: Signature,
    navigationOptions: {
      title: "Signature",
      headerStyle: { backgroundColor: "#3a59b7" },
      headerTintColor: "#ffffff"
    }
  },
  PhotoPreview: {
    screen: PhotoPreview,
    navigationOptions: {
      title: "PhotoPreview",
      headerStyle: { backgroundColor: "#3a59b7" },
      headerTintColor: "#ffffff"
    }
  }
});

// const DrawerRoot = createStackNavigator(
//   {
//     // UI: { screen: UI },
//     HomeScreen: { screen: HomeScreen },
//     ViewUser: { screen: ViewUser },
//     ViewAllUser: { screen: ViewAllUser },
//     UpdateUser: { screen: UpdateUser },
//     RegisterUser: { screen: RegisterUser },
//     DeleteUser: { screen: DeleteUser }
//   },
//   {
//     initialRouteName: "HomeScreen",
//     headerMode: "none",
//     navigationOptions: {
//       gesturesEnabled: false
//     }
//   }
// );
// const Drawer = createDrawerNavigator(
//   {
//     DrawerRoot: { screen: DrawerRoot }
//   },
//   {
//     drawerLockMode: "locked-closed",
//     gesturesEnabled: false,
//     // drawerType: 'slide',
//     contentComponent: props => <SideBar {...props} />
//   }
// );
// const RootNavigator = createStackNavigator(
//   {
//     Drawer: { screen: Drawer }
//   },
//   {
//     initialRouteName: "Drawer",
//     headerMode: "none"
//   }
// );
// const RootNavigatorInitial = createStackNavigator(
//   {
//     // UI: { screen: UI },
//     // Signature: { screen: Signature }
//     HomeScreen: { screen: HomeScreen },
//     ViewUser: { screen: ViewUser },
//     ViewAllUser: { screen: ViewAllUser },
//     UpdateUser: { screen: UpdateUser },
//     RegisterUser: { screen: RegisterUser },
//     DeleteUser: { screen: DeleteUser }
//   },
//   {
//     initialRouteName: "HomeScreen",
//     headerMode: "none"
//   }
// );

export default createAppContainer(Navigation);
