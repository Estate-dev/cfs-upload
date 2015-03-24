var filesPath = "";
filesPath = '/mnt/uploads/nom_du_client';
//__ Debug
FS.debug = true;

//__ FileStore
// ---> cfs:filesystem
var FilesStore = new FS.Store.FileSystem('files-original', {
  'path': filesPath
});
var FilesStoreThumb = new FS.Store.FileSystem('files-thumbs', {
  'path': '/mnt/uploads/thumbs',
  transformWrite: function(fileObj, readStream, writeStream) {
    gm(readStream, fileObj.name()).resize('48', '48').stream().pipe(writeStream)
  }
});

// ---> cfs:gridfs
//var FilesStore = new FS.Store.GridFS('files-original');

//__ FileCollection
Files = new FS.Collection('files', {
  stores: [FilesStoreThumb,FilesStore],
  filter: {
    maxSize: 41943040, //in bytes
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

Files.allow({
  insert: function(userId, fileObj) {
    return true;
  },
  update: function(userId, fileObj) {
    return true;
  },
  remove: function(userId, fileObj) {
    return true;
  },
  download: function(userId, fileObj) {
    return true;
  },
  fetch: []
});

Meteor.publish('files', function() {
  return Files.find({}, {
    limit: 0
  });
});
