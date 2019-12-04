# Table of Contents
<!-- TOC -->
 * [Introduction](#introduction)
 * [Compatibility](#Compatibility)
 * [Requirements](#Requirements)
    * [Terraform plugins](#Terraform-plugins)
    * [Execution points](Execution-points)
         * [Terraform plugins](#Terraform-plugins)
    
<!-- TOC -->
## Introduction

The terraform execution points lambda and cloudwatch allow AWS logs to be processed by a lambda function and be sent to Stackdriver for ingestion.

## Compatibility

This module is meant for use with Terraform 0.12

## Requirements

### Terraform plugins
- [Terraform](https://www.terraform.io/downloads.html) >= 0.12.x
- terraform-provider-AWS plugin 2.40.x

### Execution points

#### Lambda

In order to execute the lambda execution point you must have the following IAM permissions:

- `AWSLambdaFullAccess`

- `IAMFullAccess`

#### Cloudwatch

In order to execute the cloudwatch execution point you must have the following IAM permissions:

- `AWSCloudTrailFullAccess`

- `CloudWatchLogsReadOnlyAccess`

- `AmazonVPCFullAccess`
