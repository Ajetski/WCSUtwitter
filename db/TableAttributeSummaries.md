## Table and Attribute Summaries

#### Table User

###### Table Summary

|Table|User|
|:---|:-|
|ER Origin|Entity|
|Primary Key||
|Foreign Key||
|Uniqueness Constraint||


###### Attribute Summary

|Name|Type|Range|Req/Opt|
|:--|:--|:---|:-----|
|ID||||
|Username||||
|Email||||
|HashedPassword||||
|PrivacySetting||||
|NotificationSetting||||



### Table TrustedDevice : 

###### Table Summary

|Table|TrustedDevice|
|:---|:--|
|ER Origin|Entity|
|Primary Key||
|Foreign Key||
|Uniqueness Constraint||


###### Attribute Summary

|Name|Type|Range|Req/Opt|
|:--|:--|:---|:-----|
|UserID||||
|authToken||||



### Table CurrentSession : 

###### Table Summary

|Table|CurrentSession|
|:---|:--|
|ER Origin|Entity|
|Primary Key||
|Foreign Key||
|Uniqueness Constraint||


###### Attribute Summary

|Name|Type|Range|Req/Opt|
|:--|:--|:---|:-----|
|UserID||||
|sessionID||||



### Table Post : 

###### Table Summary

|Table|Post|
|:---|:--|
|ER Origin|Entity|
|Primary Key||
|Foreign Key||
|Uniqueness Constraint||


###### Attribute Summary

|Name|Type|Range|Req/Opt|
|:--|:--|:---|:-----|
|ID||||
|PosterID||||
|OriginID||||
|Image||||
|Video||||
|Text||||
|Timestamp||||
|Longitude||||
|Latitude||||



### Table Reply : 

###### Table Summary

|Table|Reply|
|:---|:--|
|ER Origin|Entity|
|Primary Key||
|Foreign Key||
|Uniqueness Constraint||


###### Attribute Summary

|Name|Type|Range|Req/Opt|
|:--|:--|:---|:-----|
|ID||||
|SenderID||||
|OriginID||||
|ReplyID||||
|Text||||
|Timestamp||||



### Table Follow : 

###### Table Summary

|Table|Follow|
|:---|:--|
|ER Origin|Entity|
|Primary Key||
|Foreign Key||
|Uniqueness Constraint||


###### Attribute Summary

|Name|Type|Range|Req/Opt|
|:--|:--|:---|:-----|
|Follower||||
|FollowedUser||||




### Table Block : 

###### Table Summary

|Table|Block|
|:---|:--|
|ER Origin|Entity|
|Primary Key||
|Foreign Key||
|Uniqueness Constraint||


###### Attribute Summary

|Name|Type|Range|Req/Opt|
|:--|:--|:---|:-----|
|Blocker||||
|BlockedUser||||


