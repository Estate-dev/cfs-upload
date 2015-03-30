Session.set('requestName', 'request-1');
Session.setDefault('active_step', 1);
//__ FileStore

// ---> cfs:filesystem
var FilesStore = new FS.Store.FileSystem('files-original');
var FilesStoreThumb = new FS.Store.FileSystem('files-thumbs');
// ---> cfs:gridfs
//var FileStore = new FS.Store.GridFS('files-original');


//__ FileCollection

Files = new FS.Collection('files', {
  stores: [FilesStore, FilesStoreThumb],
  filter: {
    allow: {
      contentTypes: [
        'image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/tiff',
        'application/acad', 'image/vnd.dwg', 'image/x-dwg', 'image/x-quicktime',
        'text/plain', 'application/pdf', 'application/msword',
        'application/zip', 'application/vnd.ms-powerpoint',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
      ],
      extensions: ['jpg','jpeg','png','dgw','tiff','gzip','pdf','doc','docx']
    }
  }
});

Meteor.subscribe('files');

//__ Dropzone

Template.dropZone.events({
  'change #fileName': function(event, tpl) {
    console.log('#fileName :' + event.type);
    if (tpl.find('#fileName').value === '') {
      event.preventDefault();
      $('.fileUploader').disabled = true;
      toastr.warning("Ce qu'il faut savoir ...",
        "<h4><strong>Veuillez nommer le fichier !</strong</h4>");
    } else {
      return true;
    }
  },
  'click .fileUploader': function(event, tpl) {
    if (tpl.find('#fileName').value === '') {
      event.preventDefault();
      toastr.warning("Ce qu'il faut savoir ...",
        "<h4><strong>Veuillez nommer le fichier !</strong</h4>");
    } else {
      toastr.clear();
      return true;
    }
  },
  'change .fileUploader': function(event, tpl) {
    var fileName = tpl.find('#fileName').value;
    FS.Utility.eachFile(event, function(file) {
      var fileObj = new FS.File(file);
      fileObj.fileLabel = fileName;
      fileObj.requestName = Session.get('requestName');
      var fileUploaded = Files.insert(fileObj, function(error, result) {
        console.log('le fichier = ' + fileUploaded._id);
        if (error)
          console.log('Error msg is : ' + error);
        else
          toastr.success("Ce qu'il fallait faire...",
            "<h4>Votre fichier a bien été enregistré</h4>");
        tpl.find('#fileName').value = '';
      });
// For test only !!!
      if (Requests.find({
          name: 'request-1'
        }).count() === 0) {
        Requests.insert({
          name: 'request-1'
        });
      }
// End for test only !!
    });
  }
});


//__ Filetable
var currentIndex = 0;
Template.UploadTable.helpers({
  files: function() {
    return Files.find({}, {
      sort: {
        uploadedAt: -1
      }
    });
  },
  listIndex: function() {
    return currentIndex += 1;
  }
});

Template.UploadTable.events({
  'click .remove': function(e, t) {
    e.stopPropagation();
    e.preventDefault();
    if (confirm('Confirmez-vous la suppression ?')) {
      Files.remove(this._id);
    }
  },
  'click a[rel=propertyFiles]': function(e) {
    e.preventDefault();
  },

});

Template.UploadTable.rendered = function() {
  $('a[rel=propertyFiles]').fancybox({
    padding: 0
  });
}
Template.fileTable.helpers({
  fileNumber: function() {
    return Files.find().count();
  }
});
Template.fileTable.events({
  'click #info-upload': function() {
    Modal.show('ModalUploadInfo');
  }
});
toastr.options = {
  "closeButton": false,
  "debug": false,
  "newestOnTop": true,
  "progressBar": true,
  "positionClass": "toast-top-right",
  "preventDuplicates": false,
  "onclick": null,
  "showDuration": "600",
  "hideDuration": "1000",
  "timeOut": "5000",
  "extendedTimeOut": "1000",
  "showEasing": "swing",
  "hideEasing": "linear",
  "showMethod": "fadeIn",
  "hideMethod": "fadeOut"
}
UI.registerHelper('eachIndex', function() {
  return currentIndex += 1;
});
