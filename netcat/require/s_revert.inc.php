<?
// => $uri

if( $h_url = $nc_core->db->get_var( "SELECT Hidden_URL FROM Subdivision WHERE ExternalURL='".mysql_real_escape_string( $uri )."' AND OldUrl=1" ) ){
	$uri = $h_url;
}
?>