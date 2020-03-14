--Purpose: Script to DROP all schema objects

--The results of running this script will be spooled
--into 'spoolDROP.txt'

--\o 'spoolDROP.txt'

-- Output script execution data
\qecho -n 'Script run on '
\qecho -n `date /t`
\qecho -n 'at '
\qecho `time /t`
\qecho -n 'Script run by ' :USER ' on server ' :HOST ' with db ' :DBNAME
\qecho ' '
\qecho 


BEGIN TRANSACTION;

DROP TABLE IF EXISTS TRUSTEDDEVICE;

DROP TABLE IF EXISTS CURRENTSESSION;

DROP TABLE IF EXISTS REPLY;

DROP TABLE IF EXISTS POST;

DROP TABLE IF EXISTS FOLLOW;

DROP TABLE IF EXISTS BLOCK;

DROP TABLE IF EXISTS USEREMAIL;

DROP TABLE IF EXISTS USERNAME;

DROP TABLE IF EXISTS USERS;


COMMIT

\qecho ' '
\qecho ---------------------------------------------------------------------
\qecho End of script

-- Turn off spooling
--\o