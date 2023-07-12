---
title: "Adventures in Wasmland"
description: "Let's see how deep this rabbit hole goes."
draft: true
pubDate: "2023.02.16"
heroImage: "/images/white_rabbit.jpg"
heroImageAlt: "Chalk drawing on asphalt of a white rabbit with the words, in chalk, from a stencil saying FOLLOW THE WHITE RABBIT"
tags: ["wasm"]
---

Credit to [RubyGoes](https://flickr.com/photos/rubygoes/) for the [above image](https://flickr.com/photos/rubygoes/9603955743).

Okay, so I finally decided to start playing with [WebAssembly (Wasm)](https://en.wikipedia.org/wiki/WebAssembly). Late last year, my friend, [Damani Corbin](https://www.linkedin.com/in/damani-corbin-4329089) introduced me to [Liam Randall](https://twitter.com/Hectaman). Liam is CEO of [Cosmonic](https://cosmonic.com/), a primary supporter of [WasmCloud](https://wasmcloud.com/) (I'mma be real, not sure if I'm supposed to point [here](https://wasmcloud.com/) or [here](https://wasmcloud.dev/)). I shared with [him and everyone else](https://twitter.com/ricardooncode/status/1599095843872727043?s=20) how I want to be less an observer this go round, as compared to my lack of involvement in the early days of containers.

So, I figured the best place to start was with play. So, I started with the [Overview](https://wasmcloud.dev/overview/). One of the things I really like about WasmCloud is the emphasis on what's not there. You can see one example [here](https://wasmcloud.dev/app-dev/create-actor/generate/). One of the ideas is to allow developers to focus on the business logic. Okay, let's collect some random thoughts:

* I don't love the use of Makefile, but I get it.
* Docs are pretty good.
* I didn't spend a lot of time troubleshooting, but after a brief attempt I failed to be able to run my unit test inside my IDE (CLion... for now). All good, using command line saw it executed easily enough.
* [The docs for securing](https://wasmcloud.dev/app-dev/secure/) are about the platform. They say you should check the [reference apps](https://wasmcloud.dev/reference/refapps) for details on implementing user security. Unfortunately, it looks like that's [an open issue](https://github.com/wasmCloud/wasmcloud-dev-site/issues/40).

If you wanna look at examples from professionals, you can see example actors from the wasmCloud folks on [GitHub](https://github.com/wasmCloud/examples/tree/main/actor). But hey, I've slept at a Holiday Inn before...

Okay, so let's share what I did, starting with what I wanted to achieve. I wanted to create a simple actor to provide a single HTTP GET endpoint and serve data from a single table in PostgreSQL.

For expediency, I created a database via docker-compose and populated a single table with an init.sql. You can get the whole project on GitHub [here](FIXME). (Side notes: Don't use latest in tags. I don't really care about table names being plural vs singular. I just used TEXT because I'm lazy; don't use TEXT as much as I did. I love Star Trek, but I did not obsessively review the data I threw in the table. Sorry!)

Generating your actor via wash is covered in the [docs](https://wasmcloud.dev/app-dev/), as is [combining capabilities](https://wasmcloud.dev/app-dev/multicap/). I used `wash new actor` with the hello template to just give me a skeleton. I also added the wasmcloud-interface-sqldb dependency. Since I'm a big proponent of [TDD](https://en.wikipedia.org/wiki/Test-driven_development), I also followed the advise from [here](https://wasmcloud.dev/app-dev/create-actor/test/) to pull my logic out into a synchronous function to ease testing. Then I added a simple test. So, here's what it looked like at that point (keep in mind I'm still learning Rust, so...):

<!-- FIXME -->

```rust
// THIS CODE FAILS THE TESTS, good ole red, green, refactor
#![feature(assert_matches)]

use serde::{Deserialize, Serialize};
use wasmbus_rpc::actor::prelude::*;
use wasmcloud_interface_httpserver::{HttpRequest, HttpResponse, HttpServer, HttpServerReceiver};

#[derive(Debug, Default, Actor, HealthResponder)]
#[services(Actor, HttpServer)]
struct FunActor {}

#[derive(Debug, Deserialize, Serialize)]
struct User {
    name: String,
    rank: String,
    species: String,
}

/// Implementation of HttpServer trait methods
#[async_trait]
impl HttpServer for FunActor {
    /// Returns a greeting, "Hello World", in the response body.
    /// If the request contains a query parameter 'name=NAME', the
    /// response is changed to "Hello NAME"
    async fn handle_request(&self, _ctx: &Context, req: &HttpRequest) -> Result<HttpResponse, RpcError> {
        sync_handle_request(req)
    }
}

fn sync_handle_request(req: &HttpRequest) -> Result<HttpResponse, RpcError> {
    let text = form_urlencoded::parse(req.query_string.as_bytes())
        .find(|(n, _)| n == "name")
        .map(|(_, v)| v.to_string())
        .unwrap_or_else(|| "World".to_string());

    Ok(HttpResponse {
        body: format!("Hello {text}").as_bytes().to_vec(),
        ..Default::default()
    })
}

#[cfg(test)]
mod test {
    use std::assert_matches::assert_matches;
    use std::collections::HashMap;

    use wasmcloud_interface_httpserver::{HttpRequest, HttpResponse};

    use crate::{sync_handle_request, User};

    #[test]
    fn contains_michael() {
        let request = HttpRequest {
            method: "GET".to_string(),
            path: "/".to_string(),
            query_string: "".to_string(),
            header: HashMap::new(),
            body: vec![],
        };

        let response: HttpResponse = sync_handle_request(&request).unwrap();

        let users: Vec<User> = serde_json::from_slice(&response.body).unwrap();

        assert_matches!(users.iter().find(|item| item.name.contains("Michael")), Some(_));
    }
}
```

Okay, so recall, the business logic here was from the template with the sole modification of moving the meat into a synchronous function. I've created a struct we're not using beyond the test, yet, and added that test. It's a simple test so as to not over-complicate. I'd like to find a widely used crate providing some more fluent assertions... Whatever, like I said, Rust novice.