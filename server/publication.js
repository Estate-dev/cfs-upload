// Meteor.publish('files', function(name) {
//   return Files.find({requestName: name }, {
//     limit: 0
//   });
// });
Meteor.publish("files", function() {
  return Files.find({}, {
    limit: 0
  });
});
Meteor.publish("requests", function(){
    return Requests.find({
      // filters here
    });
});
