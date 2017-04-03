#! /appl/DBD-Module/perl-5.20.0/perl

#use strict;

#use warnings;


######################

my $NODE_NAME = undef;

my $VENDOR = undef;

my $CITY = undef;

my $REGION = undef;

my $TECHNOLOGY = undef;

my $LAC = undef;

my $BSC_RNC = undef;

my $MSC_POOL = undef;

my $NODE_ID = undef;

my $IDENTIFIER_1 = undef;

my $SQL_command_file = undef;

my $Output_file = undef;

my $Update_Query = undef;

my $STATUS = undef;

#####################

our %conf = undef;

#####################




BEGIN {push(@INC,'/appl/DBD-Module/perl-5.20.0/lib/CPAN')}
use lib '/appl/opt/IBM/tivoli/tipv2/profiles/TIPProfile/installedApps/TIPCell/isc.ear/OMNIbusWebGUI.war/VIP-Dashboard/scripts';

require  map_library;

use Shell;





$conf{'ConfFile'} = '/appl/opt/IBM/tivoli/tipv2/profiles/TIPProfile/installedApps/TIPCell/isc.ear/OMNIbusWebGUI.war/VIP-Dashboard/scripts/map_inv.conf';

%conf = &map_library::read_confs(%conf);



print %conf;

print "\n\n";



@alarm_rows = &map_library::get_nco_sql_result($conf{'OMNI_SQL_PATH'}, $conf{'OMNI_USER'}, $conf{'OMNI_PASSWORD'}, $conf{'OMNI_OS'}, $conf{'OMNI_SQL_CMD'});

%Hash_Alarm = &map_library::parse_omni_results(@alarm_rows);

print "\n\n\nSQL Query --> $conf{'ORA_SQL_INV'}\n\n";
my $dbh = &map_library::ConnectOracleDB($conf{'ORA_HOST'}, $conf{'ORA_SID'}, $conf{'ORA_USER'}, $conf{'ORA_PASSWORD'});
%Hash_Inv = &map_library::QueryInventoryHash($dbh, $conf{'ORA_SQL_INV'});

my $dbh = &map_library::ConnectOracleDB($conf{'ORA_HOST'}, $conf{'ORA_SID'}, $conf{'ORA_USER'}, $conf{'ORA_PASSWORD'});
%Hash_TechStatus = &map_library::QueryTechStatusHash($dbh, $conf{'ORA_SQL_TECH_ST'});

open FILE, ">", "$conf{'MAPS_INV_FILE'}\.0" or die $!;

foreach my $key (keys(%Hash_Inv))	{

		##print "Key --> $key";

		print FILE "$Hash_Inv{$key}";

		print "$Hash_Inv{$key} -------> $Hash_TechStatus{$key}\n";

		if ($Hash_Alarm{$key})
                {
			print "INSIDE Hash_Alarm (1)";

			print "$Hash_TechStatus{$key}";
			##print FILE ",$Hash_Alarm{$key}\n";

			my $alarm_status = undef;

			if ($Hash_TechStatus{$key}) 
			{
				 print "INSIDE Hash_TechStatus (2) ===> ";
				$alarm_status = $Hash_TechStatus{$key};	
				print "ALARM STATUS (2) ===> $alarm_status";	
			}
			else
			{
				$alarm_status = "--,--";	
			}
			

			print FILE ",$Hash_Alarm{$key},$alarm_status\n";
			print "LEAVING HASH_ALARM (2)";	
                        ##print FILE "$Hash_Inv{$key},$Hash_Alarm{$key}\n";
                }
                else
                {
                        ###### Comment the line below to hide circuits with no alarms 
			print "INSIDE ELSE (3)";
			my $alarm_status = undef;

                        if ($Hash_TechStatus{$key})
                        {
                                $alarm_status = $Hash_TechStatus{$key};
				print "INSIDE HASH_TECHSTATUS ===> UPE ---> $Hash_Upe{$key}";
                        }
                        else
                        {
                                $alarm_status = "--,--";
                        }

                        print FILE ",,,,,,0,CIRCUIT,0,$alarm_status\n";
                }

}



close(FILE);

#mv("$conf{'MAPS_INV_FILE'}\.0", "$conf{'MAPS_INV_FILE'}");
`mv -f "$conf{'MAPS_INV_FILE'}\.0" "$conf{'MAPS_INV_FILE'}"`;







##############################################

###  Section: Data from NA-Copper          ###

##############################################



print "\n\n\nSQL Query --> $conf{'ORA_SQL_COPPER'}\n\n\n";



my $dbh = &map_library::ConnectOracleDB($conf{'ORA_HOST'}, $conf{'ORA_SID'}, $conf{'ORA_USER'}, $conf{'ORA_PASSWORD'});



my $NACopperXml = &map_library::CreateNACopperXml($dbh, $conf{'ORA_SQL_COPPER'});



print "XML FILE: $NACopperXml\n";

open FILE2, ">", "$conf{'FILE_OL_NA-C'}\.0" or die $!;

print FILE2 $NACopperXml;

#mv("$conf{'FILE_OL_NA-C'}\.0", "$conf{'FILE_OL_NA-C'}");
`mv -f "$conf{'FILE_OL_NA-C'}\.0" "$conf{'FILE_OL_NA-C'}"`;





############################################

###  Section: Data from NA-Fiber         ###

############################################



print "\n\n\nSQL Query --> $conf{'ORA_SQL_FIBER'}\n\n\n";



my $dbh = &map_library::ConnectOracleDB($conf{'ORA_HOST'}, $conf{'ORA_SID'}, $conf{'ORA_USER'}, $conf{'ORA_PASSWORD'});



my $NAFiberXml = &map_library::CreateNAFiberXml($dbh, $conf{'ORA_SQL_FIBER'});



print "XML FILE: $NAFiberXml\n";

open FILE2, ">", "$conf{'FILE_OL_NA-F'}\.0" or die $!;

print FILE2 $NAFiberXml;

#mv("$conf{'FILE_OL_NA-F'}\.0", "$conf{'FILE_OL_NA-F'}");
`mv -f "$conf{'FILE_OL_NA-F'}\.0" "$conf{'FILE_OL_NA-F'}"`;





######################################

###  Section: Circuit Utilization  ###

######################################



print "\n\n\nSQL Query --> $conf{'ORA_SQL_UTIL'}\n\n\n";



my $dbh = &map_library::ConnectOracleDB($conf{'ORA_HOST'}, $conf{'ORA_SID'}, $conf{'ORA_USER'}, $conf{'ORA_PASSWORD'});



my $CircuitUtilXml = &map_library::CreateUtilizationXml($dbh, $conf{'ORA_SQL_UTIL'});



print "XML FILE: $CircuitUtilXml\n";

open FILE2, ">", "$conf{'FILE_OL_UTIL'}\.0" or die $!;

print FILE2 $CircuitUtilXml;

#mv("$conf{'FILE_OL_UTIL'}\.0", "$conf{'FILE_OL_UTIL'}");
`mv -f "$conf{'FILE_OL_UTIL'}\.0" "$conf{'FILE_OL_UTIL'}"`;





###########################################

###  Section: Trouble-Ticket Escalated  ###

###########################################



print "\n\n\nSQL Query --> $conf{'ORA_SQL_ESCL'}\n\n\n";



my $dbh = &map_library::ConnectOracleDB($conf{'ORA_HOST'}, $conf{'ORA_SID'}, $conf{'ORA_USER'}, $conf{'ORA_PASSWORD'});



my $TTEscalatedXml = &map_library::CreateTTEscalatedXml($dbh, $conf{'ORA_SQL_ESCL'});



print "XML FILE: $TTEscalatedXml\n";

open FILE2, ">", "$conf{'FILE_OL_ESCL'}\.0" or die $!;

print FILE2 $TTEscalatedXml;

#mv("$conf{'FILE_OL_ESCL'}\.0", "$conf{'FILE_OL_ESCL'}");
`mv -f "$conf{'FILE_OL_ESCL'}\.0" "$conf{'FILE_OL_ESCL'}"`;





##########################################

###  Section: Trouble-Ticket All Open  ###

##########################################



print "\n\n\nSQL Query --> $conf{'ORA_SQL_TTOPEN'}\n\n\n";



my $dbh = &map_library::ConnectOracleDB($conf{'ORA_HOST'}, $conf{'ORA_SID'}, $conf{'ORA_USER'}, $conf{'ORA_PASSWORD'});



my $TTAllOpenXml = &map_library::CreateTTAllOpenXml($dbh, $conf{'ORA_SQL_TTOPEN'});



print "XML FILE: $TTAllOpenXml\n";

open FILE2, ">", "$conf{'FILE_OL_TTOPEN'}\.0" or die $!;

print FILE2 $TTAllOpenXml;

#mv("$conf{'FILE_OL_TTOPEN'}\.0", "$conf{'FILE_OL_TTOPEN'}");
`mv -f "$conf{'FILE_OL_TTOPEN'}\.0" "$conf{'FILE_OL_TTOPEN'}"`;





###########################################

###  Section: Trouble-Ticket Closed WK  ###

###########################################



print "\n\n\nSQL Query --> $conf{'ORA_SQL_TTCLOSE'}\n\n\n";



my $dbh = &map_library::ConnectOracleDB($conf{'ORA_HOST'}, $conf{'ORA_SID'}, $conf{'ORA_USER'}, $conf{'ORA_PASSWORD'});



my $TTClosedWeekXml = &map_library::CreateTTClosedWeekXml($dbh, $conf{'ORA_SQL_TTCLOSE'});



print "XML FILE: $TTClosedWeekXml\n";

open FILE2, ">", "$conf{'FILE_OL_TTCLOSE'}\.0" or die $!;

print FILE2 $TTClosedWeekXml;

#mv("$conf{'FILE_OL_TTCLOSE'}\.0", "$conf{'FILE_OL_TTCLOSE'}");
`mv -f "$conf{'FILE_OL_TTCLOSE'}\.0" "$conf{'FILE_OL_TTCLOSE'}"`;


###########################################

###  Section: UPE Alarms XML for VIP    ###

###########################################



print "\n\n\nSQL Query --> $conf{'ORA_SQL_UPE_OL'}\n\n\n";



my $dbh = &map_library::ConnectOracleDB($conf{'ORA_HOST'}, $conf{'ORA_SID'}, $conf{'ORA_USER'}, $conf{'ORA_PASSWORD'});



my $UpeAlarmsXml = &map_library::CreateUpeAlarmsXml($dbh, $conf{'ORA_SQL_UPE_OL'});



print "XML FILE: $UpeAlarmsXml\n";

open FILE2, ">", "$conf{'FILE_OL_UPE'}\.0" or die $!;

print FILE2 $UpeAlarmsXml;

#mv("$conf{'FILE_OL_UPE'}\.0", "$conf{'FILE_OL_UPE'}");
`mv -f "$conf{'FILE_OL_UPE'}\.0" "$conf{'FILE_OL_UPE'}"`;


###########################################

###  Section: Missing Data in Inventory  ###

###########################################

print "\n\n\nSQL Query --> $conf{'ORA_SQL_MISSING'}\n\n\n";

my $dbh = &map_library::ConnectOracleDB($conf{'ORA_HOST'}, $conf{'ORA_SID'}, $conf{'ORA_USER'}, $conf{'ORA_PASSWORD'});

my $MissingDataXml = &map_library::CreateMissingDataXml($dbh, $conf{'ORA_SQL_MISSING'}, $conf{'FILE_OT_MISSING'});

print "XML FILE: $MissingDataXml\n";

open FILE2, ">", "$conf{'FILE_OL_MISSING'}\.0" or die $!;

print FILE2 $MissingDataXml;

#mv("$conf{'FILE_OL_MISSING'}\.0", "$conf{'FILE_OL_MISSING'}");
`mv -f "$conf{'FILE_OL_MISSING'}\.0" "$conf{'FILE_OL_MISSING'}"`;


#	sleep($conf{'DaemonWait'});



