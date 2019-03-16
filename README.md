# funicular-dennis

Coding project for NodeJS Engineer Interview

> TODO: The repo is UNFINISHED now!!!!

### Architecture

The system has two roles: **hub** and **device**.

- Hub  
  Hub integrate a bonjour service to advertise in the network. And it lift a socket.io server to wait for the device connecting.Upon connecting, hub will save a presence to redis.

- device  
  The devices like phone or fridge will integrate a bonjour browser, which search a hub in the network. Once find one, it will connect the hub with websocket.

In our mock system, We will setup two devices(one phone and one fridge)and one hub(one panel), as follow picture.

![Basic Architecture](https://www.lucidchart.com/publicSegments/view/fa576e8a-e2f5-4ebd-8f74-924a652e7e48/image.png)

### Usage

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
