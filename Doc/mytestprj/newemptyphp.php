<?php
include 'Complex.php';
global $time;
date_default_timezone_set('Asia/Shanghai');
$now_time = date('s:i:G d-m-Y ',time());
//echo "系统当前时间为：";
echo $now_time;
$time = 1000*5;
echo "<br/>";
//<!--JS 页面自动刷新 -->
echo ("<script type=\"text/javascript\">");
echo ("function fresh_page()");    
echo ("{");
echo ("window.location.reload();");
echo ("}"); 
echo ("setTimeout('fresh_page()','$time');");//每隔时间time刷新一次页面      
echo ("</script>");
$t = new Complex();
$t->setreal(2);
$t->setvir(1.2);
$t->pprint();
?>
