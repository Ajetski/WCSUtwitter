## Table and Attribute Summaries

#### Table User

###### Table Summary

|Table|User|
|:---|:-|
|ER Origin|Entity|
|Primary Key|ID|
|Foreign Key||
|Uniqueness Constraint||


###### Attribute Summary

|Name|Type|Range|Req/Opt|
|:--|:--|:---|:-----|
|ID|serial||Req|
|Username|varchar||Req|
|Email|varchar||Req|
|HashedPassword|char||Req|
|ProfPic|ByteA||Opt|
|PrivacySetting|varchar||Opt|
|NotificationSetting|varchar||Opt|



### Table TrustedDevice : 

###### Table Summary

|Table|TrustedDevice|
|:---|:--|
|ER Origin|Entity|
|Primary Key|UserID, authToken|
|Foreign Key|UserID|
|Uniqueness Constraint||


###### Attribute Summary

|Name|Type|Range|Req/Opt|
|:--|:--|:---|:-----|
|UserID|serial||Req|
|authToken|varchar||Req|



### Table CurrentSession : 

###### Table Summary

|Table|CurrentSession|
|:---|:--|
|ER Origin|Entity|
|Primary Key|UserID, sessionID|
|Foreign Key|UserID|
|Uniqueness Constraint||


###### Attribute Summary

|Name|Type|Range|Req/Opt|
|:--|:--|:---|:-----|
|UserID|serial||Req|
|sessionID|varchar||Req|



### Table Post : 

###### Table Summary

|Table|Post|
|:---|:--|
|ER Origin|Entity|
|Primary Key|ID|
|Foreign Key|PosterID, OriginID|
|Uniqueness Constraint||


###### Attribute Summary

|Name|Type|Range|Req/Opt|
|:--|:--|:---|:-----|
|ID|serial||Req|
|PosterID|serial||Req|
|OriginID|serial||Req|
|Media|ByteA||Opt|
|Text|Varchar||Req|
|Timestamp|Timestamp||Req|
|Location|Point||Opt|



### Table Reply : 

###### Table Summary

|Table|Reply|
|:---|:--|
|ER Origin|Entity|
|Primary Key|ID|
|Foreign Key|SenderID, OriginID, ReplyID|
|Uniqueness Constraint||


###### Attribute Summary

|Name|Type|Range|Req/Opt|
|:--|:--|:---|:-----|
|ID|serial||Req|
|SenderID|serial||Req|
|OriginID|serial||Req|
|ReplyID|serial||Req|
|Text|varchar||Req|
|Timestamp|Timestamp||Req|



### Table Follow : 

###### Table Summary

|Table|Follow|
|:---|:--|
|ER Origin|Entity|
|Primary Key|Follower, FollowedUser|
|Foreign Key|Follower, FollowedUser|
|Uniqueness Constraint||


###### Attribute Summary

|Name|Type|Range|Req/Opt|
|:--|:--|:---|:-----|
|Follower|serial||Req|
|FollowedUser|serial||Req|




### Table Block : 

###### Table Summary

|Table|Block|
|:---|:--|
|ER Origin|Entity|
|Primary Key|Blocker, BlockedUser|
|Foreign Key|Blocker, BlockedUser|
|Uniqueness Constraint||


###### Attribute Summary

|Name|Type|Range|Req/Opt|
|:--|:--|:---|:-----|
|Blocker|serial||Req|
|BlockedUser|serial||Req|


