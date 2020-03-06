## Logical Schema

**User** (<u>ID</u>\*, fName*, lName*, HashedPassword*, profPic, 
privacySetting, notificationSetting)

**UserEmail** (<u>ID</u>\*, <u>Email</u>\*)

**UserName** (<u>ID</u>\*, <u>Username</u>\*)

**TrustedDevices** (<u>UserID</u>\*, <u>authToken</u>\*)

**CurrentSession** (<u>UserID</u>\*, <u>sessionID</u>\*)

**Post** (<u>ID</u>\*, PosterID*, OriginID*, Image, Video, 
Text*, Timestamp*, latitude, longitude)

**Reply** (<u>ID</u>\*, SenderID*, OriginID*, ReplyID, Text*, Timestamp*)

**Follow** (<u>Follower</u>\*, <u>FollowedUser</u>\*)

**Block** (<u>Follower</u>\*, <u>FollowedUser</u>\*)
