##Logical Schema

**User** (<ins>ID*</ins>, Username*, Email*, HashedPassword*, privacySetting, notificationSetting)
**TrustedDevices** (<ins>UserID*</ins>, <ins>authToken*</ins>)
**CurrentSession** (<ins>UserID*</ins>, <ins>sessionID*</ins>)
**Post** (<ins>ID*</ins>, PosterID*, OriginID*, Image, Video, Text*, Timestamp*, latitude, longitude)
**Reply** (<ins>ID*</ins>, SenderID*, OriginID*, ReplyID, Text*, Timestamp*)
**Follow** (<ins>Follower*</ins>, <ins>FollowedUser*</ins>)
**Block** (<ins>Follower*</ins>, <ins>FollowedUser*</ins>)