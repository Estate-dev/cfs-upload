//__ FileStore

// ---> cfs:filesystem
var FilesStore = new FS.Store.FileSystem('files-original');

// ---> cfs:gridfs
//var FileStore = new FS.Store.GridFS('files-original');


//__ FileCollection

Files = new FS.Collection('files', {
  stores: [FilesStore],
  filter: {
    allow: {
      contentTypes: [
        'image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/tiff',
        'application/acad', 'image/vnd.dwg', 'image/x-dwg', 'image/x-quicktime',
        'text/plain', 'application/pdf', 'application/msword',
        'application/zip', 'application/vnd.ms-powerpoint',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
      ],
      extensions: ['jpg', 'jpeg', 'png', 'dgw', 'tiff', 'gzip', 'pdf', 'doc', 'docx']
    }
  }
});

Meteor.subscribe('files');


//__ Dropzone

Template.dropZone.events({
  'change #fileName': function(event, temp) {
    console.log('#fileName input change event');
    if (temp.find('#fileName').value === '') {
      event.preventDefault();
      $('.fileUploader').disabled = true;
        alert('Veuillez nommer le fichier!');
    }else{
      return true;
    }
  },
  'click .fileUploader':function (event, temp) {
    if (temp.find('#fileName').value === '') {
      event.preventDefault();
        alert('Veuillez nommer le fichier!');
    }else{
      return true;
    }
  },
  'change .fileUploader': function(event, temp) {
      FS.Utility.eachFile(event, function(file) {
        var fileObj = new FS.File(file);
        Files.insert(fileObj, function(error, result) {
          if (error)
            console.log('Error msg is : ' + error);
          else
            $('.fileUploader').css('display', 'none');
            temp.find('#fileName').value = '' ;
        });
      });
  }
});


//__ Filetable

Template.UploadTable.helpers({
  files: function() {
    return Files.find({}, {
      sort: {
        uploadedAt: -1
      }
    });
  }
});

Template.UploadTable.events({
  'click .remove': function(e, t) {
    e.stopPropagation();
    e.preventDefault();
    if (confirm('Confirmez-vous la suppression ?')) {
      Files.remove(this._id);
    }
  }
})
