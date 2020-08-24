terraform {
  backend "s3" {
    bucket = "state.randomselector.io"
    key    = "randomselector.io"
    region = "eu-west-2"
  }
}

provider "aws" {

}

provider "aws" {
  # us-east-1 instance
  region = "us-east-1"                                                                                                                                                                                                                                  
  alias = "use1"
}

