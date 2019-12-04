# Table of Contents
<!-- TOC -->
 * [Introduction](#introduction)
 * [Compatibility](#Compatibility)
 * [Requirements](#Requirements)
    * [Terraform plugins](#Terraform-plugins)
    * [Execution points](Execution-points)
         * [Lambda](#Lambda)
         * [Cloudwatch](#Cloudwatch)
               
<!-- TOC -->
## Introduction

The terraform execution points lambda and cloudwatch allow AWS logs to be processed by a lambda function and be sent to Stackdriver for ingestion.

## Compatibility

This module is meant for use with Terraform 0.12

## Requirements

### Terraform plugins
- [Terraform](https://www.terraform.io/downloads.html) >= 0.12.x
- terraform-provider-AWS plugin 2.40.x

### Specifying credentials
   
Credentials must be provided Implicitly by the `AWS_ACCESS_KEY_ID` and `AWS_SECRET_ACCESS_KEY` environment variables.
The region within the provide block must be provided.
   ```terraform
   AWS_ACCESS_KEY_ID and AWS_SECRET_ACCESS_KEY and must be set in the environment before Terraform is run.
   provider "aws" {
   region  = "us-west-2"
   version = "~> 2.40"
   }
```
### Backend
Region must be provided
 ```terraform
   terraform {
      backend "s3" {
         bucket = "mybucket"
         key    = "path/to/my/key"
         region = "us-east-1"
       }
   }
```


### Execution points

#### Lambda

This execution point handles the following actions:
- Creates an s3 bucket
- uploads the lambda function zip file to the s3 bucket
- Creates permisions for the lambda function to be executed
- Creates lambda function

In order to execute the lambda execution point you must have the following IAM permissions:

- `AWSLambdaFullAccess`

- `IAMFullAccess`

#### Cloudwatch
This execution point handles the following actions:

CloudTrail:
- Creates a cloudwatch log group for cloudtrail logs
- Assigns roles and policies for cloudtrail logs
- Enable CloudTrail to capture all compatible management events in a region and to write to a cloudwatch log group.

VPC-flow-logs:
- Creates a cloudwatch log group for vpc flow logs
- Move flowlogs to the cloudwatch log group
- Assigns roles and permissions 

Cloudwatch:
- Creates permision for lambda function to be executed from cloudwatch
- Creates subscription fileters for both log group to be streamed to the lambda function.

In order to execute the cloudwatch execution point you must have the following IAM permissions:

- `AWSCloudTrailFullAccess`

- `CloudWatchLogsReadOnlyAccess`

- `AmazonVPCFullAccess`
