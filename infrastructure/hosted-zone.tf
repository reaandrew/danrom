resource "aws_acm_certificate" "domain_name_cert" {
	provider          = "aws.use1"
  domain_name       = "${var.domain_name}"
  subject_alternative_names = ["www.${var.domain_name}"]
  validation_method = "DNS"
  lifecycle {
    create_before_destroy = true
  }
  tags = {        
      Name        = "${var.domain_name}"
      Environment = "${var.env}"
  }
}

resource "aws_route53_record" "cert_validation" {
	for_each = {
    for dvo in aws_acm_certificate.domain_name_cert.domain_validation_options : dvo.domain_name => {
      name   = dvo.resource_record_name
      record = dvo.resource_record_value
      type   = dvo.resource_record_type
    }
  }

	allow_overwrite = true
  name            = each.value.name
  records         = [each.value.record]
  ttl             = 60
  type            = each.value.type
  zone_id         = aws_route53_zone.main.zone_id
}

resource "aws_acm_certificate_validation" "cert_validation" {
	provider          = "aws.use1"
  certificate_arn         = aws_acm_certificate.domain_name_cert.arn
  validation_record_fqdns = [for record in aws_route53_record.cert_validation : record.fqdn]
}

# resource "aws_acm_certificate" "eu_west_2_domain_name_cert" { 
#   domain_name       = "${var.domain_name}" 
#   subject_alternative_names = ["www.${var.domain_name}"]
#   validation_method = "DNS" 
#   lifecycle { 
#     create_before_destroy = true 
#   } 
#   tags = { 
#       Name        = "${var.domain_name}" 
#       Environment = "${var.env}" 
#   } 
# } 

# resource "aws_route53_record" "eu_west_2_cert_validation" {
#   for_each = {
#     for dvo in aws_acm_certificate.eu_west_2_domain_name_cert.domain_validation_options : dvo.domain_name => {
#       name   = dvo.resource_record_name
#       record = dvo.resource_record_value
#       type   = dvo.resource_record_type
#     }
#   }

#   allow_overwrite = true
#   name            = each.value.name
#   records         = [each.value.record]
#   ttl             = 60
#   type            = each.value.type
#   zone_id         = aws_route53_zone.main.zone_id
# }

# resource "aws_acm_certificate_validation" "eu_west_2_cert_validation" {
#   certificate_arn         = aws_acm_certificate.domain_name_cert.arn
#   validation_record_fqdns = [for record in aws_route53_record.eu_west_2_cert_validation : record.fqdn]
# }

   
resource "aws_route53_zone" "main" {
  name = "${var.domain_name}"
  comment = "Managed by Terraform"

  tags = {
    Name        = "${var.domain_name}"
    Environment = "${var.env}"
  }
}

resource "aws_route53_record" "main-a-record" {
	 zone_id = "${aws_route53_zone.main.zone_id}"
	 name = "${var.domain_name}"
	 type = "A"
	 alias {
    name = "${aws_cloudfront_distribution.s3_distribution.domain_name}"
    zone_id = "${aws_cloudfront_distribution.s3_distribution.hosted_zone_id}"
		evaluate_target_health = false
	}
}

resource "aws_route53_record" "main-c-name" {
	zone_id = "${aws_route53_zone.main.zone_id}"
	name = "www"
	type = "CNAME"
	ttl = "300"
	records = ["${var.domain_name}"]
}

