## Install

```jsx
yarn
```

## Link font assets

```
npx react-native link
```

## Running

- #### Packager
  ```
  npx react-native start
  ```

- #### APK
  ```
  npx react-native run-android
  ```

## Test (Detox)

### Requirements

  - detox-cli

  ```
  npm install -g detox-cli
  ```

### Running Tests

- #### Debug
  - Build debug apk
  
  ```
  detox build -c android.emu.debug
  ```

  - Run packager

  ```
  npx react-native start
  ```

  - Run debug apk

  ```
  detox test -c android.emu.debug
  ```

- #### Release
  - Build release apk
  
  ```
  detox build -c android.emu.release
  ```

  - Run release apk test

  ```
  detox test -c android.emu.release
  ```