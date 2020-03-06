## Table and Attribute Summaries

#### Table User

###### Table Summary

|Table|User|
|:---|:-|
|ER Origin|Entity User|
|Primary Key|ID|
|Foreign Key||
|Uniqueness Constraint||


###### Attribute Summary

|Name|Type|Range|Req/Opt|
|:--|:--|:---|:-----|
|ID|serial||Req|
|fName|varchar||Req|
|lName|varchar||Req|
|HashedPassword|char||Req|
|ProfPic|bool||Opt|
|PrivacySetting|json||Opt|
|NotificationSetting|json||Opt|



#### Table UserName

###### Table Summary

|Table|UserName|
|:---|:-|
|ER Origin|Normalized Entity User|
|Primary Key|ID, USERNAME|
|Foreign Key|ID|
|Uniqueness Constraint||


###### Attribute Summary

|Name|Type|Range|Req/Opt|
|:--|:--|:---|:-----|
|ID|Serial||Req|
|USERNAME|varchar||Req|



#### Table UserEmail

###### Table Summary

|Table|Email|
|:---|:-|
|ER Origin|Normalized Entity User|
|Primary Key|ID, EMAIL|
|Foreign Key|ID|
|Uniqueness Constraint||


###### Attribute Summary

|Name|Type|Range|Req/Opt|
|:--|:--|:---|:-----|
|ID|serial||Req|
|Email|varchar||Req|



### Table TrustedDevice : 

###### Table Summary

|Table|TrustedDevice|
|:---|:--|
|ER Origin|MVA|
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
|ER Origin|MVA|
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
|ER Origin|Entity Post|
|Primary Key|ID|
|Foreign Key|PosterID, OriginID|
|Uniqueness Constraint||


###### Attribute Summary

|Name|Type|Range|Req/Opt|
|:--|:--|:---|:-----|
|ID|serial||Req|
|PosterID|serial||Req|
|OriginID|serial||Opt|
|Media|varchar||Opt|
|Text|varchar||Req|
|Timestamp|timestamp||Req|
|Location|point||Opt|



### Table Reply : 

###### Table Summary

|Table|Reply|
|:---|:--|
|ER Origin|Entity Reply|
|Primary Key|ID|
|Foreign Key|SenderID, OriginID, ReplyID|
|Uniqueness Constraint||


###### Attribute Summary

|Name|Type|Range|Req/Opt|
|:--|:--|:---|:-----|
|ID|serial||Req|
|SenderID|serial||Req|
|OriginID|serial||Req|
|ReplyID|serial||Opt|
|Text|varchar||Req|
|Timestamp|Timestamp||Req|



### Table Follow : 

###### Table Summary

|Table|Follow|
|:---|:--|
|ER Origin|Unary Relationship|
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
|ER Origin|Unary Relationship|
|Primary Key|Blocker, BlockedUser|
|Foreign Key|Blocker, BlockedUser|
|Uniqueness Constraint||


###### Attribute Summary

|Name|Type|Range|Req/Opt|
|:--|:--|:---|:-----|
|Blocker|serial||Req|
|BlockedUser|serial||Req|


