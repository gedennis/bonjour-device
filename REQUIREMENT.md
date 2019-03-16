# funicular-dennis -- Coding project for NodeJS Engineer Interview


This exercise will demonstrate how well you can apply tech you already know, such as Docker, Redis, and NodeJS, and add in some new tech as well. These new components are Jest and Bonjour. We will also look at Chaos Monkey testing.

Do not complete this project in one go. Please break it up into suitable branches (likely per step below, perhaps more finegrained) that you submit for code review through the standard GitHub pull request scheme.

I likely made some mistakes in setting this problem up. Be sure to raise any problems you have, and of course ask questions on WeChat. That's part of this coding project too!

**funicular**, *noun*:

> a cable railroad, especially one on a mountainside, in which ascending and descending cars are counterbalanced.

# 0. Zeroconf for device pairing

Device pairing can be a challenging problem for many consumer device applications. Zeroconf solutions like [Bonjour](https://developer.apple.com/library/archive/documentation/Cocoa/Conceptual/NetServices/Articles/about.html) -- and its underlying protocol of [mDNS](https://en.wikipedia.org/wiki/Multicast_DNS) -- help address these issues.

There are some challenges as well for Bonjour. Given a list of devices, what device does one select? Multicast works, but not all networks are configured to support it. And in general, multicast does not work with devices that may be in the same physical location, but are on different networks. Consider for example a phone, on a mobile network, attempting to connect with a device on a wired network.

We will ignore these challenges for the time being however.


# 1. Bonjour package

We will use the [Bonjour package](https://www.npmjs.com/package/bonjour) for service advertising and discovery. Please review its docs on how to set up the following:

1. A service advertising its availability
2. A client attempting to discover this service

For both:

1. Use `let` and `const` instead of `var`
2. Promisify, then use `async` and `await` in your code (where feasible, otherwise use explicit `Promise`s)
3. Write unit tests with [Jest](https://flaviocopes.com/jest/)
4. Create docs by updating this README.md, as well as comment your code (including tests)

This should be straightforward.


# 2. Docker and Docker Compose

Device pairing doesn't really make sense on the same device! So let's simulate multipe devices by using Docker. Set up a docker instance for the service and for the client, then use Docker Compose to describe the necessary networking. Now that you have one client, let's make 3 by spinning up more instances. Verify discovery works as expected.


# 3. Add presence

Use [socket.io](https://socket.io/) to write a simple chat service. Start with the demo. Now simply extend by writing to Redis (running on the service instance) connection state (connected or not) for each client into a key (let's call this key `presence`).

Use

* [Koa with Socket.io](https://www.npmjs.com/package/koa-socket-2)
* [ioredis](https://github.com/luin/ioredis)

So now you have gone past a simple Bonjour service and integrated it with a presence service.


# 4. Chaos monkey testing

 Now the true fun begins. Use Pumba (https://alexei-led.github.io/post/pumba_docker_chaos_testing/) to cause random failures against your docker instances. Verify that clients can reconnect and find the service as necessary, and that your presence service is accurate.

 You may want to take further control here by using [`tc`](https://github.com/lukaszlach/docker-tc), but that's an optional extension of this work.
