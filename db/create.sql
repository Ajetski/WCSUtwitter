--Purpose: Script to create all schema objects

--The results of running this script will be spooled
--into 'spoolCreate.txt'

--\o 'spoolCreate.txt'

-- Output script execution data
\qecho -n 'Script run on '
\qecho -n `date /t`
\qecho -n 'at '
\qecho `time /t`
\qecho -n 'Script run by ' :USER ' on server ' :HOST ' with db ' :DBNAME
\qecho ' '
\qecho 


BEGIN TRANSACTION;

COMMIT

\qecho ' '
\qecho ---------------------------------------------------------------------
\qecho End of script

-- Turn off spooling
--\o