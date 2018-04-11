# Wobblifier

Makes your `react-native` component respond to taps by wobbling about 👆

## Installation

`yarn add react-native-wobblifier`

## Usage

```javascript
import Wobblify from 'react-native-wobblifier'

<Wobblify>
  <Image source={require('../assets/cat.gif')} />
</Wobblify>
```

Or configure using the following props (listed below with defaults):
```
<Wobblify
  perspective={200} // passed to the transform
  springConfig={{   // merged with the default Animated.spring config
    tension: 30,
    friction: 2,
    velocity: 20
  }}
>
  {children}
</Wobblify>
```



## Contributing

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct, and the process for submitting pull requests to us.

## Authors

* **Ross** - *Initial work* - [rocbear](https://github.com/rocbear)

See also the list of [contributors](https://github.com/madeagency/reactivity/graphs/contributors) who participated in this project.

License
-------

Wobblifier is © 2018 MADE Code PTY Ltd.
It is free software, and may be redistributed under the terms specified in the [LICENSE] file.

[LICENSE]: LICENSE

Maintained by
----------------

[![madeagency](https://www.made.co.za/logo.png)](https://www.made.co.za?utm_source=github)

Reactivity was created and is maintained MADE Agency PTY Ltd.
The names and logos for MADE Code are trademarks of MADE Code PTY Ltd.

We love open source software. See our [Github Profile](https://github.com/madeagency) for more.

We're always looking for talented people who love programming. [Get in touch] with us.

[Get in touch]: https://www.madecode.co.za?utm_source=github
