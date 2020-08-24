variable "aws_region" {
  description = "AWS region to launch servers."
  default     = "eu-west-2"
}

variable "domain_name" {
  description = "The domain name to setup for routing CloudFront, TLS Cert and S3 Bucket."
  default = "randomselector.io"
}

variable "env" {
  description = "The environment"
  default = "prod"
}

