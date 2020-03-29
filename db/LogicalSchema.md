## Logical Schema

**User** (<u>ID</u>\*, firstName*, lastName*, HashedPassword*, profPic, 
privacySetting, notificationSetting)

**UserEmail** (<u>UserID</u>\*, <u>Email</u>\*)

**UserName** (<u>UserID</u>\*, <u>Username</u>\*)

**TrustedDevices** (<u>UserID</u>\*, <u>authToken</u>\*)

**CurrentSession** (<u>UserID</u>\*, <u>sessionID</u>\*)

**Post** (<u>ID</u>\*, UserID*, ParentPostID, Media, 
Text*, Timestamp*, Location)

**Reply** (<u>ID</u>\*, UserID*, ParentPostID*, PArentReplyID, Text*, Timestamp*)

**Follow** (<u>Follower</u>\*, <u>FollowedUser</u>\*)

**Block** (<u>Follower</u>\*, <u>FollowedUser</u>\*)
