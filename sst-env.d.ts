/* tslint:disable */
/* eslint-disable */
import "sst"
declare module "sst" {
  export interface Resource {
    "Anomali007-Frontend": {
      "type": "sst.aws.Nextjs"
      "url": string
    }
    "Auth": {
      "publicKey": string
      "type": "sst.aws.Auth"
    }
    "AuthAuthenticator": {
      "name": string
      "type": "sst.aws.Function"
      "url": string
    }
    "DashboardApi": {
      "type": "sst.aws.ApiGatewayV2"
      "url": string
    }
    "DashboardApiAuthorizerDashboardAuthorizerFunction": {
      "name": string
      "type": "sst.aws.Function"
    }
    "GoogleClientID": {
      "type": "sst.sst.Secret"
      "value": string
    }
    "GoogleClientSecret": {
      "type": "sst.sst.Secret"
      "value": string
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
    "PayloadSecret": {
      "type": "sst.sst.Secret"
      "value": string
    }
    "UploadsBucket": {
      "name": string
      "type": "sst.aws.Bucket"
    }
    "UserPortfolioBucket": {
      "name": string
      "type": "sst.aws.Bucket"
    }
  }
}
export {}
