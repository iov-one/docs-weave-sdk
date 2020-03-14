---
id: protoc-generation-spec
title: Generating proto code from Weave specification
sidebar_label: Generating proto code
---

To connect to Weave based applications, first you need to be able to generate proto code using [Weave spec](https://github.com/iov-one/weave/tree/v1.0.0/spec).

**Before diving into this documentation we recommend you to go over [Weave design codec doc](../design/05-proto.md) first and then [Tutorial codec docs](../tutorial/03-codec.md)**

When you take a look at spec folder you will see couple directories that are using in various ways.

- [spec/gogo](https://github.com/iov-one/weave/tree/v1.0.0/spec/gogo) contains gogo proto annotations that are pretty useful when generating better shaped go code.
- [spec/proto](https://github.com/iov-one/weave/tree/v1.0.0/spec/gogo) contains bare proto definitions that could be used to generate code for various languages that has protoc generator or plugin.

If you are aiming to use go, we are happy with gogo plugin and we advise you use gogo spec folder for proto code generation. Here is an example for this case: [blog-tutorial](https://github.com/iov-one/blog-tutorial/).

## Steps

You can see the output of the steps below here: [blog-tutorial](https://github.com/iov-one/blog-tutorial/), [Cosmostation java integration](https://github.com/cosmostation/cosmostation-mobile/tree/master/Cosmos-Android/app/src/main/java/wannabit/io/cosmostaion/iov-one/bns), [Cosmostation swift integration](https://github.com/cosmostation/cosmostation-mobile/tree/master/Cosmos-IOS/Cosmostation/Cosmostation/IOV/bns)

### Install protoc/prototool

Instead of using bare protoc, We recommend using prototool if your language is supported by the project. [Check it out here](https://github.com/uber/prototool/blob/dev/etc/config/example/prototool.yaml#L129-L190). If your language is in the list you are very lucky and saved a lot of manual future work. You can use [prototool docker](https://github.com/iov-one/prototool-docker) for more convenient usage. Prototool contains protoc as dependency so no need to install protoc individually. If not, download prototool again but not the docker version. We will need it later.
You can install protoc compiler [here](https://github.com/protocolbuffers/protobuf#protocol-compiler-installation).

### Download the spec folder

Downloading for go code is fairly simple. You can take a look at [blog-tutorial/makefile](https://github.com/iov-one/blog-tutorial/blob/master/Makefile#L20). `import-spec` command gets the spec folder based on the Weave version is based on.

On the other hand for other languages than go, you have to download the spec manually or by an automated script. We provide spec folder in [releases](https://github.com/iov-one/weave/releases/tag/v1.0.0). You can download it down below in that page.

### Import prototool.yaml

Even if prototool does not support your language, it is still very useful. Normally with protoc you have to [feed protoc dependencies](https://developers.google.com/protocol-buffers/docs/javatutorial#compiling-your-protocol-buffers) with `-I` argument to protoc. This is pretty much the same in other language plugins. But it is very time consuming to do with hand. So instead of writing this script manually, you can get the protoc commands that are run by prototool in the background with `prototool generate --dry-run`. After that with some bash string manipulation you are ready to generate code.

### Generating code

With prototool, generation is simple: Go to the folder that contains `prototool.yaml` (folder you want to generate the code to) and the run `prototool generate`. You can tweak the prototool configuration (such as generated code directory) to suit your needs.
But without prototool, it is bit more work. After getting the `prototool generate --dry-run`, change the `--java_out` or `--go_out` to output argument that is used by protoc plugin you choose. Note: there could be more configuration or arguments to make it work. Read the plugin manual :)

Now as output you should have something like:

```bash
/Users/username/Library/Caches/prototool/Darwin/x86_64/protobuf/3.7.1/bin/protoc -I /spec_folder/IOV/bns/spec/proto -I /Users/username/Library/Caches/prototool/Darwin/x86_64/protobuf/3.7.1/include --haskell_out=/spec_folder/IOV/bns/gen/swift /spec_folder/IOV/bns/spec/proto/cmd/bnsd/x/account/codec.proto
/Users/username/Library/Caches/prototool/Darwin/x86_64/protobuf/3.7.1/bin/protoc -I /spec_folder/IOV/bns/spec/proto -I /Users/username/Library/Caches/prototool/Darwin/x86_64/protobuf/3.7.1/include --haskell_out=/spec_folder/IOV/bns/gen/swift /spec_folder/IOV/bns/spec/proto/x/sigs/codec.proto
/Users/username/Library/Caches/prototool/Darwin/x86_64/protobuf/3.7.1/bin/protoc -I /spec_folder/IOV/bns/spec/proto -I /Users/username/Library/Caches/prototool/Darwin/x86_64/protobuf/3.7.1/include --haskell_out=/spec_folder/IOV/bns/gen/swift /spec_folder/IOV/bns/spec/proto/x/gov/codec.proto /spec_folder/IOV/bns/spec/proto/x/gov/sample_test.proto
/Users/username/Library/Caches/prototool/Darwin/x86_64/protobuf/3.7.1/bin/protoc -I /spec_folder/IOV/bns/spec/proto -I /Users/username/Library/Caches/prototool/Darwin/x86_64/protobuf/3.7.1/include --haskell_out=/spec_folder/IOV/bns/gen/swift /spec_folder/IOV/bns/spec/proto/crypto/models.proto
/Users/username/Library/Caches/prototool/Darwin/x86_64/protobuf/3.7.1/bin/protoc -I /spec_folder/IOV/bns/spec/proto -I /Users/username/Library/Caches/prototool/Darwin/x86_64/protobuf/3.7.1/include --haskell_out=/spec_folder/IOV/bns/gen/swift /spec_folder/IOV/bns/spec/proto/x/txfee/codec.proto ....
...
```

After copy-pasting this command to terminal, generated Haskell(whatever the language is) code is ready. You can use the generated code to build transactions and use Weave models in your app to reduce the workload.

## Helpful links

Golang code reference:

- [blog-tutorial](https://github.com/iov-one/blog-tutorial/). See `makefile`, `prototool.yaml` and `spec` folder.

We collaborated with cosmostation to automate this process. Here are the script for reference:

- Android(Java): [Cosmostation/Cosmos-Android](https://github.com/cosmostation/cosmostation-mobile/blob/master/Cosmos-Android/app/src/main/java/wannabit/io/cosmostaion/iov-one/bns/generate_proto.sh)
- Swift(IOS): [Cosmostation/Cosmos-IOS](https://github.com/cosmostation/cosmostation-mobile/blob/master/Cosmos-IOS/Cosmostation/Cosmostation/IOV/bns/generate_proto.sh)
