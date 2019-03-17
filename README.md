# funicular-dennis

Coding project for NodeJS Engineer Interview. Complete requirements is [here](./REQUIMENTS.md).  
Main goals:

- Devices in the local network can do device paring with mDNS.
- Devices can connect to the hub device via websocket.
- Hub device can hold presence of device with Redis.
- Dockerization: build the service into docker image.
- Test: enough unit tests and some integration tests.
- Chaos Monkey tests.

## Prerequisites

Some stuffs you should get to know first.

### mDNS

In IoT, device paring is a normal but challenging thing. But how can a device connect other devices in the local network? Maybe we should know the ip and port of the device. But usually, IPs are allocated by [DHCP](<https://en.wikipedia.org/wiki/DHCP_(disambiguation)>), so they are dynamic.How can I get IP of the specific device by its name? mDNS can do it.  
[mDNS](https://en.wikipedia.org/wiki/Multicast_DNS)(Multicast DNS), is also known as **ZeroConf** or **bonjour**. A device with mDNS will advertize in the local network by publish its infomation(ip,port,serviceType...) with UDP.Also devices can query services with a specific service type. More info about mDNS, see the [specification](https://tools.ietf.org/html/rfc6762).  
In our case, we need a npm module. [bonjour](https://github.com/watson/bonjour) and [mdns](https://github.com/agnat/node_mdns) both are good choices. We choose **mdns**, as its better documentation.

### WebSocket

We use [socket.io](https://socket.io/docs/) to do our websocket thing here. You can learn a lot from its documentation.

### Redis

Redis is also our common tool. You can set it up and play with it easily.
I always set it up with docker for convenience.

```
$ docker run --name redis -p 6379:6379 -d redis
```

We just use a little here, for production, you should do more configuration.  
Then, we use [ioredis](https://github.com/luin/ioredis) to play with it.

## Architecture

The system has two roles: **hub** and **device**.

- Hub  
  Hub integrate a bonjour service to advertise in the network. And it lift a socket.io server to wait for the device connecting.Upon connecting, hub will save a presence to redis.

- device  
  The devices like phone or fridge will integrate a bonjour browser, which search a hub in the network. Once find one, it will connect the hub with websocket.

In our mock system, We will setup two devices(one phone and one fridge)and one hub(one panel), as follow picture.

![Basic Architecture](https://www.lucidchart.com/publicSegments/view/fa576e8a-e2f5-4ebd-8f74-924a652e7e48/image.png)

## Usage

#### step 1: set up the two device

```shell
$ cd ./device
// setup a phone
$ DEVNAME=PHONE node index.js

// setup a fridge
$ DEVNAME=FRIDGE node index.js
```

#### step 2: set up hub

```shell
$ cd ./hub
$ node index.js
```

The panel will set up and advertise in the network. Upon panel`s up and down, the phone and fridge will know it.

## Further
