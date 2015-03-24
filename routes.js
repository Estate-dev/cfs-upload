Router.route('/request/:name', {
    name:'UploadFileStep',
		waitOn: function () {
			Meteor.subscribe("files", this.params.name);
		},
});
