import json
import boto3

dynamodb = boto3.resource('dynamodb')
table = dynamodb.Table('VisitorData')

def lambda_handler(event, context):
    try:
        # Parse the incoming JSON string from event['body']
        body = json.loads(event['body'])

        visitor_name = body.get('name', '')
        email = body.get('email', '')
        visitor_subject = body.get('subject', '')
        message = body.get('message', '')

        response = table.put_item(
            Item={
                'name': visitor_name,
                'email': email,
                'subject': visitor_subject,
                'message': message
            }
        )

        return {
            'statusCode': 200,
            'body': json.dumps('Visitor data saved successfully!'),
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            }
        }

    except Exception as e:
        return {
            'statusCode': 500,
            'body': json.dumps(f"Error: {str(e)}"),
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            }
        }
