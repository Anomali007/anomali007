/* tslint:disable */
/* eslint-disable */
import "sst"
declare module "sst" {
  export interface Resource {
    "Anomali007-Frontend": {
      "type": "sst.aws.Nextjs"
      "url": string
    }
    "PayloadDatabase": {
      "clusterArn": string
      "database": string
      "host": string
      "password": string
      "port": number
      "secretArn": string
      "type": "sst.aws.Postgres"
      "username": string
    }
  }
}
export {}
