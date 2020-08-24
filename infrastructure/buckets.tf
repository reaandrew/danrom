# AWS S3 bucket for static hosting
resource "aws_s3_bucket" "website" {
  bucket = "${var.domain_name}"
  acl = "public-read"
  force_destroy = true

  tags = {
    Name        = "${var.domain_name}"
    Environment = "${var.env}"
  }


  cors_rule {
    allowed_headers = ["*"]
    allowed_methods = ["PUT","POST"]
    allowed_origins = ["*"]
    expose_headers = ["ETag"]
    max_age_seconds = 3000
  }

  policy = <<EOF
{
  "Version": "2008-10-17",
  "Statement": [
    {
      "Sid": "PublicReadForGetBucketObjects",
      "Effect": "Allow",
      "Principal": {
        "AWS": "*"
      },
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::${var.domain_name}/*"
    }
  ]
}
EOF

  website {
    index_document = "index.html"
    error_document = "error.html"
  }
}

# AWS S3 bucket for www-redirect
resource "aws_s3_bucket" "website_redirect" {
  bucket = "www.${var.domain_name}"
  acl = "public-read"

  website {
    redirect_all_requests_to = "${var.domain_name}"
  }
}
