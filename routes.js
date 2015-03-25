Router.route('/request/:name', {
    name:'UploadFileStep',
		waitOn: function () {
      console.log('the actual name parameter is : '+this.params.name);
      console.log('the actual requestName session key is : '+Session.get('requestName') );
			Meteor.subscribe("files", this.params.name);
		},
});
