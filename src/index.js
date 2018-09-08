const AWS = require('aws-sdk');
const documentClient = new AWS.DynamoDB.DocumentClient({region:'eu-west-3'});

exports.handler = (event, context, callback) => {
  const { eventId, _id, _atkMod, _defMod, _spdMod } = JSON.parse(event.Records[0].body);

  Promise.all([
      documentClient.update({
          TableName: `cryptomon-monsters-staging`,
          Key: {monsterId: _id},
          AttributeUpdates: {
              'attack': {
                  Action: 'ADD',
                  Value: _atkMod
              },
              'defense': {
                  Action: 'ADD',
                  Value: _defMod
              },
              'speed': {
                  Action: 'ADD',
                  Value: _spdMod
              }
          }
      }).promise(),
      documentClient.put({
          TableName: `cryptomon-events-staging`,
          Item: {
              transactionId: eventId,
              type: 'upgrade',
              processed: true
          }
      }).promise()
  ])
  .then(() => callback(null, event))
  .catch(console.error);
}
