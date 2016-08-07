Meteor.startup(function () {

    /*SyncedCron.add({
        name: 'Creating Queue Groups',
        schedule: function (parser) {
            // parser is a later.parse object
            return parser.text('every 8 seconds');
        },
        job: function () {
            console.log("Done");
        }
    });
    SyncedCron.start();*/

    SyncedCron.config({
        // Log job run details to console
        log: true,

        // Use a custom logger function (defaults to Meteor's logging package)
        logger: false,

        // Name of collection to use for synchronisation and logging
        collectionName: 'cronHistory',

        // Default to using localTime
        utc: false,

        /*
         TTL in seconds for history records in collection to expire
         NOTE: Unset to remove expiry but ensure you remove the index from
         mongo by hand

         ALSO: SyncedCron can't use the `_ensureIndex` command to modify
         the TTL index. The best way to modify the default value of
         `collectionTTL` is to remove the index by hand (in the mongo shell
         run `db.cronHistory.dropIndex({startedAt: 1})`) and re-run your
         project. SyncedCron will recreate the index with the updated TTL.
         */
        collectionTTL: 172800
    });

    SyncedCron.add({
        name: 'Delete old Lobbys',
        schedule: function (parser) {
            return parser.text('every 10 min');
        },
        job: function () {
            var theDate = new Date();
            theDate.setMinutes(theDate.getMinutes() - 20);
            Lobbys.remove( { updatedAt: { $lte: theDate } } );
        }
    });
    SyncedCron.add({
       name: 'Matching Lobbys Togeather' ,
        schedule:function (parser) {
            return parser.text('every 10 sec');
        },
        job:function () {
            var found = false;
            var lobbys = Lobbys.find({status:10}).fetch();
        }
    });
    //SyncedCron.start();
});
