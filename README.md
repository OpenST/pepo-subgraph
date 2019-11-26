# Pepo Subgraph - Index and query Pepo data

### Sync auxiliary chain 1414

- You need to have web3 RPC endpoint of mosaic mainnet `auxiliary chain 1414`. You can run a full node by installing [mosaic chains](https://github.com/mosaicdao/mosaic-chains) npm package (in your 
dev dependencies).

```
    npm init -y
    npm i @openst/mosaic-chains --save-dev
```
If you already have `mosaic-chains` installed, go to next step.

- Run below command to start a full node of auxiliary chain 1414 in the background:

```
    ./node_modules/.bin/mosaic start 1414 --origin ethereum 
```
Once chain have been successfully started, it will display web3 endpoint, `graph admin rpc endpoint`, graph ws endpoint and `ipfs url`. Please keep a `copy of these endpoints`. These URLs will be 
needed in further steps.

- Make sure chain 1414 is synced. You can see the syncing status with below command:
```
    ./node_modules/.bin/mosaic attach 1414
```

### Clone repository
```
    git clone git@github.com:ostdotcom/pepo-subgraph.git
```

### Export environment variables

```
    export GRAPH_ADMIN_RPC_ENDPOINT=http://localhost:9434/
    export GRAPH_IPFS_ENDPOINT=http://localhost:6415
```
Update above values if you are running on different ports.

### Deploy Pepo subgraph

Go to root directory and run below commands one by one:
- Install packages
```
    cd pepo-subgraph
    npm ci
```

- Remove subgraph if you have already deployed and there is schema change
```
    npm run remove-local
```

- Deploy subgraph
```
     npm run create-local 
     npm run deploy-local
```

You should see success message when subgraph is deployed. 
It can take sometime to completely index Pepo entities.

### Query Pepo data

- Open [GraphQL editor](http://localhost:11414/subgraphs/name/ostdotcom/pepo-subgraph/graphql) to query indexed entities. 
- Query `Transfers`
```
{
  transfers(orderBy: blockNumber, orderDirection: desc, first: 100, skip: 0) {
    id
    from
    to
    value
    blockNumber
    timestamp
  }
}
```
- Query Pepo economy `registered internal actors`:
```
{
  registeredInternalActors(orderBy: blockNumber, orderDirection: desc, first: 100, skip: 0) {
    id
    actor
    blockNumber
    timestamp
  }
}
```


For more query options please visit [GraphQL documentation](https://graphql.org/learn/queries/).
 
