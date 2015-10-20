Create Table

var params = {
    TableName : "Music",
    KeySchema: [       
        { AttributeName: "Artist", KeyType: "HASH", },
        { AttributeName: "SongTitle", KeyType: "RANGE" }
    ],
    AttributeDefinitions: [       
        { AttributeName: "Artist", AttributeType: "S" },
        { AttributeName: "SongTitle", AttributeType: "S" }
    ],
    ProvisionedThroughput: {       
        ReadCapacityUnits: 1, 
        WriteCapacityUnits: 1
    }
};

dynamodb.createTable(params, function(err, data) {
    if (err)
        console.log(JSON.stringify(err, null, 2));
    else
        console.log(JSON.stringify(data, null, 2));
});

Get Table Desc
var params = {
    TableName: "Music"
};

dynamodb.describeTable(params, function(err, data) {
    if (err)
        console.log(JSON.stringify(err, null, 2));
    else
        console.log(JSON.stringify(data, null, 2));
});
=> 
{
  "TableNames": [
    "Music"
  ]
}

Get List of All Tables
var params = {};

dynamodb.listTables(params, function(err, data) {
    if (err)
        console.log(JSON.stringify(err, null, 2));
    else
        console.log(JSON.stringify(data, null, 2));
});

Write a Single Item
var params = {
    TableName: "Music",
    Item: {
        "Artist":"No One You Know",
        "SongTitle":"Call Me Today",
        "AlbumTitle":"Somewhat Famous",
        "Year": 2015,
        "Price": 2.14,
        "Genre": "Country",
        "Tags": {
            "Composers": [
                  "Smith",
                  "Jones",
                  "Davis"
            ],
            "LengthInSeconds": 214
        }
    }
};

dynamodb.putItem(params, function(err, data) {
    if (err)
        console.log(JSON.stringify(err, null, 2));
    else
        console.log(JSON.stringify(data, null, 2));
});

Perform a Conditional Write
var params = {
    TableName: "Music",
    Item: {
        "Artist":"No One You Know",
        "SongTitle":"Call Me Today",
        "AlbumTitle":"Somewhat Famous",
        "Year": 2015,
        "Price": 2.14,
        "Genre": "Country",
        "Tags": {
            "Composers": [
                  "Smith",
                  "Jones",
                  "Davis"
            ],
            "LengthInSeconds": 214
        }
    },
    "ConditionExpression": "attribute_not_exists(Artist) and attribute_not_exists(SongTitle)"
};

Write Multiple Items
var params = {
    RequestItems: {
        "Music": [ 
            {  
                PutRequest: {
                    Item: {
                        "Artist": "No One You Know",
                        "SongTitle": "My Dog Spot",
                        "AlbumTitle":"Hey Now",
                        "Price": 1.98,
                        "Genre": "Country",
                        "CriticRating": 8.4
                    }
                }
            }, 
            { 
                PutRequest: {
                    Item: {
                        "Artist": "No One You Know",
                        "SongTitle": "Somewhere Down The Road",
                        "AlbumTitle":"Somewhat Famous",
                        "Genre": "Country",
                        "CriticRating": 8.4,
                        "Year": 1984
                    }
                }
            }, 
            { 
                PutRequest: {
                    Item: {
                        "Artist": "The Acme Band",
                        "SongTitle": "Still In Love",
                        "AlbumTitle":"The Buck Starts Here",
                        "Price": 2.47,
                        "Genre": "Rock",
                        "PromotionInfo": {
                            "RadioStationsPlaying":[
                                "KHCR", "KBQX", "WTNR", "WJJH"
                            ],
                            "TourDates": {
                                "Seattle": "20150625",
                                "Cleveland": "20150630"
                            },
                            "Rotation": "Heavy"
                        }
                    }
                }
            }, 
            { 
                PutRequest: {
                    Item: {
                        "Artist": "The Acme Band",
                        "SongTitle": "Look Out, World",
                        "AlbumTitle":"The Buck Starts Here",
                        "Price": 0.99,
                        "Genre": "Rock"
                    }
                }
            }
        ]
    }
};

dynamodb.batchWriteItem(params, function (err, data) {
    if (err)
        console.log(JSON.stringify(err, null, 2));
    else
        console.log(JSON.stringify(data, null, 2));
});
=> 
{
  "UnprocessedItems": {}
}


Read an Item Using GetItem
var params = { 
    TableName: "Music",
    Key: {
        "Artist": "No One You Know",
        "SongTitle": "Call Me Today"
    }
};

dynamodb.getItem(params, function(err, data) {
    if (err)
        console.log(JSON.stringify(err, null, 2));
    else
        console.log(JSON.stringify(data, null, 2));
});

try the above using different key for songtitle
var params = { 
    TableName: "Music",
    Key: {
        "Artist": "No One You Know",
        "SongTitle": "My Dog Spot"
    }
};

dynamodb.getItem(params, function(err, data) {
    if (err)
        console.log(JSON.stringify(err, null, 2));
    else
        console.log(JSON.stringify(data, null, 2));
});
=> 
{
  "Item": {
    "Genre": "Country",
    "AlbumTitle": "Hey Now",
    "Artist": "No One You Know",
    "CriticRating": 8.4,
    "SongTitle": "My Dog Spot",
    "Price": 1.98
  }
}
_______________
var params = { 
    TableName: "Music",
    Key: {
        "Artist": "No One You Know",
        "SongTitle": "Somewhere Down The Road"
    }
};

dynamodb.getItem(params, function(err, data) {
    if (err)
        console.log(JSON.stringify(err, null, 2));
    else
        console.log(JSON.stringify(data, null, 2));
});
=> 
{
  "Item": {
    "Genre": "Country",
    "AlbumTitle": "Somewhat Famous",
    "Year": 1984,
    "Artist": "No One You Know",
    "CriticRating": 8.4,
    "SongTitle": "Somewhere Down The Road"
  }
}

Retrieve a Subset of Attributes Using a Projection Expression
var params = { 
    TableName: "Music",
    Key: {
        "Artist": "No One You Know",
        "SongTitle": "Call Me Today"
    },
    ProjectionExpression: "AlbumTitle"
};

Handling Attribute Names that Are Also Reserved Words
var params = { 
    TableName: "Music",
    Key: {
        "Artist": "No One You Know",
        "SongTitle": "Call Me Today"
    },
    ProjectionExpression: "AlbumTitle, Year"
};

var params = { 
    TableName: "Music",
    Key: {
        "Artist": "No One You Know",
        "SongTitle": "Call Me Today"
    },
    ProjectionExpression: "AlbumTitle, #y",
    ExpressionAttributeNames: {"#y": "Year"}
};

Retrieve Nested Attributes Using Document Path Notation
var params = { 
    TableName: "Music",
    Key: {
        "Artist": "No One You Know",
        "SongTitle": "Call Me Today"
    },
    ProjectionExpression: "AlbumTitle, #y, Tags.Composers[0], Tags.LengthInSeconds",
    ExpressionAttributeNames: {"#y": "Year"}
};

Read Multiple Items Using BatchGetItem
var params = {
    RequestItems: {
        "Music": {
            Keys: [
                {
                    "Artist": "No One You Know",
                    "SongTitle": "My Dog Spot"
                },
                {
                    "Artist": "No One You Know",
                    "SongTitle": "Somewhere Down The Road"
                },
                {
                    "Artist": "The Acme Band",
                    "SongTitle": "Still In Love"
                },
                {
                    "Artist": "The Acme Band",
                    "SongTitle": "Look Out, World"
                }
            ],
            ProjectionExpression:"PromotionInfo, CriticRating, Price"
        }
    }
};

dynamodb.batchGetItem(params, function (err, data) {
    if (err)
        console.log(JSON.stringify(err, null, 2));
    else
        console.log(JSON.stringify(data, null, 2));
});
=> 
{
  "Responses": {
    "Music": [
      {
        "CriticRating": 8.4,
        "Price": 1.98
      },
      {
        "PromotionInfo": {
          "RadioStationsPlaying": [
            "KHCR",
            "KBQX",
            "WTNR",
            "WJJH"
          ],
          "Rotation": "Heavy",
          "TourDates": {
            "Seattle": "20150625",
            "Cleveland": "20150630"
          }
        },
        "Price": 2.47
      },
      {
        "CriticRating": 8.4
      },
      {
        "Price": 0.99
      }
    ]
  },
  "UnprocessedKeys": {}
}
(Optional) Remove the ProjectionExpresion entirely, and retrieve all of the attributes from the items.
=> 
{
  "Responses": {
    "Music": [
      {
        "Genre": "Country",
        "AlbumTitle": "Hey Now",
        "Artist": "No One You Know",
        "CriticRating": 8.4,
        "SongTitle": "My Dog Spot",
        "Price": 1.98
      },
      {
        "Genre": "Rock",
        "PromotionInfo": {
          "RadioStationsPlaying": [
            "KHCR",
            "KBQX",
            "WTNR",
            "WJJH"
          ],
          "Rotation": "Heavy",
          "TourDates": {
            "Seattle": "20150625",
            "Cleveland": "20150630"
          }
        },
        "AlbumTitle": "The Buck Starts Here",
        "Artist": "The Acme Band",
        "SongTitle": "Still In Love",
        "Price": 2.47
      },
      {
        "Genre": "Country",
        "AlbumTitle": "Somewhat Famous",
        "Year": 1984,
        "Artist": "No One You Know",
        "CriticRating": 8.4,
        "SongTitle": "Somewhere Down The Road"
      },
      {
        "Genre": "Rock",
        "AlbumTitle": "The Buck Starts Here",
        "Artist": "The Acme Band",
        "SongTitle": "Look Out, World",
        "Price": 0.99
      }
    ]
  },
  "UnprocessedKeys": {}
}
(Optional) Add a new ProjectionExpression that retrieves at least one nested attribute. Use document path notation to do this.









