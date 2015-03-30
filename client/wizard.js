if (Meteor.isClient) {
  Meteor.startup(function() {

  });
};
Template.dialogStepOne.events({
  'click #nextButton': function() {
    Session.set('active_step', 2);
  }
});
Template.dialogStepTwo.events({
  'click #backButton': function() {
    Session.set('active_step', 1);
  },
  'click #nextButton': function() {
    Session.set('active_step', 3);
  }
});
Template.dialogStepThree.events({
  'click #backButton': function() {
    Session.set('active_step', 2);
  },
  'click #nextButton': function() {
    Session.set('active_step', 1);
  }
});
Template.dialogStepOne.helpers({
  stepOneVisibility: function() {
    if (Session.get('active_step') === 1) {
      console.log('Step :' + Session.get('active_step'));
      return 'visible';
    } else {
      return 'hidden';
    };
  }
});

Template.wizard.helpers({
  activeStepIs: function () {
    return Session.get('active_step');
  }
});
Template.dialogStepTwo.helpers({
  stepTwoVisibility: function() {
    if (Session.get('active_step') === 2) {
      console.log('step :' + Session.get('active_step'));
      return 'visible';
    } else {
      return 'hidden';
    }
  }
});

Template.dialogStepThree.helpers({
  stepThreeVisibility: function() {
    if (Session.get('active_step') === 3) {
      console.log('step : ' + Session.get('active_step'));
      return 'visible';
    } else {
      return 'hidden';
    }
  }
});
