# micronaut-react-native
Demonstration of a react-native client using a Micronaut backend

## Description

This repo contains a React-Native application that can be run on iOS or Android
which connects to a Micronaut-based backend for authentication and data services.

Authentication is performed with single-source JWT OAuth.

## Instructions

Instructions are still in-progress, there may be holes

1. Clone this repository
1. `yarn install`
1. `yarn add -g react-native@0.57.1`
1. Follow the [instructions](https://facebook.github.io/react-native/docs/getting-started.html) to get setup for iOS and/or Android development
    - Note that we aren't using the Expo client here since we want to use Native Modules
1. `react-native run-ios`
1. `./gradlew run`
1. Login and look around

## License

This code is provided under the terms of the MIT license: basically you're free to do whatever you want with it, but no guarantees are made to its validity, stability, or safety. All works referenced by or utilized by this project are the property of their respective copyright holders and retain licensing that may be more restrictive.